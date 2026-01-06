import type { AnalysisData, AnalysisStep } from '../types';

export const analysisSteps: AnalysisStep[] = [
  {
    id: 1,
    title: '데이터 로딩',
    description: '구매실적 데이터를 불러오고 있습니다...',
    messages: [
      '2023~2025년 구매실적 데이터를 불러오고 있어요. 잠시만 기다려 주세요...',
      '자재 518개 로딩 완료 ✓',
      '공급사 62개 매핑 완료 ✓',
      '518개 자재, 62개 공급사 데이터를 확인했어요!',
    ],
    duration: 2000,
  },
  {
    id: 2,
    title: '데이터 전처리',
    description: '데이터 품질을 검증하고 있습니다...',
    messages: [
      '정확한 분석을 위해 데이터를 정제하고 있어요.',
      '발주가 없는 달(0값)은 제외하고 유효한 데이터만 사용할게요.',
      '0값 제외 처리 완료 ✓',
      '유효월수 계산 완료 ✓',
      '이상치 정제 완료 ✓',
    ],
    duration: 2500,
  },
  {
    id: 3,
    title: 'Rule 1: 수량 변동성',
    description: '평균 대비 ±20% 이상 변동 분석...',
    messages: [
      '첫 번째, 수량 변동성을 분석하고 있어요.',
      '평균 대비 ±20% 이상 변동한 자재를 찾고 있습니다...',
      '수량 변동성 분석 완료: 91건 이상 징후 발견 ⚠️',
    ],
    duration: 1800,
  },
  {
    id: 4,
    title: 'Rule 2: 단가 변동성',
    description: '단가 ±10% 이상 변동 분석...',
    messages: [
      '두 번째, 단가 변동성을 확인하고 있어요.',
      '단가가 ±10% 이상 변동한 자재는 특히 주의가 필요해요.',
      '단가 변동성 분석 완료: 7건 이상 징후 발견 🔴',
    ],
    duration: 1500,
  },
  {
    id: 5,
    title: 'Rule 3: 계약 만료 임박',
    description: '3개월 이내 계약 만료 확인...',
    messages: [
      '세 번째, 계약 만료가 임박한 자재를 확인하고 있어요.',
      '3개월 이내 재계약이 필요한 자재를 찾을게요.',
      '계약 임박 분석 완료: 77건 확인 📅',
    ],
    duration: 1500,
  },
  {
    id: 6,
    title: 'Rule 4: 재고 괴리',
    description: '구매량 대비 재고 변동 분석...',
    messages: [
      '네 번째, 재고금액 변동을 분석하고 있어요.',
      '구매량 변동 대비 재고가 이상하게 변동한 자재를 찾습니다.',
      '재고 괴리 분석 완료: 88건 이상 징후 발견 ⚠️',
    ],
    duration: 1800,
  },
  {
    id: 7,
    title: 'Rule 5: 발주 괴리',
    description: '구매금액 대비 발주건수 분석...',
    messages: [
      '마지막으로, 발주건수 변동을 확인하고 있어요.',
      '구매금액 대비 발주 횟수가 비정상적인 경우를 탐지해요.',
      '발주 괴리 분석 완료: 87건 이상 징후 발견 ⚠️',
    ],
    duration: 1800,
  },
];

