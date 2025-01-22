import { createContext, ReactNode, useState } from "react";
import { TeamType } from "../types/typeTeam";

type TeamsContextType = {
  teams: TeamType[];
  setTeams: React.Dispatch<React.SetStateAction<TeamType[]>>;
};
type TeamProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: () => {},
});

export const TeamsProvider = ({ children }: TeamProviderProps) => {
  const [teams, setTeams] = useState<TeamType[]>([]);


  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};
