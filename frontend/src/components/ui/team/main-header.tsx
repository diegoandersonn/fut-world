import { TeamType } from "../../../../../shared/types/teamType";
import MainHeaderForm from "./main-header-form";
import HeaderProfile from "./header-profile";
import SoccerPitch from "./soccer-pitch";
import { useGetTeamPlayers } from "../../../hooks/use-getTeamPlayers";

type Props = {
  team: TeamType;
};

export default function TeamMainHeader({ team }: Props) {
  const players = useGetTeamPlayers(team, null, null);
  return team ? (
    <div className="flex justify-between">
      <HeaderProfile team={team} />
      <div className="flex items-center m-4">
        <MainHeaderForm team={team} />
      </div>
      <div className="w-52">
        {players ? <SoccerPitch players={players} /> : <></>}
        <div className="bg-slate-800 flex w-full h-28 gap-4 p-2 overflow-auto scrollbar-thumb">
          {players?.map((player) => (
            <div className="flex items-center flex-col w-20">
              <img
                src={player.picture}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="overflow-hidden text-sm">{player.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
}
