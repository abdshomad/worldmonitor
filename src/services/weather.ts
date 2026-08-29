import { createCircuitBreaker, getCSSColor } from '@/utils';

export interface WeatherAlert {
  id: string;
  event: string;
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
  headline: string;
  description: string;
  areaDesc: string;
  onset: Date;
  expires: Date;
  coordinates: [number, number][];
  centroid?: [number, number];
  countryCode?: string;
  source?: string;
  geometryPrecision?: 'polygon' | 'point' | 'country';
  productKind?: string;
  issuedBy?: string;
  wind?: string;
  visibility?: string;
  seaState?: string;
  sourceUrl?: string;
}

interface BootstrapAlert {
  id: string;
  event: string;
  severity: string;
  headline: string;
  description: string;
  areaDesc: string;
  onset: string;
  expires: string;
  coordinates: [number, number][];
  centroid?: [number, number];
  countryCode?: string;
  source?: string;
  geometryPrecision?: 'polygon' | 'point' | 'country';
}

const breaker = createCircuitBreaker<WeatherAlert[]>({ name: 'NWS + ECCC + WMO SWIC Weather', cacheTtlMs: 30 * 60 * 1000, persistCache: true });

const NWS_API = 'https://api.weather.gov/alerts/active';
const breaker = createCircuitBreaker<WeatherAlert[]>({ name: 'NWS Weather' });

export async function fetchWeatherAlerts(): Promise<WeatherAlert[]> {
  return breaker.execute(async () => {
    const response = await fetch(NWS_API, {
      headers: { 'User-Agent': 'WorldMonitor/1.0' }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: NWSResponse = await response.json();

    return data.features
      .filter(alert => alert.properties.severity !== 'Unknown')
      .slice(0, 50)
      .map(alert => {
        const coords = extractCoordinates(alert.geometry);
        return {
          id: alert.id,
          event: alert.properties.event,
          severity: alert.properties.severity as WeatherAlert['severity'],
          headline: alert.properties.headline,
          description: alert.properties.description?.slice(0, 500) || '',
          areaDesc: alert.properties.areaDesc,
          onset: new Date(alert.properties.onset),
          expires: new Date(alert.properties.expires),
          coordinates: coords,
          centroid: calculateCentroid(coords),
        };
      });
  }, []);
}

export function getWeatherStatus(): string {
  return breaker.getStatus();
}

export function getWeatherStatus(): string {
  return breaker.getStatus();
}

export function getSeverityColor(severity: WeatherAlert['severity']): string {
  switch (severity) {
    case 'Extreme': return getCSSColor('--semantic-critical');
    case 'Severe': return getCSSColor('--semantic-high');
    case 'Moderate': return getCSSColor('--semantic-elevated');
    case 'Minor': return getCSSColor('--semantic-elevated');
    default: return getCSSColor('--text-dim');
  }
}
