import { DialogContainer, DialogHeader, DialogContent } from "./dialog/dialog";
import { PlayerType } from "../../../../shared/types/playerType";
import CreateEditPlayerForm from "./form/edit-player-form";
import { forwardRef } from "react";

type Props = {
  player: PlayerType;
};

const EditPlayerDialog = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    return (
      <DialogContainer ref={ref}>
        <DialogHeader ref={ref} text="Create Player" />
        <DialogContent>
          <CreateEditPlayerForm player={player} ref={ref} />
        </DialogContent>
      </DialogContainer>
    );
  }
);

export default EditPlayerDialog;
