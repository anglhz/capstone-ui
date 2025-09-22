import { motion } from 'framer-motion';
import { Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
interface OngoingItem {
  id: string;
  name: string;
  tid: string;
  badges: string[];
  dots: string[];
  avatar: string;
}
interface OngoingCardsProps {
  items: OngoingItem[];
}
const getDotColor = (dotType: string) => {
  switch (dotType) {
    case 'active':
      return 'bg-primary';
    case 'warning':
      return 'bg-yellow';
    case 'success':
      return 'bg-positive';
    default:
      return 'bg-muted';
  }
};
export function OngoingCards({
  items
}: OngoingCardsProps) {
  return;
}