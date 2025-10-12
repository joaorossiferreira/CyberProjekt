import React, { createContext, useContext, useState, ReactNode } from 'react';

type OverlayContextType = {
  suppressOverlay: boolean;
  setSuppressOverlay: (v: boolean) => void;
};

const OverlayContext = createContext<OverlayContextType>({
  suppressOverlay: false,
  setSuppressOverlay: () => {},
});

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suppressOverlay, setSuppressOverlay] = useState(false);
  return (
    <OverlayContext.Provider value={{ suppressOverlay, setSuppressOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext);

export default OverlayContext;
