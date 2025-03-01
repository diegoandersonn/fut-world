import { useContext } from "react";
import { PlayerType } from "../../../../../shared/types/playerType";
import { PlayerPickContext } from "../../../contexts/player-pick-context";

type Props = {
  amount: number;
  position: "Goalkeeper" | "Defense" | "Midfield" | "Attack";
  players: PlayerType[];
};

export default function PitchLine({ amount, players, position }: Props) {
  const { setValue } = useContext(PlayerPickContext);
  function handlePlayerPick() {
    setValue((prevValue) => {
      if (prevValue.status) {
        return { position: position, status: false };
      } else {
        return { position: position, status: true };
      }
    });
  }
  return (
    <div className="flex gap-6 p-5 z-20">
      {Array.from({ length: amount }).map((_, index) => (
        <button
          key={index}
          className="bg-white h-16 w-16 rounded-full hover:brightness-50 hover:scale-110"
          onClick={handlePlayerPick}
        >
          {players[index] ? (
            <img
              src={players[index].picture}
              alt={players[index].name}
              title={players[index].name}
              className="bg-white h-16 w-16 rounded-full"
            />
          ) : (
            <> </>
          )}
        </button>
      ))}
    </div>
  );
}
