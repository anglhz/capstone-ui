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
    <section className="space-y-2">
      <header className="flex items-center gap-2">
        <IconComponent className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium leading-none">{title}</h3>
      </header>
      <ul className="space-y-2">
        {items.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between rounded-md border bg-card p-2 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-7 w-7">
                <AvatarImage src={(item as any).avatar} alt={`${(item as any).name} avatar`} />
                <AvatarFallback>
                  {item.name?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight">{item.name}</span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {type === 'events' ? (item as Event).time : (item as PauseItem).timeLeft}
                </span>
              </div>
            </div>
            {type === 'events' && (
              <Badge variant="outline" className="text-[10px] capitalize">
                {(item as Event).type}
              </Badge>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
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