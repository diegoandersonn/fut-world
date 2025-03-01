import { TeamType } from "../../../../../shared/types/teamType";
import MainHeaderForm from "./main-header-form";
import HeaderProfile from "./header-profile";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainHeaderPitch from "./main-header-pitch";

type Props = {
  team: TeamType;
};

export default function TeamMainHeader({ team }: Props) {
  const navigate = useNavigate();
  return team ? (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <HeaderProfile team={team} />
        <div className="flex items-center m-4">
          <MainHeaderForm team={team} />
        </div>
      </div>
      <div className="flex items-center">
        <MainHeaderPitch team={team} />
      </div>
      <div className="p-4 flex ">
        <Undo2
          className="hover:text-zinc-400 hover:scale-110 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
}
