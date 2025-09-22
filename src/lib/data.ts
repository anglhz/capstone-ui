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

// Generate time series data based on period type and selected date
export const generateTimeSeriesData = (
  period: 'Dag' | 'Vecka' | 'Månad', 
  selectedDate: Date
): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const baseValue = 4100000;
  
  if (period === 'Dag') {
    // Generate hourly data for selected day
    for (let i = 0; i < 24; i++) {
      const time = new Date(selectedDate);
      time.setHours(i, 0, 0, 0);
      
      const variance = (Math.random() - 0.5) * 0.015;
      const hourlyTrend = Math.sin(i / 24 * Math.PI) * 0.005; // Simulate daily pattern
      
      data.push({
        time: time.toISOString(),
        value: Math.round(baseValue * (1 + variance + hourlyTrend)),
        benchmark: Math.round(baseValue * (1 + hourlyTrend * 0.8)),
      });
    }
  } else if (period === 'Vecka') {
    // Generate daily data for 7 days ending on selected date
    for (let i = 6; i >= 0; i--) {
      const time = new Date(selectedDate);
      time.setDate(time.getDate() - i);
      time.setHours(12, 0, 0, 0);
      
      const variance = (Math.random() - 0.5) * 0.03;
      const weeklyTrend = (6 - i) * 0.002;
      
      data.push({
        time: time.toISOString(),
        value: Math.round(baseValue * (1 + variance + weeklyTrend)),
        benchmark: Math.round(baseValue * (1 + weeklyTrend * 0.9)),
      });
    }
  } else if (period === 'Månad') {
    // Generate weekly data for 4 weeks ending on selected date
    for (let i = 3; i >= 0; i--) {
      const time = new Date(selectedDate);
      time.setDate(time.getDate() - i * 7);
      time.setHours(12, 0, 0, 0);
      
      const variance = (Math.random() - 0.5) * 0.04;
      const monthlyTrend = (3 - i) * 0.008;
      
      data.push({
        time: time.toISOString(),
        value: Math.round(baseValue * (1 + variance + monthlyTrend)),
        benchmark: Math.round(baseValue * (1 + monthlyTrend * 0.85)),
      });
    }
  }
  
  return data;
};

// Generate intraday data for charts (backwards compatibility)
export const generateIntradayData = (): TimeSeriesData[] => {
  return generateTimeSeriesData('Dag', new Date());
};

// Generate date ranges for DatePills based on period
export const getDateRange = (period: 'Dag' | 'Vecka' | 'Månad'): Date[] => {
  const dates: Date[] = [];
  const now = new Date();
  
  if (period === 'Dag') {
    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
  } else if (period === 'Vecka') {
    // Last 4 weeks (ending on each Sunday)
    for (let i = 3; i >= 0; i--) {
      const date = new Date(now);
      const dayOfWeek = date.getDay();
      const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
      date.setDate(date.getDate() + daysToSunday - i * 7);
      dates.push(date);
    }
  } else if (period === 'Månad') {
    // Last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      date.setDate(1); // First day of month
      dates.push(date);
    }
  }
  
  return dates;
};

// Format date for DatePills display
export const formatDateForPill = (date: Date, period: 'Dag' | 'Vecka' | 'Månad'): string => {
  if (period === 'Dag') {
    return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
  } else if (period === 'Vecka') {
    return `V${getWeekNumber(date)}`;
  } else if (period === 'Månad') {
    return date.toLocaleDateString('sv-SE', { month: 'short' });
  }
  return date.toDateString();
};

// Helper function to get week number
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
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