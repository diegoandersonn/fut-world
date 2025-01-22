import Header from "../../components/header";
import Aside from "../../components/home-aside";
import Sidebar from "../../components/home-sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col font-roboto">
      <Header />
      <div className="flex gap-3">
        <Sidebar />
        <Aside />
      </div>
    </div>
  );
}
