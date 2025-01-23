import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";
import { Plus } from "lucide-react";
import axios from "axios";

export default function Sidebar() {
  const [countries, setCountries] = useState([]);
  console.log(countries);
  const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
  });
  useEffect(() => {
    api
      .get("/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((e) => console.log(e));
  }, [api]);
  const { teams } = useContext(TeamsContext);
  return (
    <div className="bg-neutral-950 text-white rounded-md ml-2 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center text-zinc-300">
        <h1 className="text-lg font-medium">Times</h1>
        <button>
          <Plus />
        </button>
      </div>
      <div className="flex flex-col">
        {teams.map((team) => (
          <div className="flex flex-col">
            <div>
              <p>{team.teamName}</p>
            </div>
            <div className="flex gap-1 text-xs text-zinc-300">
              <div>
                <p>{team.teamCountry}</p>
               </div>
              <p>{team.teamStadium}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
