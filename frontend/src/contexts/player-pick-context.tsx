import { createContext, ReactNode, SetStateAction, useState } from "react";

type ValueType = {
  status: boolean;
  position: "Goalkeeper" | "Defense" | "Midfield" | "Attack" | null;
};

type PlayerPickContextType = {
  value: ValueType;
  setValue: React.Dispatch<SetStateAction<ValueType>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerPickContext = createContext<PlayerPickContextType>(
  {} as PlayerPickContextType
);

type PlayerPickProviderType = {
  children: ReactNode;
};

export const PlayerPickProvider = ({ children }: PlayerPickProviderType) => {
  const [value, setValue] = useState<ValueType>({
    position: null,
    status: false,
  });
  return (
    <PlayerPickContext.Provider value={{ value, setValue }}>
      {children}
    </PlayerPickContext.Provider>
  );
};
