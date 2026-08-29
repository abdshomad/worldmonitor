import { setTrustedHtml, trustedHtml } from '@/utils/dom-utils';

const TOUR_STORAGE_KEY = 'icc-tour-completed';

interface TourStep {
  target: string;
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: '.variant-switcher',
    title: 'National & Global Views',
    description: 'Seamlessly toggle between the Indonesia Command Center, Global World Intelligence, Technology, Markets, and Commodities.',
  },
  {
    target: '#mapSection',
    title: 'Interactive Strategic Map',
    description: 'Explore live 2D and 3D globe visualizations tracking maritime chokepoints (Malacca, Sunda, ALKI), BMKG earthquake alerts, flight paths, and AIS vessel tracks.',
  },
  {
    target: '#panelsGrid',
    title: 'Real-Time Intelligence Panels',
    description: 'Monitor high-frequency breaking news, IDX tickers (IHSG, BBCA, BBRI), currency rates, natural disaster feeds, and strategic defense posture.',
  },
  {
    target: '#searchBtn',
    title: 'Command Search & Quick Actions',
    description: 'Press ⌘K anytime to search across geopolitical events, global airports, naval vessels, and localized news topics.',
  },
];

export class ProductTour {
  private currentStep = 0;
  private overlayEl: HTMLElement | null = null;
  private cardEl: HTMLElement | null = null;
  private boundKeyHandler: ((e: KeyboardEvent) => void) | null = null;

  static isFirstVisit(): boolean {
    try {
      return !localStorage.getItem(TOUR_STORAGE_KEY);
    } catch {
      return false;
    }
  }

  static markCompleted(): void {
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  }

  start(stepIndex = 0): void {
    this.destroy();
    this.currentStep = Math.max(0, Math.min(stepIndex, TOUR_STEPS.length - 1));
    this.render();
  }

  private render(): void {
    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'icc-tour-overlay';

    this.cardEl = document.createElement('div');
    this.cardEl.className = 'icc-tour-card';
    this.cardEl.setAttribute('role', 'dialog');
    this.cardEl.setAttribute('aria-modal', 'true');

    document.body.appendChild(this.overlayEl);
    document.body.appendChild(this.cardEl);

    this.boundKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.destroy(true);
      else if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'ArrowLeft') this.prev();
    };
    window.addEventListener('keydown', this.boundKeyHandler);

    this.showStep(this.currentStep);
  }

  private showStep(index: number): void {
    const step = TOUR_STEPS[index];
    if (!step || !this.cardEl || !this.overlayEl) return;

    this.currentStep = index;
    const targetEl = document.querySelector(step.target) as HTMLElement | null;
    this.updateSpotlight(targetEl);

    const isLast = index === TOUR_STEPS.length - 1;
    const isFirst = index === 0;

    setTrustedHtml(this.cardEl, trustedHtml(`
      <div class="icc-tour-header">
        <span class="icc-tour-step-badge">STEP ${index + 1} OF ${TOUR_STEPS.length}</span>
        <button class="icc-tour-close" aria-label="Close Tour">&times;</button>
      </div>
      <h3 class="icc-tour-title">${step.title}</h3>
      <p class="icc-tour-desc">${step.description}</p>
      <div class="icc-tour-footer">
        <div class="icc-tour-dots">
          ${TOUR_STEPS.map((_, i) => `<span class="icc-tour-dot ${i === index ? 'active' : ''}"></span>`).join('')}
        </div>
        <div class="icc-tour-actions">
          ${isFirst ? '' : '<button type="button" class="icc-tour-btn icc-tour-btn-secondary" id="iccTourPrev">Back</button>'}
          <button type="button" class="icc-tour-btn icc-tour-btn-primary" id="iccTourNext">${isLast ? 'Get Started' : 'Next'}</button>
        </div>
      </div>
    `, "legacy direct innerHTML migration"));

    this.cardEl.querySelector('.icc-tour-close')?.addEventListener('click', () => this.destroy(true));
    this.cardEl.querySelector('#iccTourPrev')?.addEventListener('click', () => this.prev());
    this.cardEl.querySelector('#iccTourNext')?.addEventListener('click', () => isLast ? this.destroy(true) : this.next());

    this.positionCard(targetEl);
  }

  private updateSpotlight(target: HTMLElement | null): void {
    if (!this.overlayEl) return;
    if (!target) {
      this.overlayEl.style.clipPath = 'none';
      return;
    }
    const rect = target.getBoundingClientRect();
    const pad = 6;
    const top = Math.max(0, rect.top - pad);
    const left = Math.max(0, rect.left - pad);
    const right = Math.min(window.innerWidth, rect.right + pad);
    const bottom = Math.min(window.innerHeight, rect.bottom + pad);

    this.overlayEl.style.clipPath = `polygon(
      0% 0%, 0% 100%, ${left}px 100%, ${left}px ${top}px,
      ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px,
      ${left}px 100%, 100% 100%, 100% 0%
    )`;
  }

  private positionCard(target: HTMLElement | null): void {
    if (!this.cardEl) return;
    const cardRect = this.cardEl.getBoundingClientRect();
    const pad = 14;

    if (!target) {
      this.cardEl.style.top = `${Math.max(pad, (window.innerHeight - cardRect.height) / 2)}px`;
      this.cardEl.style.left = `${Math.max(pad, (window.innerWidth - cardRect.width) / 2)}px`;
      return;
    }

    const targetRect = target.getBoundingClientRect();
    let top = targetRect.bottom + pad;
    let left = targetRect.left;

    if (top + (cardRect.height || 220) > window.innerHeight - pad) {
      top = Math.max(pad, targetRect.top - (cardRect.height || 220) - pad);
    }
    if (left + (cardRect.width || 340) > window.innerWidth - pad) {
      left = Math.max(pad, window.innerWidth - (cardRect.width || 340) - pad);
    }

    this.cardEl.style.top = `${top}px`;
    this.cardEl.style.left = `${Math.max(pad, left)}px`;
  }

  next(): void {
    if (this.currentStep < TOUR_STEPS.length - 1) {
      this.showStep(this.currentStep + 1);
    } else {
      this.destroy(true);
    }
  }

  prev(): void {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  destroy(completed = false): void {
    if (completed) ProductTour.markCompleted();
    if (this.boundKeyHandler) {
      window.removeEventListener('keydown', this.boundKeyHandler);
      this.boundKeyHandler = null;
    }
    this.overlayEl?.remove();
    this.cardEl?.remove();
    this.overlayEl = null;
    this.cardEl = null;
  }
}

export function startProductTour(): void {
  const tour = new ProductTour();
  tour.start();
}

export function startProductTourIfFirstVisit(delayMs = 1200): void {
  if (!ProductTour.isFirstVisit()) return;
  setTimeout(() => {
    if (ProductTour.isFirstVisit()) {
      startProductTour();
    }
  }, delayMs);
}
