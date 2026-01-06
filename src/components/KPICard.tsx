import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface KPICardProps {
  icon: string;
  label: string;
  value: number;
  subLabel?: string;
  color?: 'primary' | 'warning' | 'danger' | 'success' | 'info';
  delay?: number;
  animate?: boolean;
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  warning: 'bg-orange-50 text-orange-600 border-orange-200',
  danger: 'bg-red-50 text-red-600 border-red-200',
  success: 'bg-green-50 text-green-600 border-green-200',
  info: 'bg-blue-50 text-blue-600 border-blue-200',
};

const iconBgClasses = {
  primary: 'bg-primary/20',
  warning: 'bg-orange-100',
  danger: 'bg-red-100',
  success: 'bg-green-100',
  info: 'bg-blue-100',
};

export default function KPICard({
  icon,
  label,
  value,
  subLabel,
  color = 'primary',
  delay = 0,
  animate = true,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate) return;

    const duration = 1500;
    const startTime = Date.now();
    const startDelay = delay;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime - startDelay;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setDisplayValue(Math.floor(value * easeProgress));

        if (progress >= 1) {
          clearInterval(interval);
          setDisplayValue(value);
        }
      }, 16);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [value, delay, animate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={clsx(
        'kpi-card border-2',
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div className={clsx('p-3 rounded-xl text-2xl', iconBgClasses[color])}>
          {icon}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium opacity-80">{label}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-bold">{displayValue.toLocaleString()}</span>
          {subLabel && (
            <span className="text-sm opacity-70">{subLabel}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
