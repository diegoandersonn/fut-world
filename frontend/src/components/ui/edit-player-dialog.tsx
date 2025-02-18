import { forwardRef } from "react";
import { PlayerType } from "../../types/playerType";
import { X } from "lucide-react";
import CreateEditPlayerForm from "./form/edit-player-form";

type Props = {
  player: PlayerType;
};

const EditPlayerDialog = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    function handleClose() {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    }
    return (
      <dialog ref={ref}>
        <div className="bg-neutral-950 text-zinc-300 border border-zinc-400 rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Criar Jogador</h1>
            <button
              onClick={handleClose}
              className="hover:text-white hover:scale-125"
            >
              <X />
            </button>
          </div>
          <div>
            <CreateEditPlayerForm player={player} ref={ref} />
          </div>
        </div>
      </dialog>
    );
  }
);

export default EditPlayerDialog;
