import { createContext, ReactNode, useState } from "react";
import { TeamType } from "../types/typeTeam";

type TeamsContextType = {
  teams: TeamType[];
  setTeams: React.Dispatch<React.SetStateAction<TeamType[]>>;
  pushTeam: (team: TeamType) => void
};
type TeamProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: () => {},
  pushTeam: () => {},
});

export const TeamsProvider = ({ children }: TeamProviderProps) => {
  const [teams, setTeams] = useState<TeamType[]>([]);

  const pushTeam = (team: TeamType) => {
    setTeams((prevTeams) => [...prevTeams, team]);
  };
  return (
    <TeamsContext.Provider value={{ teams, setTeams, pushTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};
