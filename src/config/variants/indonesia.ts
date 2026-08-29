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
  map: { name: 'Nusantara Map', enabled: true, priority: 1 },
  'live-news': { name: 'Live News', enabled: true, priority: 1 },
  intel: { name: 'Regional Intel', enabled: true, priority: 1 },
  'gdelt-intel': { name: 'Live Intelligence', enabled: true, priority: 1 },
  cii: { name: 'Country Instability', enabled: true, priority: 1 },
  cascade: { name: 'Infrastructure Cascade', enabled: true, priority: 1 },
  'strategic-risk': { name: 'Strategic Risk Overview', enabled: true, priority: 1 },
  politics: { name: 'National News', enabled: true, priority: 1 },
  asia: { name: 'ASEAN & Asia-Pacific', enabled: true, priority: 1 },
  us: { name: 'United States', enabled: true, priority: 1 },
  europe: { name: 'Europe', enabled: true, priority: 1 },
  middleeast: { name: 'Middle East', enabled: true, priority: 1 },
  africa: { name: 'Africa', enabled: true, priority: 1 },
  latam: { name: 'Latin America', enabled: true, priority: 1 },
  energy: { name: 'Energy & Resources', enabled: true, priority: 1 },
  commodities: { name: 'Strategic Commodities', enabled: true, priority: 1 },
  markets: { name: 'Markets & IDX', enabled: true, priority: 1 },
  'macro-signals': { name: 'Market Radar', enabled: true, priority: 1 },
  'daily-market-brief': { name: 'Daily Market Brief', enabled: true, priority: 1 },
  economic: { name: 'Economic Indicators', enabled: true, priority: 1 },
  finance: { name: 'Financial Overview', enabled: true, priority: 1 },
  gov: { name: 'Government Updates', enabled: true, priority: 1 },
  thinktanks: { name: 'Strategic Think Tanks', enabled: true, priority: 1 },
  polymarket: { name: 'Predictions', enabled: true, priority: 1 },
  tech: { name: 'Technology & Startups', enabled: true, priority: 2 },
  crypto: { name: 'Crypto Assets', enabled: true, priority: 2 },
  ai: { name: 'AI/ML Developments', enabled: true, priority: 2 },
  monitors: { name: 'Custom Monitors', enabled: true, priority: 2 },
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
  cyberThreats: false,
  datacenters: true,
  protests: true,
  flights: false,
  military: false,
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
