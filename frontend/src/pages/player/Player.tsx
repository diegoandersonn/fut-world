import Footer from "../../components/ui/footer";
import Header from "../../components/ui/header";
import Sidebar from "../../components/ui/sidebar";
import PlayerMain from "../../components/ui/player/player-main";

export default function Player() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-between gap-3 h-full w-full">
        <Sidebar />
        <PlayerMain />
      </div>
      <Footer />
    </div>
  );
}