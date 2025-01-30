import { createContext, ReactNode, useState } from "react";
import { TeamType } from "../types/teamType";

type TeamsContextType = {
  teams: TeamType[];
  setTeams: React.Dispatch<React.SetStateAction<TeamType[]>>;
  updateTeam: (updatedTeam: TeamType) => void;
  removeTeam: (removedTeam: TeamType) => void;
};
type TeamProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TeamsContext = createContext<TeamsContextType>({
  teams: [],
  setTeams: () => {},
  updateTeam: () => {},
  removeTeam: () => {},
});

export const TeamsProvider = ({ children }: TeamProviderProps) => {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const updateTeam = (updatedTeam: TeamType) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
  };
  const removeTeam = (removedTeam: TeamType) => {
    setTeams((prevTeams) =>
      prevTeams.filter((team) => removedTeam.id === team.id)
    );
  };
  return (
    <TeamsContext.Provider value={{ teams, setTeams, updateTeam, removeTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};
