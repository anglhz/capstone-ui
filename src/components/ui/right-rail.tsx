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
  const IconComponent = type === 'events' ? Calendar : Pause;

  return (
    <section aria-label={title} className="rounded-lg border bg-card p-4 shadow-sm">
      <header className="mb-3 flex items-center gap-2">
        <IconComponent className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <h2 className="text-sm font-medium">{title}</h2>
      </header>
      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="text-xs text-muted-foreground">Inget att visa</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={(item as any).avatar} alt={(item as any).name} />
                <AvatarFallback>{(item as any).name?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{(item as any).name}</p>
                <p className="text-xs text-muted-foreground">
                  {type === 'events' ? (item as Event).time : (item as PauseItem).timeLeft}
                </p>
              </div>
              {type === 'events' ? (
                <Badge variant="outline" className="text-[10px] capitalize">
                  {(item as Event).type}
                </Badge>
              ) : null}
            </li>
          ))
        )}
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