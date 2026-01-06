import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ProcessingPage from './pages/ProcessingPage';
import DashboardPage from './pages/DashboardPage';
import type { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const handleStart = () => {
    setAppState('processing');
  };

  const handleProcessingComplete = () => {
    setAppState('dashboard');
  };

  const handleReset = () => {
    setAppState('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header showDate={appState !== 'landing'} />
      
      {appState === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}
      
      {appState === 'processing' && (
        <ProcessingPage onComplete={handleProcessingComplete} />
      )}
      
      {appState === 'dashboard' && (
        <DashboardPage onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
