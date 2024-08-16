import React, { createContext, useState, useEffect, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime === 0 ? 30 : prevTime - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={{ timeLeft }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);