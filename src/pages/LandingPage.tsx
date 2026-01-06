import { motion } from 'framer-motion';
import { Search, Zap, BarChart3, ArrowRight, Shield, Clock, Target } from 'lucide-react';
import AgentAvatar from '../components/AgentAvatar';
import TypewriterText from '../components/TypewriterText';

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: <Search className="text-primary" size={28} />,
    title: '5가지 Rule 기반 분석',
    description: '수량, 단가, 계약, 재고, 발주 등 다각도 이상 탐지',
  },
  {
    icon: <Zap className="text-primary" size={28} />,
    title: '실시간 이상 탐지',
    description: 'AI가 패턴을 분석하여 이상 징후를 자동으로 발견',
  },
  {
    icon: <BarChart3 className="text-primary" size={28} />,
    title: '직관적인 시각화',
    description: '대시보드와 차트로 분석 결과를 한눈에 파악',
  },
];

const benefits = [
  { icon: <Shield size={20} />, text: '리스크 사전 예방' },
  { icon: <Clock size={20} />, text: '분석 시간 90% 단축' },
  { icon: <Target size={20} />, text: '탐지 정확도 향상' },
];

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        {/* Agent Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex mb-6"
          >
            <AgentAvatar size="xl" status="idle" showGlow={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-3">
              안녕하세요! 저는 <span className="text-gradient">HANA</span>입니다
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              <TypewriterText
                text="한화오션의 구매 이상거래를 탐지하는 AI 에이전트예요. 지금부터 철의장재 구매 데이터를 분석해 드릴게요."
                speed={30}
                delay={800}
              />
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="card card-hover text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-full text-secondary text-sm font-medium"
            >
              {benefit.icon}
              {benefit.text}
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="text-center"
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
          >
            분석 시작하기
            <ArrowRight size={20} />
          </motion.button>
          <p className="text-sm text-slate-400 mt-4">
            2023~2025년 철의장재 구매실적 데이터를 분석합니다
          </p>
        </motion.div>
      </div>
    </div>
  );
}
