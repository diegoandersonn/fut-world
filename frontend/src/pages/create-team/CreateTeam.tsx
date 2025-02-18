import Header from "../../components/ui/header";
import CreateTeamForm from "../../components/ui/form/team-form";

export default function CreateTeam() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-center items-center gap-3">
        <CreateTeamForm />
      </div>
    </div>
  );
}
