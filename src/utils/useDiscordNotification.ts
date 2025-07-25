import { useRef } from 'react';
import { VisitorLogger, VisitorTracker } from './discord';

export const useDiscordNotification = () => {
  const hasNotifiedRef = useRef(false);

  const notifyVisitor = async () => {
    if (hasNotifiedRef.current) return;

    // Check if we should track this visitor
    if (!VisitorTracker.shouldTrackVisitor()) return;

    try {
      const success = await VisitorLogger.logVisit();
      
      if (success) {
        VisitorTracker.markVisitorTracked();
        hasNotifiedRef.current = true;
        console.log('Visit logged successfully');
      }
    } catch (error) {
      console.error('Failed to log visit:', error);
    }
  };

  return { notifyVisitor };
};