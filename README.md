# HANA - 한화오션 구매 이상거래 탐지 AI 에이전트

## 프로젝트 개요
- **프로젝트명**: HANA (Hanwha Ocean Anomaly Detection AI Agent)
- **목적**: 구매 데이터 기반 이상거래 징후를 AI 에이전트가 자동으로 분석하고 탐지하는 데모 시스템
- **기준일**: 2025년 12월

## 주요 기능

### 🤖 AI 에이전트 시뮬레이션
- 단계별 분석 진행 상황 시각화
- 타이핑 효과로 실시간 에이전트 대화
- 터미널 스타일 로그 출력

### 📊 5가지 이상탐지 Rule
| Rule | 탐지 대상 | 임계값 | 탐지 건수 |
|------|----------|--------|----------|
| Rule 1 | 수량 변동성 | ±20% | 91건 |
| Rule 2 | 단가 변동성 | ±10% | 7건 |
| Rule 3 | 계약 도래 | 3개월 이내 | 77건 |
| Rule 4 | 재고금액 괴리 | ±20% | 88건 |
| Rule 5 | 발주건수 괴리 | ±20% | 87건 |

### 📈 대시보드
- KPI 카드 (분석 자재, 이상 징후, 고위험, 계약 임박)
- Rule별 탐지 현황 차트
- 위험도 분포 도넛 차트
- 상세 데이터 테이블

## 기술 스택
- **Backend**: Hono + Node.js
- **Frontend**: HTML + TailwindCSS + Chart.js
- **데이터**: 정적 JSON (Excel에서 변환)

## 로컬 실행
```bash
npm install
npm start
```

## Railway 배포
1. GitHub 연동 후 Railway에서 프로젝트 생성
2. 자동으로 `Procfile` 또는 `railway.json` 기반 배포

## 프로젝트 구조
```
webapp/
├── src/
│   └── index.js          # Hono 서버
├── public/
│   ├── index.html        # 메인 HTML
│   └── static/
│       ├── app.js        # 프론트엔드 JavaScript
│       └── data.json     # 분석 데이터
├── package.json
├── Procfile              # Railway 배포용
├── railway.json          # Railway 설정
└── README.md
```

## 환경 변수
- `PORT`: 서버 포트 (기본값: 3000)

---
**문서 작성일**: 2025.01.06
