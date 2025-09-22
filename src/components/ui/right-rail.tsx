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
  return;
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