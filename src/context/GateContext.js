import React, { createContext, useContext, useState } from 'react';

const GateContext = createContext(undefined);

export function GateProvider({ children }) {
  const [selectedGate, setSelectedGate] = useState(null);

  const value = {
    selectedGate,
    setSelectedGate,
  };

  return (
    <GateContext.Provider value={value}>
      {children}
    </GateContext.Provider>
  );
}

export function useGate() {
  const ctx = useContext(GateContext);
  if (ctx === undefined) {
    throw new Error('useGate must be used within a GateProvider');
  }
  return ctx;
}

export default GateContext;
