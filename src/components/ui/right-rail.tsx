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
function MiniList({
  title,
  items,
  type
}: MiniListProps) {
  const getIcon = () => {
    return type === 'events' ? Calendar : Pause;
  };
  
  const IconComponent = getIcon();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-3">
        <IconComponent className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src={item.avatar} />
              <AvatarFallback className="text-xs">
                {item.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {type === 'events' ? (item as Event).time : (item as PauseItem).timeLeft}
              </p>
            </div>
            
            {type === 'events' && (
              <Badge variant="secondary" className="text-xs">
                {(item as Event).type}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
interface RightRailProps {
  upcomingEvents: Event[];
  pauseItems: PauseItem[];
}
export function RightRail({
  upcomingEvents,
  pauseItems
}: RightRailProps) {
  return <div className="w-72 space-y-4">
      <MiniList title="Kommande händelser" items={upcomingEvents} type="events" />
      
      <MiniList title="Paus/Notiser" items={pauseItems} type="pauses" />
    </div>;
}