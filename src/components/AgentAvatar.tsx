import { motion } from 'framer-motion';
import { Bot, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface AgentAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'idle' | 'thinking' | 'success' | 'warning';
  showGlow?: boolean;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const iconSizes = {
  sm: 20,
  md: 32,
  lg: 48,
  xl: 64,
};

export default function AgentAvatar({ size = 'md', status = 'idle', showGlow = true }: AgentAvatarProps) {
  const statusIndicator = {
    idle: null,
    thinking: <Sparkles className="text-primary animate-pulse" size={iconSizes[size] / 3} />,
    success: <CheckCircle2 className="text-green-500" size={iconSizes[size] / 3} />,
    warning: <AlertCircle className="text-orange-500" size={iconSizes[size] / 3} />,
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow effect */}
      {showGlow && (
        <motion.div
          className={clsx(
            'absolute rounded-full bg-gradient-to-r from-primary/30 to-secondary/30',
            sizeClasses[size]
          )}
          animate={{
            scale: status === 'thinking' ? [1, 1.2, 1] : 1,
            opacity: status === 'thinking' ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main avatar */}
      <motion.div
        className={clsx(
          'relative flex items-center justify-center rounded-full',
          'bg-gradient-to-br from-primary to-secondary',
          'shadow-lg',
          sizeClasses[size]
        )}
        animate={
          status === 'thinking'
            ? {
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: status === 'thinking' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <Bot className="text-white" size={iconSizes[size]} />
      </motion.div>

      {/* Status indicator */}
      {statusIndicator[status] && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={clsx(
            'absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md'
          )}
        >
          {statusIndicator[status]}
        </motion.div>
      )}
    </div>
  );
}
