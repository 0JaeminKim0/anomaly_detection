import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 30, delay = 0, onComplete }: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    reset();
    
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete, reset]);

  return { displayedText, isTyping, isComplete, reset };
}

export function useSequentialTypewriter(messages: string[], baseSpeed = 30, baseDelay = 500) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setDisplayedMessages([]);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (currentIndex >= messages.length) {
      setIsComplete(true);
      return;
    }

    const message = messages[currentIndex];
    let charIndex = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex < message.length) {
          setDisplayedMessages(prev => {
            const newMessages = [...prev];
            newMessages[currentIndex] = message.slice(0, charIndex + 1);
            return newMessages;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentIndex(i => i + 1);
          }, baseDelay);
        }
      }, baseSpeed);

      return () => clearInterval(interval);
    }, currentIndex === 0 ? 0 : baseDelay);

    return () => clearTimeout(timeout);
  }, [currentIndex, messages, baseSpeed, baseDelay]);

  return { displayedMessages, isComplete, reset, currentMessageIndex: currentIndex };
}
