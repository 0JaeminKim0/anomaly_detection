import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import AgentAvatar from '../components/AgentAvatar';
import ProgressBar from '../components/ProgressBar';
import TerminalLog from '../components/TerminalLog';
import { analysisSteps } from '../data/analysisData';

interface ProcessingPageProps {
  onComplete: () => void;
}

interface LogEntry {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export default function ProcessingPage({ onComplete }: ProcessingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { message, type }]);
  }, []);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      setIsComplete(true);
      setTimeout(onComplete, 1500);
      return;
    }

    const step = analysisSteps[currentStep];
    let messageIndex = 0;
    let progress = 0;

    // Set initial message
    setCurrentMessage(step.messages[0]);
    addLog(step.messages[0], 'info');

    // Progress animation
    const progressInterval = setInterval(() => {
      progress += 100 / (step.duration / 50);
      setStepProgress(Math.min(progress, 100));
    }, 50);

    // Message updates
    const messageInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < step.messages.length) {
        setCurrentMessage(step.messages[messageIndex]);
        const messageType = step.messages[messageIndex].includes('✓') ? 'success' 
          : step.messages[messageIndex].includes('⚠️') || step.messages[messageIndex].includes('🔴') ? 'warning'
          : 'info';
        addLog(step.messages[messageIndex], messageType);
      }
    }, step.duration / step.messages.length);

    // Step completion
    const stepTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      setStepProgress(100);
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setStepProgress(0);
      }, 300);
    }, step.duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, addLog, onComplete]);

  const totalProgress = ((currentStep + stepProgress / 100) / analysisSteps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            🔍 데이터 분석 진행 중
          </h1>
          <p className="text-slate-500">
            HANA가 구매 데이터를 분석하고 있습니다
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Agent & Message */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex flex-col items-center text-center">
                <AgentAvatar
                  size="lg"
                  status={isComplete ? 'success' : 'thinking'}
                  showGlow={true}
                />
                <h3 className="mt-4 font-semibold text-primary">HANA</h3>
                <p className="text-xs text-slate-400 mb-4">AI Agent</p>
                
                <div className="w-full p-4 bg-slate-50 rounded-xl">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-slate-700 leading-relaxed"
                    >
                      "{currentMessage}"
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Progress & Logs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">전체 진행률</h3>
                <span className="text-sm text-slate-500">
                  {currentStep + 1} / {analysisSteps.length} 단계
                </span>
              </div>
              <ProgressBar
                progress={totalProgress}
                showPercentage={true}
                size="lg"
                color="primary"
              />
            </motion.div>

            {/* Step Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="font-semibold text-slate-800 mb-4">분석 단계</h3>
              <div className="space-y-3">
                {analysisSteps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const isPending = index > currentStep;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-primary/10 border-2 border-primary'
                          : isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-slate-50 border border-slate-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-primary text-white'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 size={18} />
                        ) : isActive ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          isPending ? 'text-slate-400' : 'text-slate-700'
                        }`}>
                          {step.title}
                        </p>
                        <p className={`text-xs truncate ${
                          isPending ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-20">
                          <ProgressBar
                            progress={stepProgress}
                            showPercentage={false}
                            size="sm"
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Terminal Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-0 overflow-hidden"
            >
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-400">Analysis Log</span>
                </div>
              </div>
              <TerminalLog logs={logs} maxHeight="180px" />
            </motion.div>
          </div>
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 text-green-700 rounded-full font-semibold">
                <CheckCircle2 size={24} />
                분석이 완료되었습니다! 결과를 보여드릴게요.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
