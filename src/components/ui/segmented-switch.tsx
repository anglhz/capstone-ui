import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SegmentedSwitchProps {
  options: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function SegmentedSwitch({ 
  options, 
  defaultValue = options[0], 
  onValueChange 
}: SegmentedSwitchProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onValueChange?.(option);
  };

  return (
    <div className="glass-panel rounded-2xl p-1 flex gap-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={cn(
            "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200",
            "hover:text-foreground",
            selectedOption === option 
              ? "text-primary-foreground" 
              : "text-muted-foreground"
          )}
        >
          {selectedOption === option && (
            <motion.div
              className="absolute inset-0 gradient-primary rounded-xl"
              layoutId="segmented-background"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
}