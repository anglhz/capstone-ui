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

// Mock accounts - cleaned up
export const mockAccounts: Account[] = [];

// Generate 24 months of historical data - cleaned up
export const generateHistoricalData = (): SnapshotData[] => {
  return [];
};

// Generate time series data based on period type and selected date - cleaned up
export const generateTimeSeriesData = (
  period: 'Dag' | 'Vecka' | 'Månad', 
  selectedDate: Date
): TimeSeriesData[] => {
  return [];
};

// Generate intraday data for charts (backwards compatibility) - cleaned up
export const generateIntradayData = (): TimeSeriesData[] => {
  return [];
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

// Mock ongoing items - cleaned up
export const mockOngoingItems: OngoingItem[] = [];

// Mock upcoming events - cleaned up
export const mockUpcomingEvents: Event[] = [];

// Mock pause items - cleaned up
export const mockPauseItems: PauseItem[] = [];

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

// Initialize data with localStorage - cleaned up
export const initializeData = () => {
  const existingSnapshots = loadFromLocalStorage('financial-snapshots');
  if (!existingSnapshots) {
    const emptyData: SnapshotData[] = [];
    saveToLocalStorage('financial-snapshots', emptyData);
    return emptyData;
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