import React, { createContext, useContext, useEffect, useState } from 'react';

interface WindowSizeContextType {
  width: number;
  height: number;
}

const WindowSizeContext = createContext<WindowSizeContextType>({
  width: 0,
  height: 0,
});

export const useWindowSize = () => useContext(WindowSizeContext);

interface WindowSizeProviderProps {
  children: React.ReactNode; // Add children prop to the type definition
}

export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};
