# HANA - 한화오션 이상거래 탐지 AI 에이전트 데모

## 프로젝트 개요
- **프로젝트명**: HANA (Hanwha Ocean Anomaly Detection AI Agent)
- **목적**: 구매 데이터 기반 이상거래 징후를 AI 에이전트가 자동으로 분석하고 탐지하는 과정을 시각적으로 보여주는 데모
- **대상 사용자**: 경영진/임원, 감사팀, 구매팀, IT팀

## 주요 기능

### ✅ 완료된 기능
1. **시작 화면 (Landing Page)**
   - HANA 에이전트 소개 및 환영 메시지
   - 시스템 주요 기능 카드 표시
   - 타이핑 효과 애니메이션

2. **분석 진행 화면 (Processing Page)**
   - 7단계 분석 프로세스 시각화
   - 단계별 진행률 표시
   - 터미널 스타일 실시간 로그
   - AI 에이전트 메시지 애니메이션

3. **결과 대시보드 (Dashboard)**
   - KPI 카드 (분석자재, 이상징후, 고위험, 계약임박)
   - Rule별 이상 탐지 현황 차트
   - 빠른 조회 사이드바
   - 우선 조사 대상 목록

4. **상세 분석 화면 (Detail)**
   - Rule별 데이터 테이블 (검색, 정렬 기능)
   - 자재 상세 팝업 모달
   - AI 분석 의견 제공
   - Excel 다운로드 기능

### 🔍 5가지 탐지 Rule
| Rule | 설명 | 탐지 건수 |
|------|------|----------|
| Rule 1 | 수량 변동성 (±20% 이상) | 91건 |
| Rule 2 | 단가 변동성 (±10% 이상) | 7건 |
| Rule 3 | 계약 만료 임박 (3개월 이내) | 77건 |
| Rule 4 | 재고 괴리 | 88건 |
| Rule 5 | 발주 괴리 | 87건 |

## 기술 스택
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Railway / Vercel / Netlify

## 프로젝트 구조
```
webapp/
├── src/
│   ├── components/          # 재사용 컴포넌트
│   │   ├── AgentAvatar.tsx  # AI 에이전트 아바타
│   │   ├── AgentBubble.tsx  # 에이전트 말풍선
│   │   ├── DataTable.tsx    # 데이터 테이블
│   │   ├── Header.tsx       # 헤더
│   │   ├── KPICard.tsx      # KPI 카드
│   │   ├── MaterialDetailModal.tsx  # 자재 상세 모달
│   │   ├── ProgressBar.tsx  # 진행률 바
│   │   ├── RuleChart.tsx    # Rule 차트
│   │   ├── TerminalLog.tsx  # 터미널 로그
│   │   └── TypewriterText.tsx  # 타이핑 효과
│   ├── data/
│   │   └── analysisData.ts  # 샘플 데이터
│   ├── hooks/
│   │   └── useTypewriter.ts # 타이핑 훅
│   ├── pages/
│   │   ├── LandingPage.tsx  # 시작 화면
│   │   ├── ProcessingPage.tsx  # 분석 진행
│   │   └── DashboardPage.tsx   # 대시보드
│   ├── types/
│   │   └── index.ts         # TypeScript 타입
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── railway.json             # Railway 배포 설정
├── nixpacks.toml           # Nixpacks 빌드 설정
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## Railway 배포

### 방법 1: GitHub 연동
1. 코드를 GitHub에 푸시
2. Railway에서 New Project → Deploy from GitHub
3. 저장소 선택 후 자동 배포

### 방법 2: Railway CLI
```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인
railway login

# 프로젝트 초기화 및 배포
railway init
railway up
```

### 환경 변수
특별히 필요한 환경 변수 없음 (정적 데모)

## 디자인 컬러
| 용도 | 색상 | Hex |
|------|------|-----|
| Primary (한화) | 오렌지 | #FF6B00 |
| Secondary | 네이비 | #1E3A5F |
| 고위험 | 빨강 | #EF4444 |
| 주의 | 주황 | #F97316 |
| 관심 | 노랑 | #EAB308 |
| 정상 | 초록 | #22C55E |

## 데모 시나리오
1. 시작 화면에서 HANA 에이전트 소개 확인
2. "분석 시작하기" 클릭
3. 7단계 분석 과정 관람 (약 15초)
4. 대시보드에서 KPI 및 Rule별 현황 확인
5. 관심 Rule 클릭하여 상세 테이블 조회
6. 자재 클릭하여 상세 정보 및 AI 분석 의견 확인
7. 필요시 Excel 다운로드

## 미구현/향후 개발 예정
- [ ] 실제 데이터 연동 (API)
- [ ] 사용자 인증
- [ ] PDF 리포트 생성
- [ ] 조사 대상 등록 기능
- [ ] 다크모드
- [ ] 반응형 모바일 최적화

---
**문서 작성일**: 2025.01.06  
**버전**: v1.0.0
