// Mock data for financial dashboard

export interface Account {
  id: string;
  name: string;
  type: 'Bank' | 'Avanza ISK' | 'Krypto';
  balance: number;
  color: string;
}

export interface SnapshotData {
  period: string; // YYYY-MM format
  netWorth: number;
  accounts: Record<string, number>;
}

export interface TimeSeriesData {
  time: string;
  value: number;
  benchmark: number;
}

export interface OngoingItem {
  id: string;
  name: string;
  tid: string;
  badges: string[];
  dots: string[];
  avatar: string;
}

export interface Event {
  id: string;
  name: string;
  time: string;
  avatar: string;
  type: 'meeting' | 'deadline' | 'notification';
}

export interface PauseItem {
  id: string;
  name: string;
  timeLeft: string;
  avatar: string;
}

// Mock accounts
export const mockAccounts: Account[] = [
  { id: '1', name: 'Handelsbanken', type: 'Bank', balance: 1250000, color: '#22C55E' },
  { id: '2', name: 'Avanza ISK', type: 'Avanza ISK', balance: 2400000, color: '#7C3AED' },
  { id: '3', name: 'Krypto Portfolio', type: 'Krypto', balance: 450000, color: '#F59E0B' },
];

// Generate 24 months of historical data
export const generateHistoricalData = (): SnapshotData[] => {
  const data: SnapshotData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    // Simulate growth with some volatility
    const baseGrowth = 1 + (0.03 + Math.random() * 0.04 - 0.02) * (23 - i) / 23;
    
    const accounts = {
      'Bank': Math.round(1000000 * baseGrowth * (0.9 + Math.random() * 0.2)),
      'Avanza ISK': Math.round(2000000 * baseGrowth * (0.9 + Math.random() * 0.2)),
      'Krypto': Math.round(400000 * baseGrowth * (0.8 + Math.random() * 0.4)),
    };
    
    const netWorth = Object.values(accounts).reduce((sum, val) => sum + val, 0);
    
    data.push({
      period,
      netWorth,
      accounts,
    });
  }
  
  return data;
};

// Generate intraday data for charts
export const generateIntradayData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  const startValue = 4100000;
  
  for (let i = 0; i < 13; i++) {
    const time = new Date(now.getTime() - (12 - i) * 60 * 60 * 1000);
    const variance = (Math.random() - 0.5) * 0.02;
    const growth = 1 + variance;
    
    data.push({
      time: time.toISOString(),
      value: Math.round(startValue * growth * (1 + i * 0.001)),
      benchmark: Math.round(startValue * 1.005 * (1 + i * 0.0008)),
    });
  }
  
  return data;
};

// Mock ongoing items
export const mockOngoingItems: OngoingItem[] = [
  {
    id: '1',
    name: 'Portfolio Rebalansering',
    tid: '14:30',
    badges: ['Avanza', 'Hög prioritet'],
    dots: ['active', 'warning'],
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '2', 
    name: 'Månadsrapport Q4',
    tid: '16:00',
    badges: ['Analys', 'Deadline'],
    dots: ['active'],
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '3',
    name: 'Krypto övervakning',
    tid: 'Pågående',
    badges: ['BTC', 'ETH'],
    dots: ['active', 'success'],
    avatar: '/api/placeholder/32/32',
  },
];

// Mock upcoming events
export const mockUpcomingEvents: Event[] = [
  {
    id: '1',
    name: 'Spargruppsmöte',
    time: '09:00',
    avatar: '/api/placeholder/24/24',
    type: 'meeting',
  },
  {
    id: '2',
    name: 'Kvartalsrapport',
    time: '11:30', 
    avatar: '/api/placeholder/24/24',
    type: 'deadline',
  },
  {
    id: '3',
    name: 'Portföljöversyn',
    time: '15:00',
    avatar: '/api/placeholder/24/24',
    type: 'meeting',
  },
];

// Mock pause items
export const mockPauseItems: PauseItem[] = [
  {
    id: '1',
    name: 'Lunchpaus',
    timeLeft: '23 min',
    avatar: '/api/placeholder/24/24',
  },
  {
    id: '2',
    name: 'Analysverktyg',
    timeLeft: '1h 15m',
    avatar: '/api/placeholder/24/24',
  },
];

// Local storage helpers
export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

// Initialize data with localStorage
export const initializeData = () => {
  const existingSnapshots = loadFromLocalStorage('financial-snapshots');
  if (!existingSnapshots) {
    const historicalData = generateHistoricalData();
    saveToLocalStorage('financial-snapshots', historicalData);
    return historicalData;
  }
  return existingSnapshots;
};

// Calculate derived metrics
export const calculateMetrics = (snapshots: SnapshotData[]) => {
  if (snapshots.length < 2) return { momChange: 0, ytdChange: 0 };
  
  const current = snapshots[snapshots.length - 1];
  const previous = snapshots[snapshots.length - 2];
  const yearStart = snapshots.find(s => s.period.endsWith('-01'));
  
  const momChange = ((current.netWorth - previous.netWorth) / previous.netWorth) * 100;
  const ytdChange = yearStart 
    ? ((current.netWorth - yearStart.netWorth) / yearStart.netWorth) * 100
    : 0;
    
  return { momChange, ytdChange };
};

// Format currency in SEK
export const formatSEK = (amount: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format compact currency (e.g., "2,78 mkr")
export const formatCompactSEK = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)} mkr`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)} tkr`;
  }
  return formatSEK(amount);
};