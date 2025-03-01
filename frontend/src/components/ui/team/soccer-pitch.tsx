import { PlayerType } from "../../../../../shared/types/playerType";
import PitchLine from "./pitch-line";

type Props = {
  players: PlayerType[][];
};

export default function SoccerPitch({ players }: Props) {
  return (
    <div className="bg-green-700 flex flex-col w-[80%] items-center justify-between">
      <PitchLine amount={1} players={players[0]} position="Goalkeeper" />
      <PitchLine amount={4} players={players[1]} position="Defense" />
      <PitchLine amount={3} players={players[2]} position="Midfield" />
      <PitchLine amount={3} players={players[3]} position="Attack" />
    </div>
  );
}
