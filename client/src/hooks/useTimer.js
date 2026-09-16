import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useTimer — Custom hook for game timer management.
 *
 * Provides start, stop, pause, resume, and reset functionality.
 * Properly cleans up intervals to prevent memory leaks.
 *
 * @returns {{
 *   time: number,          - Elapsed time in seconds
 *   isRunning: boolean,    - Whether timer is currently counting
 *   start: Function,       - Start the timer
 *   stop: Function,        - Stop the timer
 *   pause: Function,       - Pause (preserves elapsed time)
 *   resume: Function,      - Resume from paused state
 *   reset: Function,       - Reset timer to 0 and stop
 *   formatTime: Function,  - Format seconds to MM:SS string
 * }}
 */
const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  /**
   * Clear any existing interval.
   * Called before starting a new interval or on cleanup.
   */
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Start the timer from current time.
   */
  const start = useCallback(() => {
    clearTimer();
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }, [clearTimer]);

  /**
   * Stop the timer completely.
   */
  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  /**
   * Pause the timer — preserves current time.
   */
  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  /**
   * Resume the timer from where it was paused.
   */
  const resume = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isRunning]);

  /**
   * Reset timer to 0 and stop.
   */
  const reset = useCallback(() => {
    clearTimer();
    setTime(0);
    setIsRunning(false);
  }, [clearTimer]);

  /**
   * Format seconds into MM:SS display string.
   * @param {number} seconds
   * @returns {string} Formatted time (e.g., "01:25")
   */
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    time,
    isRunning,
    start,
    stop,
    pause,
    resume,
    reset,
    formatTime,
  };
};

export default useTimer;
