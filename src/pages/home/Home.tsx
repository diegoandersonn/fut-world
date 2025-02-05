import Footer from "../../components/footer";
import Header from "../../components/header";
import HomeMain from "../../components/home-main";
import Sidebar from "../../components/sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex justify-between gap-3 h-full overflow-auto">
        <Sidebar />
        <HomeMain />
      </div>
      <Footer />
    </div>
  );
}
