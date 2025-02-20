import { forwardRef } from "react";
import CreateTeamForm from "../form/team-form";
import { DialogContainer, DialogHeader, DialogContent } from "../dialog/dialog";

const TeamDialog = forwardRef<HTMLDialogElement>((_, ref) => {
  return (
    <DialogContainer ref={ref}>
      <DialogHeader ref={ref} text="Create Team" />
      <DialogContent>
        <CreateTeamForm ref={ref} />
      </DialogContent>
    </DialogContainer>
  );
});

export default TeamDialog;
