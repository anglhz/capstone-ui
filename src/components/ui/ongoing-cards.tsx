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
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Pågående</h3>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <div className="flex gap-1">
                      {item.dots.map((dot, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            getDotColor(dot)
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.tid}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {item.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm">
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}