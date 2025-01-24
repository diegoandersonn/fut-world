import Header from "../../components/header";
import TeamForm from "../../components/ui/team-form";

export default function CreateTeam() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-center items-center gap-3">
        <TeamForm />
      </div>
    </div>
  );
}
