import { createContext, ReactNode, SetStateAction, useState } from "react";

type PlayerPickContextType = {
  status: boolean;
  setStatus: React.Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const PlayerPickContext = createContext<PlayerPickContextType>({
  status: false,
} as PlayerPickContextType);

type PlayerPickProviderType = {
  children: ReactNode;
};

export const PlayerPickProvider = ({ children }: PlayerPickProviderType) => {
  const [status, setStatus] = useState<boolean>(false);
  return (
    <PlayerPickContext.Provider value={{ status, setStatus }}>
      {children}
    </PlayerPickContext.Provider>
  );
};
