import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const colorClasses = {
  primary: 'bg-gradient-to-r from-primary to-primary-600',
  success: 'bg-gradient-to-r from-green-400 to-green-600',
  warning: 'bg-gradient-to-r from-orange-400 to-orange-600',
  danger: 'bg-gradient-to-r from-red-400 to-red-600',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-600">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      
      <div className={clsx('w-full bg-slate-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
          className={clsx('h-full rounded-full', colorClasses[color])}
        >
          {animated && (
            <motion.div
              className="h-full w-full opacity-30 bg-white"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
