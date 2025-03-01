import { TeamType } from "../../../../../shared/types/teamType";
import { useGetTeamPlayers } from "../../../hooks/use-getTeamPlayers";
import SoccerPitch from "./soccer-pitch";

type Props = {
  team: TeamType;
};

export default function MainHeaderPitch({ team }: Props) {
  const players = useGetTeamPlayers(team, null, null);
  return (
    <div className="flex h-[350px]">
      {players ? <SoccerPitch players={players} /> : <></>}
      <div className="bg-zinc-800 flex flex-col gap-4 h-full overflow-y-auto overflow-x-hidden scrollbar-thumb">
        {players?.map((player) => (
          <div key={player.id} className="flex items-center gap-2 w-32 p-1.5">
            <img
              src={player.picture}
              title={player.name}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-xs">{player.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
