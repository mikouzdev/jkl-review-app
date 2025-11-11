import { createContext, useContext, useState } from "react";

export interface SelectedDistrict {
  id: number;
  title: string;
}

type ContextType = {
  selectedDistrict: SelectedDistrict | null;
  setSelectedDistrict: (district: SelectedDistrict | null) => void;
};

const SelectedDistrictContext = createContext<ContextType | null>(null);

export function SelectedDistrictProvider({ children }: { children: React.ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState<SelectedDistrict | null>(null);

  return (
    <SelectedDistrictContext.Provider value={{ selectedDistrict, setSelectedDistrict }}>
      {children}
    </SelectedDistrictContext.Provider>
  );
}

export function useSelectedDistrict() {
  const ctx = useContext(SelectedDistrictContext);
  if (!ctx) throw new Error("useSelectedDistrict must be inside SelectedDistrictProvider");
  return ctx;
}
