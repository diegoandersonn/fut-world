import Header from "../../components/header";
import TeamForm from "../../components/ui/team-form";

export default function CreateTeam() {
  return (
    <div className="bg-black flex flex-col items-center justify-center font-roboto">
      <Header />
      <TeamForm />
    </div>
  );
}
