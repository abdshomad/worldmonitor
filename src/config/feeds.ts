import type { Feed } from '@/types';
import { SITE_VARIANT } from './variant';

// Helper to create RSS proxy URL (Vercel)
const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

// Railway proxy for feeds blocked by Vercel IPs (UN News, CISA, etc.)
// Reuses VITE_WS_RELAY_URL which is already configured for AIS/OpenSky
const wsRelayUrl = import.meta.env.VITE_WS_RELAY_URL || '';
const railwayBaseUrl = wsRelayUrl
  ? wsRelayUrl.replace('wss://', 'https://').replace('ws://', 'http://').replace(/\/$/, '')
  : '';
const railwayRss = (url: string) =>
  railwayBaseUrl ? `${railwayBaseUrl}/rss?url=${encodeURIComponent(url)}` : rss(url);

const rss = rssProxyUrl;
const railwayRss = rssProxyUrl;

  // Tier 2 - Major Outlets
  'BBC World': 2,
  'BBC Middle East': 2,
  'Guardian World': 2,
  'Guardian ME': 2,
  'NPR News': 2,
  'CNN World': 2,
  'CNBC': 2,
  'MarketWatch': 2,
  'Al Jazeera': 2,
  'Financial Times': 2,
  'Politico': 2,
  'EuroNews': 2,
  'France 24': 2,
  'Le Monde': 2,
  // Spanish
  'El País': 2,
  'El Mundo': 2,
  'BBC Mundo': 2,
  // German
  'Tagesschau': 1,
  'Der Spiegel': 2,
  'Die Zeit': 2,
  'DW News': 2,
  // Italian
  'ANSA': 1,
  'Corriere della Sera': 2,
  'Repubblica': 2,
  // Dutch
  'NOS Nieuws': 1,
  'NRC': 2,
  'De Telegraaf': 2,
  // Swedish
  'SVT Nyheter': 1,
  'Dagens Nyheter': 2,
  'Svenska Dagbladet': 2,
  'Reuters World': 1,
  'Reuters Business': 1,
  'OpenAI News': 3,

  // Tier 1 - Official Government & International Orgs
  'White House': 1,
  'State Dept': 1,
  'Pentagon': 1,
  'UN News': 1,
  'CISA': 1,
  'Treasury': 2,
  'DOJ': 2,
  'DHS': 2,
  'CDC': 2,
  'FEMA': 2,

  // Tier 3 - Specialty
  'Defense One': 3,
  'Breaking Defense': 3,
  'The War Zone': 3,
  'Defense News': 3,
  'Janes': 3,
  'Military Times': 2,
  'Task & Purpose': 3,
  'USNI News': 2,
  'Oryx OSINT': 2,
  'UK MOD': 1,
  'Foreign Policy': 3,
  'The Diplomat': 3,
  'Bellingcat': 3,
  'Krebs Security': 3,
  'Federal Reserve': 3,
  'SEC': 3,
  'MIT Tech Review': 3,
  'Ars Technica': 3,
  'Atlantic Council': 3,
  'Foreign Affairs': 3,
  'CrisisWatch': 3,
  'CSIS': 3,
  'RAND': 3,
  'Brookings': 3,
  'Carnegie': 3,
  'IAEA': 1,
  'WHO': 1,
  'UNHCR': 1,
  'Xinhua': 3,
  'TASS': 3,
  'Layoffs.fyi': 3,
  'BBC Persian': 2,
  'Iran International': 3,
  'Fars News': 3,
  'MIIT (China)': 1,
  'MOFCOM (China)': 1,

  // Tier 2 - Premium Startup/VC Sources
  'Y Combinator Blog': 2,
  'a16z Blog': 2,
  'Sequoia Blog': 2,
  'Crunchbase News': 2,
  'CB Insights': 2,
  'PitchBook News': 2,
  'The Information': 2,

  // Tier 3 - Regional/Specialty Startup Sources
  'EU Startups': 3,
  'Tech.eu': 3,
  'Sifted (Europe)': 3,
  'The Next Web': 3,
  'Tech in Asia': 3,
  'TechCabal (Africa)': 3,
  'Inc42 (India)': 3,
  'YourStory': 3,
  'Paul Graham Essays': 2,
  'Stratechery': 2,
  // Asia - Regional
  'e27 (SEA)': 3,
  'DealStreetAsia': 3,
  'Pandaily (China)': 3,
  '36Kr English': 3,
  'TechNode (China)': 3,
  'China Tech News': 3,
  'The Bridge (Japan)': 3,
  'Japan Tech News': 3,
  'Nikkei Tech': 2,
  'NHK World': 2,
  'Nikkei Asia': 2,
  'Korea Tech News': 3,
  'KED Global': 3,
  'Entrackr (India)': 3,
  'India Tech News': 3,
  'Taiwan Tech News': 3,
  'GloNewswire (Taiwan)': 4,
  // LATAM
  'La Silla Vacía': 3,
  'LATAM Tech News': 3,
  'Startups.co (LATAM)': 3,
  'Contxto (LATAM)': 3,
  'Brazil Tech News': 3,
  'Mexico Tech News': 3,
  'LATAM Fintech': 3,
  // Africa & MENA
  'Disrupt Africa': 3,
  'Wamda (MENA)': 3,
  'Magnitt': 3,

  // Tier 3 - Think Tanks
  'Brookings Tech': 3,
  'CSIS Tech': 3,
  'MIT Tech Policy': 3,
  'Stanford HAI': 2,
  'AI Now Institute': 3,
  'OECD Digital': 2,
  'Bruegel (EU)': 3,
  'Chatham House Tech': 3,
  'ISEAS (Singapore)': 3,
  'ORF Tech (India)': 3,
  'RIETI (Japan)': 3,
  'Lowy Institute': 3,
  'China Tech Analysis': 3,
  'DigiChina': 2,
  // Security/Defense Think Tanks
  'RUSI': 2,
  'Wilson Center': 3,
  'GMF': 3,
  'Stimson Center': 3,
  'CNAS': 2,
  // Nuclear & Arms Control
  'Arms Control Assn': 2,
  'Bulletin of Atomic Scientists': 2,
  // Food Security
  'FAO GIEWS': 2,
  'EU ISS': 3,
  // New verified think tanks
  'War on the Rocks': 2,
  'AEI': 3,
  'Responsible Statecraft': 3,
  'FPRI': 3,
  'Jamestown': 3,

  // Tier 3 - Policy Sources
  'Politico Tech': 2,
  'AI Regulation': 3,
  'Tech Antitrust': 3,
  'EFF News': 3,
  'EU Digital Policy': 3,
  'Euractiv Digital': 3,
  'EU Commission Digital': 2,
  'China Tech Policy': 3,
  'UK Tech Policy': 3,
  'India Tech Policy': 3,

  // Tier 2-3 - Podcasts & Newsletters
  'Acquired Podcast': 2,
  'All-In Podcast': 2,
  'a16z Podcast': 2,
  'This Week in Startups': 3,
  'The Twenty Minute VC': 2,
  'Lex Fridman Tech': 3,
  'The Vergecast': 3,
  'Decoder (Verge)': 3,
  'Hard Fork (NYT)': 2,
  'Pivot (Vox)': 2,
  'Benedict Evans': 2,
  'The Pragmatic Engineer': 2,
  'Lenny Newsletter': 2,
  'AI Podcast (NVIDIA)': 3,
  'Gradient Dissent': 3,
  'Eye on AI': 3,
  'How I Built This': 2,
  'Masters of Scale': 2,
  'The Pitch': 3,

  // Tier 4 - Aggregators
  'Hacker News': 4,
  'The Verge': 4,
  'The Verge AI': 4,
  'VentureBeat AI': 4,
  'Yahoo Finance': 4,
  'TechCrunch Layoffs': 4,
  'ArXiv AI': 4,
  'AI News': 4,
  'Layoffs News': 4,
};

export function getSourceTier(sourceName: string): number {
  return SOURCE_TIERS[sourceName] ?? 4; // Default to tier 4 if unknown
}

export type SourceType = 'wire' | 'gov' | 'intel' | 'mainstream' | 'market' | 'tech' | 'other';

export const SOURCE_TYPES: Record<string, SourceType> = {
  // Wire services - fastest, most authoritative
  'Reuters': 'wire', 'Reuters World': 'wire', 'Reuters Business': 'wire',
  'AP News': 'wire', 'AFP': 'wire', 'Bloomberg': 'wire',

  // Government & International Org sources
  'White House': 'gov', 'State Dept': 'gov', 'Pentagon': 'gov',
  'Treasury': 'gov', 'DOJ': 'gov', 'DHS': 'gov', 'CDC': 'gov',
  'FEMA': 'gov', 'Federal Reserve': 'gov', 'SEC': 'gov',
  'UN News': 'gov', 'CISA': 'gov',

  // Intel/Defense specialty
  'Defense One': 'intel', 'Breaking Defense': 'intel', 'The War Zone': 'intel',
  'Defense News': 'intel', 'Janes': 'intel', 'Military Times': 'intel', 'Task & Purpose': 'intel',
  'USNI News': 'intel', 'Oryx OSINT': 'intel', 'UK MOD': 'gov',
  'Bellingcat': 'intel', 'Krebs Security': 'intel',
  'Foreign Policy': 'intel', 'The Diplomat': 'intel',
  'Atlantic Council': 'intel', 'Foreign Affairs': 'intel',
  'CrisisWatch': 'intel',
  'CSIS': 'intel', 'RAND': 'intel', 'Brookings': 'intel', 'Carnegie': 'intel',
  'IAEA': 'gov', 'WHO': 'gov', 'UNHCR': 'gov',
  'Xinhua': 'wire', 'TASS': 'wire',
  'NHK World': 'mainstream', 'Nikkei Asia': 'market',

  // Mainstream outlets
  'BBC World': 'mainstream', 'BBC Middle East': 'mainstream',
  'Guardian World': 'mainstream', 'Guardian ME': 'mainstream',
  'NPR News': 'mainstream', 'Al Jazeera': 'mainstream',
  'CNN World': 'mainstream', 'Politico': 'mainstream',
  'EuroNews': 'mainstream', 'France 24': 'mainstream', 'Le Monde': 'mainstream',
  // European Addition
  'El País': 'mainstream', 'El Mundo': 'mainstream', 'BBC Mundo': 'mainstream',
  'Tagesschau': 'mainstream', 'Der Spiegel': 'mainstream', 'Die Zeit': 'mainstream', 'DW News': 'mainstream',
  'ANSA': 'wire', 'Corriere della Sera': 'mainstream', 'Repubblica': 'mainstream',
  'NOS Nieuws': 'mainstream', 'NRC': 'mainstream', 'De Telegraaf': 'mainstream',
  'SVT Nyheter': 'mainstream', 'Dagens Nyheter': 'mainstream', 'Svenska Dagbladet': 'mainstream',

  // Market/Finance
  'CNBC': 'market', 'MarketWatch': 'market', 'Yahoo Finance': 'market',
  'Financial Times': 'market',

  // Tech
  'Hacker News': 'tech', 'Ars Technica': 'tech', 'The Verge': 'tech',
  'The Verge AI': 'tech', 'MIT Tech Review': 'tech', 'TechCrunch Layoffs': 'tech',
  'AI News': 'tech', 'ArXiv AI': 'tech', 'VentureBeat AI': 'tech',
  'Layoffs.fyi': 'tech', 'Layoffs News': 'tech',

  // Regional Tech Startups
  'EU Startups': 'tech', 'Tech.eu': 'tech', 'Sifted (Europe)': 'tech',
  'The Next Web': 'tech', 'Tech in Asia': 'tech', 'e27 (SEA)': 'tech',
  'DealStreetAsia': 'tech', 'Pandaily (China)': 'tech', '36Kr English': 'tech',
  'TechNode (China)': 'tech', 'The Bridge (Japan)': 'tech', 'Nikkei Tech': 'tech',
  'Inc42 (India)': 'tech', 'YourStory': 'tech', 'TechCabal (Africa)': 'tech',
  'Disrupt Africa': 'tech', 'Wamda (MENA)': 'tech', 'Magnitt': 'tech',

  // Think Tanks & Policy
  'Brookings Tech': 'intel', 'CSIS Tech': 'intel', 'Stanford HAI': 'intel',
  'AI Now Institute': 'intel', 'OECD Digital': 'intel', 'Bruegel (EU)': 'intel',
  'Chatham House Tech': 'intel', 'DigiChina': 'intel', 'Lowy Institute': 'intel',
  'EFF News': 'intel', 'Politico Tech': 'intel',
  // Security/Defense Think Tanks
  'RUSI': 'intel', 'Wilson Center': 'intel', 'GMF': 'intel',
  'Stimson Center': 'intel', 'CNAS': 'intel',
  // Nuclear & Arms Control
  'Arms Control Assn': 'intel', 'Bulletin of Atomic Scientists': 'intel',
  // Food Security & Regional
  'FAO GIEWS': 'gov', 'EU ISS': 'intel',
  // New verified think tanks
  'War on the Rocks': 'intel', 'AEI': 'intel', 'Responsible Statecraft': 'intel',
  'FPRI': 'intel', 'Jamestown': 'intel',

  // Podcasts & Newsletters
  'Acquired Podcast': 'tech', 'All-In Podcast': 'tech', 'a16z Podcast': 'tech',
  'This Week in Startups': 'tech', 'The Twenty Minute VC': 'tech',
  'Hard Fork (NYT)': 'tech', 'Pivot (Vox)': 'tech', 'Stratechery': 'tech',
  'Benedict Evans': 'tech', 'How I Built This': 'tech', 'Masters of Scale': 'tech',
};

export function getSourceType(sourceName: string): SourceType {
  return SOURCE_TYPES[sourceName] ?? 'other';
}

// Propaganda risk assessment for sources (Quick Win #5)
// 'high' = State-controlled media, known to push government narratives
// 'medium' = State-affiliated or known editorial bias toward specific governments
// 'low' = Independent journalism with editorial standards
export type PropagandaRisk = 'low' | 'medium' | 'high';

export interface SourceRiskProfile {
  risk: PropagandaRisk;
  stateAffiliated?: string;
  knownBiases?: string[];
  note?: string;
}

export const SOURCE_PROPAGANDA_RISK: Record<string, SourceRiskProfile> = {
  // High risk - State-controlled media
  'Xinhua': { risk: 'high', stateAffiliated: 'China', note: 'Official CCP news agency' },
  'TASS': { risk: 'high', stateAffiliated: 'Russia', note: 'Russian state news agency' },
  'RT': { risk: 'high', stateAffiliated: 'Russia', note: 'Russian state media, banned in EU' },
  'Sputnik': { risk: 'high', stateAffiliated: 'Russia', note: 'Russian state media' },
  'CGTN': { risk: 'high', stateAffiliated: 'China', note: 'Chinese state broadcaster' },
  'Press TV': { risk: 'high', stateAffiliated: 'Iran', note: 'Iranian state media' },
  'KCNA': { risk: 'high', stateAffiliated: 'North Korea', note: 'North Korean state media' },

  // Medium risk - State-affiliated or known bias
  'Al Jazeera': { risk: 'medium', stateAffiliated: 'Qatar', note: 'Qatari state-funded, independent editorial' },
  'Al Arabiya': { risk: 'medium', stateAffiliated: 'Saudi Arabia', note: 'Saudi-owned, reflects Gulf perspective' },
  'TRT World': { risk: 'medium', stateAffiliated: 'Turkey', note: 'Turkish state broadcaster' },
  'France 24': { risk: 'medium', stateAffiliated: 'France', note: 'French state-funded, editorially independent' },
  'EuroNews': { risk: 'low', note: 'European public broadcaster consortium', knownBiases: ['Pro-EU'] },
  'Le Monde': { risk: 'low', note: 'French newspaper of record' },
  'DW News': { risk: 'medium', stateAffiliated: 'Germany', note: 'German state-funded, editorially independent' },
  'Voice of America': { risk: 'medium', stateAffiliated: 'USA', note: 'US government-funded' },
  'Kyiv Independent': { risk: 'medium', knownBiases: ['Pro-Ukraine'], note: 'Ukrainian perspective on Russia-Ukraine war' },
  'Moscow Times': { risk: 'medium', knownBiases: ['Anti-Kremlin'], note: 'Independent, critical of Russian government' },

  // Low risk - Independent with editorial standards (explicit)
  'Reuters': { risk: 'low', note: 'Wire service, strict editorial standards' },
  'AP News': { risk: 'low', note: 'Wire service, nonprofit cooperative' },
  'AFP': { risk: 'low', note: 'Wire service, editorially independent' },
  'BBC World': { risk: 'low', note: 'Public broadcaster, editorial independence charter' },
  'BBC Middle East': { risk: 'low', note: 'Public broadcaster, editorial independence charter' },
  'Guardian World': { risk: 'low', knownBiases: ['Center-left'], note: 'Scott Trust ownership, no shareholders' },
  'Financial Times': { risk: 'low', note: 'Business focus, Nikkei-owned' },
  'Bellingcat': { risk: 'low', note: 'Open-source investigations, methodology transparent' },
};

