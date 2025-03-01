import { useContext, useState } from "react";
import { TeamType } from "../../../../../shared/types/teamType";
import { useGetTeamPlayers } from "../../../hooks/use-getTeamPlayers";
import SoccerPitch from "./soccer-pitch";
import { PlayerPickContext } from "../../../contexts/player-pick-context";
import { PlayerType } from "../../../../../shared/types/playerType";

type Props = {
  team: TeamType;
};

export default function MainHeaderPitch({ team }: Props) {
  const players = useGetTeamPlayers(team, null, null);
  const { value, setValue } = useContext(PlayerPickContext);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerType[][]>([
    [],
    [],
    [],
    [],
  ]);
  function handleSelectedPlayer(player: PlayerType) {
    setSelectedPlayers((prevSelectedPlayers) => {
      const newSelectedPlayers = [...prevSelectedPlayers];
      if (value.position === "Goalkeeper") {
        newSelectedPlayers[0] = [player];
        setValue({ position: null, status: false });
        return newSelectedPlayers;
      } else if (value.position === "Defense") {
        if (newSelectedPlayers[1].length > 4) {
          newSelectedPlayers[1].pop();
          newSelectedPlayers[1].push(player);
        } else {
          newSelectedPlayers[1].push(player);
        }
        setValue({ position: null, status: false });
        return newSelectedPlayers;
      } else if (value.position === "Midfield") {
        if (newSelectedPlayers[2].length > 3) {
          newSelectedPlayers[2].pop();
          newSelectedPlayers[2].push(player);
        } else {
          newSelectedPlayers[2].push(player);
        }
        setValue({ position: null, status: false });
        return newSelectedPlayers;
      }else if (value.position === "Attack") {
        if (newSelectedPlayers[3].length > 3) {
          newSelectedPlayers[3].pop();
          newSelectedPlayers[3].push(player);
        } else {
          newSelectedPlayers[3].push(player);
        }
        setValue({ position: null, status: false });
        return newSelectedPlayers;
      }else {
        setValue({ position: null, status: false });
        return newSelectedPlayers;
      }
    });
  }
  return (
    <div className="flex h-[550px] w-[600px] p-5">
      {players ? <SoccerPitch players={selectedPlayers} /> : <></>}
      <div
        data-active={value.status}
        className="bg-zinc-800 flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden scrollbar-thumb invisible data-[active=true]:visible"
      >
        {players?.map((player) => (
          <button
            key={player.id}
            className="flex items-center gap-2 w-32 p-1.5"
            onClick={() => handleSelectedPlayer(player)}
          >
            <img
              src={player.picture}
              title={player.name}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-xs">{player.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
