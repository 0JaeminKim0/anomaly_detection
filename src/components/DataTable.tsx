import { motion } from 'framer-motion';
import { ChevronRight, Download, Search } from 'lucide-react';
import { useState } from 'react';
import type { Material } from '../types';
import clsx from 'clsx';

interface DataTableProps {
  data: Material[];
  ruleId: number;
  ruleName: string;
  onItemClick?: (item: Material) => void;
}

const riskBadgeClasses = {
  high: 'risk-badge risk-high',
  medium: 'risk-badge risk-medium',
  low: 'risk-badge risk-low',
  normal: 'risk-badge risk-normal',
};

const riskLabels = {
  high: '고위험',
  medium: '주의',
  low: '관심',
  normal: '정상',
};

export default function DataTable({ data, ruleId, ruleName, onItemClick }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Material>('change_rate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredData = data
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.includes(searchTerm) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const handleSort = (field: keyof Material) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    const headers = ['자재코드', '자재명', '공급업체', '변동률', '위험도'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item =>
        [item.code, item.name, item.supplier, `${item.change_rate}%`, riskLabels[item.risk_level]].join(',')
      )
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rule${ruleId}_${ruleName}_분석결과.csv`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          [Rule {ruleId}] {ruleName} 이상 자재 ({data.length}건)
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Download size={16} />
          Excel 다운로드
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="자재코드, 자재명, 공급업체로 검색..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                자재코드
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                자재명
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                공급업체
              </th>
              <th
                className="text-right py-3 px-4 text-sm font-semibold text-slate-600 cursor-pointer hover:text-primary"
                onClick={() => handleSort('change_rate')}
              >
                변동률 {sortField === 'change_rate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">
                위험도
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onItemClick?.(item)}
                className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 text-sm font-mono text-slate-600">
                  {item.code}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-slate-800">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  {item.supplier}
                </td>
                <td className={clsx(
                  'py-3 px-4 text-sm font-semibold text-right',
                  item.change_rate > 0 ? 'text-red-500' : item.change_rate < 0 ? 'text-blue-500' : 'text-slate-600'
                )}>
                  {item.change_rate > 0 ? '+' : ''}{item.change_rate.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={riskBadgeClasses[item.risk_level]}>
                    {riskLabels[item.risk_level]}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <ChevronRight size={16} className="text-slate-400" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          검색 결과가 없습니다.
        </div>
      )}
    </motion.div>
  );
}
