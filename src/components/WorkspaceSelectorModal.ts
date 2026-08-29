import { trustedHtml, setTrustedHtml } from '@/utils/dom-utils';
import { startProductTour } from '@/components/ProductTour';

export interface WorkspaceOption {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  enabledPanels: string[];
}

export const WORKSPACE_OPTIONS: WorkspaceOption[] = [
  {
    id: 'defense',
    icon: '🛡️',
    title: 'National Security & Maritime Defense',
    subtitle: 'Pertahanan, Geopolitik & Keamanan Maritim',
    description: 'Nusantara Strategic Map, Selat Malaka & ALKI, Peringatan Dini, Postur Strategis & Siaran Langsung.',
    enabledPanels: [
      'map',
      'live-news',
      'intel',
      'gdelt-intel',
      'strategic-risk',
      'strategic-posture',
      'cii',
      'politics',
      'asia',
      'cascade',
      'supply-chain',
      'disaster-correlation',
      'energy',
      'commodities',
      'markets',
    ],
  },
  {
    id: 'macro-economy',
    icon: '📈',
    title: 'Macro Economy & Strategic Commodities',
    subtitle: 'Radar Ekonomi, IDX & Komoditas Strategis',
    description: 'Pasar Saham IHSG, Nilai Tukar Rupiah, Nikel, Batubara, CPO, Energi & Berita Pasar Terkini.',
    enabledPanels: [
      'map',
      'live-news',
      'markets',
      'commodities',
      'energy',
      'macro-signals',
      'daily-market-brief',
      'economic',
      'finance',
      'politics',
      'polymarket',
      'intel',
    ],
  },
  {
    id: 'disaster-resilience',
    icon: '🌋',
    title: 'Disaster Early Warning & Resilience',
    subtitle: 'Mitigasi Bencana & Ketahanan Infrastruktur',
    description: 'Pusat Gempa BMKG, Pantauan Gunung Api, Titik Panas Karhutla, Kabel Bawah Laut & Cuaca Ekstrem.',
    enabledPanels: [
      'map',
      'live-news',
      'disaster-correlation',
      'natural',
      'satellite-fires',
      'cascade',
      'politics',
      'intel',
      'weather',
      'outages',
    ],
  },
  {
    id: 'full-intel',
    icon: '🌐',
    title: 'Comprehensive Intelligence Center',
    subtitle: 'Pusat Komando Multidimensi Lengkap',
    description: 'Seluruh matriks intelijen terintegrasi: Pertahanan, Ekonomi, Bencana, Teknologi & Pemantauan Khusus.',
    enabledPanels: [
      'map',
      'live-news',
      'intel',
      'gdelt-intel',
      'strategic-risk',
      'strategic-posture',
      'cii',
      'politics',
      'asia',
      'cascade',
      'supply-chain',
      'disaster-correlation',
      'energy',
      'commodities',
      'markets',
      'tech',
      'crypto',
      'thinktanks',
      'gov',
      'monitors',
    ],
  },
];

const STORAGE_KEY_CHOSEN_WORKSPACE = 'wm-workspace-chosen';

export class WorkspaceSelectorModal {
  private modalEl: HTMLElement | null = null;
  private selectedId: string = 'defense';
  private onSelectCallback?: (option: WorkspaceOption) => void;

