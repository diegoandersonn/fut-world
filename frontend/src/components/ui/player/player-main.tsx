import PlayerMainHeader from "./main-header";
// import PlayerMainFooter from "./main-footer";
import { useLocation } from "react-router-dom";

export default function PlayerMain() {
  const location = useLocation();
  const player = location.state?.player;
  console.log(player);
  return (
    <div className="flex-1 flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <PlayerMainHeader player={player} />
      {/* <PlayerMainFooter /> */}
    </div>
  );
}
