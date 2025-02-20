import { TeamType } from "../../../../../shared/types/teamType";
import MainHeaderForm from "./main-header-form";
import HeaderProfile from "./header-profile";

type Props = {
  team: TeamType;
};

export default function TeamMainHeader({ team }: Props) {
  return team ? (
    <div className="flex justify-between">
      <HeaderProfile team={team} />
      <div className="flex items-center m-4">
        <MainHeaderForm team={team} />
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );
}
