import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";
import { Plus } from "lucide-react";
import defaultTeamImage from "../assets/defaultteamimage.jpg";
import axios from "axios";

export default function Sidebar() {
  const [countries, setCountries] = useState([]);
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
  function getFlagImage(countryName: string) {
    const selectedCountry = countries.find(
      (country) => country.name.common === countryName
    );
    console.log(selectedCountry);
    return selectedCountry?.flags.png;
  }
  return (
    <div className="bg-neutral-950 text-white rounded-md ml-2 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center text-zinc-300">
        <h1 className="text-lg font-medium">Times</h1>
        <button>
          <Plus />
        </button>
      </div>
      <div className="flex flex-col">
        {teams.map((team, index) => (
          <div key={index} className="group flex p-3 rounded-md gap-3 cursor-pointer hover:bg-neutral-800">
            <div>
              <img src={defaultTeamImage} alt="" className="w-12 h-12 rounded-md" />
            </div>
            <div className="flex flex-col">
              <div>
                <p className="font-semibold text-zinc-200 group-hover:text-emerald-500">
                  {team.teamName}
                </p>
              </div>
              <div className="flex gap-3 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <p>{team.teamCountry}</p>
                  <img
                    src={getFlagImage(team.teamCountry)}
                    alt=""
                    className="w-4 h-3"
                  />
                </div>
                <p>{team.teamStadium}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
