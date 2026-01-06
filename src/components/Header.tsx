import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface HeaderProps {
  showDate?: boolean;
}

export default function Header({ showDate = true }: HeaderProps) {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '.').replace(/\.$/, '');

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass sticky top-0 z-40 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  한화오션
                </h1>
                <p className="text-xs text-slate-500">구매 이상거래 탐지 시스템</p>
              </div>
            </div>
          </div>

          {showDate && (
            <div className="text-sm text-slate-500">
              {today}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
