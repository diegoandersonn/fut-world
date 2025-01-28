import DialogHeader from "./player-dialog-header";
import CreatePlayerForm from "./player-form";
import { forwardRef } from "react";

const PlayerDialog = forwardRef<HTMLDialogElement>((_, ref) => {
  return (
    <dialog ref={ref} className="rounded-md">
      <div className="bg-neutral-950 text-zinc-300 border border-zinc-400 rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-4">
        <DialogHeader ref={ref}/>
        <CreatePlayerForm />
      </div>
    </dialog>
  );
});

export default PlayerDialog;