  public static hasChosenWorkspace(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY_CHOSEN_WORKSPACE) === 'true';
    } catch {
      return false;
    }
  }

  public static markChosen(): void {
    try {
      localStorage.setItem(STORAGE_KEY_CHOSEN_WORKSPACE, 'true');
    } catch {}
  }

  public show(onSelect?: (option: WorkspaceOption) => void): void {
    if (this.modalEl || WorkspaceSelectorModal.hasChosenWorkspace()) return;
    if (document.querySelector('.workspace-selector-overlay')) return;

    this.onSelectCallback = onSelect;

    this.modalEl = document.createElement('div');
    this.modalEl.className = 'workspace-selector-overlay';
    this.modalEl.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
      animation: wsFadeIn 0.3s ease;
    `;

    const container = document.createElement('div');
    container.className = 'workspace-selector-modal';
    container.style.cssText = `
      background: #0f1117;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      max-width: 820px;
      width: 100%;
      padding: 32px 28px 24px;
      color: #fff;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(59, 130, 246, 0.1);
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;

    const header = document.createElement('div');
    header.style.cssText = 'text-align: center; margin-bottom: 8px;';
    setTrustedHtml(
      header,
      trustedHtml(`
        <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 12px; background:rgba(59, 130, 246, 0.15); border:1px solid rgba(59, 130, 246, 0.3); border-radius:20px; font-size:12px; font-weight:600; color:#60a5fa; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px;">
          🇮🇩 INTELLIGENT COMMAND CENTER
        </div>
        <h2 style="font-size:24px; font-weight:700; margin:0 0 8px 0; color:#fff;">Pilih Workspace Intelligence Anda</h2>
        <p style="font-size:14px; color:#94a3b8; margin:0; line-height:1.5;">Sesuaikan tampilan pusat komando sesuai fokus operasi dan misi strategis Anda.</p>
      `, "legacy direct innerHTML migration")
    );
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 14px;
    `;

    WORKSPACE_OPTIONS.forEach((opt) => {
      const card = document.createElement('div');
      card.className = `workspace-option-card ${opt.id === this.selectedId ? 'selected' : ''}`;
      card.dataset.workspaceId = opt.id;
      card.style.cssText = `
        background: ${opt.id === this.selectedId ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)'};
        border: 2px solid ${opt.id === this.selectedId ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)'};
        border-radius: 10px;
        padding: 18px 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        gap: 6px;
      `;

      card.addEventListener('mouseenter', () => {
        if (opt.id !== this.selectedId) {
          card.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          card.style.background = 'rgba(255, 255, 255, 0.06)';
        }
      });
      card.addEventListener('mouseleave', () => {
        if (opt.id !== this.selectedId) {
          card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          card.style.background = 'rgba(255, 255, 255, 0.03)';
        }
      });
      card.addEventListener('click', () => {
        this.selectedId = opt.id;
        grid.querySelectorAll<HTMLElement>('.workspace-option-card').forEach((c) => {
          const isSel = c.dataset.workspaceId === opt.id;
          c.style.borderColor = isSel ? '#3b82f6' : 'rgba(255, 255, 255, 0.08)';
          c.style.background = isSel ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)';
        });
      });

      setTrustedHtml(
        card,
        trustedHtml(`
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:22px;">${opt.icon}</span>
            <div>
              <div style="font-size:15px; font-weight:700; color:#fff;">${opt.title}</div>
              <div style="font-size:12px; color:#60a5fa; font-weight:500;">${opt.subtitle}</div>
            </div>
          </div>
          <div style="font-size:12px; color:#94a3b8; line-height:1.4; margin-top:4px;">
            ${opt.description}
          </div>
        `, "legacy direct innerHTML migration")
      );
      grid.appendChild(card);
    });
    container.appendChild(grid);

    const footer = document.createElement('div');
    footer.style.cssText = 'display:flex; justify-content:flex-end; gap:12px; margin-top:8px;';

    const launchBtn = document.createElement('button');
    launchBtn.type = 'button';
    launchBtn.style.cssText = `
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      border: 0;
      border-radius: 8px;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
      transition: all 0.2s ease;
    `;
    launchBtn.textContent = 'Mulai Command Center →';
    launchBtn.addEventListener('mouseenter', () => {
      launchBtn.style.transform = 'translateY(-1px)';
      launchBtn.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.6)';
    });
    launchBtn.addEventListener('mouseleave', () => {
      launchBtn.style.transform = 'none';
      launchBtn.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.4)';
    });
    launchBtn.addEventListener('click', () => {
      this.confirmSelection();
    });

    footer.appendChild(launchBtn);
    container.appendChild(footer);
    this.modalEl.appendChild(container);
    document.body.appendChild(this.modalEl);
  }

  private confirmSelection(): void {
    const selectedOption = WORKSPACE_OPTIONS.find((o) => o.id === this.selectedId) || WORKSPACE_OPTIONS[0]!;
    
    // 1. Mark workspace chosen in persistent storage
    WorkspaceSelectorModal.markChosen();

    // 2. Hide and completely remove option modal DOM
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
    }
    document.querySelectorAll('.workspace-selector-overlay').forEach((el) => el.remove());

    if (this.onSelectCallback) {
      this.onSelectCallback(selectedOption);
    }

    // 3. Sequentially trigger product tour without any overlapping UI
    setTimeout(() => {
      startProductTour();
    }, 200);
  }
}

export function showWorkspaceSelectorIfFirstVisit(onSelect?: (option: WorkspaceOption) => void): void {
  if (WorkspaceSelectorModal.hasChosenWorkspace()) return;
  const modal = new WorkspaceSelectorModal();
  modal.show(onSelect);
}
