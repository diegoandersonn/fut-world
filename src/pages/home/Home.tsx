import { useEffect } from "react";
import Header from "../../components/header";
import Aside from "../../components/home-aside";
import Sidebar from "../../components/home-sidebar";
import axios from "axios";

export default function Home() {
  const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
  });
  useEffect(() => {
    api
      .get("/all")
      .then((response) => {
        console.log(response.data[1]);
      })
      .catch((e) => console.log(e));
  }, [api]);
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
