import { PlayerType } from "../../../../../shared/types/playerType";
import MainHeaderForm from "./main-header-form";
import HeaderProfile from "./header-profile";
import DropdownMenu from "./dropdown-menu";

type Props = {
  player: PlayerType;
};

export default function PlayerMainHeader({ player }: Props) {
  return (
    <div className="flex justify-between">
      <HeaderProfile player={player} />
      <div className="flex items-center">
        <MainHeaderForm player={player} />
        <DropdownMenu player={player} />
      </div>
    </div>
  );
}
