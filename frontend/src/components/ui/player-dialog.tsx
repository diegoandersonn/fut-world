import { DialogContainer, DialogHeader, DialogContent } from "./dialog/dialog";
import { TeamType } from "../../../../shared/types/teamType";
import CreatePlayerForm from "./form/player-form";
import { forwardRef } from "react";

type Props = {
  team: TeamType;
};

const PlayerDialog = forwardRef<HTMLDialogElement, Props>(({ team }, ref) => {
  return (
    <DialogContainer ref={ref}>
      <DialogHeader ref={ref} text="Create Player" />
      <DialogContent>
        <CreatePlayerForm team={team} ref={ref} />
      </DialogContent>
    </DialogContainer>
  );
});

export default PlayerDialog;
