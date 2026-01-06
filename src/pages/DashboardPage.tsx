import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, RefreshCcw, ChevronRight } from 'lucide-react';
import KPICard from '../components/KPICard';
import RuleChart from '../components/RuleChart';
import AgentAvatar from '../components/AgentAvatar';
import DataTable from '../components/DataTable';
import MaterialDetailModal from '../components/MaterialDetailModal';
import { analysisData, agentInsights } from '../data/analysisData';
import type { Material } from '../types';

interface DashboardPageProps {
  onReset: () => void;
}

export default function DashboardPage({ onReset }: DashboardPageProps) {
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { summary, rules, details } = analysisData;

  const getRuleData = (ruleId: number): Material[] => {
    const key = `rule${ruleId}` as keyof typeof details;
    return details[key] || [];
  };

  const handleRuleClick = (ruleId: number) => {
    setSelectedRule(selectedRule === ruleId ? null : ruleId);
  };

  const handleMaterialClick = (material: Material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleExportAll = () => {
    // Create a comprehensive CSV export
    let csvContent = '이상거래 탐지 분석 결과 리포트\n';
    csvContent += `분석일자,${summary.analysis_date}\n`;
    csvContent += `총 자재수,${summary.total_materials}\n`;
    csvContent += `이상 징후,${summary.total_anomalies}\n`;
    csvContent += `고위험,${summary.high_risk}\n\n`;

    // Rule summary
    csvContent += 'Rule별 탐지 현황\n';
    csvContent += 'Rule ID,Rule명,건수,비율\n';
    rules.forEach(rule => {
      csvContent += `${rule.id},${rule.name},${rule.count},${rule.percentage}%\n`;
    });

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `이상거래탐지_분석결과_${summary.analysis_date}.csv`;
    link.click();
  };

  const currentRuleData = selectedRule ? getRuleData(selectedRule) : [];
  const currentRule = selectedRule ? rules.find(r => r.id === selectedRule) : null;

  // Find material index for navigation
  const currentMaterialIndex = selectedMaterial 
    ? currentRuleData.findIndex(m => m.code === selectedMaterial.code)
    : -1;

  const handlePrevMaterial = () => {
    if (currentMaterialIndex > 0) {
      setSelectedMaterial(currentRuleData[currentMaterialIndex - 1]);
    }
  };

  const handleNextMaterial = () => {
    if (currentMaterialIndex < currentRuleData.length - 1) {
      setSelectedMaterial(currentRuleData[currentMaterialIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-800">📊 분석 결과 대시보드</h1>
            <p className="text-slate-500">
              {summary.analysis_date} 기준 | 분석 대상: {summary.total_materials}개 자재, {summary.total_suppliers}개 공급사
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <FileDown size={16} />
              리포트 다운로드
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors"
            >
              <RefreshCcw size={16} />
              다시 분석
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            icon="📦"
            label="분석 자재"
            value={summary.total_materials}
            subLabel="개"
            color="info"
            delay={0}
          />
          <KPICard
            icon="⚠️"
            label="이상 징후"
            value={summary.total_anomalies}
            subLabel={`(${((summary.total_anomalies / summary.total_materials) * 100).toFixed(1)}%)`}
            color="warning"
            delay={100}
          />
          <KPICard
            icon="🔴"
            label="고위험"
            value={summary.high_risk}
            subLabel="즉시조사"
            color="danger"
            delay={200}
          />
          <KPICard
            icon="📅"
            label="계약 임박"
            value={summary.contract_expiring}
            subLabel="3개월 이내"
            color="primary"
            delay={300}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart & Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rule Chart */}
            <RuleChart
              rules={rules}
              onRuleClick={handleRuleClick}
              selectedRule={selectedRule}
            />

            {/* Detail Table (shown when rule is selected) */}
            {selectedRule && currentRule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DataTable
                  data={currentRuleData}
                  ruleId={selectedRule}
                  ruleName={currentRule.name}
                  onItemClick={handleMaterialClick}
                />
              </motion.div>
            )}
          </div>

          {/* Right: Agent Insights */}
          <div className="space-y-6">
            {/* Agent Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <div className="flex items-start gap-4">
                <AgentAvatar size="md" status="success" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-primary">HANA</span>
                    <span className="text-xs text-slate-500">분석 인사이트</span>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {agentInsights.summary}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Rule Insights */}
            {selectedRule && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <h3 className="font-semibold text-slate-800 mb-3">
                  {currentRule?.icon} {currentRule?.name} 분석
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {agentInsights[`rule${selectedRule}` as keyof typeof agentInsights]}
                </p>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="font-semibold text-slate-800 mb-4">빠른 조회</h3>
              <div className="space-y-2">
                {rules.map(rule => (
                  <button
                    key={rule.id}
                    onClick={() => handleRuleClick(rule.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedRule === rule.id
                        ? 'bg-primary text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{rule.icon}</span>
                      <span className="font-medium text-sm">{rule.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        selectedRule === rule.id ? 'text-white' : 'text-slate-800'
                      }`}>
                        {rule.count}건
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Risk Priority */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="font-semibold text-slate-800 mb-4">🚨 우선 조사 대상</h3>
              <div className="space-y-3">
                {details.rule2.slice(0, 3).map((item, index) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setSelectedRule(2);
                      handleMaterialClick(item);
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        단가 {item.change_rate.toFixed(1)}% 변동
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Material Detail Modal */}
      <MaterialDetailModal
        material={selectedMaterial}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPrev={handlePrevMaterial}
        onNext={handleNextMaterial}
        ruleId={selectedRule || 1}
      />
    </div>
  );
}
