import Footer from "../../components/ui/footer";
import Header from "../../components/ui/header";
import Sidebar from "../../components/ui/sidebar";
import TeamMain from "../../components/ui/team/team-main";

export default function Team() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-between gap-3 h-full overflow-auto">
        <Sidebar />
        <TeamMain />
      </div>
      <Footer />
    </div>
  );
}
