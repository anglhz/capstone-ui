import { 
  Area, 
  AreaChart, 
  Line,
  ComposedChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { formatCompactSEK } from '@/lib/data';
import { motion } from 'framer-motion';

interface ChartData {
  time: string;
  value: number;
  benchmark: number;
}

interface NetWorthChartProps {
  data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const time = new Date(label).toLocaleTimeString('sv-SE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-3 border border-border/30"
      >
        <p className="text-sm text-muted-foreground mb-2">{time}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-primary">Förmögenhet: </span>
            <span className="font-medium text-foreground">
              {formatCompactSEK(payload[0]?.value || 0)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-yellow">Benchmark: </span>
            <span className="font-medium text-foreground">
              {formatCompactSEK(payload[1]?.value || 0)}
            </span>
          </p>
        </div>
      </motion.div>
    );
  }

  return null;
};

export function NetWorthChart({ data }: NetWorthChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Förmögenhetsutveckling
        </h3>
        <p className="text-sm text-muted-foreground">
          Idag • Senaste 13 timmarna
        </p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* Gradient for area fill */}
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => new Date(value).toLocaleTimeString('sv-SE', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => formatCompactSEK(value)}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Purple area chart */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#purpleGradient)"
              dot={false}
            />
            
            {/* Yellow dashed benchmark line */}
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="hsl(var(--yellow))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}