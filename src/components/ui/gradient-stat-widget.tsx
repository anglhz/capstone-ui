import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface GradientStatWidgetProps {
  value: string;
  subtitle: string;
  trend?: number;
  teamMembers?: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

export function GradientStatWidget({ 
  value, 
  subtitle, 
  trend,
  teamMembers = [] 
}: GradientStatWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative gradient-stat rounded-2xl p-6 overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-glow), 0 20px 40px rgba(0,0,0,0.3)'
      }}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative z-10 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.h2 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {value}
            </motion.h2>
            <p className="text-white/80 text-sm font-medium">
              {subtitle}
            </p>
          </div>

          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1"
            >
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-medium">
                +{trend.toFixed(1)}%
              </span>
            </motion.div>
          )}
        </div>

        {teamMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 4).map((member) => (
                <Avatar 
                  key={member.id} 
                  className="w-6 h-6 border-2 border-white/30"
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            
            <div className="flex items-center gap-1 text-white/80">
              <Users className="h-3 w-3" />
              <span className="text-xs">
                {teamMembers.length} medlemmar
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full blur-lg" />
    </motion.div>
  );
}