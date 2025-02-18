import { useLocation } from "react-router-dom";
import TeamMainHeader from "./main-header";
import TeamMainFooter from "./main-footer";

export default function TeamMain() {
  const location = useLocation();
  const team = location.state?.team;
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <TeamMainHeader team={team} />
      <TeamMainFooter team={team} />
    </div>
  );
}
