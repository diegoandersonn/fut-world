import { PlayerType } from "../../../../../shared/types/playerType";
import PitchLine from "./pitch-line";

type Props = {
  players: PlayerType[];
};

export default function SoccerPitch({ players }: Props) {
  return (
    <div className="bg-green-700 flex flex-col items-center justify-between">
      <div className="border-2 border-white border-t-0 px-6">
        <PitchLine amount={1} players={players} />
      </div>
      <PitchLine amount={4} players={players} />
      <div className="w-full flex flex-col items-center relative">
  <div className="bg-white w-full h-0.5 absolute top-1/2 -translate-y-1/2 z-10"></div>

  <PitchLine amount={3} players={players} />
</div>

      <PitchLine amount={3} players={players} />
    </div>
  );
}
