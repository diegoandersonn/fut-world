import { PlayerType } from "../../../../../shared/types/playerType";
import PitchLine from "./pitch-line";

type Props = {
  players: PlayerType[];
};

export default function SoccerPitch({ players }: Props) {
  return (
    <div className="bg-green-700 h-[250px] flex flex-col items-center justify-between">
      <div className="border border-white border-t-0 px-5">
        <PitchLine amount={1} players={players} />
      </div>
      <PitchLine amount={4} players={players} />
      <PitchLine amount={3} players={players} />
      <PitchLine amount={3} players={players} />
    </div>
  );
}
