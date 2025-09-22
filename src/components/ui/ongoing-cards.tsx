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

export function OngoingCards({ items }: OngoingCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Pågående
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-hover glass-panel p-4 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-foreground text-sm">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {item.tid}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status dots */}
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

                  {/* Badges */}
                  <div className="flex gap-1 flex-wrap">
                    {item.badges.map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}