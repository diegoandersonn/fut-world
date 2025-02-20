import TeamDialog from "../ui/team/team-dialog";
import SidebarList from "./sidebar-list";
import { Plus } from "lucide-react";
import { useRef } from "react";

export default function Sidebar() {
  const teamDialogRef = useRef<HTMLDialogElement>(null);
  function toggleTeamDialog() {
    if (teamDialogRef.current) {
      if (teamDialogRef.current.hasAttribute("open")) {
        teamDialogRef.current.close();
      } else {
        teamDialogRef.current.showModal();
      }
    }
  }

  return (
    <div className="bg-neutral-950 rounded-md ml-2 p-5 flex flex-col gap-4 w-[20%] text-zinc-300">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium hover:text-white hover:scale-105 cursor-pointer">
          Teams
        </div>
        <Plus
          className="hover:text-white hover:scale-125 cursor-pointer"
          onClick={toggleTeamDialog}
        />
        <TeamDialog ref={teamDialogRef} />
      </div>
      <SidebarList />
    </div>
  );
}
