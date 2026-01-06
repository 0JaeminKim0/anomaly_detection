import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Material } from '../types';
import { priceHistory } from '../data/analysisData';
import AgentAvatar from './AgentAvatar';
import clsx from 'clsx';

interface MaterialDetailModalProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  ruleId: number;
}

const riskMessages: Record<number, (m: Material) => string> = {
  1: (m) => `이 자재는 유효월 평균 대비 수량이 ${Math.abs(m.change_rate).toFixed(1)}% ${m.change_rate > 0 ? '증가' : '감소'}했습니다.
    
${m.change_rate > 100 ? '급격한 수량 변동은 아래 원인일 수 있습니다:' : '수량 변동의 원인을 확인해 주세요:'}

1. 프로젝트 일정 변경 또는 설계 변경
2. 비정상적 과다 발주 (재고 축적 목적)
3. 긴급 수요 발생
4. 데이터 입력 오류

👉 권고: 해당 기간 구매 요청서 및 프로젝트 일정 확인 필요`,

  2: (m) => `이 자재는 평균 대비 단가가 ${Math.abs(m.change_rate).toFixed(1)}% ${m.change_rate > 0 ? '상승' : '하락'}했습니다.
    
${Math.abs(m.change_rate) > 30 ? '급격한 단가 변동은 아래 원인일 수 있습니다:' : '단가 변동의 원인을 확인해 주세요:'}

1. 공급사 변경 또는 계약 조건 변경
2. 품질 등급 변경 (스펙 업/다운)
3. 원자재 가격 변동
4. 데이터 입력 오류
${m.change_rate < -20 ? '5. 비정상적 거래 (담합, 리베이트 등)' : ''}

👉 권고: 구매 담당자 확인 및 계약서 검토 필요`,

  3: (m) => `이 자재의 공급 계약이 곧 만료됩니다.
    
만료 예정일: ${m.contract_end || '확인 필요'}

원활한 자재 수급을 위해 다음 사항을 준비해 주세요:

1. 기존 공급사와 재계약 협상 일정 수립
2. 대체 공급사 발굴 및 가격 비교
3. 적정 안전 재고 확보 여부 점검
4. 계약 조건 재검토 (가격, 납기, 품질)

👉 권고: 2주 이내 재계약 협상 착수 필요`,

  4: (m) => `이 자재는 구매량 대비 재고 변동이 ${Math.abs(m.change_rate).toFixed(1)}% 괴리가 있습니다.
    
${m.change_rate > 100 ? '비정상적 재고 변동의 원인일 수 있습니다:' : '재고 괴리의 원인을 확인해 주세요:'}

1. 재고 실사 오류 또는 미반영
2. 불량/손실 미처리
3. 타 부서 불출 미기록
4. 비정상적 재고 조작 (횡령 가능성)

👉 권고: 재고 실사 및 입출고 이력 대사 필요`,

  5: (m) => `이 자재는 구매금액 대비 발주 건수가 ${Math.abs(m.change_rate).toFixed(1)}% 증가했습니다.
    
발주 건수 급증의 원인일 수 있습니다:

1. 소량 다빈도 발주 패턴 변화
2. 결재 한도 회피를 위한 분할 발주
3. 긴급 발주 증가
4. 업무 프로세스 비효율

👉 권고: 발주 패턴 분석 및 결재 한도 초과 여부 확인 필요`,
};

export default function MaterialDetailModal({
  material,
  isOpen,
  onClose,
  onPrev,
  onNext,
  ruleId,
}: MaterialDetailModalProps) {
  if (!material) return null;

  const riskClasses = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-orange-100 text-orange-700 border-orange-200',
    low: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    normal: 'bg-green-100 text-green-700 border-green-200',
  };

  const riskLabels = {
    high: '🔴 고위험',
    medium: '🟠 주의',
    low: '🟡 관심',
    normal: '🟢 정상',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{material.name}</h2>
                    <p className="text-sm text-slate-500 font-mono">{material.code}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Chart */}
                <div className="card bg-slate-50">
                  <h3 className="text-sm font-semibold text-slate-600 mb-4">📈 추이 차트</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistory}>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#FF6B00"
                          strokeWidth={2}
                          dot={{ fill: '#FF6B00' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right: Basic Info */}
                <div className="card bg-slate-50">
                  <h3 className="text-sm font-semibold text-slate-600 mb-4">📋 기본 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">공급업체</span>
                      <span className="font-medium text-slate-800">{material.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">유효월수</span>
                      <span className="font-medium text-slate-800">{material.valid_months || '-'}개월</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">평균값</span>
                      <span className="font-medium text-slate-800">
                        {material.avg_value.toLocaleString()} {material.unit || ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">현재값</span>
                      <span className="font-medium text-slate-800">
                        {material.current_value.toLocaleString()} {material.unit || ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">변동률</span>
                      <span className={clsx(
                        'font-bold text-lg flex items-center gap-1',
                        material.change_rate > 0 ? 'text-red-500' : material.change_rate < 0 ? 'text-blue-500' : 'text-slate-600'
                      )}>
                        {material.change_rate > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        {material.change_rate > 0 ? '+' : ''}{material.change_rate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-slate-500">위험도</span>
                      <span className={clsx('px-3 py-1 rounded-full text-sm font-semibold border', riskClasses[material.risk_level])}>
                        {riskLabels[material.risk_level]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Analysis */}
              <div className="mt-6 card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <AgentAvatar size="md" status="success" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-primary">HANA</span>
                      <span className="text-xs text-slate-500">분석 의견</span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {riskMessages[ruleId]?.(material) || '분석 정보가 없습니다.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between rounded-b-2xl">
              <div className="flex gap-2">
                <button
                  onClick={onPrev}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft size={16} />
                  이전 자재
                </button>
                <button
                  onClick={onNext}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  다음 자재
                  <ChevronRight size={16} />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors">
                <AlertTriangle size={16} />
                조사 대상 등록
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
