import Header from "../../components/header";
import Main from "../../components/home-main";
import Sidebar from "../../components/home-sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex gap-3">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