export const analysisData: AnalysisData = {
  summary: {
    total_materials: 518,
    total_anomalies: 156,
    high_risk: 23,
    contract_expiring: 77,
    analysis_date: '2025-12-01',
    total_suppliers: 62,
  },
  rules: [
    {
      id: 1,
      name: '수량 변동성',
      description: '유효월 평균 대비 ±20% 이상 변동',
      count: 91,
      percentage: 17.6,
      icon: '📦',
    },
    {
      id: 2,
      name: '단가 변동성',
      description: '단가 평균 대비 ±10% 이상 변동',
      count: 7,
      percentage: 1.4,
      icon: '💰',
    },
    {
      id: 3,
      name: '계약 만료 임박',
      description: '3개월 이내 계약 만료 예정',
      count: 77,
      percentage: 14.9,
      icon: '📅',
    },
    {
      id: 4,
      name: '재고 괴리',
      description: '구매량 대비 재고 이상 변동',
      count: 88,
      percentage: 17.0,
      icon: '📊',
    },
    {
      id: 5,
      name: '발주 괴리',
      description: '구매금액 대비 발주건수 이상',
      count: 87,
      percentage: 16.8,
      icon: '📝',
    },
  ],
  details: {
    rule1: [
      { code: '125076', name: '방오도료_TBT-Free_20L', supplier: 'KCC', avg_value: 3333, current_value: 84000, change_rate: 2420.0, risk_level: 'high', unit: 'EA', valid_months: 24 },
      { code: '122456', name: '철판_SS400_6T_1219*2438', supplier: '포스코', avg_value: 1250, current_value: 2875, change_rate: 130.0, risk_level: 'high', unit: 'EA', valid_months: 18 },
      { code: '124789', name: '용접와이어_1.2mm_20kg', supplier: '현대용접', avg_value: 890, current_value: 2047, change_rate: 130.0, risk_level: 'high', unit: 'EA', valid_months: 22 },
      { code: '123012', name: '파이프_STPG_50A_SCH40', supplier: '세아제강', avg_value: 456, current_value: 912, change_rate: 100.0, risk_level: 'medium', unit: 'M', valid_months: 15 },
      { code: '121345', name: '볼트_STS304_M16*50', supplier: '삼성볼트', avg_value: 2340, current_value: 4212, change_rate: 80.0, risk_level: 'medium', unit: 'EA', valid_months: 20 },
      { code: '126789', name: '케이블_CV_4C_25SQ', supplier: 'LS전선', avg_value: 678, current_value: 1153, change_rate: 70.0, risk_level: 'medium', unit: 'M', valid_months: 16 },
      { code: '127890', name: '밸브_버터플라이_6B', supplier: '한일밸브', avg_value: 234, current_value: 398, change_rate: 70.0, risk_level: 'low', unit: 'EA', valid_months: 14 },
      { code: '128901', name: '개스킷_스파이럴_4B', supplier: '대한개스킷', avg_value: 567, current_value: 907, change_rate: 60.0, risk_level: 'low', unit: 'EA', valid_months: 19 },
    ],
    rule2: [
      { code: '122433', name: '용접봉_E7016_4.0mm*400mm', supplier: '포스코', avg_value: 155.7, current_value: 100.0, change_rate: -35.8, risk_level: 'high', unit: '원/EA', valid_months: 14 },
      { code: '123558', name: '체크밸브_스윙형_10K_4B', supplier: '포스코', avg_value: 89500, current_value: 60388, change_rate: -32.5, risk_level: 'high', unit: '원/EA', valid_months: 18 },
      { code: '113539', name: '용접봉_E7018_3.2mm*350mm', supplier: '포스코', avg_value: 142.3, current_value: 114.2, change_rate: -19.7, risk_level: 'medium', unit: '원/EA', valid_months: 12 },
      { code: '134567', name: '플랜지_WN_RF_150_4B', supplier: '태광플랜지', avg_value: 45200, current_value: 38420, change_rate: -15.0, risk_level: 'medium', unit: '원/EA', valid_months: 16 },
      { code: '145678', name: '파이프_STS304_2B_SCH10', supplier: '세아창원', avg_value: 78500, current_value: 67110, change_rate: -14.5, risk_level: 'low', unit: '원/M', valid_months: 20 },
      { code: '156789', name: '엘보_90_LR_4B_SCH40', supplier: '한국피팅', avg_value: 12300, current_value: 10701, change_rate: -13.0, risk_level: 'low', unit: '원/EA', valid_months: 15 },
      { code: '167890', name: '감속기_웜기어_50:1', supplier: '동양감속기', avg_value: 1250000, current_value: 1100000, change_rate: -12.0, risk_level: 'low', unit: '원/EA', valid_months: 24 },
    ],
    rule3: [
      { code: '212345', name: '도료_에폭시_프라이머_20L', supplier: '중화도료', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'high', contract_end: '2025-01-15', valid_months: 0 },
      { code: '223456', name: '시너_표준형_18L', supplier: '삼화페인트', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'high', contract_end: '2025-01-20', valid_months: 0 },
      { code: '234567', name: '고압호스_1/2_20m', supplier: '태광고무', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'high', contract_end: '2025-01-25', valid_months: 0 },
      { code: '245678', name: '유압실린더_φ80_ST500', supplier: '한국유압', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'medium', contract_end: '2025-02-10', valid_months: 0 },
      { code: '256789', name: '베어링_6310_2RS', supplier: 'NSK코리아', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'medium', contract_end: '2025-02-15', valid_months: 0 },
      { code: '267890', name: '모터_3HP_4P_380V', supplier: '효성전기', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'low', contract_end: '2025-02-28', valid_months: 0 },
      { code: '278901', name: '펌프_원심형_50A_3HP', supplier: '한일펌프', avg_value: 0, current_value: 0, change_rate: 0, risk_level: 'low', contract_end: '2025-03-05', valid_months: 0 },
    ],
    rule4: [
      { code: '312345', name: '앵글_L-75*75*6T', supplier: '동국제강', avg_value: 125, current_value: 312, change_rate: 149.6, risk_level: 'high', unit: '%', valid_months: 18 },
      { code: '323456', name: '평철_FB_6T*50W', supplier: '포스코', avg_value: 89, current_value: 201, change_rate: 125.8, risk_level: 'high', unit: '%', valid_months: 16 },
      { code: '334567', name: 'H빔_300*300*10/15', supplier: '현대제철', avg_value: 234, current_value: 491, change_rate: 109.8, risk_level: 'high', unit: '%', valid_months: 20 },
      { code: '345678', name: '채널_C-100*50*5T', supplier: '동국제강', avg_value: 167, current_value: 317, change_rate: 89.8, risk_level: 'medium', unit: '%', valid_months: 15 },
      { code: '356789', name: '환봉_STS304_φ30', supplier: '세아창원', avg_value: 78, current_value: 140, change_rate: 79.5, risk_level: 'medium', unit: '%', valid_months: 22 },
      { code: '367890', name: '판재_AL5052_3T', supplier: '노벨리스', avg_value: 456, current_value: 775, change_rate: 70.0, risk_level: 'low', unit: '%', valid_months: 14 },
    ],
    rule5: [
      { code: '412345', name: '소모품_연마석_7인치', supplier: '삼성연마', avg_value: 45, current_value: 156, change_rate: 246.7, risk_level: 'high', unit: '건', valid_months: 12 },
      { code: '423456', name: '절삭공구_엔드밀_φ10', supplier: '한국OSG', avg_value: 23, current_value: 78, change_rate: 239.1, risk_level: 'high', unit: '건', valid_months: 18 },
      { code: '434567', name: '안전장갑_내열_L', supplier: '세이프티', avg_value: 67, current_value: 189, change_rate: 182.1, risk_level: 'high', unit: '건', valid_months: 10 },
      { code: '445678', name: '드릴비트_HSS_φ8', supplier: '대성드릴', avg_value: 34, current_value: 89, change_rate: 161.8, risk_level: 'medium', unit: '건', valid_months: 15 },
      { code: '456789', name: '페인트붓_4인치', supplier: '대한솔', avg_value: 89, current_value: 201, change_rate: 125.8, risk_level: 'medium', unit: '건', valid_months: 8 },
      { code: '467890', name: '마스킹테이프_24mm', supplier: '쓰리엠', avg_value: 123, current_value: 259, change_rate: 110.6, risk_level: 'low', unit: '건', valid_months: 14 },
    ],
  },
};

