import { motion } from 'framer-motion';
import clsx from 'clsx';

interface LogEntry {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface TerminalLogProps {
  logs: LogEntry[];
  maxHeight?: string;
  showTimestamp?: boolean;
}

const typeClasses = {
  info: 'terminal-info',
  success: 'terminal-success',
  warning: 'terminal-warning',
  error: 'terminal-error',
};

const typeIcons = {
  info: '○',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export default function TerminalLog({
  logs,
  maxHeight = '200px',
}: TerminalLogProps) {
  return (
    <div
      className="terminal overflow-y-auto"
      style={{ maxHeight }}
    >
      {logs.map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="terminal-line mb-1"
        >
          <span className="terminal-prefix">{`>`}</span>
          <span className={clsx('mr-2', typeClasses[log.type])}>
            {typeIcons[log.type]}
          </span>
          <span className={typeClasses[log.type]}>{log.message}</span>
        </motion.div>
      ))}
      
      {/* Blinking cursor */}
      <motion.div
        className="terminal-line"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <span className="terminal-prefix">{`>`}</span>
        <span className="text-green-400">_</span>
      </motion.div>
    </div>
  );
}
