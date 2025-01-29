import { forwardRef } from "react";
import { PlayerType } from "../../types/playerType";

type Props = {
  player: PlayerType;
};

const EditPlayerDialog = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    console.log(ref)
    return (
      <dialog>
        <div className="bg-neutral-950 text-zinc-300 border border-zinc-400 rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-4">
          <p>{player.name}</p>
        </div>
      </dialog>
    );
  }
);

export default EditPlayerDialog;
