import { Plus } from "lucide-react";
import { useContext, useRef } from "react";
import PlayerDialog from "./player-dialog";
import { TeamType } from "../../types/teamType";
import { PlayersContext } from "../../context/PlayersContext";

type Props = {
  team: TeamType;
};

export default function TeamMainFooter({ team }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { players } = useContext(PlayersContext);
  function toggleDialog() {
    if (dialogRef.current) {
      if (dialogRef.current.hasAttribute("open")) {
        dialogRef.current.close();
      } else {
        dialogRef.current.showModal();
      }
    }
  }
  return (
    <div className="flex flex-col gap-2 p-4 text-zinc-400">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Jogadores</h1>
        <button
          onClick={toggleDialog}
          className="hover:text-white hover:scale-110"
        >
          <Plus size={30} />
        </button>
        <PlayerDialog ref={dialogRef} team={team} />
      </div>
      <table className="">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Posição</th>
            <th>Overall</th>
            <th>Editar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            console.log(player);
            return (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>{player.position}</td>
                <td>{player.overall}</td>
                <td>
                  <button>Editar</button>
                </td>
                <td>
                  <button>Remover</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