export function getSourcePropagandaRisk(sourceName: string): SourceRiskProfile {
  return SOURCE_PROPAGANDA_RISK[sourceName] ?? { risk: 'low' };
}

export function isStateAffiliatedSource(sourceName: string): boolean {
  const profile = SOURCE_PROPAGANDA_RISK[sourceName];
  return !!profile?.stateAffiliated;
}

const FULL_FEEDS: Record<string, Feed[]> = {
  politics: [
    { name: 'BBC World', url: rss('https://feeds.bbci.co.uk/news/world/rss.xml') },
    { name: 'NPR News', url: rss('https://feeds.npr.org/1001/rss.xml') },
    { name: 'Guardian World', url: rss('https://www.theguardian.com/world/rss') },
    { name: 'AP News', url: rss('https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en') },
    {
      name: 'France 24',
      url: {
        en: rss('https://www.france24.com/en/rss'),
        fr: rss('https://www.france24.com/fr/rss'),
        es: rss('https://www.france24.com/es/rss'),
        ar: rss('https://www.france24.com/ar/rss')
      }
    },
    {
      name: 'EuroNews',
      url: {
        en: rss('https://www.euronews.com/rss?format=xml'),
        fr: rss('https://fr.euronews.com/rss?format=xml'),
        de: rss('https://de.euronews.com/rss?format=xml'),
        it: rss('https://it.euronews.com/rss?format=xml'),
        es: rss('https://es.euronews.com/rss?format=xml'),
        pt: rss('https://pt.euronews.com/rss?format=xml'),
        ru: rss('https://ru.euronews.com/rss?format=xml'),
      }
    },
    {
      name: 'Le Monde',
      url: {
        en: rss('https://www.lemonde.fr/en/rss/une.xml'),
        fr: rss('https://www.lemonde.fr/rss/une.xml')
      }
    },
    { name: 'Reuters World', url: rss('https://news.google.com/rss/search?q=site:reuters.com+world&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Politico', url: rss('https://news.google.com/rss/search?q=site:politico.com+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'The Diplomat', url: rss('https://thediplomat.com/feed/') },
    // Spanish (ES)
    { name: 'El País', url: rss('https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada'), lang: 'es' },
    { name: 'El Mundo', url: rss('https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml'), lang: 'es' },
    { name: 'BBC Mundo', url: rss('https://www.bbc.com/mundo/index.xml'), lang: 'es' },
    // German (DE)
    { name: 'Tagesschau', url: rss('https://www.tagesschau.de/xml/rss2/'), lang: 'de' },
    { name: 'Der Spiegel', url: rss('https://www.spiegel.de/schlagzeilen/tops/index.rss'), lang: 'de' },
    { name: 'Die Zeit', url: rss('https://newsfeed.zeit.de/index'), lang: 'de' },
    { name: 'DW News', url: { en: rss('https://rss.dw.com/xml/rss-en-all'), de: rss('https://rss.dw.com/xml/rss-de-all'), es: rss('https://rss.dw.com/xml/rss-es-all') } },
    // Italian (IT)
    { name: 'ANSA', url: rss('https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml'), lang: 'it' },
    { name: 'Corriere della Sera', url: rss('https://xml2.corriereobjects.it/rss/incipit.xml'), lang: 'it' },
    { name: 'Repubblica', url: rss('https://www.repubblica.it/rss/homepage/rss2.0.xml'), lang: 'it' },
    // Dutch (NL)
    { name: 'NOS Nieuws', url: rss('https://feeds.nos.nl/nosnieuwsalgemeen'), lang: 'nl' },
    { name: 'NRC', url: rss('https://www.nrc.nl/rss/'), lang: 'nl' },
    { name: 'De Telegraaf', url: rss('https://www.telegraaf.nl/rss'), lang: 'nl' },
    // Swedish (SV)
    { name: 'SVT Nyheter', url: rss('https://www.svt.se/nyheter/rss.xml'), lang: 'sv' },
    { name: 'Dagens Nyheter', url: rss('https://www.dn.se/rss/senaste-nytt/'), lang: 'sv' },
    { name: 'Svenska Dagbladet', url: rss('https://www.svd.se/feed/articles.rss'), lang: 'sv' },
  ],
  middleeast: [
    { name: 'BBC Middle East', url: rss('https://feeds.bbci.co.uk/news/world/middle_east/rss.xml') },
    { name: 'Al Jazeera', url: { en: rss('https://www.aljazeera.com/xml/rss/all.xml'), ar: rss('https://www.aljazeera.net/aljazeerarss/a7c186be-1adb-4b11-a982-4783e765316e/4e17ecdc-8fb9-40de-a5d6-d00f72384a51') } },
    // AlArabiya blocks cloud IPs (Cloudflare), use Google News fallback
    { name: 'Al Arabiya', url: rss('https://news.google.com/rss/search?q=site:english.alarabiya.net+when:2d&hl=en-US&gl=US&ceid=US:en') },
    // Arab News and Times of Israel removed — 403 from cloud IPs
    { name: 'Guardian ME', url: rss('https://www.theguardian.com/world/middleeast/rss') },
    { name: 'CNN World', url: rss('http://rss.cnn.com/rss/cnn_world.rss') },
    { name: 'BBC Persian', url: rss('http://feeds.bbci.co.uk/persian/tv-and-radio-37434376/rss.xml') },
    { name: 'Iran International', url: rss('https://news.google.com/rss/search?q=site:iranintl.com+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Fars News', url: rss('https://news.google.com/rss/search?q=site:farsnews.ir+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'L\'Orient-Le Jour', url: rss('https://www.lorientlejour.com/rss'), lang: 'fr' },
    { name: 'Haaretz', url: rss('https://www.haaretz.com/cmlink/1.4608793') },
    { name: 'Arab News', url: rss('https://www.arabnews.com/cat/1/rss.xml') },
  ],
  tech: [
    { name: 'Hacker News', url: rss('https://hnrss.org/frontpage') },
    { name: 'Ars Technica', url: rss('https://feeds.arstechnica.com/arstechnica/technology-lab') },
    { name: 'The Verge', url: rss('https://www.theverge.com/rss/index.xml') },
    { name: 'MIT Tech Review', url: rss('https://www.technologyreview.com/feed/') },
  ],
  ai: [
    { name: 'AI News', url: rss('https://news.google.com/rss/search?q=(OpenAI+OR+Anthropic+OR+Google+AI+OR+"large+language+model"+OR+ChatGPT)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VentureBeat AI', url: rss('https://venturebeat.com/category/ai/feed/') },
    { name: 'The Verge AI', url: rss('https://www.theverge.com/rss/ai-artificial-intelligence/index.xml') },
    { name: 'MIT Tech Review', url: rss('https://www.technologyreview.com/topic/artificial-intelligence/feed') },
    { name: 'ArXiv AI', url: rss('https://export.arxiv.org/rss/cs.AI') },
  ],
  finance: [
    { name: 'CNBC', url: rss('https://www.cnbc.com/id/100003114/device/rss/rss.html') },
    { name: 'MarketWatch', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/news/rssindex') },
    { name: 'Financial Times', url: rss('https://www.ft.com/rss/home') },
    { name: 'Reuters Business', url: rss('https://news.google.com/rss/search?q=site:reuters.com+business+markets&hl=en-US&gl=US&ceid=US:en') },
  ],
  gov: [
    { name: 'White House', url: rss('https://news.google.com/rss/search?q=site:whitehouse.gov&hl=en-US&gl=US&ceid=US:en') },
    { name: 'State Dept', url: rss('https://news.google.com/rss/search?q=site:state.gov+OR+"State+Department"&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Pentagon', url: rss('https://news.google.com/rss/search?q=site:defense.gov+OR+Pentagon&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Treasury', url: rss('https://news.google.com/rss/search?q=site:treasury.gov+OR+"Treasury+Department"&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DOJ', url: rss('https://news.google.com/rss/search?q=site:justice.gov+OR+"Justice+Department"+DOJ&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Federal Reserve', url: rss('https://www.federalreserve.gov/feeds/press_all.xml') },
    { name: 'SEC', url: rss('https://www.sec.gov/news/pressreleases.rss') },
    { name: 'CDC', url: rss('https://news.google.com/rss/search?q=site:cdc.gov+OR+CDC+health&hl=en-US&gl=US&ceid=US:en') },
    { name: 'FEMA', url: rss('https://news.google.com/rss/search?q=site:fema.gov+OR+FEMA+emergency&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DHS', url: rss('https://news.google.com/rss/search?q=site:dhs.gov+OR+"Homeland+Security"&hl=en-US&gl=US&ceid=US:en') },
    { name: 'UN News', url: railwayRss('https://news.un.org/feed/subscribe/en/news/all/rss.xml') },
    { name: 'CISA', url: railwayRss('https://www.cisa.gov/cybersecurity-advisories/all.xml') },
  ],
  layoffs: [
    { name: 'Layoffs.fyi', url: rss('https://layoffs.fyi/feed/') },
    { name: 'TechCrunch Layoffs', url: rss('https://techcrunch.com/tag/layoffs/feed/') },
    { name: 'Layoffs News', url: rss('https://news.google.com/rss/search?q=(layoffs+OR+"job+cuts"+OR+"workforce+reduction")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  thinktanks: [
    { name: 'Foreign Policy', url: rss('https://foreignpolicy.com/feed/') },
    { name: 'Atlantic Council', url: railwayRss('https://www.atlanticcouncil.org/feed/') },
    { name: 'Foreign Affairs', url: rss('https://www.foreignaffairs.com/rss.xml') },
    { name: 'CSIS', url: rss('https://news.google.com/rss/search?q=site:csis.org+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'RAND', url: rss('https://news.google.com/rss/search?q=site:rand.org+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Brookings', url: rss('https://news.google.com/rss/search?q=site:brookings.edu+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Carnegie', url: rss('https://news.google.com/rss/search?q=site:carnegieendowment.org+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // New verified think tank feeds
    // War on the Rocks - Defense and national security analysis
    { name: 'War on the Rocks', url: rss('https://warontherocks.com/feed') },
    // AEI - American Enterprise Institute (US conservative think tank)
    { name: 'AEI', url: rss('https://www.aei.org/feed/') },
    // Responsible Statecraft - Foreign policy analysis (Quincy Institute)
    { name: 'Responsible Statecraft', url: rss('https://responsiblestatecraft.org/feed/') },
    // RUSI - Royal United Services Institute (UK defense & security)
    { name: 'RUSI', url: rss('https://news.google.com/rss/search?q=site:rusi.org+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // FPRI - Foreign Policy Research Institute (US foreign policy)
    { name: 'FPRI', url: rss('https://www.fpri.org/feed/') },
    // Jamestown Foundation - Eurasia/China/Terrorism analysis
    { name: 'Jamestown', url: rss('https://jamestown.org/feed/') },
  ],
  crisis: [
    { name: 'CrisisWatch', url: rss('https://www.crisisgroup.org/rss') },
    { name: 'IAEA', url: rss('https://www.iaea.org/feeds/topnews') },
    { name: 'WHO', url: rss('https://www.who.int/rss-feeds/news-english.xml') },
    { name: 'UNHCR', url: rss('https://news.google.com/rss/search?q=site:unhcr.org+OR+UNHCR+refugees+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  regional: [
    { name: 'Xinhua', url: rss('https://news.google.com/rss/search?q=site:xinhuanet.com+OR+Xinhua+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TASS', url: rss('https://news.google.com/rss/search?q=site:tass.com+OR+TASS+Russia+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Kyiv Independent', url: rss('https://news.google.com/rss/search?q=site:kyivindependent.com+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Moscow Times', url: rss('https://www.themoscowtimes.com/rss/news') },
  ],
  africa: [
    { name: 'Africa News', url: rss('https://news.google.com/rss/search?q=(Africa+OR+Nigeria+OR+Kenya+OR+"South+Africa"+OR+Ethiopia)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Sahel Crisis', url: rss('https://news.google.com/rss/search?q=(Sahel+OR+Mali+OR+Niger+OR+"Burkina+Faso"+OR+Wagner)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'News24', url: railwayRss('https://feeds.capi24.com/v1/Search/articles/news24/Africa/rss') },
    { name: 'BBC Africa', url: rss('https://feeds.bbci.co.uk/news/world/africa/rss.xml') },
    { name: 'Jeune Afrique', url: rss('https://www.jeuneafrique.com/feed/'), lang: 'fr' },
    { name: 'Africanews', url: { en: rss('https://www.africanews.com/feed/rss'), fr: rss('https://fr.africanews.com/feed/rss') } },
    { name: 'BBC Afrique', url: rss('https://www.bbc.com/afrique/index.xml'), lang: 'fr' },
  ],
  latam: [
    { name: 'Latin America', url: rss('https://news.google.com/rss/search?q=(Brazil+OR+Mexico+OR+Argentina+OR+Venezuela+OR+Colombia)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BBC Latin America', url: rss('https://feeds.bbci.co.uk/news/world/latin_america/rss.xml') },
    { name: 'Reuters LatAm', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(Brazil+OR+Mexico+OR+Argentina)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Guardian Americas', url: rss('https://www.theguardian.com/world/americas/rss') },
    // Localized Feeds
    { name: 'Clarín', url: rss('https://www.clarin.com/rss/lo-ultimo/'), lang: 'es' },
    { name: 'O Globo', url: rss('https://oglobo.globo.com/rss/top_noticias/'), lang: 'pt' },
    { name: 'Folha de S.Paulo', url: rss('https://feeds.folha.uol.com.br/emcimadahora/rss091.xml'), lang: 'pt' },
    { name: 'El Tiempo', url: rss('https://www.eltiempo.com/rss/mundo_latinoamerica.xml'), lang: 'es' },
    { name: 'El Universal', url: rss('https://www.eluniversal.com.mx/rss.xml'), lang: 'es' },
    { name: 'La Silla Vacía', url: rss('https://www.lasillavacia.com/rss') },
  ],
  asia: [
    { name: 'Asia News', url: rss('https://news.google.com/rss/search?q=(China+OR+Japan+OR+Korea+OR+India+OR+ASEAN)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BBC Asia', url: rss('https://feeds.bbci.co.uk/news/world/asia/rss.xml') },
    { name: 'South China Morning Post', url: railwayRss('https://www.scmp.com/rss/91/feed/') },
    { name: 'Reuters Asia', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(China+OR+Japan+OR+Taiwan+OR+Korea)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'NHK World', url: railwayRss('https://rsshub.app/nhk/news/en') },
    { name: 'Nikkei Asia', url: rss('https://news.google.com/rss/search?q=site:asia.nikkei.com+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asahi Shimbun', url: rss('https://www.asahi.com/rss/asahi/newsheadlines.rdf'), lang: 'ja' },
    { name: 'The Hindu', url: rss('https://www.thehindu.com/news/national/feeder/default.rss'), lang: 'en' },
    { name: 'CNA', url: rss('https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml') },
    { name: 'MIIT (China)', url: railwayRss('https://rsshub.app/gov/miit/zcjd'), lang: 'zh' },
    { name: 'MOFCOM (China)', url: railwayRss('https://rsshub.app/gov/mofcom/article/xwfb'), lang: 'zh' },
  ],
  energy: [
    { name: 'Oil & Gas', url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+pipeline+OR+LNG)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Nuclear Energy', url: rss('https://news.google.com/rss/search?q=("nuclear+energy"+OR+"nuclear+power"+OR+uranium+OR+IAEA)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Reuters Energy', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy+OR+OPEC)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Mining & Resources', url: rss('https://news.google.com/rss/search?q=(lithium+OR+"rare+earth"+OR+cobalt+OR+mining)+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  crisis: [
    { name: 'CrisisWatch', url: rss('https://www.crisisgroup.org/rss') },
    { name: 'IAEA', url: rss('https://www.iaea.org/feeds/topnews') },
    { name: 'WHO', url: rss('https://www.who.int/rss-feeds/news-english.xml') },
    { name: 'UNHCR', url: rss('https://news.google.com/rss/search?q=site:unhcr.org+OR+UNHCR+refugees+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  africa: [
    { name: 'Africa News', url: rss('https://news.google.com/rss/search?q=(Africa+OR+Nigeria+OR+Kenya+OR+"South+Africa"+OR+Ethiopia)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Sahel Crisis', url: rss('https://news.google.com/rss/search?q=(Sahel+OR+Mali+OR+Niger+OR+"Burkina+Faso"+OR+Wagner)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'News24', url: rss('https://feeds.news24.com/articles/news24/TopStories/rss') },
    { name: 'BBC Africa', url: rss('https://feeds.bbci.co.uk/news/world/africa/rss.xml') },
    { name: 'Jeune Afrique', url: rss('https://www.jeuneafrique.com/feed/'), lang: 'fr', strategicDefault: true },
    { name: 'Africanews', url: { en: rss('https://www.africanews.com/feed/rss'), fr: rss('https://fr.africanews.com/feed/rss') } },
    { name: 'BBC Afrique', url: rss('https://www.bbc.com/afrique/index.xml'), lang: 'fr' },
    // Nigeria
    { name: 'Premium Times', url: rss('https://www.premiumtimesng.com/feed') },
    { name: 'Vanguard Nigeria', url: rss('https://www.vanguardngr.com/feed/') },
    { name: 'Channels TV', url: rss('https://www.channelstv.com/feed/') },
    { name: 'Daily Trust', url: rss('https://dailytrust.com/feed/') },
    { name: 'ThisDay', url: rss('https://www.thisdaylive.com/feed') },
    // Horn of Africa
    { name: 'Radio Tamazuj', url: rss('https://www.radiotamazuj.org/en/feed') },
    { name: 'The Reporter Ethiopia', url: rss('https://www.thereporterethiopia.com/feed/') },
    { name: 'Ethiopia Insight', url: rss('https://www.ethiopia-insight.com/feed/') },
    { name: 'Dabanga Sudan', url: rss('https://www.dabangasudan.org/en/feed') },
    { name: 'Hiiraan Online', url: rss('https://news.google.com/rss/search?q=site%3Ahiiraan.com%20when%3A7d&hl=en-US&gl=US&ceid=US:en') },
    // DRC / Great Lakes
    { name: 'Actualite.cd', url: rss('https://actualite.cd/feed'), lang: 'fr' },
    { name: 'Radio Okapi', url: rss('https://www.radiookapi.net/rss.xml'), lang: 'fr' },
    // West Africa beyond Nigeria
    { name: 'MyJoyOnline', url: rss('https://www.myjoyonline.com/feed/') },
    { name: 'Citi Newsroom', url: rss('https://news.google.com/rss/search?q=site%3Acitinewsroom.com%20when%3A7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Le Quotidien', url: rss('https://lequotidien.sn/feed/'), lang: 'fr' },
    // Pan-African
    { name: 'RFI Afrique', url: rss('https://www.rfi.fr/en/africa/rss') },
    // Validated crisis-floor and locale desks (#6819-#6821, #6827-#6830).
    { name: 'Studio Tamani', url: rss('https://www.studiotamani.org/feed/'), lang: 'fr', strategicDefault: true },
    { name: 'leFaso.net', url: rss('https://lefaso.net/spip.php?page=backend'), lang: 'fr', strategicDefault: true },
    { name: 'ActuNiger', url: rss('https://news.google.com/rss/search?q=site%3Aactuniger.com%20Niger%20when%3A7d&hl=fr&gl=FR&ceid=FR:fr'), lang: 'fr', strategicDefault: true },
    { name: 'Aïr Info', url: rss('https://airinfoagadez.com/feed/'), lang: 'fr' },
    { name: 'Daily Nation', url: rss('https://nation.africa/kenya/rss.xml') },
    { name: 'The Guardian Post', url: rss('https://news.google.com/rss/search?q=site%3Atheguardianpostcameroon.com%20when%3A30d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tchadinfos', url: rss('https://tchadinfos.com/feed/'), lang: 'fr' },
    { name: 'Alwihda Info', url: rss('https://www.alwihdainfo.com/rss/'), lang: 'fr' },
    { name: 'Radio Ndeke Luka', url: rss('https://www.radiondekeluka.org/feed/'), lang: 'fr' },
  ],
  latam: [
    { name: 'Latin America', url: rss('https://news.google.com/rss/search?q=(Brazil+OR+Mexico+OR+Argentina+OR+Venezuela+OR+Colombia+OR+Haiti)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BBC Latin America', url: rss('https://feeds.bbci.co.uk/news/world/latin_america/rss.xml') },
    { name: 'Reuters LatAm', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(Brazil+OR+Mexico+OR+Argentina)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Guardian Americas', url: rss('https://www.theguardian.com/world/americas/rss') },
    // Localized Feeds
    { name: 'Clarín', url: rss('https://www.clarin.com/rss/lo-ultimo/'), lang: 'es' },
    { name: 'O Globo', url: rss('https://news.google.com/rss/search?q=site:oglobo.globo.com+when:1d&hl=pt-BR&gl=BR&ceid=BR:pt-419'), lang: 'pt' },
    { name: 'Folha de S.Paulo', url: rss('https://feeds.folha.uol.com.br/emcimadahora/rss091.xml'), lang: 'pt' },
    { name: 'Brasil Paralelo', url: rss('https://www.brasilparalelo.com.br/noticias/rss.xml'), lang: 'pt' },
    { name: 'El Tiempo', url: rss('https://www.eltiempo.com/rss/mundo_latinoamerica.xml'), lang: 'es' },
    { name: 'La Silla Vacía', url: rss('https://www.lasillavacia.com/rss') },
    { name: 'Primicias', url: rss('https://www.primicias.ec/feed/'), lang: 'es' },
    { name: 'Infobae Americas', url: rss('https://www.infobae.com/arc/outboundfeeds/rss/'), lang: 'es' },
    { name: 'El Universo', url: rss('https://www.eluniverso.com/arc/outboundfeeds/rss/category/noticias/?outputType=xml'), lang: 'es' },
    // Mexico
    { name: 'Mexico News Daily', url: rss('https://mexiconewsdaily.com/feed/') },
    { name: 'Mexico Security', url: rss('https://news.google.com/rss/search?q=(Mexico+cartel+OR+Mexico+violence+OR+Mexico+troops+OR+narco+Mexico)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'AP Mexico', url: rss('https://news.google.com/rss/search?q=site:apnews.com+Mexico+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // LatAm Security
    { name: 'InSight Crime', url: rss('https://insightcrime.org/feed/') },
    { name: 'France 24 LatAm', url: rss('https://www.france24.com/en/americas/rss') },
    // Validated crisis-floor desks (#6816, #6822-#6823).
    { name: 'HaitiLibre English', url: rss('https://www.haitilibre.com/rss-flash-en.php') },
    { name: 'AyiboPost', url: rss('https://news.google.com/rss/search?q=site%3Aayibopost.com%20Haiti%20when%3A14d&hl=fr&gl=FR&ceid=FR:fr'), lang: 'fr' },
    { name: 'Caracas Chronicles', url: rss('https://www.caracaschronicles.com/feed/') },
    { name: 'Efecto Cocuyo', url: rss('https://efectococuyo.com/feed/'), lang: 'es' },
    { name: 'Havana Times', url: rss('https://havanatimes.org/feed/') },
    { name: '14ymedio', url: rss('https://www.14ymedio.com/rss/'), lang: 'es' },
  ],
  asia: [
    { name: 'Asia News', url: rss('https://news.google.com/rss/search?q=(China+OR+Japan+OR+Korea+OR+India+OR+ASEAN)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BBC Asia', url: rss('https://feeds.bbci.co.uk/news/world/asia/rss.xml') },
    { name: 'The Diplomat', url: rss('https://thediplomat.com/feed/') },
    { name: 'South China Morning Post', url: railwayRss('https://www.scmp.com/rss/91/feed/') },
    { name: 'Reuters Asia', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(China+OR+Japan+OR+Taiwan+OR+Korea)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Reuters India', url: rss('https://news.google.com/rss/search?q=site:reuters.com+India+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Xinhua', url: rss('https://news.google.com/rss/search?q=site:xinhuanet.com+OR+Xinhua+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Japan Today', url: rss('https://japantoday.com/feed/atom') },
    { name: 'Nikkei Asia', url: rss('https://news.google.com/rss/search?q=site:asia.nikkei.com+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asahi Shimbun', url: rss('https://www.asahi.com/rss/asahi/newsheadlines.rdf'), lang: 'ja', strategicDefault: true },
    { name: 'The Hindu', url: rss('https://www.thehindu.com/news/national/feeder/default.rss'), lang: 'en' },
    { name: 'Indian Express', url: rss('https://indianexpress.com/section/india/feed/') },
    { name: 'NDTV', url: rss('https://feeds.feedburner.com/ndtvnews-top-stories') },
    { name: 'India News Network', url: rss('https://news.google.com/rss/search?q=India+diplomacy+foreign+policy+news&hl=en&gl=US&ceid=US:en') },
    // Hindi (HI) — mainstream national coverage boosted for Hindi locale users
    { name: 'BBC Hindi', url: rss('https://feeds.bbci.co.uk/hindi/rss.xml'), lang: 'hi' },
    { name: 'Aaj Tak', url: rss('https://www.aajtak.in/rssfeeds/?id=home'), lang: 'hi' },
    { name: 'NDTV India', url: rss('https://feeds.feedburner.com/ndtvkhabar-latest'), lang: 'hi' },
    { name: 'Amar Ujala', url: rss('https://www.amarujala.com/rss/national.xml'), lang: 'hi' },
    { name: 'CNA', url: rss('https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml') },
    { name: 'MIIT (China)', url: rss('https://news.google.com/rss/search?q=site:miit.gov.cn+when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'), lang: 'zh', strategicDefault: true },
    { name: 'MOFCOM (China)', url: rss('https://news.google.com/rss/search?q=site:mofcom.gov.cn+when:7d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'), lang: 'zh', strategicDefault: true },
    // Thailand
    { name: 'Bangkok Post', url: rss('https://news.google.com/rss/search?q=site:bangkokpost.com+when:1d&hl=en-US&gl=US&ceid=US:en'), lang: 'th', strategicDefault: true },
    { name: 'Thai PBS', url: rss('https://news.google.com/rss/search?q=Thai+PBS+World+news&hl=en&gl=US&ceid=US:en'), lang: 'th' },
    // Vietnam
    { name: 'VnExpress', url: rss('https://vnexpress.net/rss/tin-moi-nhat.rss'), lang: 'vi', strategicDefault: true },
    { name: 'Tuoi Tre News', url: rss('https://news.tuoitre.vn/rss'), lang: 'vi' },
    // Korea
    { name: 'Yonhap News', url: rss('https://www.yonhapnewstv.co.kr/browse/feed/'), lang: 'ko', strategicDefault: true },
    { name: 'Chosun Ilbo', url: rss('https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml'), lang: 'ko' },
    // Australia
    { name: 'ABC News Australia', url: rss('https://www.abc.net.au/news/feed/2942460/rss.xml') },
    { name: 'Guardian Australia', url: rss('https://www.theguardian.com/australia-news/rss') },
    // Pacific Islands
    { name: 'Island Times (Palau)', url: rss('https://islandtimes.org/feed/') },
    // Central Asia (#5953) — Russia rear area, China BRI, sanctions leakage
    { name: 'Eurasianet', url: rss('https://eurasianet.org/rss') },
    { name: 'RFE/RL Central Asia', url: rss('https://news.google.com/rss/search?q=site:rferl.org+Central+Asia+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'The Astana Times', url: rss('https://astanatimes.com/feed/') },
    { name: 'The Times of Central Asia', url: rss('https://timesca.com/feed/') },
    // Taiwan (#5954)
    { name: 'Focus Taiwan', url: rss('https://news.google.com/rss/search?q=site%3Afocustaiwan.tw%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Taipei Times', url: rss('https://news.google.com/rss/search?q=site%3Ataipeitimes.com%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Taiwan News', url: rss('https://news.google.com/rss/search?q=site%3Ataiwannews.com.tw%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    // Pakistan (#5954)
    { name: 'Dawn', url: rss('https://www.dawn.com/feeds/home/') },
    { name: 'Geo News', url: rss('https://news.google.com/rss/search?q=site:geo.tv+when:2d&hl=en-US&gl=US&ceid=US:en') },
    // SE Asia security (#5954)
    { name: 'Jakarta Post', url: rss('https://news.google.com/rss/search?q=site%3Athejakartapost.com%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Rappler', url: rss('https://www.rappler.com/feed/') },
    { name: 'The Star (Malaysia)', url: rss('https://news.google.com/rss/search?q=site%3Athestar.com.my%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Irrawaddy', url: rss('https://www.irrawaddy.com/feed/') },
    // Validated crisis-floor desks (#6817, #6826).
    { name: 'Amu TV', url: rss('https://amu.tv/feed/') },
    { name: 'Pajhwok Afghan News', url: rss('https://news.google.com/rss/search?q=site%3Apajhwok.com%20Afghanistan%20when%3A7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'The Daily Star', url: rss('https://news.google.com/rss/search?q=site%3Athedailystar.net%20when%3A14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Dhaka Tribune', url: rss('https://news.google.com/rss/search?q=site%3Adhakatribune.com%20when%3A14d&hl=en-US&gl=US&ceid=US:en') },
    // New opt-in feeds stay at the end of the category. The free source cap
    // consumes declaration order, so inserting earlier can evict an existing
    // source from persisted free-user selections.
    { name: 'Times of India', url: rss('https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms'), lang: 'en' },
  ],
  energy: [
    { name: 'Oil & Gas', url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+pipeline+OR+LNG)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Nuclear Energy', url: rss('https://news.google.com/rss/search?q=("nuclear+energy"+OR+"nuclear+power"+OR+uranium+OR+IAEA)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Reuters Energy', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy+OR+OPEC)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Mining & Resources', url: rss('https://news.google.com/rss/search?q=(lithium+OR+"rare+earth"+OR+cobalt+OR+mining)+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
};

// Tech/AI variant feeds
const TECH_FEEDS: Record<string, Feed[]> = {
  tech: [
    { name: 'TechCrunch', url: rss('https://techcrunch.com/feed/') },
    { name: 'The Verge', url: rss('https://www.theverge.com/rss/index.xml') },
    { name: 'Ars Technica', url: rss('https://feeds.arstechnica.com/arstechnica/technology-lab') },
    { name: 'Hacker News', url: rss('https://hnrss.org/frontpage') },
    { name: 'MIT Tech Review', url: rss('https://www.technologyreview.com/feed/') },
    { name: 'ZDNet', url: rss('https://www.zdnet.com/news/rss.xml') },
    { name: 'TechMeme', url: rss('https://www.techmeme.com/feed.xml') },
    { name: 'Engadget', url: rss('https://www.engadget.com/rss.xml') },
    { name: 'Fast Company', url: rss('https://feeds.feedburner.com/fastcompany/headlines') },
    { name: 'Wired', url: rss('https://www.wired.com/feed/rss') },
  ],
  ai: [
    { name: 'AI News', url: rss('https://news.google.com/rss/search?q=(OpenAI+OR+Anthropic+OR+Google+AI+OR+"large+language+model"+OR+ChatGPT+OR+Claude+OR+"AI+model")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VentureBeat AI', url: rss('https://venturebeat.com/category/ai/feed/') },
    { name: 'The Verge AI', url: rss('https://www.theverge.com/rss/ai-artificial-intelligence/index.xml') },
    { name: 'MIT Tech Review AI', url: rss('https://www.technologyreview.com/topic/artificial-intelligence/feed') },
    { name: 'MIT Research', url: rss('https://news.mit.edu/rss/research') },
    { name: 'ArXiv AI', url: rss('https://export.arxiv.org/rss/cs.AI') },
    { name: 'ArXiv ML', url: rss('https://export.arxiv.org/rss/cs.LG') },
    { name: 'AI Weekly', url: rss('https://news.google.com/rss/search?q="artificial+intelligence"+OR+"machine+learning"+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Anthropic News', url: rss('https://news.google.com/rss/search?q=Anthropic+Claude+AI+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'OpenAI News', url: rss('https://news.google.com/rss/search?q=OpenAI+ChatGPT+GPT-4+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  startups: [
    { name: 'TechCrunch Startups', url: rss('https://techcrunch.com/category/startups/feed/') },
    { name: 'VentureBeat', url: rss('https://venturebeat.com/feed/') },
    { name: 'Crunchbase News', url: rss('https://news.crunchbase.com/feed/') },
    { name: 'SaaStr', url: rss('https://www.saastr.com/feed/') },
    { name: 'AngelList News', url: rss('https://news.google.com/rss/search?q=site:angellist.com+OR+"AngelList"+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TechCrunch Venture', url: rss('https://techcrunch.com/category/venture/feed/') },
    { name: 'The Information', url: rss('https://news.google.com/rss/search?q=site:theinformation.com+startup+OR+funding+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Fortune Term Sheet', url: rss('https://news.google.com/rss/search?q="Term+Sheet"+venture+capital+OR+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'PitchBook News', url: rss('https://news.google.com/rss/search?q=site:pitchbook.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CB Insights', url: rss('https://www.cbinsights.com/research/feed/') },
  ],
  vcblogs: [
    { name: 'Y Combinator Blog', url: rss('https://www.ycombinator.com/blog/rss/') },
    { name: 'a16z Blog', url: rss('https://news.google.com/rss/search?q=site:a16z.com+OR+"Andreessen+Horowitz"+blog+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'First Round Review', url: rss('https://review.firstround.com/articles/rss') },
    { name: 'Sequoia Blog', url: rss('https://news.google.com/rss/search?q=site:sequoiacap.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Paul Graham Essays', url: rss('https://news.google.com/rss/search?q="Paul+Graham"+essay+OR+blog+when:30d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VC Insights', url: rss('https://news.google.com/rss/search?q=("venture+capital"+insights+OR+"VC+trends"+OR+"startup+advice")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Lenny\'s Newsletter', url: rss('https://www.lennysnewsletter.com/feed') },
    { name: 'Stratechery', url: rss('https://stratechery.com/feed/') },
    { name: 'FwdStart Newsletter', url: '/api/fwdstart' },
  ],
  regionalStartups: [
    // Europe
    { name: 'EU Startups', url: rss('https://news.google.com/rss/search?q=site:eu-startups.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech.eu', url: rss('https://tech.eu/feed/') },
    { name: 'Sifted (Europe)', url: rss('https://sifted.eu/feed') },
    { name: 'The Next Web', url: rss('https://news.google.com/rss/search?q=site:thenextweb.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Asia - General
    { name: 'Tech in Asia', url: rss('https://news.google.com/rss/search?q=site:techinasia.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'KrASIA', url: rss('https://news.google.com/rss/search?q=site:kr-asia.com+OR+KrASIA+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'SEA Startups', url: rss('https://news.google.com/rss/search?q=(Singapore+OR+Indonesia+OR+Vietnam+OR+Thailand+OR+Malaysia)+startup+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asia VC News', url: rss('https://news.google.com/rss/search?q=("Southeast+Asia"+OR+ASEAN)+venture+capital+OR+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // China
    { name: 'China Startups', url: rss('https://news.google.com/rss/search?q=China+startup+funding+OR+"Chinese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: '36Kr English', url: rss('https://news.google.com/rss/search?q=site:36kr.com+OR+"36Kr"+startup+china+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'China Tech Giants', url: rss('https://news.google.com/rss/search?q=(Alibaba+OR+Tencent+OR+ByteDance+OR+Baidu+OR+JD.com+OR+Xiaomi+OR+Huawei)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // Japan
    { name: 'Japan Startups', url: rss('https://news.google.com/rss/search?q=Japan+startup+funding+OR+"Japanese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Japan Tech News', url: rss('https://news.google.com/rss/search?q=(Japan+startup+OR+Japan+tech+OR+SoftBank+OR+Rakuten+OR+Sony)+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Nikkei Tech', url: rss('https://news.google.com/rss/search?q=site:asia.nikkei.com+technology+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // Korea
    { name: 'Korea Tech News', url: rss('https://news.google.com/rss/search?q=(Korea+startup+OR+Korean+tech+OR+Samsung+OR+Kakao+OR+Naver+OR+Coupang)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Korea Startups', url: rss('https://news.google.com/rss/search?q=Korea+startup+funding+OR+"Korean+unicorn"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India
    { name: 'Inc42 (India)', url: rss('https://inc42.com/feed/') },
    { name: 'YourStory', url: rss('https://yourstory.com/feed') },
    { name: 'India Startups', url: rss('https://news.google.com/rss/search?q=India+startup+funding+OR+"Indian+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'India Tech News', url: rss('https://news.google.com/rss/search?q=(Flipkart+OR+Razorpay+OR+Zerodha+OR+Zomato+OR+Paytm+OR+PhonePe)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Southeast Asia
    { name: 'SEA Tech News', url: rss('https://news.google.com/rss/search?q=(Grab+OR+GoTo+OR+Sea+Limited+OR+Shopee+OR+Tokopedia)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Vietnam Tech', url: rss('https://news.google.com/rss/search?q=Vietnam+startup+OR+Vietnam+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Indonesia Tech', url: rss('https://news.google.com/rss/search?q=Indonesia+startup+OR+Indonesia+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Taiwan
    { name: 'Taiwan Tech', url: rss('https://news.google.com/rss/search?q=(Taiwan+startup+OR+TSMC+OR+MediaTek+OR+Foxconn)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Latin America
    { name: 'LAVCA (LATAM)', url: rss('https://news.google.com/rss/search?q=site:lavca.org+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'LATAM Startups', url: rss('https://news.google.com/rss/search?q=("Latin+America"+startup+OR+LATAM+funding)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startups LATAM', url: rss('https://news.google.com/rss/search?q=(startup+Brazil+OR+startup+Mexico+OR+startup+Argentina+OR+startup+Colombia+OR+startup+Chile)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Brazil Tech', url: rss('https://news.google.com/rss/search?q=(Nubank+OR+iFood+OR+Mercado+Libre+OR+Rappi+OR+VTEX)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'FinTech LATAM', url: rss('https://news.google.com/rss/search?q=fintech+(Brazil+OR+Mexico+OR+Argentina+OR+"Latin+America")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Africa
    { name: 'TechCabal (Africa)', url: rss('https://techcabal.com/feed/') },
    { name: 'Africa Startups', url: rss('https://news.google.com/rss/search?q=Africa+startup+funding+OR+"African+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Africa Tech News', url: rss('https://news.google.com/rss/search?q=(Flutterwave+OR+Paystack+OR+Jumia+OR+Andela+OR+"Africa+startup")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Middle East
    { name: 'MENA Startups', url: rss('https://news.google.com/rss/search?q=(MENA+startup+OR+"Middle+East"+funding+OR+Gulf+startup)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'MENA Tech News', url: rss('https://news.google.com/rss/search?q=(UAE+startup+OR+Saudi+tech+OR+Dubai+startup+OR+NEOM+tech)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  github: [
    { name: 'GitHub Blog', url: rss('https://github.blog/feed/') },
    { name: 'GitHub Trending', url: rss('https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml') },
    { name: 'YC Launches', url: rss('https://news.google.com/rss/search?q=("Y+Combinator"+OR+"YC+launch"+OR+"YC+W25"+OR+"YC+S25")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Dev Events', url: rss('https://news.google.com/rss/search?q=("developer+conference"+OR+"tech+summit"+OR+"devcon"+OR+"developer+event")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Open Source News', url: rss('https://news.google.com/rss/search?q="open+source"+project+release+OR+launch+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  ipo: [
    { name: 'IPO News', url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC)+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Renaissance IPO', url: rss('https://news.google.com/rss/search?q=site:renaissancecapital.com+IPO+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech IPO News', url: rss('https://news.google.com/rss/search?q=tech+IPO+OR+"tech+company"+IPO+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  funding: [
    { name: 'SEC Filings', url: rss('https://news.google.com/rss/search?q=(S-1+OR+"IPO+filing"+OR+"SEC+filing")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VC News', url: rss('https://news.google.com/rss/search?q=("Series+A"+OR+"Series+B"+OR+"Series+C"+OR+"funding+round"+OR+"venture+capital")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Seed & Pre-Seed', url: rss('https://news.google.com/rss/search?q=("seed+round"+OR+"pre-seed"+OR+"angel+round"+OR+"seed+funding")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startup Funding', url: rss('https://news.google.com/rss/search?q=("startup+funding"+OR+"raised+funding"+OR+"raised+$"+OR+"funding+announced")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  producthunt: [
    { name: 'Product Hunt', url: rss('https://www.producthunt.com/feed') },
  ],
  outages: [
    { name: 'AWS Status', url: rss('https://news.google.com/rss/search?q=AWS+outage+OR+"Amazon+Web+Services"+down+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Cloud Outages', url: rss('https://news.google.com/rss/search?q=(Azure+OR+GCP+OR+Cloudflare+OR+Slack+OR+GitHub)+outage+OR+down+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  security: [
    { name: 'Krebs Security', url: rss('https://krebsonsecurity.com/feed/') },
    { name: 'The Hacker News', url: rss('https://feeds.feedburner.com/TheHackersNews') },
    { name: 'Dark Reading', url: rss('https://www.darkreading.com/rss.xml') },
    { name: 'Schneier', url: rss('https://www.schneier.com/feed/') },
  ],
  policy: [
    // US Policy
    { name: 'Politico Tech', url: rss('https://rss.politico.com/technology.xml') },
    { name: 'AI Regulation', url: rss('https://news.google.com/rss/search?q=AI+regulation+OR+"artificial+intelligence"+law+OR+policy+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech Antitrust', url: rss('https://news.google.com/rss/search?q=tech+antitrust+OR+FTC+Google+OR+FTC+Apple+OR+FTC+Amazon+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EFF News', url: rss('https://news.google.com/rss/search?q=site:eff.org+OR+"Electronic+Frontier+Foundation"+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // EU Digital Policy
    { name: 'EU Digital Policy', url: rss('https://news.google.com/rss/search?q=("Digital+Services+Act"+OR+"Digital+Markets+Act"+OR+"EU+AI+Act"+OR+"GDPR")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Euractiv Digital', url: rss('https://news.google.com/rss/search?q=site:euractiv.com+digital+OR+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EU Commission Digital', url: rss('https://news.google.com/rss/search?q=site:ec.europa.eu+digital+OR+technology+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // China Tech Policy
    { name: 'China Tech Policy', url: rss('https://news.google.com/rss/search?q=(China+tech+regulation+OR+China+AI+policy+OR+MIIT+technology)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // UK Policy
    { name: 'UK Tech Policy', url: rss('https://news.google.com/rss/search?q=(UK+AI+safety+OR+"Online+Safety+Bill"+OR+UK+tech+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India Policy
    { name: 'India Tech Policy', url: rss('https://news.google.com/rss/search?q=(India+tech+regulation+OR+India+data+protection+OR+India+AI+policy)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  thinktanks: [
    // US Think Tanks
    { name: 'Brookings Tech', url: rss('https://news.google.com/rss/search?q=site:brookings.edu+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CSIS Tech', url: rss('https://news.google.com/rss/search?q=site:csis.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'MIT Tech Policy', url: rss('https://news.google.com/rss/search?q=%22Tech+Policy+Press%22&hl=en&gl=US&ceid=US:en') },
    { name: 'Stanford HAI', url: rss('https://news.google.com/rss/search?q=site:hai.stanford.edu+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'AI Now Institute', url: rss('https://news.google.com/rss/search?q=%22AI+Now+Institute%22&hl=en&gl=US&ceid=US:en') },
    // Europe Think Tanks
    { name: 'OECD Digital', url: rss('https://news.google.com/rss/search?q=site:oecd.org+digital+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EU Tech Policy', url: rss('https://news.google.com/rss/search?q=("EU+tech+policy"+OR+"European+digital"+OR+Bruegel+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Chatham House Tech', url: rss('https://news.google.com/rss/search?q=site:chathamhouse.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Asia Think Tanks
    { name: 'ISEAS (Singapore)', url: rss('https://news.google.com/rss/search?q=site:iseas.edu.sg+technology+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'ORF Tech (India)', url: rss('https://news.google.com/rss/search?q=(India+tech+policy+OR+ORF+technology+OR+"Observer+Research+Foundation"+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'RIETI (Japan)', url: rss('https://news.google.com/rss/search?q=site:rieti.go.jp+technology+when:30d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asia Pacific Tech', url: rss('https://news.google.com/rss/search?q=("Asia+Pacific"+tech+policy+OR+"Lowy+Institute"+technology)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // China Research (External Views)
    { name: 'China Tech Analysis', url: rss('https://news.google.com/rss/search?q=("China+tech+strategy"+OR+"Chinese+AI"+OR+"China+semiconductor")+analysis+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DigiChina', url: rss('https://news.google.com/rss/search?q=DigiChina+Stanford+China+technology&hl=en&gl=US&ceid=US:en') },
  ],
  finance: [
    { name: 'CNBC Tech', url: rss('https://www.cnbc.com/id/19854910/device/rss/rss.html') },
    { name: 'MarketWatch Tech', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+technology+markets+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/rss/topstories') },
    { name: 'Seeking Alpha Tech', url: rss('https://seekingalpha.com/market_currents.xml') },
  ],
  hardware: [
    { name: "Tom's Hardware", url: rss('https://www.tomshardware.com/feeds.xml') },
    { name: 'SemiAnalysis', url: rss('https://news.google.com/rss/search?q=site:semianalysis.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Semiconductor News', url: rss('https://news.google.com/rss/search?q=semiconductor+OR+chip+OR+TSMC+OR+NVIDIA+OR+Intel+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  cloud: [
    { name: 'InfoQ', url: rss('https://feed.infoq.com/') },
    { name: 'The New Stack', url: rss('https://thenewstack.io/feed/') },
    { name: 'DevOps.com', url: rss('https://devops.com/feed/') },
  ],
  dev: [
    { name: 'Dev.to', url: rss('https://dev.to/feed') },
    { name: 'Lobsters', url: rss('https://lobste.rs/rss') },
    { name: 'Changelog', url: rss('https://changelog.com/feed') },
    { name: 'Show HN', url: rss('https://hnrss.org/show') },
  ],
  layoffs: [
    { name: 'Layoffs.fyi', url: rss('https://news.google.com/rss/search?q=tech+layoffs+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TechCrunch Layoffs', url: rss('https://techcrunch.com/tag/layoffs/feed/') },
  ],
  unicorns: [
    { name: 'Unicorn News', url: rss('https://news.google.com/rss/search?q=("unicorn+startup"+OR+"unicorn+valuation"+OR+"$1+billion+valuation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CB Insights Unicorn', url: rss('https://news.google.com/rss/search?q=site:cbinsights.com+unicorn+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Decacorn News', url: rss('https://news.google.com/rss/search?q=("decacorn"+OR+"$10+billion+valuation"+OR+"$10B+valuation")+startup+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'New Unicorns', url: rss('https://news.google.com/rss/search?q=("becomes+unicorn"+OR+"joins+unicorn"+OR+"reaches+unicorn"+OR+"achieved+unicorn")+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
  accelerators: [
    { name: 'YC News', url: rss('https://news.ycombinator.com/rss') },
    { name: 'Techstars News', url: rss('https://news.google.com/rss/search?q=Techstars+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: '500 Global News', url: rss('https://news.google.com/rss/search?q="500+Global"+OR+"500+Startups"+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Demo Day News', url: rss('https://news.google.com/rss/search?q=("demo+day"+OR+"YC+batch"+OR+"accelerator+batch")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startup School', url: rss('https://news.google.com/rss/search?q="Startup+School"+OR+"YC+Startup+School"+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
  podcasts: [
    // Tech Podcast Episodes (via Google News - podcast hosts block RSS proxies)
    { name: 'Acquired Episodes', url: rss('https://news.google.com/rss/search?q="Acquired+podcast"+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'All-In Podcast', url: rss('https://news.google.com/rss/search?q="All-In+podcast"+(Chamath+OR+Sacks+OR+Friedberg)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'a16z Insights', url: rss('https://news.google.com/rss/search?q=("a16z"+OR+"Andreessen+Horowitz")+podcast+OR+interview+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TWIST Episodes', url: rss('https://news.google.com/rss/search?q="This+Week+in+Startups"+Jason+Calacanis+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: '20VC Episodes', url: rss('https://rss.libsyn.com/shows/61840/destinations/240976.xml') },
    { name: 'Lex Fridman Tech', url: rss('https://news.google.com/rss/search?q=("Lex+Fridman"+interview)+(AI+OR+tech+OR+startup+OR+CEO)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Tech Media Shows
    { name: 'Verge Shows', url: rss('https://news.google.com/rss/search?q=("Vergecast"+OR+"Decoder+podcast"+Verge)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Hard Fork (NYT)', url: rss('https://news.google.com/rss/search?q="Hard+Fork"+podcast+NYT+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Pivot Podcast', url: rss('https://feeds.megaphone.fm/pivot') },
    // Newsletters
    { name: 'Tech Newsletters', url: rss('https://news.google.com/rss/search?q=("Benedict+Evans"+OR+"Pragmatic+Engineer"+OR+Stratechery)+tech+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // AI Podcasts & Shows
    { name: 'AI Podcasts', url: rss('https://news.google.com/rss/search?q=("AI+podcast"+OR+"artificial+intelligence+podcast")+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'AI Interviews', url: rss('https://news.google.com/rss/search?q=(NVIDIA+OR+OpenAI+OR+Anthropic+OR+DeepMind)+interview+OR+podcast+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Startup Shows
    { name: 'How I Built This', url: rss('https://news.google.com/rss/search?q="How+I+Built+This"+Guy+Raz+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Masters of Scale', url: rss('https://rss.art19.com/masters-of-scale') },
  ],
};

// Finance/Trading variant feeds (all free RSS / Google News proxies)
const FINANCE_FEEDS: Record<string, Feed[]> = {
  markets: [
    { name: 'CNBC', url: rss('https://www.cnbc.com/id/100003114/device/rss/rss.html') },
    // Direct MarketWatch RSS returns frequent 403s from cloud IPs; use Google News fallback.
    { name: 'MarketWatch', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/rss/topstories') },
    { name: 'Seeking Alpha', url: rss('https://seekingalpha.com/market_currents.xml') },
    { name: 'Reuters Markets', url: rss('https://news.google.com/rss/search?q=site:reuters.com+markets+stocks+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bloomberg Markets', url: rss('https://news.google.com/rss/search?q=site:bloomberg.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Investing.com News', url: rss('https://news.google.com/rss/search?q=site:investing.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Fox Business', url: rss('https://moxie.foxbusiness.com/google-publisher/latest.xml') },
    { name: 'Business Insider', url: rss('https://www.businessinsider.com/rss') },
    { name: 'GlobeNewswire', url: rss('https://www.globenewswire.com/RssFeed/subjectcode/22/feedTitle/GlobeNewswire') },
    { name: 'Business Wire', url: rss('https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtRWA==') },
    { name: 'PR Newswire', url: rss('https://news.google.com/rss/search?q=site%3Aprnewswire.com%20when%3A1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  forex: [
    { name: 'Forex News', url: rss('https://news.google.com/rss/search?q=("forex"+OR+"currency"+OR+"FX+market")+trading+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Dollar Watch', url: rss('https://news.google.com/rss/search?q=("dollar+index"+OR+DXY+OR+"US+dollar"+OR+"euro+dollar")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Central Bank Rates', url: rss('https://news.google.com/rss/search?q=("central+bank"+OR+"interest+rate"+OR+"rate+decision"+OR+"monetary+policy")+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  bonds: [
    { name: 'Bond Market', url: rss('https://news.google.com/rss/search?q=("bond+market"+OR+"treasury+yields"+OR+"bond+yields"+OR+"fixed+income")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Treasury Watch', url: rss('https://news.google.com/rss/search?q=("US+Treasury"+OR+"Treasury+auction"+OR+"10-year+yield"+OR+"2-year+yield")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Corporate Bonds', url: rss('https://news.google.com/rss/search?q=("corporate+bond"+OR+"high+yield"+OR+"investment+grade"+OR+"credit+spread")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  commodities: [
    { name: 'Oil & Gas', url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+"crude+oil"+OR+WTI+OR+Brent)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gold & Metals', url: rss('https://news.google.com/rss/search?q=(gold+price+OR+silver+price+OR+copper+OR+platinum+OR+"precious+metals")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Agriculture', url: rss('https://news.google.com/rss/search?q=(wheat+OR+corn+OR+soybeans+OR+coffee+OR+sugar)+price+OR+commodity+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Commodity Trading', url: rss('https://news.google.com/rss/search?q=("commodity+trading"+OR+"futures+market"+OR+CME+OR+NYMEX+OR+COMEX)+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  crypto: [
    { name: 'CoinDesk', url: rss('https://www.coindesk.com/arc/outboundfeeds/rss/') },
    { name: 'Cointelegraph', url: rss('https://cointelegraph.com/rss') },
    { name: 'The Block', url: rss('https://news.google.com/rss/search?q=site:theblock.co+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Crypto News', url: rss('https://news.google.com/rss/search?q=(bitcoin+OR+ethereum+OR+crypto+OR+"digital+assets")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DeFi News', url: rss('https://news.google.com/rss/search?q=(DeFi+OR+"decentralized+finance"+OR+DEX+OR+"yield+farming")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Decrypt', url: rss('https://decrypt.co/feed') },
    // Blockworks REMOVED (PR #3715 review): blockworks.co/feed is
    // Cloudflare-blocked from both Vercel edge AND Railway egress, AND Google
    // News returns 0 items for site:blockworks.co at every probed time window
    // (publisher likely blocks Googlebot on the same wholesale tier — so the
    // Google News fallback we tried first is a silent placeholder). The Block
    // (above) covers the same institutional-crypto territory; no coverage
    // lost. Also removed from the server feeds (_feeds.ts) for parity.
    { name: 'The Defiant', url: rss('https://thedefiant.io/feed') },
    { name: 'Bitcoin Magazine', url: rss('https://bitcoinmagazine.com/feed') },
    { name: 'DL News', url: rss('https://news.google.com/rss/search?q=site:dlnews.com+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CryptoSlate', url: rss('https://cryptoslate.com/feed/') },
    { name: 'Unchained', url: rss('https://unchainedcrypto.com/feed/') },
    { name: 'Wu Blockchain', url: rss('https://news.google.com/rss/search?q=site:wublockchain.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Messari', url: rss('https://news.google.com/rss/search?q=site:messari.io+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bloomberg Crypto', url: rss('https://news.google.com/rss/search?q=bloomberg+crypto+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Chainwire', url: rss('https://chainwire.org/feed/') },
    { name: 'Coinbase Blog', url: rss('https://news.google.com/rss/search?q=site%3Acoinbase.com%2Fblog%20when%3A7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Binance Announcements', url: rss('https://news.google.com/rss/search?q=site%3Abinance.com%2Fen%2Fsupport%2Fannouncement%20when%3A3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Jin10', url: rss('https://news.google.com/rss/search?q=site%3Ajin10.com%20when%3A1d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans'), lang: 'zh' },
    { name: 'Reuters Crypto', url: rss('https://news.google.com/rss/search?q=reuters+crypto+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'NFT News', url: rss('https://news.google.com/rss/search?q=(NFT+OR+"non-fungible")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Stablecoin Policy', url: rss('https://news.google.com/rss/search?q=(stablecoin+regulation+OR+"stablecoin+bill")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  centralbanks: [
    { name: 'Federal Reserve', url: rss('https://www.federalreserve.gov/feeds/press_all.xml') },
    { name: 'ECB Watch', url: rss('https://news.google.com/rss/search?q=("European+Central+Bank"+OR+ECB+OR+Lagarde)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BoJ Watch', url: rss('https://news.google.com/rss/search?q=("Bank+of+Japan"+OR+BoJ)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BoE Watch', url: rss('https://news.google.com/rss/search?q=("Bank+of+England"+OR+BoE)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'PBoC Watch', url: rss('https://news.google.com/rss/search?q=("People%27s+Bank+of+China"+OR+PBoC+OR+PBOC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Global Central Banks', url: rss('https://news.google.com/rss/search?q=("rate+hike"+OR+"rate+cut"+OR+"interest+rate+decision")+central+bank+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  economic: [
    { name: 'Economic Data', url: rss('https://news.google.com/rss/search?q=(CPI+OR+inflation+OR+GDP+OR+"jobs+report"+OR+"nonfarm+payrolls"+OR+PMI)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trade & Tariffs', url: rss('https://news.google.com/rss/search?q=(tariff+OR+"trade+war"+OR+"trade+deficit"+OR+sanctions)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Housing Market', url: rss('https://news.google.com/rss/search?q=("housing+market"+OR+"home+prices"+OR+"mortgage+rates"+OR+REIT)+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  ipo: [
    { name: 'IPO News', url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC+OR+"direct+listing")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Earnings Reports', url: rss('https://news.google.com/rss/search?q=("earnings+report"+OR+"quarterly+earnings"+OR+"revenue+beat"+OR+"earnings+miss")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'M&A News', url: rss('https://news.google.com/rss/search?q=("merger"+OR+"acquisition"+OR+"takeover+bid"+OR+"buyout")+billion+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  derivatives: [
    { name: 'Options Market', url: rss('https://news.google.com/rss/search?q=("options+market"+OR+"options+trading"+OR+"put+call+ratio"+OR+VIX)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Futures Trading', url: rss('https://news.google.com/rss/search?q=("futures+trading"+OR+"S%26P+500+futures"+OR+"Nasdaq+futures")+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  fintech: [
    { name: 'Fintech News', url: rss('https://news.google.com/rss/search?q=(fintech+OR+"payment+technology"+OR+"neobank"+OR+"digital+banking")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trading Tech', url: rss('https://news.google.com/rss/search?q=("algorithmic+trading"+OR+"trading+platform"+OR+"quantitative+finance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Blockchain Finance', url: rss('https://news.google.com/rss/search?q=("blockchain+finance"+OR+"tokenization"+OR+"digital+securities"+OR+CBDC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'fin-regulation': [
    { name: 'SEC', url: rss('https://www.sec.gov/news/pressreleases.rss') },
    { name: 'Financial Regulation', url: rss('https://news.google.com/rss/search?q=(SEC+OR+CFTC+OR+FINRA+OR+FCA)+regulation+OR+enforcement+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Banking Rules', url: rss('https://news.google.com/rss/search?q=(Basel+OR+"capital+requirements"+OR+"banking+regulation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Crypto Regulation', url: rss('https://news.google.com/rss/search?q=(crypto+regulation+OR+"digital+asset"+regulation+OR+"stablecoin"+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  institutional: [
    { name: 'Hedge Fund News', url: rss('https://news.google.com/rss/search?q=("hedge+fund"+OR+"Bridgewater"+OR+"Citadel"+OR+"Renaissance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Private Equity', url: rss('https://news.google.com/rss/search?q=("private+equity"+OR+Blackstone+OR+KKR+OR+Apollo+OR+Carlyle)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Sovereign Wealth', url: rss('https://news.google.com/rss/search?q=("sovereign+wealth+fund"+OR+"pension+fund"+OR+"institutional+investor")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  analysis: [
    { name: 'Market Outlook', url: rss('https://news.google.com/rss/search?q=("market+outlook"+OR+"stock+market+forecast"+OR+"bull+market"+OR+"bear+market")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Risk & Volatility', url: rss('https://news.google.com/rss/search?q=(VIX+OR+"market+volatility"+OR+"risk+off"+OR+"market+correction")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bank Research', url: rss('https://news.google.com/rss/search?q=("Goldman+Sachs"+OR+"JPMorgan"+OR+"Morgan+Stanley")+forecast+OR+outlook+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  gccNews: [
    { name: 'Arabian Business', url: rss('https://news.google.com/rss/search?q=site:arabianbusiness.com+(Saudi+Arabia+OR+UAE+OR+GCC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'The National', url: rss('https://news.google.com/rss/search?q=site:thenationalnews.com+(Abu+Dhabi+OR+UAE+OR+Saudi)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Arab News', url: rss('https://news.google.com/rss/search?q=site:arabnews.com+(Saudi+Arabia+OR+investment+OR+infrastructure)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gulf FDI', url: rss('https://news.google.com/rss/search?q=(PIF+OR+"DP+World"+OR+Mubadala+OR+ADNOC+OR+Masdar+OR+"ACWA+Power")+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gulf Investments', url: rss('https://news.google.com/rss/search?q=("Saudi+Arabia"+OR+"UAE"+OR+"Abu+Dhabi")+investment+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Vision 2030', url: rss('https://news.google.com/rss/search?q="Vision+2030"+(project+OR+investment+OR+announced)+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
};

const HAPPY_FEEDS: Record<string, Feed[]> = {
  positive: [
    { name: 'Good News Network', url: rss('https://www.goodnewsnetwork.org/feed/') },
    { name: 'Positive.News', url: rss('https://www.positive.news/feed/') },
    { name: 'Reasons to be Cheerful', url: rss('https://reasonstobecheerful.world/feed/') },
    { name: 'Optimist Daily', url: rss('https://www.optimistdaily.com/feed/') },
    { name: 'Upworthy', url: rss('https://www.upworthy.com/feed/') },
    { name: 'DailyGood', url: rss('https://www.dailygood.org/feed') },
    { name: 'Good Good Good', url: rss('https://www.goodgoodgood.co/articles/rss.xml') },
    { name: 'GOOD Magazine', url: rss('https://www.good.is/feed/') },
    { name: 'Sunny Skyz', url: rss('https://www.sunnyskyz.com/rss_tebow.php') },
    { name: 'The Better India', url: rss('https://thebetterindia.com/feed/') },
  ],
  science: [
    { name: 'GNN Science', url: rss('https://www.goodnewsnetwork.org/category/news/science/feed/') },
    { name: 'ScienceDaily', url: rss('https://www.sciencedaily.com/rss/all.xml') },
    { name: 'Nature News', url: rss('https://www.nature.com/nature.rss') },
    { name: 'Live Science', url: rss('https://www.livescience.com/feeds.xml') },
    { name: 'New Scientist', url: rss('https://www.newscientist.com/feed/home/') },
    { name: 'Singularity Hub', url: rss('https://singularityhub.com/feed/') },
    { name: 'Human Progress', url: rss('https://humanprogress.org/feed/') },
    { name: 'Greater Good (Berkeley)', url: rss('https://greatergood.berkeley.edu/site/rss/articles') },
  ],
  nature: [
    { name: 'GNN Animals', url: rss('https://www.goodnewsnetwork.org/category/news/animals/feed/') },
    { name: 'GNN Earth', url: rss('https://www.goodnewsnetwork.org/category/news/earth/feed/') },
    { name: 'Mongabay', url: rss('https://news.mongabay.com/feed/') },
    { name: 'Conservation Optimism', url: rss('https://conservationoptimism.org/feed/') },
  ],
  inspiring: [
    { name: 'GNN Heroes', url: rss('https://www.goodnewsnetwork.org/category/news/inspiring/feed/') },
    { name: 'GNN Health', url: rss('https://www.goodnewsnetwork.org/category/news/health/feed/') },
    { name: 'GNN Heroes Spotlight', url: rss('https://www.goodnewsnetwork.org/category/news/heroes/feed/') },
  ],
  community: [
    { name: 'Shareable', url: rss('https://www.shareable.net/feed/') },
    { name: 'Yes! Magazine', url: rss('https://www.yesmagazine.org/feed') },
  ],
};

// Commodity variant feeds (from commodity.ts)
const COMMODITY_FEEDS: Record<string, Feed[]> = {
  'commodity-news': [
    // Kitco shut down their public RSS feeds in 2025 (every /rss/*, /news/feed,
    // /news/category/*/feed path now returns an HTML SPA page, not XML). Fall
    // back to Google News scoped to site:kitco.com, matching the pattern used
    // by TASS / Kyiv Independent / Telegraaf elsewhere in this file.
    { name: 'Kitco News', url: rss('https://news.google.com/rss/search?q=site:kitco.com+(gold+OR+silver+OR+metals)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Mining.com', url: rss('https://www.mining.com/feed/') },
    { name: 'Bloomberg Commodities', url: rss('https://news.google.com/rss/search?q=site:bloomberg.com+commodities+OR+metals+OR+mining+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Reuters Commodities', url: rss('https://news.google.com/rss/search?q=site:reuters.com+commodities+OR+metals+OR+mining+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'S&P Global Commodity', url: rss('https://news.google.com/rss/search?q=site:spglobal.com+commodities+metals+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // Commodity Trade Mantra REMOVED (PR #3715 review):
    // commoditytrademantra.com wholesale-403s any direct fetch AND Google News
    // returns 0 items for site:commoditytrademantra.com at every probed time
    // window (publisher effectively not indexed by Google News). commodity-news
    // still has Mining.com / Bloomberg / Reuters / S&P Global / CNBC —
    // coverage isn't lost.
    { name: 'CNBC Commodities', url: rss('https://news.google.com/rss/search?q=site:cnbc.com+(commodities+OR+metals+OR+gold+OR+copper)+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'gold-silver': [
    // Kitco RSS shutdown (see Kitco News comment in commodity-news above).
    // Gold-scoped Google News query targeting site:kitco.com.
    { name: 'Kitco Gold', url: rss('https://news.google.com/rss/search?q=site:kitco.com+gold+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gold Price News', url: rss('https://news.google.com/rss/search?q=(gold+price+OR+"gold+market"+OR+bullion+OR+LBMA)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Silver Price News', url: rss('https://news.google.com/rss/search?q=(silver+price+OR+"silver+market"+OR+"silver+futures")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Precious Metals', url: rss('https://news.google.com/rss/search?q=("precious+metals"+OR+platinum+OR+palladium+OR+"gold+ETF"+OR+GLD+OR+SLV)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'World Gold Council', url: rss('https://news.google.com/rss/search?q="World+Gold+Council"+OR+"central+bank+gold"+OR+"gold+reserves"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // GoldSeek + SilverSeek moved their feeds from the `news.*` subdomain to
    // the apex domain (the old subdomain returns 404; the apex /rss.xml on
    // both returns application/rss+xml).
    { name: 'GoldSeek', url: rss('https://www.goldseek.com/rss.xml') },
    { name: 'SilverSeek', url: rss('https://www.silverseek.com/rss.xml') },
    { name: 'Gold Silver Worlds', url: rss('https://goldsilverworlds.com/feed/') },
    // The /api/v1/.../feed endpoint FX Empire used to expose was deprecated;
    // their generic /feed now returns text/html, not RSS. Google News scoped
    // to site:fxempire.com for gold articles.
    { name: 'FX Empire Gold', url: rss('https://news.google.com/rss/search?q=site:fxempire.com+gold+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  energy: [
    { name: 'OilPrice.com', url: rss('https://oilprice.com/rss/main') },
    { name: 'Rigzone', url: rss('https://www.rigzone.com/news/rss/rigzone_latest.aspx') },
    { name: 'EIA Reports', url: rss('https://www.eia.gov/rss/press_room.xml') },
    { name: 'OPEC News', url: rss('https://news.google.com/rss/search?q=(OPEC+OR+"oil+price"+OR+"crude+oil"+OR+WTI+OR+Brent+OR+"oil+production")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Natural Gas News', url: rss('https://news.google.com/rss/search?q=("natural+gas"+OR+LNG+OR+"gas+price"+OR+"Henry+Hub")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Energy Intel', url: rss('https://news.google.com/rss/search?q=(energy+commodities+OR+"energy+market"+OR+"energy+prices")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Reuters Energy', url: rss('https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy)+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'mining-news': [
    // mining-journal.com migrated to Kreatio CMS; /feed/ now returns
    // text/html (the homepage SPA), not RSS — produces "Parse error for
    // Mining Journal" in the client. Google News fallback.
    { name: 'Mining Journal', url: rss('https://news.google.com/rss/search?q=site:mining-journal.com+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Northern Miner', url: rss('https://www.northernminer.com/feed/') },
    // www.miningweekly.com domain-wide 403s every IP-based fetch (homepage
    // included), not just Vercel edge — Railway relay likely wouldn't help.
    // Google News scoped to site:miningweekly.com is the reliable path and
    // matches the pattern used for other wholesale-blocked publishers.
    { name: 'Mining Weekly', url: rss('https://news.google.com/rss/search?q=site:miningweekly.com+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Mining Technology', url: rss('https://www.mining-technology.com/feed/') },
    { name: 'Australian Mining', url: rss('https://www.australianmining.com.au/feed/') },
    { name: 'Mine Web (SNL)', url: rss('https://news.google.com/rss/search?q=("mining+company"+OR+"mine+production"+OR+"mining+operations")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Resource World', url: rss('https://news.google.com/rss/search?q=("mining+project"+OR+"mineral+exploration"+OR+"mine+development")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'critical-minerals': [
    { name: 'Benchmark Mineral', url: rss('https://news.google.com/rss/search?q=("critical+minerals"+OR+"battery+metals"+OR+lithium+OR+cobalt+OR+"rare+earths")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Lithium Market', url: rss('https://news.google.com/rss/search?q=(lithium+price+OR+"lithium+market"+OR+"lithium+supply"+OR+spodumene+OR+LCE)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Cobalt Market', url: rss('https://news.google.com/rss/search?q=(cobalt+price+OR+"cobalt+market"+OR+"DRC+cobalt"+OR+"battery+cobalt")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Rare Earths News', url: rss('https://news.google.com/rss/search?q=("rare+earth"+OR+"rare+earths"+OR+"REE"+OR+neodymium+OR+praseodymium)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EV Battery Supply', url: rss('https://news.google.com/rss/search?q=("EV+battery"+OR+"battery+supply+chain"+OR+"battery+materials")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'IEA Critical Minerals', url: rss('https://news.google.com/rss/search?q=site:iea.org+(minerals+OR+critical+OR+battery)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Uranium Market', url: rss('https://news.google.com/rss/search?q=(uranium+price+OR+"uranium+market"+OR+U3O8+OR+nuclear+fuel)+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'base-metals': [
    { name: 'LME Metals', url: rss('https://news.google.com/rss/search?q=(LME+OR+"London+Metal+Exchange")+copper+OR+aluminum+OR+zinc+OR+nickel+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Copper Market', url: rss('https://news.google.com/rss/search?q=(copper+price+OR+"copper+market"+OR+"copper+supply"+OR+COMEX+copper)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Nickel News', url: rss('https://news.google.com/rss/search?q=(nickel+price+OR+"nickel+market"+OR+"nickel+supply"+OR+Indonesia+nickel)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Aluminum & Zinc', url: rss('https://news.google.com/rss/search?q=(aluminum+price+OR+aluminium+OR+zinc+price+OR+"base+metals")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Iron Ore Market', url: rss('https://news.google.com/rss/search?q=("iron+ore"+price+OR+"iron+ore+market"+OR+"steel+raw+materials")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Metals Bulletin', url: rss('https://news.google.com/rss/search?q=("metals+market"+OR+"base+metals"+OR+SHFE+OR+"Shanghai+Futures")+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'mining-companies': [
    { name: 'BHP News', url: rss('https://news.google.com/rss/search?q=BHP+(mining+OR+production+OR+results+OR+copper+OR+"iron+ore")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Rio Tinto News', url: rss('https://news.google.com/rss/search?q="Rio+Tinto"+(mining+OR+production+OR+results+OR+Pilbara)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Glencore & Vale', url: rss('https://news.google.com/rss/search?q=(Glencore+OR+Vale)+(mining+OR+production+OR+cobalt+OR+"iron+ore")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gold Majors', url: rss('https://news.google.com/rss/search?q=(Newmont+OR+Barrick+OR+AngloGold+OR+Agnico)+(gold+mine+OR+production+OR+results)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Freeport & Copper Miners', url: rss('https://news.google.com/rss/search?q=(Freeport+McMoRan+OR+Southern+Copper+OR+Teck+OR+Antofagasta)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Critical Mineral Companies', url: rss('https://news.google.com/rss/search?q=(Albemarle+OR+SQM+OR+"MP+Materials"+OR+Lynas+OR+Cameco)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'supply-chain': [
    { name: 'Shipping & Freight', url: rss('https://news.google.com/rss/search?q=("bulk+carrier"+OR+"dry+bulk"+OR+"commodity+shipping"+OR+"Port+Hedland"+OR+"Strait+of+Hormuz")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trade Routes', url: rss('https://news.google.com/rss/search?q=("trade+route"+OR+"supply+chain"+OR+"commodity+export"+OR+"mineral+export")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'China Commodity Imports', url: rss('https://news.google.com/rss/search?q=(China+imports+copper+OR+iron+ore+OR+lithium+OR+cobalt+OR+"rare+earth")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Port & Logistics', url: rss('https://news.google.com/rss/search?q=("iron+ore+port"+OR+"copper+port"+OR+"commodity+port"+OR+"mineral+logistics")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'commodity-regulation': [
    { name: 'Mining Regulation', url: rss('https://news.google.com/rss/search?q=("mining+regulation"+OR+"mining+policy"+OR+"mining+permit"+OR+"mining+ban")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'ESG in Mining', url: rss('https://news.google.com/rss/search?q=("mining+ESG"+OR+"responsible+mining"+OR+"mine+closure"+OR+"tailings")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trade & Tariffs', url: rss('https://news.google.com/rss/search?q=("mineral+tariff"+OR+"metals+tariff"+OR+"critical+mineral+policy"+OR+"mining+export+ban")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Indonesia Nickel Policy', url: rss('https://news.google.com/rss/search?q=(Indonesia+nickel+OR+"nickel+export"+OR+"nickel+ban"+OR+"nickel+processing")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'China Mineral Policy', url: rss('https://news.google.com/rss/search?q=(China+"rare+earth"+OR+"mineral+export"+OR+"critical+mineral")+policy+OR+restriction+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  markets: [
    { name: 'Yahoo Finance Commodities', url: rss('https://finance.yahoo.com/rss/topstories') },
    { name: 'CNBC Markets', url: rss('https://www.cnbc.com/id/100003114/device/rss/rss.html') },
    { name: 'Seeking Alpha Metals', url: rss('https://news.google.com/rss/search?q=site:seekingalpha.com+(gold+OR+silver+OR+copper+OR+mining)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Commodity Futures', url: rss('https://news.google.com/rss/search?q=(COMEX+OR+NYMEX+OR+"commodity+futures"+OR+CME+commodities)+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  finance: [
    { name: 'CNBC', url: rss('https://www.cnbc.com/id/100003114/device/rss/rss.html') },
    { name: 'MarketWatch', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/news/rssindex') },
    { name: 'Financial Times', url: rss('https://www.ft.com/rss/home') },
    { name: 'Reuters Business', url: rss('https://news.google.com/rss/search?q=site:reuters.com+business+markets&hl=en-US&gl=US&ceid=US:en') },
  ],
};

// Energy variant feeds — energy.worldmonitor.app
// Keys are matched against panel IDs in src/config/panels.ts ENERGY_PANELS +
// brief news-category overrides in src/app/data-loader.ts. Keep in sync when
// ENERGY_PANELS changes.
const ENERGY_FEEDS: Record<string, Feed[]> = {
  'live-news': [
    { name: 'OilPrice.com',          url: rss('https://oilprice.com/rss/main') },
    { name: 'Rigzone',               url: rss('https://www.rigzone.com/news/rss/rigzone_latest.aspx') },
    { name: 'Reuters Energy',        url: rss('https://news.google.com/rss/search?q=site:reuters.com+(oil+OR+gas+OR+energy+OR+OPEC+OR+pipeline+OR+LNG)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bloomberg Energy',      url: rss('https://news.google.com/rss/search?q=site:bloomberg.com+(oil+OR+gas+OR+energy+OR+pipeline+OR+LNG)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'FT Energy',             url: rss('https://news.google.com/rss/search?q=site:ft.com+(oil+OR+gas+OR+energy+OR+LNG+OR+OPEC)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'IEA News',              url: rss('https://news.google.com/rss/search?q=site:iea.org+(oil+OR+gas+OR+energy)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'S&P Global Platts',     url: rss('https://news.google.com/rss/search?q=site:spglobal.com+(oil+OR+gas+OR+LNG+OR+pipeline)+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  energy: [
    { name: 'OilPrice.com',          url: rss('https://oilprice.com/rss/main') },
    { name: 'Rigzone',               url: rss('https://www.rigzone.com/news/rss/rigzone_latest.aspx') },
    { name: 'EIA Press Room',        url: rss('https://www.eia.gov/rss/press_room.xml') },
    { name: 'OPEC & Crude',          url: rss('https://news.google.com/rss/search?q=(OPEC+OR+"oil+price"+OR+"crude+oil"+OR+WTI+OR+Brent+OR+"oil+production"+OR+"oil+inventory")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Natural Gas & LNG',     url: rss('https://news.google.com/rss/search?q=("natural+gas"+OR+LNG+OR+"gas+price"+OR+"Henry+Hub"+OR+TTF+OR+JKM+OR+"LNG+cargo")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Pipelines & Chokepoints', url: rss('https://news.google.com/rss/search?q=(pipeline+OR+Druzhba+OR+"Nord+Stream"+OR+TurkStream+OR+"Strait+of+Hormuz"+OR+"Bab+el-Mandeb"+OR+"Suez+Canal"+OR+"Power+of+Siberia")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Energy Crisis & Shortages', url: rss('https://news.google.com/rss/search?q=("fuel+shortage"+OR+"gas+shortage"+OR+"diesel+shortage"+OR+"jet+fuel+shortage"+OR+"energy+crisis"+OR+rationing+OR+"petrol+shortage")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Refinery & Disruptions', url: rss('https://news.google.com/rss/search?q=(refinery+OR+"refinery+outage"+OR+"force+majeure"+OR+"pipeline+sabotage"+OR+"pipeline+attack")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Energy Intel',          url: rss('https://news.google.com/rss/search?q=(energy+commodities+OR+"energy+market"+OR+"energy+prices"+OR+"energy+security")+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  'supply-chain': [
    { name: 'Tanker & Shipping', url: rss('https://news.google.com/rss/search?q=(tanker+OR+VLCC+OR+Suezmax+OR+Aframax+OR+"oil+shipping"+OR+"LNG+carrier"+OR+"shadow+fleet")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Strategic Chokepoints', url: rss('https://news.google.com/rss/search?q=("Strait+of+Hormuz"+OR+"Strait+of+Malacca"+OR+"Bab+el-Mandeb"+OR+"Suez+Canal"+OR+"Panama+Canal"+OR+"Turkish+Straits"+OR+"Danish+Straits")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Energy Sanctions',  url: rss('https://news.google.com/rss/search?q=("oil+sanctions"+OR+"gas+sanctions"+OR+"price+cap"+OR+"energy+embargo"+OR+"LNG+sanctions")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Port & Terminal',   url: rss('https://news.google.com/rss/search?q=("LNG+terminal"+OR+"crude+terminal"+OR+"oil+port"+OR+"Ras+Laffan"+OR+"Sabine+Pass"+OR+"Rotterdam+oil")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
};

// Variant-aware exports
export const FEEDS = SITE_VARIANT === 'tech'
  ? TECH_FEEDS
  : SITE_VARIANT === 'finance'
    ? FINANCE_FEEDS
    : SITE_VARIANT === 'happy'
      ? HAPPY_FEEDS
      : SITE_VARIANT === 'commodity'
        ? COMMODITY_FEEDS
        : SITE_VARIANT === 'energy'
          ? ENERGY_FEEDS
          : FULL_FEEDS;

// Canonical category→feeds map: the union of every variant's feed set.
// `FEEDS` (above) is just the active variant's PRESET; users freely customize
// their panel set, so any enabled news panel must be able to resolve its feeds
// regardless of which variant it "belongs" to. Consumers:
//  • data-loader `loadNews()` — loads preset categories + custom enabled panels
//  • panel-layout — creates a NewsPanel for any enabled category, not just preset
// See src/config/feed-resolution.ts for the merge + resolution helpers.
export const CANONICAL_FEEDS: Record<string, Feed[]> = mergeCanonicalFeeds([
  FULL_FEEDS,
  TECH_FEEDS,
  FINANCE_FEEDS,
  COMMODITY_FEEDS,
  ENERGY_FEEDS,
  HAPPY_FEEDS,
]);

export const SOURCE_REGION_MAP: Record<string, { labelKey: string; feedKeys: string[] }> = {
  // Full (geopolitical) variant regions
  worldwide: { labelKey: 'header.sourceRegionWorldwide', feedKeys: ['politics', 'crisis'] },
  us: { labelKey: 'header.sourceRegionUS', feedKeys: ['us', 'gov'] },
  europe: { labelKey: 'header.sourceRegionEurope', feedKeys: ['europe'] },
  middleeast: { labelKey: 'header.sourceRegionMiddleEast', feedKeys: ['middleeast'] },
  africa: { labelKey: 'header.sourceRegionAfrica', feedKeys: ['africa'] },
  latam: { labelKey: 'header.sourceRegionLatAm', feedKeys: ['latam'] },
  asia: { labelKey: 'header.sourceRegionAsiaPacific', feedKeys: ['asia'] },
  topical: { labelKey: 'header.sourceRegionTopical', feedKeys: ['energy', 'tech', 'ai', 'finance', 'layoffs', 'thinktanks'] },
  intel: { labelKey: 'header.sourceRegionIntel', feedKeys: [] },

  // Tech variant regions
  techNews: { labelKey: 'header.sourceRegionTechNews', feedKeys: ['tech', 'hardware'] },
  aiMl: { labelKey: 'header.sourceRegionAiMl', feedKeys: ['ai'] },
  startupsVc: { labelKey: 'header.sourceRegionStartupsVc', feedKeys: ['startups', 'vcblogs', 'funding', 'unicorns', 'accelerators', 'ipo'] },
  regionalTech: { labelKey: 'header.sourceRegionRegionalTech', feedKeys: ['regionalStartups'] },
  developer: { labelKey: 'header.sourceRegionDeveloper', feedKeys: ['github', 'cloud', 'dev', 'producthunt', 'outages'] },
  cybersecurity: { labelKey: 'header.sourceRegionCybersecurity', feedKeys: ['security'] },
  techPolicy: { labelKey: 'header.sourceRegionTechPolicy', feedKeys: ['policy', 'thinktanks'] },
  techMedia: { labelKey: 'header.sourceRegionTechMedia', feedKeys: ['podcasts', 'layoffs', 'finance'] },

  // Finance variant regions
  marketsAnalysis: { labelKey: 'header.sourceRegionMarkets', feedKeys: ['markets', 'analysis', 'ipo'] },
  fixedIncomeFx: { labelKey: 'header.sourceRegionFixedIncomeFx', feedKeys: ['forex', 'bonds'] },
  commoditiesRegion: { labelKey: 'header.sourceRegionCommodities', feedKeys: ['commodities'] },
  cryptoDigital: { labelKey: 'header.sourceRegionCryptoDigital', feedKeys: ['crypto', 'fintech'] },
  centralBanksEcon: { labelKey: 'header.sourceRegionCentralBanks', feedKeys: ['centralbanks', 'economic'] },
  dealsCorpFin: { labelKey: 'header.sourceRegionDeals', feedKeys: ['institutional', 'derivatives'] },
  finRegulation: { labelKey: 'header.sourceRegionFinRegulation', feedKeys: ['fin-regulation'] },
  gulfMena: { labelKey: 'header.sourceRegionGulfMena', feedKeys: ['gccNews'] },
};

// Tech/AI variant feeds
const TECH_FEEDS: Record<string, Feed[]> = {
  tech: [
    { name: 'TechCrunch', url: rss('https://techcrunch.com/feed/') },
    { name: 'The Verge', url: rss('https://www.theverge.com/rss/index.xml') },
    { name: 'Ars Technica', url: rss('https://feeds.arstechnica.com/arstechnica/technology-lab') },
    { name: 'Hacker News', url: rss('https://hnrss.org/frontpage') },
    { name: 'MIT Tech Review', url: rss('https://www.technologyreview.com/feed/') },
    { name: 'ZDNet', url: rss('https://www.zdnet.com/news/rss.xml') },
    { name: 'TechMeme', url: rss('https://www.techmeme.com/feed.xml') },
    { name: 'Engadget', url: rss('https://www.engadget.com/rss.xml') },
    { name: 'Fast Company', url: rss('https://feeds.feedburner.com/fastcompany/headlines') },
  ],
  ai: [
    { name: 'AI News', url: rss('https://news.google.com/rss/search?q=(OpenAI+OR+Anthropic+OR+Google+AI+OR+"large+language+model"+OR+ChatGPT+OR+Claude+OR+"AI+model")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VentureBeat AI', url: rss('https://venturebeat.com/category/ai/feed/') },
    { name: 'The Verge AI', url: rss('https://www.theverge.com/rss/ai-artificial-intelligence/index.xml') },
    { name: 'MIT Tech Review AI', url: rss('https://www.technologyreview.com/topic/artificial-intelligence/feed') },
    { name: 'MIT Research', url: rss('https://news.mit.edu/rss/research') },
    { name: 'ArXiv AI', url: rss('https://export.arxiv.org/rss/cs.AI') },
    { name: 'ArXiv ML', url: rss('https://export.arxiv.org/rss/cs.LG') },
    { name: 'AI Weekly', url: rss('https://news.google.com/rss/search?q="artificial+intelligence"+OR+"machine+learning"+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Anthropic News', url: rss('https://news.google.com/rss/search?q=Anthropic+Claude+AI+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'OpenAI News', url: rss('https://news.google.com/rss/search?q=OpenAI+ChatGPT+GPT-4+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  startups: [
    { name: 'TechCrunch Startups', url: rss('https://techcrunch.com/category/startups/feed/') },
    { name: 'VentureBeat', url: rss('https://venturebeat.com/feed/') },
    { name: 'Crunchbase News', url: rss('https://news.crunchbase.com/feed/') },
    { name: 'SaaStr', url: rss('https://www.saastr.com/feed/') },
    { name: 'AngelList News', url: rss('https://news.google.com/rss/search?q=site:angellist.com+OR+"AngelList"+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TechCrunch Venture', url: rss('https://techcrunch.com/category/venture/feed/') },
    { name: 'The Information', url: rss('https://news.google.com/rss/search?q=site:theinformation.com+startup+OR+funding+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Fortune Term Sheet', url: rss('https://news.google.com/rss/search?q="Term+Sheet"+venture+capital+OR+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'PitchBook News', url: rss('https://news.google.com/rss/search?q=site:pitchbook.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CB Insights', url: rss('https://www.cbinsights.com/research/feed/') },
  ],
  vcblogs: [
    { name: 'Y Combinator Blog', url: rss('https://www.ycombinator.com/blog/rss/') },
    { name: 'a16z Blog', url: rss('https://news.google.com/rss/search?q=site:a16z.com+OR+"Andreessen+Horowitz"+blog+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Sequoia Blog', url: rss('https://news.google.com/rss/search?q=site:sequoiacap.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Paul Graham Essays', url: rss('https://news.google.com/rss/search?q="Paul+Graham"+essay+OR+blog+when:30d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VC Insights', url: rss('https://news.google.com/rss/search?q=("venture+capital"+insights+OR+"VC+trends"+OR+"startup+advice")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Lenny\'s Newsletter', url: rss('https://www.lennysnewsletter.com/feed') },
    { name: 'Stratechery', url: rss('https://stratechery.com/feed/') },
    { name: 'FwdStart Newsletter', url: '/api/fwdstart' },
  ],
  regionalStartups: [
    // Europe
    { name: 'EU Startups', url: rss('https://news.google.com/rss/search?q=site:eu-startups.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech.eu', url: rss('https://tech.eu/feed/') },
    { name: 'Sifted (Europe)', url: rss('https://sifted.eu/feed') },
    { name: 'The Next Web', url: rss('https://news.google.com/rss/search?q=site:thenextweb.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Asia - General
    { name: 'Tech in Asia', url: rss('https://news.google.com/rss/search?q=site:techinasia.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'KrASIA', url: rss('https://news.google.com/rss/search?q=site:kr-asia.com+OR+KrASIA+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'SEA Startups', url: rss('https://news.google.com/rss/search?q=(Singapore+OR+Indonesia+OR+Vietnam+OR+Thailand+OR+Malaysia)+startup+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asia VC News', url: rss('https://news.google.com/rss/search?q=("Southeast+Asia"+OR+ASEAN)+venture+capital+OR+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // China
    { name: 'China Startups', url: rss('https://news.google.com/rss/search?q=China+startup+funding+OR+"Chinese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: '36Kr English', url: rss('https://news.google.com/rss/search?q=site:36kr.com+OR+"36Kr"+startup+china+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'China Tech Giants', url: rss('https://news.google.com/rss/search?q=(Alibaba+OR+Tencent+OR+ByteDance+OR+Baidu+OR+JD.com+OR+Xiaomi+OR+Huawei)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // Japan
    { name: 'Japan Startups', url: rss('https://news.google.com/rss/search?q=Japan+startup+funding+OR+"Japanese+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Japan Tech News', url: rss('https://news.google.com/rss/search?q=(Japan+startup+OR+Japan+tech+OR+SoftBank+OR+Rakuten+OR+Sony)+funding+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Nikkei Tech', url: rss('https://news.google.com/rss/search?q=site:asia.nikkei.com+technology+when:3d&hl=en-US&gl=US&ceid=US:en') },
    // Korea
    { name: 'Korea Tech News', url: rss('https://news.google.com/rss/search?q=(Korea+startup+OR+Korean+tech+OR+Samsung+OR+Kakao+OR+Naver+OR+Coupang)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Korea Startups', url: rss('https://news.google.com/rss/search?q=Korea+startup+funding+OR+"Korean+unicorn"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India
    { name: 'Inc42 (India)', url: rss('https://inc42.com/feed/') },
    { name: 'YourStory', url: rss('https://yourstory.com/feed') },
    { name: 'India Startups', url: rss('https://news.google.com/rss/search?q=India+startup+funding+OR+"Indian+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'India Tech News', url: rss('https://news.google.com/rss/search?q=(Flipkart+OR+Razorpay+OR+Zerodha+OR+Zomato+OR+Paytm+OR+PhonePe)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Southeast Asia
    { name: 'SEA Tech News', url: rss('https://news.google.com/rss/search?q=(Grab+OR+GoTo+OR+Sea+Limited+OR+Shopee+OR+Tokopedia)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Vietnam Tech', url: rss('https://news.google.com/rss/search?q=Vietnam+startup+OR+Vietnam+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Indonesia Tech', url: rss('https://news.google.com/rss/search?q=Indonesia+startup+OR+Indonesia+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Taiwan
    { name: 'Taiwan Tech', url: rss('https://news.google.com/rss/search?q=(Taiwan+startup+OR+TSMC+OR+MediaTek+OR+Foxconn)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Latin America
    { name: 'LAVCA (LATAM)', url: rss('https://news.google.com/rss/search?q=site:lavca.org+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'LATAM Startups', url: rss('https://news.google.com/rss/search?q=("Latin+America"+startup+OR+LATAM+funding)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startups LATAM', url: rss('https://news.google.com/rss/search?q=(startup+Brazil+OR+startup+Mexico+OR+startup+Argentina+OR+startup+Colombia+OR+startup+Chile)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Brazil Tech', url: rss('https://news.google.com/rss/search?q=(Nubank+OR+iFood+OR+Mercado+Libre+OR+Rappi+OR+VTEX)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'FinTech LATAM', url: rss('https://news.google.com/rss/search?q=fintech+(Brazil+OR+Mexico+OR+Argentina+OR+"Latin+America")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Africa
    { name: 'TechCabal (Africa)', url: rss('https://techcabal.com/feed/') },
    { name: 'Disrupt Africa', url: rss('https://news.google.com/rss/search?q=site:disrupt-africa.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Africa Startups', url: rss('https://news.google.com/rss/search?q=Africa+startup+funding+OR+"African+startup"+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Africa Tech News', url: rss('https://news.google.com/rss/search?q=(Flutterwave+OR+Paystack+OR+Jumia+OR+Andela+OR+"Africa+startup")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Middle East
    { name: 'MENA Startups', url: rss('https://news.google.com/rss/search?q=(MENA+startup+OR+"Middle+East"+funding+OR+Gulf+startup)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'MENA Tech News', url: rss('https://news.google.com/rss/search?q=(UAE+startup+OR+Saudi+tech+OR+Dubai+startup+OR+NEOM+tech)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  github: [
    { name: 'GitHub Blog', url: rss('https://github.blog/feed/') },
    { name: 'GitHub Trending', url: rss('https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml') },
    { name: 'Show HN', url: rss('https://hnrss.org/show') },
    { name: 'YC Launches', url: rss('https://news.google.com/rss/search?q=("Y+Combinator"+OR+"YC+launch"+OR+"YC+W25"+OR+"YC+S25")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Dev Events', url: rss('https://news.google.com/rss/search?q=("developer+conference"+OR+"tech+summit"+OR+"devcon"+OR+"developer+event")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Open Source News', url: rss('https://news.google.com/rss/search?q="open+source"+project+release+OR+launch+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  ipo: [
    { name: 'IPO News', url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC)+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Renaissance IPO', url: rss('https://news.google.com/rss/search?q=site:renaissancecapital.com+IPO+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech IPO News', url: rss('https://news.google.com/rss/search?q=tech+IPO+OR+"tech+company"+IPO+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  funding: [
    { name: 'SEC Filings', url: rss('https://news.google.com/rss/search?q=(S-1+OR+"IPO+filing"+OR+"SEC+filing")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'VC News', url: rss('https://news.google.com/rss/search?q=("Series+A"+OR+"Series+B"+OR+"Series+C"+OR+"funding+round"+OR+"venture+capital")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Seed & Pre-Seed', url: rss('https://news.google.com/rss/search?q=("seed+round"+OR+"pre-seed"+OR+"angel+round"+OR+"seed+funding")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startup Funding', url: rss('https://news.google.com/rss/search?q=("startup+funding"+OR+"raised+funding"+OR+"raised+$"+OR+"funding+announced")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  producthunt: [
    { name: 'Product Hunt', url: rss('https://www.producthunt.com/feed') },
  ],
  outages: [
    { name: 'AWS Status', url: rss('https://news.google.com/rss/search?q=AWS+outage+OR+"Amazon+Web+Services"+down+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Cloud Outages', url: rss('https://news.google.com/rss/search?q=(Azure+OR+GCP+OR+Cloudflare+OR+Slack+OR+GitHub)+outage+OR+down+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  security: [
    { name: 'Krebs Security', url: rss('https://krebsonsecurity.com/feed/') },
    { name: 'The Hacker News', url: rss('https://feeds.feedburner.com/TheHackersNews') },
    { name: 'Dark Reading', url: rss('https://www.darkreading.com/rss.xml') },
    { name: 'Schneier', url: rss('https://www.schneier.com/feed/') },
  ],
  policy: [
    // US Policy
    { name: 'Politico Tech', url: rss('https://rss.politico.com/technology.xml') },
    { name: 'AI Regulation', url: rss('https://news.google.com/rss/search?q=AI+regulation+OR+"artificial+intelligence"+law+OR+policy+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Tech Antitrust', url: rss('https://news.google.com/rss/search?q=tech+antitrust+OR+FTC+Google+OR+FTC+Apple+OR+FTC+Amazon+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EFF News', url: rss('https://news.google.com/rss/search?q=site:eff.org+OR+"Electronic+Frontier+Foundation"+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // EU Digital Policy
    { name: 'EU Digital Policy', url: rss('https://news.google.com/rss/search?q=("Digital+Services+Act"+OR+"Digital+Markets+Act"+OR+"EU+AI+Act"+OR+"GDPR")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Euractiv Digital', url: rss('https://news.google.com/rss/search?q=site:euractiv.com+digital+OR+tech+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EU Commission Digital', url: rss('https://news.google.com/rss/search?q=site:ec.europa.eu+digital+OR+technology+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // China Tech Policy
    { name: 'China Tech Policy', url: rss('https://news.google.com/rss/search?q=(China+tech+regulation+OR+China+AI+policy+OR+MIIT+technology)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // UK Policy
    { name: 'UK Tech Policy', url: rss('https://news.google.com/rss/search?q=(UK+AI+safety+OR+"Online+Safety+Bill"+OR+UK+tech+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // India Policy
    { name: 'India Tech Policy', url: rss('https://news.google.com/rss/search?q=(India+tech+regulation+OR+India+data+protection+OR+India+AI+policy)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  thinktanks: [
    // US Think Tanks
    { name: 'Brookings Tech', url: rss('https://news.google.com/rss/search?q=site:brookings.edu+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CSIS Tech', url: rss('https://news.google.com/rss/search?q=site:csis.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'MIT Tech Policy', url: rss('https://news.google.com/rss/search?q=site:techpolicypress.org+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Stanford HAI', url: rss('https://news.google.com/rss/search?q=site:hai.stanford.edu+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'AI Now Institute', url: rss('https://news.google.com/rss/search?q=site:ainowinstitute.org+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Europe Think Tanks
    { name: 'OECD Digital', url: rss('https://news.google.com/rss/search?q=site:oecd.org+digital+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'EU Tech Policy', url: rss('https://news.google.com/rss/search?q=("EU+tech+policy"+OR+"European+digital"+OR+Bruegel+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Chatham House Tech', url: rss('https://news.google.com/rss/search?q=site:chathamhouse.org+technology+OR+AI+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Asia Think Tanks
    { name: 'ISEAS (Singapore)', url: rss('https://news.google.com/rss/search?q=site:iseas.edu.sg+technology+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'ORF Tech (India)', url: rss('https://news.google.com/rss/search?q=(India+tech+policy+OR+ORF+technology+OR+"Observer+Research+Foundation"+tech)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'RIETI (Japan)', url: rss('https://news.google.com/rss/search?q=site:rieti.go.jp+technology+when:30d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Asia Pacific Tech', url: rss('https://news.google.com/rss/search?q=("Asia+Pacific"+tech+policy+OR+"Lowy+Institute"+technology)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // China Research (External Views)
    { name: 'China Tech Analysis', url: rss('https://news.google.com/rss/search?q=("China+tech+strategy"+OR+"Chinese+AI"+OR+"China+semiconductor")+analysis+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DigiChina', url: rss('https://news.google.com/rss/search?q=site:digichina.stanford.edu+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
  finance: [
    { name: 'CNBC Tech', url: rss('https://www.cnbc.com/id/19854910/device/rss/rss.html') },
    { name: 'MarketWatch Tech', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+technology+markets+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/rss/topstories') },
    { name: 'Seeking Alpha Tech', url: rss('https://seekingalpha.com/market_currents.xml') },
  ],
  hardware: [
    { name: "Tom's Hardware", url: rss('https://www.tomshardware.com/feeds/all') },
    { name: 'SemiAnalysis', url: rss('https://news.google.com/rss/search?q=site:semianalysis.com+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Semiconductor News', url: rss('https://news.google.com/rss/search?q=semiconductor+OR+chip+OR+TSMC+OR+NVIDIA+OR+Intel+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  cloud: [
    { name: 'InfoQ', url: rss('https://feed.infoq.com/') },
    { name: 'The New Stack', url: rss('https://thenewstack.io/feed/') },
    { name: 'DevOps.com', url: rss('https://devops.com/feed/') },
  ],
  dev: [
    { name: 'Dev.to', url: rss('https://dev.to/feed') },
    { name: 'Lobsters', url: rss('https://lobste.rs/rss') },
    { name: 'Changelog', url: rss('https://changelog.com/feed') },
  ],
  layoffs: [
    { name: 'Layoffs.fyi', url: rss('https://news.google.com/rss/search?q=tech+layoffs+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TechCrunch Layoffs', url: rss('https://techcrunch.com/tag/layoffs/feed/') },
  ],
  unicorns: [
    { name: 'Unicorn News', url: rss('https://news.google.com/rss/search?q=("unicorn+startup"+OR+"unicorn+valuation"+OR+"$1+billion+valuation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'CB Insights Unicorn', url: rss('https://news.google.com/rss/search?q=site:cbinsights.com+unicorn+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Decacorn News', url: rss('https://news.google.com/rss/search?q=("decacorn"+OR+"$10+billion+valuation"+OR+"$10B+valuation")+startup+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'New Unicorns', url: rss('https://news.google.com/rss/search?q=("becomes+unicorn"+OR+"joins+unicorn"+OR+"reaches+unicorn"+OR+"achieved+unicorn")+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
  accelerators: [
    { name: 'Techstars News', url: rss('https://news.google.com/rss/search?q=Techstars+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: '500 Global News', url: rss('https://news.google.com/rss/search?q="500+Global"+OR+"500+Startups"+accelerator+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Demo Day News', url: rss('https://news.google.com/rss/search?q=("demo+day"+OR+"YC+batch"+OR+"accelerator+batch")+startup+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startup School', url: rss('https://news.google.com/rss/search?q="Startup+School"+OR+"YC+Startup+School"+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
  podcasts: [
    // Tech Podcast Episodes (via Google News - podcast hosts block RSS proxies)
    { name: 'Acquired Episodes', url: rss('https://news.google.com/rss/search?q="Acquired+podcast"+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'All-In Podcast', url: rss('https://news.google.com/rss/search?q="All-In+podcast"+(Chamath+OR+Sacks+OR+Friedberg)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'a16z Insights', url: rss('https://news.google.com/rss/search?q=("a16z"+OR+"Andreessen+Horowitz")+podcast+OR+interview+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'TWIST Episodes', url: rss('https://news.google.com/rss/search?q="This+Week+in+Startups"+Jason+Calacanis+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: '20VC Episodes', url: rss('https://news.google.com/rss/search?q="20+Minute+VC"+Harry+Stebbings+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Lex Fridman Tech', url: rss('https://news.google.com/rss/search?q=("Lex+Fridman"+interview)+(AI+OR+tech+OR+startup+OR+CEO)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    // Tech Media Shows
    { name: 'Verge Shows', url: rss('https://news.google.com/rss/search?q=("Vergecast"+OR+"Decoder+podcast"+Verge)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Hard Fork (NYT)', url: rss('https://news.google.com/rss/search?q="Hard+Fork"+podcast+NYT+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Pivot Podcast', url: rss('https://news.google.com/rss/search?q="Pivot+podcast"+(Kara+Swisher+OR+Scott+Galloway)+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Newsletters
    { name: 'Tech Newsletters', url: rss('https://news.google.com/rss/search?q=("Benedict+Evans"+OR+"Pragmatic+Engineer"+OR+Stratechery)+tech+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // AI Podcasts & Shows
    { name: 'AI Podcasts', url: rss('https://news.google.com/rss/search?q=("AI+podcast"+OR+"artificial+intelligence+podcast")+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'AI Interviews', url: rss('https://news.google.com/rss/search?q=(NVIDIA+OR+OpenAI+OR+Anthropic+OR+DeepMind)+interview+OR+podcast+when:14d&hl=en-US&gl=US&ceid=US:en') },
    // Startup Shows
    { name: 'How I Built This', url: rss('https://news.google.com/rss/search?q="How+I+Built+This"+Guy+Raz+when:14d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Startup Podcasts', url: rss('https://news.google.com/rss/search?q=("Masters+of+Scale"+OR+"The+Pitch+podcast"+OR+"startup+podcast")+episode+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
};

// Finance/Trading variant feeds (all free RSS / Google News proxies)
const FINANCE_FEEDS: Record<string, Feed[]> = {
  markets: [
    { name: 'CNBC', url: rss('https://www.cnbc.com/id/100003114/device/rss/rss.html') },
    // Direct MarketWatch RSS returns frequent 403s from cloud IPs; use Google News fallback.
    { name: 'MarketWatch', url: rss('https://news.google.com/rss/search?q=site:marketwatch.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Yahoo Finance', url: rss('https://finance.yahoo.com/rss/topstories') },
    { name: 'Seeking Alpha', url: rss('https://seekingalpha.com/market_currents.xml') },
    { name: 'Reuters Markets', url: rss('https://news.google.com/rss/search?q=site:reuters.com+markets+stocks+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bloomberg Markets', url: rss('https://news.google.com/rss/search?q=site:bloomberg.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Investing.com News', url: rss('https://news.google.com/rss/search?q=site:investing.com+markets+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  forex: [
    { name: 'Forex News', url: rss('https://news.google.com/rss/search?q=("forex"+OR+"currency"+OR+"FX+market")+trading+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Dollar Watch', url: rss('https://news.google.com/rss/search?q=("dollar+index"+OR+DXY+OR+"US+dollar"+OR+"euro+dollar")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Central Bank Rates', url: rss('https://news.google.com/rss/search?q=("central+bank"+OR+"interest+rate"+OR+"rate+decision"+OR+"monetary+policy")+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  bonds: [
    { name: 'Bond Market', url: rss('https://news.google.com/rss/search?q=("bond+market"+OR+"treasury+yields"+OR+"bond+yields"+OR+"fixed+income")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Treasury Watch', url: rss('https://news.google.com/rss/search?q=("US+Treasury"+OR+"Treasury+auction"+OR+"10-year+yield"+OR+"2-year+yield")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Corporate Bonds', url: rss('https://news.google.com/rss/search?q=("corporate+bond"+OR+"high+yield"+OR+"investment+grade"+OR+"credit+spread")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  commodities: [
    { name: 'Oil & Gas', url: rss('https://news.google.com/rss/search?q=(oil+price+OR+OPEC+OR+"natural+gas"+OR+"crude+oil"+OR+WTI+OR+Brent)+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gold & Metals', url: rss('https://news.google.com/rss/search?q=(gold+price+OR+silver+price+OR+copper+OR+platinum+OR+"precious+metals")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Agriculture', url: rss('https://news.google.com/rss/search?q=(wheat+OR+corn+OR+soybeans+OR+coffee+OR+sugar)+price+OR+commodity+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Commodity Trading', url: rss('https://news.google.com/rss/search?q=("commodity+trading"+OR+"futures+market"+OR+CME+OR+NYMEX+OR+COMEX)+when:2d&hl=en-US&gl=US&ceid=US:en') },
  ],
  crypto: [
    { name: 'CoinDesk', url: rss('https://www.coindesk.com/arc/outboundfeeds/rss/') },
    { name: 'Cointelegraph', url: rss('https://cointelegraph.com/rss') },
    { name: 'The Block', url: rss('https://news.google.com/rss/search?q=site:theblock.co+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Crypto News', url: rss('https://news.google.com/rss/search?q=(bitcoin+OR+ethereum+OR+crypto+OR+"digital+assets")+when:1d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'DeFi News', url: rss('https://news.google.com/rss/search?q=(DeFi+OR+"decentralized+finance"+OR+DEX+OR+"yield+farming")+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  centralbanks: [
    { name: 'Federal Reserve', url: rss('https://www.federalreserve.gov/feeds/press_all.xml') },
    { name: 'ECB Watch', url: rss('https://news.google.com/rss/search?q=("European+Central+Bank"+OR+ECB+OR+Lagarde)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BoJ Watch', url: rss('https://news.google.com/rss/search?q=("Bank+of+Japan"+OR+BoJ)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'BoE Watch', url: rss('https://news.google.com/rss/search?q=("Bank+of+England"+OR+BoE)+monetary+policy+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'PBoC Watch', url: rss('https://news.google.com/rss/search?q=("People%27s+Bank+of+China"+OR+PBoC+OR+PBOC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Global Central Banks', url: rss('https://news.google.com/rss/search?q=("rate+hike"+OR+"rate+cut"+OR+"interest+rate+decision")+central+bank+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  economic: [
    { name: 'Economic Data', url: rss('https://news.google.com/rss/search?q=(CPI+OR+inflation+OR+GDP+OR+"jobs+report"+OR+"nonfarm+payrolls"+OR+PMI)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trade & Tariffs', url: rss('https://news.google.com/rss/search?q=(tariff+OR+"trade+war"+OR+"trade+deficit"+OR+sanctions)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Housing Market', url: rss('https://news.google.com/rss/search?q=("housing+market"+OR+"home+prices"+OR+"mortgage+rates"+OR+REIT)+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  ipo: [
    { name: 'IPO News', url: rss('https://news.google.com/rss/search?q=(IPO+OR+"initial+public+offering"+OR+SPAC+OR+"direct+listing")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Earnings Reports', url: rss('https://news.google.com/rss/search?q=("earnings+report"+OR+"quarterly+earnings"+OR+"revenue+beat"+OR+"earnings+miss")+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'M&A News', url: rss('https://news.google.com/rss/search?q=("merger"+OR+"acquisition"+OR+"takeover+bid"+OR+"buyout")+billion+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  derivatives: [
    { name: 'Options Market', url: rss('https://news.google.com/rss/search?q=("options+market"+OR+"options+trading"+OR+"put+call+ratio"+OR+VIX)+when:2d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Futures Trading', url: rss('https://news.google.com/rss/search?q=("futures+trading"+OR+"S%26P+500+futures"+OR+"Nasdaq+futures")+when:1d&hl=en-US&gl=US&ceid=US:en') },
  ],
  fintech: [
    { name: 'Fintech News', url: rss('https://news.google.com/rss/search?q=(fintech+OR+"payment+technology"+OR+"neobank"+OR+"digital+banking")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Trading Tech', url: rss('https://news.google.com/rss/search?q=("algorithmic+trading"+OR+"trading+platform"+OR+"quantitative+finance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Blockchain Finance', url: rss('https://news.google.com/rss/search?q=("blockchain+finance"+OR+"tokenization"+OR+"digital+securities"+OR+CBDC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  regulation: [
    { name: 'SEC', url: rss('https://www.sec.gov/news/pressreleases.rss') },
    { name: 'Financial Regulation', url: rss('https://news.google.com/rss/search?q=(SEC+OR+CFTC+OR+FINRA+OR+FCA)+regulation+OR+enforcement+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Banking Rules', url: rss('https://news.google.com/rss/search?q=(Basel+OR+"capital+requirements"+OR+"banking+regulation")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Crypto Regulation', url: rss('https://news.google.com/rss/search?q=(crypto+regulation+OR+"digital+asset"+regulation+OR+"stablecoin"+regulation)+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  institutional: [
    { name: 'Hedge Fund News', url: rss('https://news.google.com/rss/search?q=("hedge+fund"+OR+"Bridgewater"+OR+"Citadel"+OR+"Renaissance")+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Private Equity', url: rss('https://news.google.com/rss/search?q=("private+equity"+OR+Blackstone+OR+KKR+OR+Apollo+OR+Carlyle)+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Sovereign Wealth', url: rss('https://news.google.com/rss/search?q=("sovereign+wealth+fund"+OR+"pension+fund"+OR+"institutional+investor")+when:7d&hl=en-US&gl=US&ceid=US:en') },
  ],
  analysis: [
    { name: 'Market Outlook', url: rss('https://news.google.com/rss/search?q=("market+outlook"+OR+"stock+market+forecast"+OR+"bull+market"+OR+"bear+market")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Risk & Volatility', url: rss('https://news.google.com/rss/search?q=(VIX+OR+"market+volatility"+OR+"risk+off"+OR+"market+correction")+when:3d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Bank Research', url: rss('https://news.google.com/rss/search?q=("Goldman+Sachs"+OR+"JPMorgan"+OR+"Morgan+Stanley")+forecast+OR+outlook+when:3d&hl=en-US&gl=US&ceid=US:en') },
  ],
  gccNews: [
    { name: 'Arabian Business', url: rss('https://news.google.com/rss/search?q=site:arabianbusiness.com+(Saudi+Arabia+OR+UAE+OR+GCC)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'The National', url: rss('https://news.google.com/rss/search?q=site:thenationalnews.com+(Abu+Dhabi+OR+UAE+OR+Saudi)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Arab News', url: rss('https://news.google.com/rss/search?q=site:arabnews.com+(Saudi+Arabia+OR+investment+OR+infrastructure)+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gulf FDI', url: rss('https://news.google.com/rss/search?q=(PIF+OR+"DP+World"+OR+Mubadala+OR+ADNOC+OR+Masdar+OR+"ACWA+Power")+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Gulf Investments', url: rss('https://news.google.com/rss/search?q=("Saudi+Arabia"+OR+"UAE"+OR+"Abu+Dhabi")+investment+infrastructure+when:7d&hl=en-US&gl=US&ceid=US:en') },
    { name: 'Vision 2030', url: rss('https://news.google.com/rss/search?q="Vision+2030"+(project+OR+investment+OR+announced)+when:14d&hl=en-US&gl=US&ceid=US:en') },
  ],
};

// Variant-aware exports
export const FEEDS = SITE_VARIANT === 'tech' ? TECH_FEEDS : SITE_VARIANT === 'finance' ? FINANCE_FEEDS : FULL_FEEDS;

export const INTEL_SOURCES: Feed[] = [
  // Defense & Security (Tier 1)
  { name: 'Defense One', url: rss('https://www.defenseone.com/rss/all/'), type: 'defense' },
  { name: 'Breaking Defense', url: rss('https://breakingdefense.com/feed/'), type: 'defense' },
  { name: 'The War Zone', url: rss('https://news.google.com/rss/search?q=site:thedrive.com+"war+zone"+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'defense' },
  { name: 'Defense News', url: rss('https://www.defensenews.com/arc/outboundfeeds/rss/?outputType=xml'), type: 'defense' },
  { name: 'Janes', url: rss('https://news.google.com/rss/search?q=site:janes.com+when:3d&hl=en-US&gl=US&ceid=US:en'), type: 'defense' },
  { name: 'Military Times', url: rss('https://www.militarytimes.com/arc/outboundfeeds/rss/?outputType=xml'), type: 'defense' },
  { name: 'Task & Purpose', url: rss('https://taskandpurpose.com/feed/'), type: 'defense' },
  { name: 'USNI News', url: rss('https://news.usni.org/feed'), type: 'defense' },
  { name: 'Oryx OSINT', url: rss('https://www.oryxspioenkop.com/feeds/posts/default?alt=rss'), type: 'defense' },
  { name: 'UK MOD', url: rss('https://www.gov.uk/government/organisations/ministry-of-defence.atom'), type: 'defense' },
  { name: 'CSIS', url: rss('https://www.csis.org/analysis?type=analysis'), type: 'defense' },

  // International Relations (Tier 2)
  { name: 'Chatham House', url: rss('https://news.google.com/rss/search?q=site:chathamhouse.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'intl' },
  { name: 'ECFR', url: rss('https://news.google.com/rss/search?q=site:ecfr.eu+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'intl' },
  { name: 'Foreign Policy', url: rss('https://foreignpolicy.com/feed/'), type: 'intl' },
  { name: 'Foreign Affairs', url: rss('https://www.foreignaffairs.com/rss.xml'), type: 'intl' },
  { name: 'Atlantic Council', url: railwayRss('https://www.atlanticcouncil.org/feed/'), type: 'intl' },
  { name: 'Middle East Institute', url: rss('https://news.google.com/rss/search?q=site:mei.edu+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'intl' },

  // Think Tanks & Research (Tier 3)
  { name: 'RAND', url: rss('https://www.rand.org/rss/all.xml'), type: 'research' },
  { name: 'Brookings', url: rss('https://www.brookings.edu/feed/'), type: 'research' },
  { name: 'Carnegie', url: rss('https://carnegieendowment.org/rss/'), type: 'research' },
  { name: 'FAS', url: rss('https://fas.org/feed/'), type: 'research' },
  { name: 'NTI', url: rss('https://www.nti.org/rss/'), type: 'research' },
  { name: 'RUSI', url: rss('https://news.google.com/rss/search?q=site:rusi.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'research' },
  { name: 'Wilson Center', url: rss('https://news.google.com/rss/search?q=site:wilsoncenter.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'research' },
  { name: 'GMF', url: rss('https://news.google.com/rss/search?q=site:gmfus.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'research' },
  { name: 'Stimson Center', url: rss('https://www.stimson.org/feed/'), type: 'research' },
  { name: 'CNAS', url: rss('https://news.google.com/rss/search?q=site:cnas.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'research' },
  { name: 'Lowy Institute', url: rss('https://news.google.com/rss/search?q=site:lowyinstitute.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'research' },

  // Nuclear & Arms Control (Tier 2)
  { name: 'Arms Control Assn', url: rss('https://news.google.com/rss/search?q=site:armscontrol.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'nuclear' },
  { name: 'Bulletin of Atomic Scientists', url: rss('https://news.google.com/rss/search?q=site:thebulletin.org+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'nuclear' },

  // OSINT & Monitoring (Tier 2)
  { name: 'Bellingcat', url: rss('https://www.bellingcat.com/feed/'), type: 'osint' },
  { name: 'Krebs Security', url: rss('https://krebsonsecurity.com/feed/'), type: 'cyber' },

  // Economic & Food Security (Tier 2)
  { name: 'FAO News', url: rss('https://www.fao.org/feeds/fao-newsroom-rss'), type: 'economic' },
  { name: 'FAO GIEWS', url: rss('https://www.fao.org/giews/english/shortnews/rss.xml'), type: 'economic' },
  { name: 'EU ISS', url: rss('https://news.google.com/rss/search?q=site:iss.europa.eu+when:7d&hl=en-US&gl=US&ceid=US:en'), type: 'intl' },
];

// Keywords that trigger alert status - must be specific to avoid false positives
export const ALERT_KEYWORDS = [
  'war', 'invasion', 'military', 'nuclear', 'sanctions', 'missile',
  'airstrike', 'drone strike', 'troops deployed', 'armed conflict', 'bombing', 'casualties',
  'ceasefire', 'peace treaty', 'nato', 'coup', 'martial law',
  'assassination', 'terrorist', 'terror attack', 'cyber attack', 'hostage', 'evacuation order',
];

// Patterns that indicate non-alert content (lifestyle, entertainment, etc.)
export const ALERT_EXCLUSIONS = [
  'protein', 'couples', 'relationship', 'dating', 'diet', 'fitness',
  'recipe', 'cooking', 'shopping', 'fashion', 'celebrity', 'movie',
  'tv show', 'sports', 'game', 'concert', 'festival', 'wedding',
  'vacation', 'travel tips', 'life hack', 'self-care', 'wellness',
];
