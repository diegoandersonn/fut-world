import PlayerMain from "../../components/ui/player/player-main";
import Sidebar from "../../components/ui/sidebar";
import Footer from "../../components/ui/footer";
import Header from "../../components/ui/header";

export default function Player() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-between gap-3 h-full overflow-auto">
        <Sidebar />
        <PlayerMain />
      </div>
      <Footer />
    </div>
  );
}
