import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DatePillsProps {
  dates: Date[];
  labels: string[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

export function DatePills({ dates, labels, selectedDate, onDateSelect }: DatePillsProps) {
  const [selectedIndex, setSelectedIndex] = useState(dates.length - 1);

  const handleDateSelect = (index: number) => {
    setSelectedIndex(index);
    onDateSelect?.(dates[index]);
  };

  // Update selected index when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      const index = dates.findIndex(date => 
        date.toDateString() === selectedDate.toDateString()
      );
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [selectedDate, dates]);

  return (
    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
      {dates.map((date, index) => (
        <motion.button
          key={date.toISOString()}
          onClick={() => handleDateSelect(index)}
          className={cn(
            "pill-base flex-shrink-0 min-w-[60px] transition-all duration-200",
            selectedIndex === index 
              ? "pill-active" 
              : "pill-inactive"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {labels[index]}
        </motion.button>
      ))}
    </div>
  );
}