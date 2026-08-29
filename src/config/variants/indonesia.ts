// Indonesia command center variant - indonesia.worldmonitor.app
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

export * from './base';
export * from '../feeds';
export * from '../geo';
export * from '../irradiators';
export * from '../pipelines';
export * from '../ports';
export * from '../military';
export * from '../entities';

export const INDONESIA_MAP_CENTER = {
  lat: -2.5,
  lng: 118.0,
};

export const INDONESIA_DEFAULT_ZOOM = 4.8;

export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: 'Nusantara Strategic Map', enabled: true, priority: 1 },
  'live-news': { name: 'Live Broadcasting', enabled: true, priority: 1 },
  intel: { name: 'National Intel Findings', enabled: true, priority: 1 },
  'gdelt-intel': { name: 'Live Geopolitical Wire', enabled: true, priority: 1 },
  'strategic-risk': { name: 'Strategic Risk Overview', enabled: true, priority: 1 },
  'strategic-posture': { name: 'Strategic Posture & Early Warning', enabled: true, priority: 1 },
  cii: { name: 'Country Instability Index', enabled: true, priority: 1 },
  politics: { name: 'National News & Reports', enabled: true, priority: 1 },
  asia: { name: 'ASEAN & Indo-Pacific Security', enabled: true, priority: 1 },
  cascade: { name: 'Undersea Cable & Infra Cascade', enabled: true, priority: 1 },
  'supply-chain': { name: 'Maritime Choke Points & Straits', enabled: true, priority: 1 },
  'disaster-correlation': { name: 'Disaster & Seismic Early Warning', enabled: true, priority: 1 },
  energy: { name: 'Energy & Strategic Resources', enabled: true, priority: 1 },
  commodities: { name: 'Strategic Minerals & Commodities', enabled: true, priority: 1 },
  markets: { name: 'IDX & Macro Market Radar', enabled: true, priority: 1 },
  thinktanks: { name: 'Strategic Think Tanks', enabled: true, priority: 2 },
  gov: { name: 'Government & Defense Updates', enabled: true, priority: 2 },
  polymarket: { name: 'Geopolitical Predictions', enabled: true, priority: 2 },
  tech: { name: 'Technology & Cyber', enabled: true, priority: 2 },
  monitors: { name: 'Custom Intel Monitors', enabled: true, priority: 2 },
};

export const DEFAULT_MAP_LAYERS: MapLayers = {
  gpsJamming: false,
  satellites: false,
  conflicts: true,
  bases: true,
  cables: true,
  pipelines: true,
  hotspots: true,
  ais: true,
  nuclear: true,
  irradiators: false,
  sanctions: true,
  weather: true,
  canadaRoads: false,
  canadaAlerts: false,
  economic: true,
  waterways: true,
  outages: true,
  cyberThreats: true,
  datacenters: true,
  protests: true,
  flights: true,
  military: true,
  natural: true,
  spaceports: false,
  minerals: true,
  fires: true,
  ucdpEvents: true,
  displacement: false,
  climate: false,
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  stockExchanges: true,
  financialCenters: true,
  centralBanks: true,
  commodityHubs: true,
  gulfInvestments: false,
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  tradeRoutes: true,
  iranAttacks: false,
  ciiChoropleth: false,
  resilienceScore: false,
  dayNight: false,
  miningSites: true,
  processingPlants: true,
  commodityPorts: true,
  webcams: false,
  diseaseOutbreaks: false,
};

export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  ...DEFAULT_MAP_LAYERS,
  cables: false,
  pipelines: false,
  datacenters: false,
  minerals: false,
  miningSites: false,
  processingPlants: false,
};

export const VARIANT_CONFIG: VariantConfig = {
  name: 'indonesia',
  description: 'National situation awareness command center for Indonesia and Southeast Asia',
  panels: DEFAULT_PANELS,
  mapLayers: DEFAULT_MAP_LAYERS,
  mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,
};

export default VARIANT_CONFIG;
