import type { AnalysisData, AnalysisStep } from '../types';

export const analysisSteps: AnalysisStep[] = [
  {
    id: 1,
    title: '데이터 로딩',
    description: '구매실적 데이터를 불러오고 있습니다...',
    messages: [
      '2023~2025년 구매실적 데이터를 불러오고 있어요. 잠시만 기다려 주세요...',
      '자재 574개 로딩 완료 ✓',
      '공급사 40개 매핑 완료 ✓',
      '574개 자재, 40개 공급사 데이터를 확인했어요!',
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
      '수량 변동성 분석 완료: 110건 이상 징후 발견 ⚠️',
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
      '단가 변동성 분석 완료: 5건 이상 징후 발견 🔴',
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
      '계약 임박 분석 완료: 88건 확인 📅',
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
      '재고 괴리 분석 완료: 151건 이상 징후 발견 ⚠️',
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
      '발주 괴리 분석 완료: 99건 이상 징후 발견 ⚠️',
    ],
    duration: 1800,
  },
];

export const analysisData: AnalysisData = {
  summary: {
    total_materials: 574,
    total_anomalies: 280,
    high_risk: 43,
    contract_expiring: 88,
    analysis_date: '2025-12-01',
    total_suppliers: 40,
  },
  rules: [
    {
      id: 1,
      name: '수량 변동성',
      description: '유효월 평균 대비 ±20% 이상 변동',
      count: 110,
      percentage: 19.2,
      icon: '📦',
    },
    {
      id: 2,
      name: '단가 변동성',
      description: '단가 평균 대비 ±10% 이상 변동',
      count: 5,
      percentage: 0.9,
      icon: '💰',
    },
    {
      id: 3,
      name: '계약 만료 임박',
      description: '3개월 이내 계약 만료 예정',
      count: 88,
      percentage: 15.3,
      icon: '📅',
    },
    {
      id: 4,
      name: '재고 괴리',
      description: '구매량 대비 재고 이상 변동',
      count: 151,
      percentage: 26.3,
      icon: '📊',
    },
    {
      id: 5,
      name: '발주 괴리',
      description: '구매금액 대비 발주건수 이상',
      count: 99,
      percentage: 17.2,
      icon: '📝',
    },
  ],
  details: {
    rule1: [
      {
            "code": "125076",
            "name": "방오도료_TBT-Free_20L",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 3,
            "avg_value": 3333.33,
            "current_value": 84000.0,
            "change_rate": 2420.0,
            "unit": "EA"
      },
      {
            "code": "118176",
            "name": "빔_박스형_400*200*10T",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": 7333.33,
            "current_value": 26000.0,
            "change_rate": 254.5,
            "unit": "EA"
      },
      {
            "code": "118177",
            "name": "엘보_45도_4B_SCH80_ASTM A234",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": 7333.33,
            "current_value": 26000.0,
            "change_rate": 254.5,
            "unit": "EA"
      },
      {
            "code": "112638",
            "name": "맨홀커버_원형_600mm_SUS316",
            "supplier": "포스코",
            "risk_level": "medium",
            "valid_months": 6,
            "avg_value": 954022.17,
            "current_value": 3271000.0,
            "change_rate": 242.9,
            "unit": "EA"
      },
      {
            "code": "112638",
            "name": "맨홀커버_원형_600mm_SUS316",
            "supplier": "한국특수형강",
            "risk_level": "high",
            "valid_months": 5,
            "avg_value": 1030000.0,
            "current_value": 3327850.0,
            "change_rate": 223.1,
            "unit": "EA"
      },
      {
            "code": "109577",
            "name": "플랫바_150*12_6M",
            "supplier": "포스코",
            "risk_level": "medium",
            "valid_months": 27,
            "avg_value": 32.81,
            "current_value": 72.0,
            "change_rate": 119.4,
            "unit": "EA"
      },
      {
            "code": "118174",
            "name": "버터플라이밸브_10K_8B",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 5,
            "avg_value": 18600.0,
            "current_value": 40000.0,
            "change_rate": 115.1,
            "unit": "EA"
      },
      {
            "code": "103810",
            "name": "강판_ASTM A36_20T*1500*6000",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 4,
            "avg_value": 206250.0,
            "current_value": 437500.0,
            "change_rate": 112.1,
            "unit": "EA"
      }
],
    rule2: [
      {
            "code": "122433",
            "name": "용접봉_E7016_4.0mm*400mm",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 14,
            "avg_value": 155.71,
            "current_value": 100.0,
            "change_rate": -35.8,
            "unit": "원/EA"
      },
      {
            "code": "123558",
            "name": "체크밸브_스윙형_10K_4B",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 8,
            "avg_value": 133.33,
            "current_value": 90.0,
            "change_rate": -32.5,
            "unit": "원/EA"
      },
      {
            "code": "113539",
            "name": "용접봉_E7018_3.2mm*350mm",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 18,
            "avg_value": 48.71,
            "current_value": 39.1,
            "change_rate": -19.7,
            "unit": "원/EA"
      },
      {
            "code": "110767",
            "name": "개스킷_링조인트_R-24_SUS316",
            "supplier": "한국특수형강",
            "risk_level": "high",
            "valid_months": 31,
            "avg_value": 15550.0,
            "current_value": 13900.0,
            "change_rate": -10.6,
            "unit": "원/EA"
      },
      {
            "code": "111329",
            "name": "플랜지_LAP_10K_3B_SUS304",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 22,
            "avg_value": 43.58,
            "current_value": 39.1,
            "change_rate": -10.3,
            "unit": "원/EA"
      }
],
    rule3: [
      {
            "code": "100370",
            "name": "트랜섬플레이트_25T*3000*6000",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 35,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111291",
            "name": "강관_SCH40_6B_ASTM A106",
            "supplier": "동부스틸",
            "risk_level": "medium",
            "valid_months": 4,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111302",
            "name": "캡_6B_SCH40_ASTM A234",
            "supplier": "동국제강",
            "risk_level": "low",
            "valid_months": 16,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111303",
            "name": "솔리드와이어_ER70S-6_1.0mm",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 17,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111304",
            "name": "바텀플레이트_30T*2000*6000",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 19,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111305",
            "name": "쉘플레이트_20T*2500*8000",
            "supplier": "삼우산업",
            "risk_level": "medium",
            "valid_months": 7,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111305",
            "name": "쉘플레이트_20T*2500*8000",
            "supplier": "포스코",
            "risk_level": "low",
            "valid_months": 2,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      },
      {
            "code": "111306",
            "name": "아연판_음극방식용_10kg",
            "supplier": "포스코",
            "risk_level": "medium",
            "valid_months": 19,
            "avg_value": 0,
            "current_value": 0,
            "change_rate": 0,
            "contract_end": "2026.01.01"
      }
],
    rule4: [
      {
            "code": "118177",
            "name": "엘보_45도_4B_SCH80_ASTM A234",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": -265.7,
            "current_value": 1300.0,
            "change_rate": 1565.7,
            "unit": "%"
      },
      {
            "code": "118176",
            "name": "빔_박스형_400*200*10T",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": -260.5,
            "current_value": 1300.0,
            "change_rate": 1560.5,
            "unit": "%"
      },
      {
            "code": "123295",
            "name": "강관_SCH160_4B_ASTM A106",
            "supplier": "신아강업",
            "risk_level": "medium",
            "valid_months": 3,
            "avg_value": 1258.0,
            "current_value": -59.4,
            "change_rate": 1317.4,
            "unit": "%"
      },
      {
            "code": "109544",
            "name": "엘보_90도_6B_SCH40_ASTM A234",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 29,
            "avg_value": 1217.3,
            "current_value": 2.5,
            "change_rate": 1214.7,
            "unit": "%"
      },
      {
            "code": "123267",
            "name": "용접봉_E7018_3.2mm*350mm",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 3,
            "avg_value": 1151.8,
            "current_value": 5.9,
            "change_rate": 1146.0,
            "unit": "%"
      },
      {
            "code": "123268",
            "name": "와셔_평와셔_M20_SUS316",
            "supplier": "KG스틸",
            "risk_level": "medium",
            "valid_months": 3,
            "avg_value": 945.6,
            "current_value": 39.0,
            "change_rate": 906.6,
            "unit": "%"
      },
      {
            "code": "122975",
            "name": "동관_C1220T_50A_2.0T",
            "supplier": "KG스틸",
            "risk_level": "low",
            "valid_months": 1,
            "avg_value": 739.7,
            "current_value": -100.0,
            "change_rate": 839.7,
            "unit": "%"
      },
      {
            "code": "114145",
            "name": "핸드레일_SUS304_42.7mm*2.0T",
            "supplier": "한국특수형강",
            "risk_level": "low",
            "valid_months": 8,
            "avg_value": -611.5,
            "current_value": -61.4,
            "change_rate": 550.0,
            "unit": "%"
      }
],
    rule5: [
      {
            "code": "118174",
            "name": "버터플라이밸브_10K_8B",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 5,
            "avg_value": 50.0,
            "current_value": 1614.3,
            "change_rate": 1564.3,
            "unit": "건"
      },
      {
            "code": "118176",
            "name": "빔_박스형_400*200*10T",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": 100.0,
            "current_value": 1300.0,
            "change_rate": 1200.0,
            "unit": "건"
      },
      {
            "code": "118177",
            "name": "엘보_45도_4B_SCH80_ASTM A234",
            "supplier": "KG스틸",
            "risk_level": "high",
            "valid_months": 6,
            "avg_value": 100.0,
            "current_value": 1300.0,
            "change_rate": 1200.0,
            "unit": "건"
      },
      {
            "code": "118173",
            "name": "아연말프라이머_숍프라이머_18L",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 5,
            "avg_value": 50.0,
            "current_value": 1025.0,
            "change_rate": 975.0,
            "unit": "건"
      },
      {
            "code": "123052",
            "name": "스티프너_T형_100*50*6T",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 9,
            "avg_value": 1166.7,
            "current_value": 206.9,
            "change_rate": 959.8,
            "unit": "건"
      },
      {
            "code": "123557",
            "name": "론지튜디널_10T*200*6000",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 12,
            "avg_value": 1300.0,
            "current_value": 372.4,
            "change_rate": 927.6,
            "unit": "건"
      },
      {
            "code": "123558",
            "name": "체크밸브_스윙형_10K_4B",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 8,
            "avg_value": 1518.2,
            "current_value": 645.9,
            "change_rate": 872.3,
            "unit": "건"
      },
      {
            "code": "123051",
            "name": "앵글_100*100*10_6M",
            "supplier": "포스코",
            "risk_level": "high",
            "valid_months": 8,
            "avg_value": 950.0,
            "current_value": 87.5,
            "change_rate": 862.5,
            "unit": "건"
      }
],
  },
};

export const agentInsights = {
  summary: `분석 결과, 총 280건의 이상 징후가 발견되었습니다.

🔴 즉시 확인 필요: 단가가 10% 이상 변동한 자재 5건
🟠 주의 필요: 구매량 대비 재고 괴리가 큰 자재 151건
🟡 모니터링: 계약 만료 3개월 내 자재 88건

가장 우선적으로 단가 변동이 큰 자재를 확인해 보시기 바랍니다.`,

  rule1: '수량 변동성이 높은 자재들은 계절적 요인이나 프로젝트 특성일 수 있지만, 비정상적인 과다 발주의 가능성도 검토가 필요합니다.',
  rule2: '급격한 단가 하락은 품질 저하, 공급사 변경, 또는 비정상 거래의 신호일 수 있습니다. 특히 20% 이상 변동한 자재는 즉시 확인이 필요합니다.',
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
