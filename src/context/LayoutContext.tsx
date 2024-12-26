"use client";
import React, { createContext, useContext, useState } from "react";

type LayoutType = "default" | "custom";
const LayoutContext = createContext<{
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}>({
  layout: "default",
  setLayout: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [layout, setLayout] = useState<LayoutType>("default");

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};
