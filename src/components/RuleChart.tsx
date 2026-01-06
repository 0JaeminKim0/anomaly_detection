import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Rule } from '../types';

interface RuleChartProps {
  rules: Rule[];
  onRuleClick?: (ruleId: number) => void;
  selectedRule?: number | null;
}

const colors = ['#FF6B00', '#1E3A5F', '#F97316', '#22C55E', '#6366F1'];

export default function RuleChart({ rules, onRuleClick, selectedRule }: RuleChartProps) {
  const data = rules.map((rule, index) => ({
    ...rule,
    color: colors[index % colors.length],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">📊 Rule별 이상 탐지 현황</h3>
      
      {/* Bar chart for rule distribution */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const rule = payload[0].payload as Rule;
                  return (
                    <div className="bg-white shadow-lg rounded-lg p-3 border border-slate-100">
                      <p className="font-semibold text-slate-800">{rule.icon} {rule.name}</p>
                      <p className="text-sm text-slate-600">{rule.description}</p>
                      <p className="text-lg font-bold text-primary mt-1">
                        {rule.count}건 ({rule.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(data) => {
                if (data && typeof data.id === 'number') {
                  onRuleClick?.(data.id);
                }
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={selectedRule === entry.id ? '#FF6B00' : entry.color}
                  opacity={selectedRule && selectedRule !== entry.id ? 0.5 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rule cards */}
      <div className="grid grid-cols-5 gap-3">
        {rules.map((rule) => (
          <motion.button
            key={rule.id}
            onClick={() => onRuleClick?.(rule.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-xl text-center transition-all ${
              selectedRule === rule.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <span className="text-2xl block mb-1">{rule.icon}</span>
            <span className="text-xs font-medium block truncate">
              {rule.name}
            </span>
            <span className={`text-lg font-bold ${
              selectedRule === rule.id ? 'text-white' : 'text-slate-800'
            }`}>
              {rule.count}건
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
