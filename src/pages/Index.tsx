import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DatePills } from '@/components/ui/date-pills';
import { SegmentedSwitch } from '@/components/ui/segmented-switch';
import { NetWorthChart } from '@/components/ui/net-worth-chart';
import { OngoingCards } from '@/components/ui/ongoing-cards';
import { RightRail } from '@/components/ui/right-rail';
import { GradientStatWidget } from '@/components/ui/gradient-stat-widget';
import { 
  initializeData, 
  generateIntradayData, 
  mockOngoingItems,
  mockUpcomingEvents,
  mockPauseItems,
  formatCompactSEK 
} from '@/lib/data';

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState(13);
  const [selectedSegment, setSelectedSegment] = useState('Dag');
  const [chartData, setChartData] = useState(generateIntradayData());
  const [snapshots] = useState(() => initializeData());

  // Calculate current net worth
  const currentNetWorth = snapshots[snapshots.length - 1]?.netWorth || 0;
  const formattedNetWorth = formatCompactSEK(currentNetWorth);

  // Generate day range (1-13 for current day selection)
  const dayRange = Array.from({ length: 13 }, (_, i) => i + 1);

  // Team members for stat widget
  const teamMembers = [
    { id: '1', name: 'Anna', avatar: '/api/placeholder/24/24' },
    { id: '2', name: 'Erik', avatar: '/api/placeholder/24/24' },
    { id: '3', name: 'Sara', avatar: '/api/placeholder/24/24' },
    { id: '4', name: 'Marcus', avatar: '/api/placeholder/24/24' },
  ];

  useEffect(() => {
    // Regenerate chart data when segment changes
    setChartData(generateIntradayData());
  }, [selectedSegment]);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Välkommen tillbaka! Här är en översikt av din portfölj.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <DatePills 
            days={dayRange} 
            onDaySelect={setSelectedDay}
          />
          <SegmentedSwitch 
            options={['Dag', 'Vecka', 'Månad']}
            defaultValue={selectedSegment}
            onValueChange={setSelectedSegment}
          />
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column - Chart and Ongoing */}
        <div className="xl:col-span-2 space-y-6">
          <NetWorthChart data={chartData} />
          <OngoingCards items={mockOngoingItems} />
        </div>

        {/* Middle Column - Stats Widget and Stats Cards */}
        <div className="xl:col-span-1 space-y-6">
          <GradientStatWidget 
            value={`+${formattedNetWorth}`}
            subtitle="Total förmögenhet"
            trend={2.78}
            teamMembers={teamMembers}
          />
          
          {/* Stats Cards - Desktop Only */}
          <div className="hidden xl:block space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-4 rounded-2xl"
            >
              <h3 className="text-xs font-medium text-muted-foreground mb-1">
                Månadsförändring
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-positive">+5.2%</span>
                <span className="text-xs text-muted-foreground">vs föregående månad</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-4 rounded-2xl"
            >
              <h3 className="text-xs font-medium text-muted-foreground mb-1">
                Årsförändring (YTD)
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-positive">+18.7%</span>
                <span className="text-xs text-muted-foreground">sedan årets början</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 rounded-2xl"
            >
              <h3 className="text-xs font-medium text-muted-foreground mb-1">
                Bästa position
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">Avanza ISK</span>
                <span className="text-xs text-muted-foreground">+24.1%</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Right Rail */}
        <div className="xl:col-span-1">
          <RightRail 
            upcomingEvents={mockUpcomingEvents}
            pauseItems={mockPauseItems}
          />
        </div>
      </div>

      {/* Bottom Row - Mobile Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:hidden"
      >
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Månadsförändring
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-positive">+5.2%</span>
            <span className="text-sm text-muted-foreground">vs föregående månad</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Årsförändring (YTD)
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-positive">+18.7%</span>
            <span className="text-sm text-muted-foreground">sedan årets början</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Bästa position
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Avanza ISK</span>
            <span className="text-sm text-muted-foreground">+24.1%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;