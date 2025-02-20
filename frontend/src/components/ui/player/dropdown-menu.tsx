import { Ellipsis, Repeat, Trash, Undo2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRemovePlayer } from "../../../hooks/use-removePlayer";
import { PlayerType } from "../../../../../shared/types/playerType";
import TransferPlayerDialog from "../transfer-player-dialog";

type Props = {
  player: PlayerType;
};

export default function DropdownMenu({ player }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const removePlayer = useRemovePlayer();
  const navigate = useNavigate();
  function handleRemovePlayer() {
    removePlayer.mutate(player);
    navigate("/");
  }
  function handleClick() {
    if (isActive === true) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }
  const transferPlayerDialogRef = useRef<HTMLDialogElement | null>(null);
  function toggleTransferPlayerDialog() {
    if (transferPlayerDialogRef.current) {
      if (transferPlayerDialogRef.current.hasAttribute("open")) {
        transferPlayerDialogRef.current.close();
      } else {
        transferPlayerDialogRef.current.showModal();
      }
    }
  }

  return (
    <div className="flex flex-col justify-start items-end p-6">
      <div className="flex gap-3">
        <Ellipsis
          size={30}
          className="hover:text-zinc-400 hover:scale-110 cursor-pointer"
          onClick={handleClick}
        />
        <Undo2 className="hover:text-zinc-400 hover:scale-110 cursor-pointer" onClick={() => navigate(-1)}/>
      </div>
      <ul
        data-active={isActive}
        className="flex flex-col gap-4 bg-neutral-900 w-28 p-2 rounded-md text-zinc-400 invisible data-[active=true]:visible"
      >
        <li>
          <button
            className="flex items-center gap-1 group"
            onClick={toggleTransferPlayerDialog}
          >
            <p className="group-hover:scale-105 group-hover:text-white">
              Transferir Jogador
            </p>
            <Repeat
              size={28}
              className="group-hover:scale-105 group-hover:text-white"
            />
          </button>
          <TransferPlayerDialog ref={transferPlayerDialogRef} player={player} />
        </li>
        <li>
          <button
            className="flex items-center gap-1 group"
            onClick={handleRemovePlayer}
          >
            <p className="group-hover:scale-105 group-hover:text-white">
              Remover Jogador
            </p>
            <Trash
              size={28}
              className="group-hover:scale-105 group-hover:text-white"
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
