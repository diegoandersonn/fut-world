import Footer from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TeamMain from "../../components/team-main";

export default function Team() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-between gap-3 h-full w-full">
        <Sidebar />
        <TeamMain />
      </div>
      <Footer />
    </div>
  );
}