export const agentInsights = {
  summary: `분석 결과, 총 156건의 이상 징후가 발견되었습니다.

🔴 즉시 확인 필요: 단가가 30% 이상 급락한 자재 2건
🟠 주의 필요: 구매량 대비 재고 괴리가 큰 자재 15건
🟡 모니터링: 계약 만료 1개월 내 자재 12건

가장 우선적으로 '용접봉_E7016' 자재를 확인해 보시기 바랍니다.`,

  rule1: '수량 변동성이 높은 자재들은 계절적 요인이나 프로젝트 특성일 수 있지만, 비정상적인 과다 발주의 가능성도 검토가 필요합니다.',
  rule2: '급격한 단가 하락은 품질 저하, 공급사 변경, 또는 비정상 거래의 신호일 수 있습니다. 특히 30% 이상 변동한 자재는 즉시 확인이 필요합니다.',
  rule3: '계약 만료 임박 자재는 원활한 수급을 위해 재계약 협상을 미리 준비해야 합니다. 공급 단절 리스크를 예방하세요.',
  rule4: '구매량 대비 재고 괴리는 재고 관리 오류, 횡령, 또는 분실의 징후일 수 있습니다. 재고 실사를 권장드립니다.',
  rule5: '발주 건수 이상 증가는 분할 발주를 통한 결재 한도 회피 시도일 수 있습니다. 발주 패턴을 면밀히 분석해 주세요.',
};

export const priceHistory = [
  { month: '23.01', value: 145 },
  { month: '23.04', value: 152 },
  { month: '23.07', value: 158 },
  { month: '23.10', value: 162 },
  { month: '24.01', value: 155 },
  { month: '24.04', value: 148 },
  { month: '24.07', value: 140 },
  { month: '24.10', value: 125 },
  { month: '25.01', value: 118 },
  { month: '25.04', value: 108 },
  { month: '25.07', value: 105 },
  { month: '25.10', value: 100 },
];
