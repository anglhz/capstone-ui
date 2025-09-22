import { motion } from 'framer-motion';
import { Clock, Calendar, Pause } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  name: string;
  time: string;
  avatar: string;
  type: 'meeting' | 'deadline' | 'notification';
}

interface PauseItem {
  id: string;
  name: string;
  timeLeft: string;
  avatar: string;
}

interface MiniListProps {
  title: string;
  items: Event[] | PauseItem[];
  type: 'events' | 'pauses';
}

function MiniList({ title, items, type }: MiniListProps) {
  const getIcon = () => {
    return type === 'events' ? Calendar : Pause;
  };

  const IconComponent = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-4 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <IconComponent className="h-4 w-4 text-primary" />
        <h4 className="font-medium text-sm text-foreground">{title}</h4>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={item.avatar} alt={item.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {item.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {item.name}
              </p>
            </div>

            <Badge 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground flex items-center gap-1"
            >
              {type === 'events' ? (
                <>
                  <Clock className="h-3 w-3" />
                  {(item as Event).time}
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3" />
                  {(item as PauseItem).timeLeft}
                </>
              )}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

interface RightRailProps {
  upcomingEvents: Event[];
  pauseItems: PauseItem[];
}

export function RightRail({ upcomingEvents, pauseItems }: RightRailProps) {
  return (
    <div className="w-72 space-y-4">
      <MiniList 
        title="Kommande händelser" 
        items={upcomingEvents} 
        type="events" 
      />
      
      <MiniList 
        title="Paus/Notiser" 
        items={pauseItems} 
        type="pauses" 
      />
    </div>
  );
}