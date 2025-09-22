import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DatePillsProps {
  days: number[];
  onDaySelect?: (day: number) => void;
}

export function DatePills({ days, onDaySelect }: DatePillsProps) {
  const [selectedDay, setSelectedDay] = useState(days[days.length - 1] || 1);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    onDaySelect?.(day);
  };

  return (
    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
      {days.map((day) => (
        <motion.button
          key={day}
          onClick={() => handleDaySelect(day)}
          className={cn(
            "pill-base flex-shrink-0 min-w-[60px] transition-all duration-200",
            selectedDay === day 
              ? "pill-active" 
              : "pill-inactive"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
        </motion.button>
      ))}
    </div>
  );
}