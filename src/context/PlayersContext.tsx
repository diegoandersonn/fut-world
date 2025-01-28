import { createContext, ReactNode, useState } from "react";
import { PlayerType } from "../types/playerType";

type PlayersContextType = {
  players: PlayerType[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
  updatePlayer: (updatedPlayer: PlayerType) => void;
};
type PlayerProviderProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const PlayersContext = createContext<PlayersContextType>({
  players: [],
  setPlayers: () => {},
  updatePlayer: () => {},
});

export const PlayersProvider = ({ children }: PlayerProviderProps) => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const updatePlayer = (updatedPlayer: PlayerType) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };
  return (
    <PlayersContext.Provider value={{ players, setPlayers, updatePlayer }}>
      {children}
    </PlayersContext.Provider>
  );
};
