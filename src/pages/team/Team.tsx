import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TeamMain from "../../components/team-main";

export default function Team() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex gap-3 h-full">
        <Sidebar />
        <TeamMain />
      </div>
    </div>
  );
}
