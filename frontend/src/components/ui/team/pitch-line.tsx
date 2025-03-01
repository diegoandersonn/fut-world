import { useContext } from "react";
import { PlayerType } from "../../../../../shared/types/playerType";
import { PlayerPickContext } from "../../../contexts/player-pick-context";

type Props = {
  amount: number;
  players: PlayerType[];
};

export default function PitchLine({ amount, players }: Props) {
  console.log(players);
  const { setStatus } = useContext(PlayerPickContext);
  function handlePlayerPick() {
    setStatus((prevStatus) => {
      if (prevStatus) {
        return false;
      } else {
        return true;
      }
    });
  }
  return (
    <div className="flex gap-4 p-2 z-20">
      {Array.from({ length: amount }).map((_, index) => (
        <button
          key={index}
          className="bg-white h-10 w-10 rounded-full"
          onClick={handlePlayerPick}
        >
          {/* <img src={player.picture} alt={player.name} title={player.name} />     */}
        </button>
      ))}
    </div>
  );
}
