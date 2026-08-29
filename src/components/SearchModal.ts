import { escapeHtml } from '@/utils/sanitize';
import { t } from '@/services/i18n';

export type SearchResultType = 'country' | 'news' | 'hotspot' | 'market' | 'prediction' | 'conflict' | 'base' | 'pipeline' | 'cable' | 'datacenter' | 'earthquake' | 'outage' | 'nuclear' | 'irradiator' | 'techcompany' | 'ailab' | 'startup' | 'techevent' | 'techhq' | 'accelerator' | 'exchange' | 'financialcenter' | 'centralbank' | 'commodityhub';

export type {
  SearchMatch,
  SearchResult,
  SearchResultType,
} from '@/components/search-types';

const CATEGORY_KEYS: Record<string, string> = {
  navigate: 'commands.categories.navigate',
  layers: 'commands.categories.layers',
  panels: 'commands.categories.panels',
  view: 'commands.categories.view',
  actions: 'commands.categories.actions',
  country: 'commands.categories.country',
};

function kebabToCamel(s: string): string {
  return s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function resolveCommandLabel(cmd: Command): string {
  const colonIdx = cmd.id.indexOf(':');
  if (colonIdx === -1) return cmd.label;
  const prefix = cmd.id.slice(0, colonIdx);
  const action = cmd.id.slice(colonIdx + 1);

  switch (prefix) {
    case 'nav':
      return `${t('commands.prefixes.map')}: ${t('commands.regions.' + action, { defaultValue: cmd.label })}`;
    case 'country-map':
      return `${t('commands.prefixes.map')}: ${cmd.label}`;
    case 'panel': {
      const fallback = cmd.label.startsWith('Panel: ') ? cmd.label.slice(7) : cmd.label;
      const panelId = panelCommandTargetId(cmd.id) ?? action;
      const panelName = action.includes('@')
        ? fallback
        : t('panels.' + kebabToCamel(panelId), { defaultValue: fallback });
      return `${t('commands.prefixes.panel')}: ${panelName}`;
    }
    case 'country':
      return `${t('commands.prefixes.brief')}: ${cmd.label}`;
    default: {
      const i18nKey = `commands.labels.${cmd.id.replace(':', '.')}`;
      const resolved = t(i18nKey, { defaultValue: '' });
      return resolved || cmd.label;
    }
  }
}

function resolveCategoryLabel(cmd: Command): string {
  const key = CATEGORY_KEYS[cmd.category];
  return key ? t(key, { defaultValue: cmd.category }) : cmd.category;
}

const RECENT_SEARCHES_KEY = 'worldmonitor_recent_searches';
const MAX_RECENT = 8;
const MAX_RESULTS = 24;

interface SearchModalOptions {
  placeholder?: string;
  hint?: string;
}

export class SearchModal {
  private container: HTMLElement;
  private overlay: HTMLElement | null = null;
  private focusTrap: FocusTrap | null = null;
  private input: HTMLInputElement | null = null;
  private resultsList: HTMLElement | null = null;
  private resultsStatus: HTMLElement | null = null;
  private resultsObserver: MutationObserver | null = null;
  private chipsContainer: HTMLElement | null = null;
  private scopeContainer: HTMLElement | null = null;
  private closeTimeoutId: ReturnType<typeof setTimeout> | null = null;
  // Invalidates deferred mobile list population when the sheet closes before
  // its first paint (or is immediately reopened).
  private mobileInitialPopulationGeneration = 0;
  // Debounce the per-keystroke search so fast typing runs the command match +
  // sort once after settle, not on every input event — cuts INP processing
  // time (#4537). Programmatic handleSearch() calls (filters, category select)
  // stay immediate; only the input listener routes through this.
  private debouncedSearch = debounce((): void => this.handleSearch(), SEARCH_DEBOUNCE_MS);
  // The query last passed through handleSearch — lets keyboard nav detect when a
  // debounced keystroke search is still pending (results stale vs. current input).
  private lastSearchedQuery = '';
  private viewportHandler: (() => void) | null = null;
  private sources: SearchableSource[] = [];
  private searchIndexRevision = 0;
  private results: SearchResult[] = [];
  private commandResults: SearchCommandMatch[] = [];
  private selectedIndex = 0;
  private recentSearches: string[] = [];
  private onSelect?: (result: SearchResult) => void;
  private placeholder: string;
  private hint: string;

  constructor(container: HTMLElement, options?: SearchModalOptions) {
    this.container = container;
    this.placeholder = options?.placeholder || t('modals.search.placeholder');
    this.hint = options?.hint || t('modals.search.hint');
    this.loadRecentSearches();
  }

  public registerSource(
    type: SearchResultType,
    items: SearchableSource['items'],
    options?: { updateVisibleMetrics?: boolean },
  ): void {
    const existingIndex = this.sources.findIndex(s => s.type === type);
    let indexChanged = true;
    if (existingIndex >= 0) {
      const existing = this.sources[existingIndex];
      indexChanged = !existing || !this.searchItemsEqual(existing.items, items);
      // Always replace the payload so selection revalidation dispatches the
      // freshest live object even when its indexed text did not change.
      this.sources[existingIndex] = { type, items };
    } else {
      this.sources.push({ type, items });
    }
    if (indexChanged) this.searchIndexRevision += 1;
    if (options?.updateVisibleMetrics !== false) this.updateIndexMetrics();
  }

  /** Search the current index without opening or mutating the modal. */
  public search(rawInput: string, scope: SearchScope = this.activeScope): SearchIndexQueryResult {
    // Viewport width can change while the lazy manager stays alive. Re-read
    // the responsive mode so programmatic and visible searches use identical
    // caps/order at the current viewport. Do not mutate the current open
    // session's mode: close/history semantics must match how it was opened.
    const currentViewportIsMobile = isMobileDevice();
    return querySearchIndex({
      rawInput,
      scope,
      sources: this.sources,
      commands: getAllCommands(),
      isMobile: currentViewportIsMobile,
      flightPrefixEnabled: !!this.onFlightSearch,
      isPanelCommandVisible: (panelId) => this.isPanelCommandVisible(panelId),
      isLayerCommandExecutable: (layerKey) => this.layerExecutableFn(layerKey),
      isCommandVisible: (command) => this.commandVisibleFn(command),
      isResultVisible: (result) => this.resultVisibleFn(result),
      resolveCommandLabel,
      resolveCommandCategoryLabel: resolveCategoryLabel,
    });
  }

  public getSearchIndexRevision(): number {
    return this.searchIndexRevision;
  }

  /** Resolve a previously issued identity from registered sources, not the ranked window. */
  public resolveMatchByIdentity(identity: string): SearchMatch | undefined {
    for (const source of this.sources) {
      for (const item of source.items) {
        const match: SearchMatch = {
          kind: 'result',
          score: 0,
          result: {
            type: source.type,
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            data: item.data,
          },
        };
        if (searchMatchIdentity(match) === identity) return match;
      }
    }
    for (const command of getAllCommands()) {
      const match: SearchMatch = {
        kind: 'command',
        score: 0,
        title: resolveCommandLabel(command),
        subtitle: resolveCategoryLabel(command),
        command,
      };
      if (searchMatchIdentity(match) === identity) return match;
    }
    return undefined;
  }

  /** Drop debounce, close, and mobile-population work during manager teardown. */
  public cancelPendingWork(): void {
    this.debouncedSearch.cancel();
    this.mobileInitialPopulationGeneration += 1;
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
  }

  public setOnSelect(callback: (result: SearchResult) => void): void {
    this.onSelect = callback;
  }

  public setOnCommand(callback: (command: Command) => void): void {
    this.onCommand = callback;
  }

  public setOnHumanInteraction(callback: () => void): void {
    this.onHumanInteraction = callback;
  }

  public setOnQueryChange(callback: (rawInput: string) => void): void {
    this.onQueryChange = callback;
  }

  public setOnFlightSearch(callback: (callsign: string) => void): void {
    this.onFlightSearch = callback;
  }

  public refreshSearch(): void {
    if (this.overlay) this.handleSearch();
  }

  public setActivePanels(panelIds: string[], options?: { updateVisibleMetrics?: boolean }): void {
    const next = new Set(panelIds);
    if (this.stringSetsEqual(this.activePanelIds, next)) return;
    this.activePanelIds = next;
    this.searchIndexRevision += 1;
    if (options?.updateVisibleMetrics !== false) this.updateIndexMetrics();
  }

  public setAvailablePanels(panelIds: string[], options?: { updateVisibleMetrics?: boolean }): void {
    const next = new Set(panelIds);
    if (this.stringSetsEqual(this.availablePanelIds, next)) return;
    this.availablePanelIds = next;
    this.searchIndexRevision += 1;
    if (options?.updateVisibleMetrics !== false) this.updateIndexMetrics();
  }

  /** A panel command is shown iff enabled OR available-to-add (back-compat: active-only when no available set). */
  private isPanelCommandVisible(panelId: string): boolean {
    if (this.availablePanelIds.size === 0) return this.activePanelIds.has(panelId);
    return this.activePanelIds.has(panelId) || this.availablePanelIds.has(panelId);
  }

  /** True when a panel command would add a currently-disabled panel (drives the "Add" affordance). */
  private isAddablePanel(cmd: Command): boolean {
    const id = panelCommandTargetId(cmd.id);
    return !!id && !this.activePanelIds.has(id) && this.availablePanelIds.has(id);
  }

  public setLayerExecutableFn(fn: (layerKey: string) => boolean): void {
    this.layerExecutableFn = fn;
    this.searchIndexRevision += 1;
    this.updateIndexMetrics();
  }

  public setCommandVisibleFn(fn: (command: Command) => boolean): void {
    this.commandVisibleFn = fn;
    this.searchIndexRevision += 1;
    this.updateIndexMetrics();
  }

  public setResultVisibleFn(fn: (result: SearchResult) => boolean): void {
    this.resultVisibleFn = fn;
    this.searchIndexRevision += 1;
    this.updateIndexMetrics();
  }

  private searchItemsEqual(
    left: SearchableSource['items'],
    right: SearchableSource['items'],
  ): boolean {
    return searchSourceItemsEqual(left, right);
  }

  private stringSetsEqual(left: Set<string>, right: Set<string>): boolean {
    return left.size === right.size && [...left].every((value) => right.has(value));
  }

  public open(replaceOverlayId?: OverlayId): void {
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
      this.overlay?.remove();
      this.overlay = null;
      // remove() deferred state reset never ran — clear selection/results now
      // so a mid-close reopen does not inherit the prior session index.
      this.input = null;
      this.resultsList = null;
      this.chipsContainer = null;
      this.scopeContainer = null;
      this.results = [];
      this.commandResults = [];
      this.selectedIndex = 0;
      this.lastSearchedQuery = '';
    }
    if (this.overlay) return;
    this.isMobile = isMobileDevice();
    this.currentFlightCallsign = null;
    this.flightSearchFired = false;
    this.selectedIndex = 0;
    this.lastSearchedQuery = '';
    this.activeScope = 'all';
    this.quickLaunchExamples = [];
    this.createModal();
    if (this.overlay) {
      this.focusTrap = createFocusTrap(this.overlay, { initialFocus: () => this.input });
      this.focusTrap.activate();
    }
    this.showingAllCommands = false;
    if (this.isMobile) {
      const close = (origin: OverlayCloseOrigin) => this.close(origin);
      if (replaceOverlayId) overlayHistory.replace(replaceOverlayId, 'search', close);
      else overlayHistory.open('search', close);
      this.scheduleMobileInitialPopulation();
    } else {
      this.showRecentOrEmpty();
    }
  }

  public close(origin: OverlayCloseOrigin = 'control'): void {
    this.onHumanInteraction?.();
    this.closeInternal(origin);
  }

  private closeInternal(origin: OverlayCloseOrigin): void {
    // Drop any pending debounced search so it can't fire against a torn-down modal.
    this.debouncedSearch.cancel();
    this.focusTrap?.deactivate();
    this.focusTrap = null;
    this.mobileInitialPopulationGeneration += 1;
    if (this.isMobile && origin === 'control') overlayHistory.close('search');
    if (this.viewportHandler && window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.viewportHandler);
      this.viewportHandler = null;
    }
    if (this.overlay) {
      this.overlay.classList.remove('open');
      const remove = () => {
        this.resultsObserver?.disconnect();
        this.resultsObserver = null;
        this.overlay?.remove();
        this.overlay = null;
        this.input = null;
        this.resultsList = null;
        this.chipsContainer = null;
        this.scopeContainer = null;
        this.results = [];
        this.commandResults = [];
        this.selectedIndex = 0;
        this.currentFlightCallsign = null;
        this.flightSearchFired = false;
      };
      if (this.isMobile) {
        this.closeTimeoutId = setTimeout(() => {
          this.closeTimeoutId = null;
          remove();
        }, 300);
      } else {
        remove();
      }
    }
  }

  public isOpen(): boolean {
    return this.overlay !== null;
  }

  /** Close the palette before an agent reveals a selected dashboard target. */
  public closeForProgrammaticSelection(): void {
    if (this.overlay) this.closeInternal('control');
  }

  /**
   * Keep the tap frame limited to the sheet shell. The results list and command
   * chips can create several nodes plus event listeners, which otherwise makes
   * the first sheet presentation compete with the FAB interaction (#5158).
   */
  private scheduleMobileReveal(overlay: HTMLElement): void {
    requestAnimationFrame(() => {
      // The sheet can close or be replaced before its queued reveal runs. Do
      // not let stale work reopen an outgoing or removed overlay.
      if (this.overlay !== overlay || this.closeTimeoutId !== null) return;
      overlay.classList.add('open');
    });
  }

  private scheduleMobileInitialPopulation(): void {
    const generation = ++this.mobileInitialPopulationGeneration;
    // The first frame reveals the sheet; the second runs after that paint. Do
    // not use the startup after-paint scheduler here: it can wait for load and
    // idle time even though this is an already-interactive control.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // A close/reopen or an immediate keystroke owns the content now; never
        // overwrite its current results with the initial empty/recent state.
        if (generation !== this.mobileInitialPopulationGeneration || !this.overlay || this.input?.value) return;
        this.showRecentOrEmpty();
        this.renderChips();
      });
    });
  }

  private createModal(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'search-overlay';
    this.overlay.innerHTML = `
      <div class="search-modal">
        <div class="search-header">
          <span class="search-icon">⌘</span>
          <input type="text" class="search-input" placeholder="${this.placeholder}" autofocus />
          <kbd class="search-kbd">ESC</kbd>
        </div>
        <div class="search-results"></div>
        <div class="search-footer">
          <span><kbd>↑↓</kbd> ${t('modals.search.navigate')}</span>
          <span><kbd>↵</kbd> ${t('modals.search.select')}</span>
          <span><kbd>esc</kbd> ${t('modals.search.close')}</span>
        </div>
      </div>
    `;

    if (this.isMobile) {
      this.overlay.className = 'search-overlay search-mobile';
      setTrustedHtml(this.overlay, trustedHtml(`
        <div class="search-sheet">
          <div class="search-sheet-handle"></div>
          <div class="search-mobile-ident">
            <span>WM // COMMAND DECK</span>
            <span class="search-index-state"><i></i> LIVE</span>
          </div>
          <div class="search-sheet-header">
            <span class="search-sheet-icon" aria-hidden="true"></span>
            <input type="text" class="search-input" placeholder="${this.placeholder}" aria-label="${this.placeholder}" autofocus />
            <button class="search-sheet-cancel" aria-label="Close">\u00D7</button>
          </div>
          ${this.renderScopeMarkup()}
          <div class="search-sheet-chips"></div>
          <div class="search-results"></div>
          <div class="search-results-status wm-visually-hidden"></div>
        </div>
      `, "legacy direct innerHTML migration"));

      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      this.overlay.querySelector('.search-sheet-cancel')?.addEventListener('click', () => this.close());

      this.chipsContainer = this.overlay.querySelector('.search-sheet-chips');

      this.container.appendChild(this.overlay);
      this.scheduleMobileReveal(this.overlay);

      const sheet = this.overlay.querySelector('.search-sheet') as HTMLElement | null;
      if (sheet && window.visualViewport) {
        const vv = window.visualViewport;
        this.viewportHandler = () => {
          if (!sheet.isConnected) return;
          sheet.style.maxHeight = `${vv.height * 0.85}px`;
        };
        vv.addEventListener('resize', this.viewportHandler);
      }
    } else {
      this.overlay.className = 'search-overlay';
      setTrustedHtml(this.overlay, trustedHtml(`
        <div class="search-modal">
          <div class="search-command-topline">
            <div class="search-command-ident">
              <span class="search-command-mark" aria-hidden="true"><i></i></span>
              <span>WM // INTELLIGENCE COMMAND DECK</span>
              <span class="search-index-state"><i></i> INDEX ONLINE</span>
            </div>
            <div class="search-command-metrics" aria-label="Search index status">
              <span><strong data-search-entity-count>${this.getIndexedEntityCount()}</strong> SIGNALS</span>
              <span><strong data-search-command-count>${this.getVisibleCommandCount()}</strong> OPS</span>
            </div>
          </div>
          <div class="search-header">
            <span class="search-icon" aria-hidden="true"></span>
            <input type="text" class="search-input" placeholder="${this.placeholder}" aria-label="${this.placeholder}" autofocus />
            <kbd class="search-kbd">ESC</kbd>
          </div>
          ${this.renderScopeMarkup()}
          <div class="search-results"></div>
          <div class="search-results-status wm-visually-hidden"></div>
          <div class="search-footer">
            <span class="search-footer-ready"><i></i> READY FOR TASKING</span>
            <span><kbd>\u2191\u2193</kbd> ${t('modals.search.navigate')}</span>
            <span><kbd>\u21B5</kbd> ${t('modals.search.select')}</span>
            <span><kbd>esc</kbd> ${t('modals.search.close')}</span>
          </div>
        </div>
      `, "legacy direct innerHTML migration"));

      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      this.container.appendChild(this.overlay);
    }

    this.input = this.overlay.querySelector('.search-input');
    this.resultsList = this.overlay.querySelector('.search-results');
    this.resultsStatus = this.overlay.querySelector('.search-results-status');
    this.scopeContainer = this.overlay.querySelector('.search-scope-rail');

    // Combobox/listbox contract: results are options, arrow-key selection is
    // reported through aria-activedescendant (see decorateResultOptions).
    if (this.input && this.resultsList) {
      this.resultsList.id = 'searchResultsListbox';
      this.resultsList.setAttribute('role', 'listbox');
      this.input.setAttribute('role', 'combobox');
      this.input.setAttribute('aria-expanded', 'true');
      this.input.setAttribute('aria-controls', 'searchResultsListbox');
      this.input.setAttribute('aria-autocomplete', 'list');
      // Every render path replaces the listbox's children wholesale; the
      // observer re-applies option semantics without each path having to know.
      this.resultsObserver?.disconnect();
      this.resultsObserver = new MutationObserver(() => this.decorateResultOptions());
      this.resultsObserver.observe(this.resultsList, { childList: true, subtree: true });
    }
    // Combobox search results are async to the typing ear: without a polite
    // status region, a screen-reader user never hears how many results (or
    // "no results") the last keystroke produced (#7023).
    if (this.resultsStatus) {
      this.resultsStatus.setAttribute('role', 'status');
      this.resultsStatus.setAttribute('aria-live', 'polite');
    }

    this.input?.addEventListener('input', () => {
      this.onHumanInteraction?.();
      this.debouncedSearch();
    });
    this.input?.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.scopeContainer?.querySelectorAll<HTMLButtonElement>('[data-search-scope]').forEach((button) => {
      button.addEventListener('click', () => {
        const scope = button.dataset.searchScope as SearchScope | undefined;
        if (scope && SEARCH_SCOPES.includes(scope)) this.setActiveScope(scope);
      });
    });
  }

  private renderScopeMarkup(): string {
    const buttons = SEARCH_SCOPES.map((scope) => `
      <button
        type="button"
        class="search-scope${scope === this.activeScope ? ' active' : ''}"
        data-search-scope="${scope}"
        aria-pressed="${scope === this.activeScope}"
      ><span aria-hidden="true">${SCOPE_ICONS[scope]}</span>${escapeHtml(SCOPE_LABELS[scope])}</button>
    `).join('');

    return `<div class="search-scope-rail" role="toolbar" aria-label="Filter intelligence search">${buttons}</div>`;
  }

  private setActiveScope(scope: SearchScope): void {
    if (this.activeScope === scope) return;
    this.activeScope = scope;
    this.showingAllCommands = false;
    this.selectedIndex = 0;
    this.quickLaunchExamples = [];
    this.debouncedSearch.cancel();
    // Invalidate deferred mobile initial population so it cannot repaint the
    // previous channel after the operator already switched scopes.
    if (this.isMobile) this.mobileInitialPopulationGeneration += 1;
    if (this.overlay) this.overlay.dataset.searchScope = scope;
    this.scopeContainer?.querySelectorAll<HTMLButtonElement>('[data-search-scope]').forEach((button) => {
      const active = button.dataset.searchScope === scope;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (this.input?.value.trim()) this.handleSearch();
    else this.showRecentOrEmpty();
    if (this.isMobile) this.renderChips(this.input?.value.trim());
  }

  private getIndexedEntityCount(): number {
    return this.sources.reduce((count, source) => count + source.items.length, 0);
  }

  private getVisibleCommandCount(): number {
    return getAllCommands().filter((command) => {
      if (!this.commandVisibleFn(command)) return false;
      const panelId = panelCommandTargetId(command.id);
      if (panelId && !this.isPanelCommandVisible(panelId)) return false;
      if (command.id.startsWith('layer:') && !this.layerExecutableFn(command.id.slice(6))) return false;
      return true;
    }).length;
  }

  private updateIndexMetrics(): void {
    const entityCount = this.overlay?.querySelector<HTMLElement>('[data-search-entity-count]');
    const commandCount = this.overlay?.querySelector<HTMLElement>('[data-search-command-count]');
    if (entityCount) entityCount.textContent = String(this.getIndexedEntityCount());
    if (commandCount) commandCount.textContent = String(this.getVisibleCommandCount());
  }

  private handleSearch(): void {
    // A programmatic refresh can render while the mobile sheet's initial
    // population is still deferred. Its results now own the list.
    if (this.isMobile) this.mobileInitialPopulationGeneration += 1;
    const rawInput = this.input?.value.toLowerCase() || '';
    const query = rawInput.trim();
    // Record what we actually searched so flushPendingSearch can detect stale results.
    this.lastSearchedQuery = query;

    if (!query) {
      this.showingAllCommands = false;
      this.commandResults = [];
      // Drop flight trigger state so Enter on the idle deck cannot re-fire a
      // prior "flight …" search after the operator cleared the input.
      this.currentFlightCallsign = null;
      this.flightSearchFired = false;
      this.selectedIndex = 0;
      this.showRecentOrEmpty();
      if (this.isMobile) this.renderChips();
      return;
    }

    // Collect matches grouped by type
    const byType = new Map<SearchResultType, (SearchResult & { _score: number })[]>();

    for (const source of this.sources) {
      for (const item of source.items) {
        const titleLower = item.title.toLowerCase();
        const subtitleLower = item.subtitle?.toLowerCase() || '';

        if (titleLower.includes(query) || subtitleLower.includes(query)) {
          const isPrefix = titleLower.startsWith(query) || subtitleLower.startsWith(query);
          const result = {
            type: source.type,
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            data: item.data,
            _score: isPrefix ? 2 : 1,
          } as SearchResult & { _score: number };

          if (!byType.has(source.type)) byType.set(source.type, []);
          byType.get(source.type)!.push(result);
        }
      }
    }

    // Prioritize: news first, then other dynamic data, then static infrastructure
    const priority: SearchResultType[] = [
      'news', 'prediction', 'market', 'earthquake', 'outage',  // Dynamic/timely
      'conflict', 'hotspot', 'country',  // Current events + countries
      'base', 'pipeline', 'cable', 'datacenter', 'nuclear', 'irradiator',  // Infrastructure
      'techcompany', 'ailab', 'startup', 'techevent', 'techhq', 'accelerator'  // Tech
    ];

    // Take top matches from each type, news gets more slots
    this.results = [];
    for (const type of priority) {
      const matches = byType.get(type) || [];
      matches.sort((a, b) => b._score - a._score);
      const limit = type === 'news' ? 6 : type === 'country' ? 4 : 3;
      this.results.push(...matches.slice(0, limit));
      if (this.results.length >= MAX_RESULTS) break;
    }
    this.results = this.results.slice(0, MAX_RESULTS);

    trackSearchUsed(query.length, this.results.length + this.commandResults.length);
    this.selectedIndex = 0;
    this.quickLaunchExamples = [];
    this.renderResults();
    if (this.isMobile) this.renderChips(query);
  }

  private showRecentOrEmpty(): void {
    this.results = [];
    this.commandResults = [];
    this.quickLaunchExamples = [];
    // Keep keyboard highlight aligned with the freshly painted idle list.
    this.selectedIndex = 0;

    if (this.showingAllCommands) {
      this.renderAllCommandsList();
      return;
    }

    if (this.activeScope === 'all' && this.recentSearches.length > 0) {
      this.renderRecent();
    } else {
      this.renderEmpty();
    }
  }

  private renderRecent(): void {
    if (!this.resultsList) return;

    this.resultsList.innerHTML = `<div class="search-section-header">${t('modals.search.recent')}</div>`;

    this.recentSearches.forEach((term, i) => {
      const item = document.createElement('div');
      item.className = `search-result-item recent${i === this.selectedIndex ? ' selected' : ''}`;
      item.dataset.recent = term;

      const icon = document.createElement('span');
      icon.className = 'search-result-icon';
      icon.textContent = '🕐';

      const title = document.createElement('span');
      title.className = 'search-result-title';
      title.textContent = term;

      item.appendChild(icon);
      item.appendChild(title);

      item.addEventListener('click', () => {
        if (this.input) this.input.value = term;
        this.handleSearch();
      });

      this.resultsList!.appendChild(item);
    });

    this.appendSeeAllCommandsLink();
  }

  private renderEmpty(): void {
    if (!this.resultsList) return;

    this.resultsList.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <div>${t('modals.search.empty')}</div>
        <div class="search-empty-hint">${this.hint}</div>
      </div>
      <div class="search-launch-grid">`;
    tips.forEach((tip, i) => {
      const example = t(tip.exampleKey);
      html += `
        <div class="search-result-item tip-item${i === this.selectedIndex ? ' selected' : ''}" data-tip-example="${escapeHtml(example)}">
          <span class="search-result-icon" aria-hidden="true">${tip.icon}</span>
          <div class="search-result-content">
            <div class="search-result-title">${escapeHtml(t(tip.key))}</div>
            <div class="search-result-subtitle">${escapeHtml(example)}</div>
          </div>
          <span class="search-launch-arrow" aria-hidden="true">\u2192</span>
        </div>`;
    });
    html += '</div>';

    setTrustedHtml(this.resultsList, trustedHtml(html, "legacy direct innerHTML migration"));

    this.resultsList.querySelectorAll('.tip-item').forEach((el) => {
      el.addEventListener('click', () => {
        const example = (el as HTMLElement).dataset.tipExample || '';
        this.applyProgrammaticQuery(example);
      });
    });

    this.appendSeeAllCommandsLink();
  }

  /** Apply a tip/chip/recent term without letting a pending keystroke debounce race it. */
  private applyProgrammaticQuery(term: string): void {
    if (!this.input) return;
    this.debouncedSearch.cancel();
    this.input.value = term;
    this.handleSearch();
  }

  private appendSeeAllCommandsLink(): void {
    if (!this.resultsList) return;
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'search-all-commands-link';
    link.textContent = t('modals.search.seeAllCommands');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.showingAllCommands = true;
      this.renderAllCommandsList();
    });
    const wrap = document.createElement('div');
    wrap.className = 'search-all-commands-wrap';
    wrap.appendChild(link);
    this.resultsList.appendChild(wrap);
  }

  /**
   * Renders the full command list by category. Commands are sourced from
   * getAllCommands(); no separate list to maintain. This view intentionally
   * includes available-but-disabled panels (each tagged with an "Add" pill via
   * isAddablePanel) so it doubles as a browse-and-add surface — the list is
   * kept navigable by the collapsible per-category <details> grouping below.
   */
  private renderAllCommandsList(): void {
    if (!this.resultsList) return;
    this.quickLaunchExamples = [];

    const allCommands = getAllCommands();
    const commands = allCommands.filter(cmd => {
      if (!commandMatchesSearchScope(this.activeScope, cmd.category)) return false;
      if (!this.commandVisibleFn(cmd)) return false;
      const panelId = panelCommandTargetId(cmd.id);
      if (panelId) {
        if (!this.isPanelCommandVisible(panelId)) return false;
      }
      if (cmd.id.startsWith('layer:')) {
        if (!this.layerExecutableFn(cmd.id.slice(6))) return false;
      }
      return true;
    });

    const categoryOrder: Command['category'][] = ['navigate', 'layers', 'panels', 'view', 'actions', 'country'];
    const byCategory = new Map<Command['category'], Command[]>();
    for (const cat of categoryOrder) byCategory.set(cat, []);
    for (const cmd of commands) {
      const list = byCategory.get(cmd.category);
      if (list) list.push(cmd);
    }

    let html = `
      <div class="search-section-header search-command-list-back">
        <a href="#" class="search-all-commands-back">${escapeHtml(t('modals.search.hideCommandList'))}</a>
      </div>`;

    for (const category of categoryOrder) {
      const list = byCategory.get(category) || [];
      if (list.length === 0) continue;
      const first = list[0];
      if (!first) continue;
      const label = resolveCategoryLabel(first);
      html += `<details class="search-command-category" open>`;
      html += `<summary class="search-command-category-summary">${escapeHtml(label)}</summary>`;
      html += `<div class="search-command-category-list">`;
      for (const cmd of list) {
        const addable = this.isAddablePanel(cmd);
        const addLabel = t('modals.search.addPanel', { defaultValue: 'Add' });
        const ariaLabel = addable ? ` aria-label="${escapeHtml(`${addLabel}: ${resolveCommandLabel(cmd)}`)}"` : '';
        html += `
          <div class="search-result-item command-item ${addable ? 'command-addable' : ''}" data-command="${escapeHtml(cmd.id)}"${ariaLabel}>
            <span class="search-result-icon">${escapeHtml(cmd.icon)}</span>
            <div class="search-result-content">
              <div class="search-result-title">${escapeHtml(resolveCommandLabel(cmd))}</div>
            </div>
            ${addable ? `<span class="search-result-type search-result-type-add">${escapeHtml(addLabel)}</span>` : ''}
          </div>`;
      }
      html += `</div></details>`;
    }

    setTrustedHtml(this.resultsList, trustedHtml(html, "legacy direct innerHTML migration"));

    const backLink = this.resultsList.querySelector('.search-all-commands-back');
    backLink?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showingAllCommands = false;
      this.showRecentOrEmpty();
    });

    this.resultsList.querySelectorAll('.search-command-category .command-item').forEach((el) => {
      el.addEventListener('click', () => {
        const id = (el as HTMLElement).dataset.command;
        const command = getAllCommands().find(c => c.id === id);
        if (command) {
          this.close();
          this.onCommand?.(command);
        }
      });
    });
  }

  private get totalResultCount(): number {
    return this.commandResults.length + this.results.length;
  }

  private renderResults(): void {
    if (!this.resultsList) return;
    this.quickLaunchExamples = [];

    if (this.commandResults.length === 0 && this.results.length === 0) {
      if (this.currentFlightCallsign && this.onFlightSearch) {
        if (this.flightSearchFired) {
          setTrustedHtml(this.resultsList, trustedHtml(`
            <div class="search-empty">
              <div class="search-empty-icon">\u2708\uFE0F</div>
              <div>${escapeHtml(t('modals.search.flightNotFound', { callsign: this.currentFlightCallsign }))}</div>
            </div>`, "legacy direct innerHTML migration"));
        } else {
          this.renderFlightSearchTrigger(this.currentFlightCallsign);
          this.announceResultCount(1);
        }
        return;
      }
      setTrustedHtml(this.resultsList, trustedHtml(`
        <div class="search-empty">
          <div class="search-empty-icon">∅</div>
          <div>${t('modals.search.noResults')}</div>
        </div>
      `, "legacy direct innerHTML migration"));
      this.announceResultCount(0);
      return;
    }

    const icons: Record<SearchResultType, string> = {
      country: '🏳️',
      news: '📰',
      hotspot: '📍',
      market: '📈',
      prediction: '🎯',
      conflict: '⚔️',
      base: '🏛️',
      pipeline: '🛢',
      cable: '🌐',
      datacenter: '🖥️',
      earthquake: '🌍',
      outage: '📡',
      nuclear: '☢️',
      irradiator: '⚛️',
      techcompany: '🏢',
      ailab: '🧠',
      startup: '🚀',
      techevent: '📅',
      techhq: '🦄',
      accelerator: '🚀',
      exchange: '🏛️',
      financialcenter: '💰',
      centralbank: '🏦',
      commodityhub: '📦',
    };

    this.resultsList.innerHTML = this.results.map((result, i) => `
      <div class="search-result-item ${i === this.selectedIndex ? 'selected' : ''}" data-index="${i}">
        <span class="search-result-icon">${icons[result.type]}</span>
        <div class="search-result-content">
          <div class="search-result-title">${this.highlightMatch(result.title)}</div>
          ${result.subtitle ? `<div class="search-result-subtitle">${escapeHtml(result.subtitle)}</div>` : ''}
        </div>
        <span class="search-result-type">${escapeHtml(t(`modals.search.types.${result.type}`) || result.type)}</span>
      </div>
    `).join('');

    this.resultsList.querySelectorAll('.search-result-item').forEach((el) => {
      el.addEventListener('click', () => {
        const index = parseInt((el as HTMLElement).dataset.index || '0', 10);
        this.selectResult(index);
      });
    });
    this.announceResultCount(this.totalResultCount);
  }

  /**
   * Announce the outcome of the last keystroke to assistive tech (#7023):
   * how many results the current query produced, or that there are none.
   * Polite (not assertive) so it follows, rather than interrupts, the
   * keystroke echo. Render paths that never reach the count (idle deck,
   * command list) leave the last announcement standing, which is correct —
   * those views are not search outcomes.
   */
  private announceResultCount(count: number): void {
    if (!this.resultsStatus) return;
    const query = this.lastSearchedQuery ?? '';
    this.resultsStatus.textContent = count === 0
      ? `${t('modals.search.noResults')}${query ? `: ${query}` : ''}`
      : t('modals.search.resultAnnouncement', { count, query });
  }

  private renderFlightSearchTrigger(callsign: string): void {
    if (!this.resultsList) return;
    setTrustedHtml(this.resultsList, trustedHtml(`
      <div class="search-result-item selected" data-flight-trigger="${escapeHtml(callsign)}">
        <span class="search-result-icon">\u2708\uFE0F</span>
        <div class="search-result-content">
          <div class="search-result-title">Search live flight <strong>${escapeHtml(callsign)}</strong></div>
          <div class="search-result-subtitle">${escapeHtml(t('modals.search.flightSearchHint'))}</div>
        </div>
        <span class="search-result-type">${escapeHtml(t('modals.search.types.flight'))}</span>
      </div>`, "legacy direct innerHTML migration"));
    this.resultsList.querySelector('[data-flight-trigger]')?.addEventListener('click', () => {
      this.triggerFlightSearch(callsign);
    });
  }

  private triggerFlightSearch(callsign: string): void {
    if (!this.onFlightSearch || !this.resultsList) return;
    this.flightSearchFired = true;
    setTrustedHtml(this.resultsList, trustedHtml(`
      <div class="search-result-item">
        <span class="search-result-icon">\u2708\uFE0F</span>
        <div class="search-result-content">
          <div class="search-result-title">Searching for <strong>${escapeHtml(callsign)}</strong>\u2026</div>
        </div>
      </div>`, "legacy direct innerHTML migration"));
    this.onFlightSearch(callsign);
  }

  private renderChips(query?: string): void {
    if (!this.chipsContainer) return;
    if (query && query.length >= 1) {
      setTrustedHtml(this.chipsContainer, trustedHtml('', "legacy direct innerHTML migration"));
      return;
    }

    const commands = getAllCommands();
    const byId = new Map(commands.map((cmd) => [cmd.id, cmd]));
    // All Intel restores the pre-deck country-first + view/actions mix; other
    // channels stay scoped via idleChipCommandIds.
    const chips = idleChipCommandIds(this.activeScope, commands).flatMap((id) => {
      const cmd = byId.get(id);
      if (!cmd) return [];
      const label = cmd.id.startsWith('country:') ? cmd.label : resolveCommandLabel(cmd);
      return [{ label, value: label.toLowerCase() }];
    });

    setTrustedHtml(this.chipsContainer, trustedHtml(chips.map(c =>
      `<button class="search-chip" data-value="${escapeHtml(c.value)}">${escapeHtml(c.label)}</button>`
    ).join(''), "legacy direct innerHTML migration"));

    this.chipsContainer.querySelectorAll('.search-chip').forEach(el => {
      el.addEventListener('click', () => {
        const val = (el as HTMLElement).dataset.value || '';
        this.applyProgrammaticQuery(val);
      });
    });
  }

  private highlightMatch(text: string): string {
    const query = this.input?.value.trim() || '';
    const escapedText = escapeHtml(text);
    if (!query) return escapedText;

    const escapedQuery = escapeHtml(query);
    const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
  }

  private handleKeydown(e: KeyboardEvent): void {
    this.onHumanInteraction?.();
    // The keystroke search is debounced (180ms). Flush it before Arrow/Enter so
    // selection runs against results for the CURRENT query, not stale ones from
    // before the debounce fired (#4537 follow-up — review #4556).
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      this.flushPendingSearch();
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.moveSelection(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.moveSelection(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.currentFlightCallsign && this.onFlightSearch && this.results.length === 0 && this.commandResults.length === 0) {
          // Only auto-trigger flight when the input still holds a flight prefix;
          // after clear, fall through to idle launch/recent selection instead.
          const stillFlightPrefix = (this.input?.value.toLowerCase() || '').trim().startsWith('flight ');
          if (stillFlightPrefix) {
            this.triggerFlightSearch(this.currentFlightCallsign);
            return;
          }
          this.currentFlightCallsign = null;
        }
        this.selectResult(this.selectedIndex);
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
    }
  }

  private moveSelection(delta: number): void {
    const idleItemCount = this.activeScope === 'all' && this.recentSearches.length > 0
      ? this.recentSearches.length
      : this.quickLaunchExamples.length;
    const max = this.totalResultCount || idleItemCount;
    if (max === 0) return;

    this.selectedIndex = (this.selectedIndex + delta + max) % max;
    this.updateSelection();
  }

  private updateSelection(): void {
    if (!this.resultsList) return;

    this.resultsList.querySelectorAll('.search-result-item').forEach((el, i) => {
      el.classList.toggle('selected', i === this.selectedIndex);
    });

    this.decorateResultOptions();
    const selected = this.resultsList.querySelector('.selected');
    selected?.scrollIntoView({ block: 'nearest' });
  }

  /**
   * Apply option semantics to whatever the last render left in the listbox:
   * each result becomes an id'd role="option" with aria-selected, section
   * headers become presentational, and the input's aria-activedescendant
   * tracks the visually selected row — without this, arrow keys move a CSS
   * class that screen readers never hear about.
   */
  private decorateResultOptions(): void {
    if (!this.resultsList || !this.input) return;
    decorateSearchResultOptions(this.resultsList, this.input, {
      skipOptions: this.showingAllCommands,
    });
  }

  private selectResult(index: number): void {
    if (this.totalResultCount === 0) {
      const inputEmpty = !(this.input?.value.trim());
      const term = resolveIdleSelectionTerm(
        this.activeScope,
        this.recentSearches,
        this.quickLaunchExamples,
        index,
        inputEmpty,
      );
      if (term) this.applyProgrammaticQuery(term);
      return;
    }

    if (index < this.commandResults.length) {
      const cmd = this.commandResults[index]?.command;
      if (cmd) {
        this.saveRecentSearch(this.input?.value.trim() || '');
        this.close();
        this.onCommand?.(cmd);
        return;
      }
    }

    const entityIndex = index - this.commandResults.length;
    const result = this.results[entityIndex];
    if (!result) return;

    this.saveRecentSearch(this.input?.value.trim() || '');
    this.close();
    this.onSelect?.(result);
  }

  private loadRecentSearches(): void {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      this.recentSearches = stored ? JSON.parse(stored) : [];
    } catch {
      this.recentSearches = [];
    }
  }

  private saveRecentSearch(term: string): void {
    if (!term || term.length < 2) return;

    this.recentSearches = [
      term,
      ...this.recentSearches.filter(t => t !== term)
    ].slice(0, MAX_RECENT);

    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(this.recentSearches));
    } catch {
      // Storage full, ignore
    }
  }
}
