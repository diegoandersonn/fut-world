import { forwardRef } from "react";
import PlayerForm from "./player-form";

const PlayerDialog = forwardRef<HTMLDialogElement>((_, ref) => {
    return (
      <dialog ref={ref}>
        <PlayerForm />
      </dialog>
    );
});

export default PlayerDialog;
