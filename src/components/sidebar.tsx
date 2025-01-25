import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";
import { Plus } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [countries, setCountries] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const { teams } = useContext(TeamsContext);
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
  function getFlagImage(countryName: string) {
    const selectedCountry = countries.find(
      (country) => country.name.common === countryName
    );
    return selectedCountry?.flags.png;
  }
  return (
    <div className="bg-neutral-950 text-white rounded-md ml-2 p-5 flex flex-col gap-4 min-w-72">
      <div className="flex justify-between items-center text-zinc-300">
        <h1 className="text-lg font-medium">Times</h1>
        <Link to="/CreateTeam">
          <Plus />
        </Link>
      </div>
      <div className="flex flex-col">
        {teams.map((team, index) => (
          <Link
            to={`/Team/${team.teamName}`}
            state={{ team }}
            onClick={() => setSelectedTeam(team.id)}
            key={index}
            className="group flex p-3 rounded-md gap-3 cursor-pointer hover:bg-neutral-800"
          >
            <div className="flex-shrink-0">
              <img
                src={team.logo}
                alt=""
                className="w-14 h-14 rounded-md"
              />
            </div>
            <div className="flex flex-col flex-1">
              <div>
                <h1
                  className={
                    team.id === selectedTeam
                      ? "font-semibold text-emerald-500"
                      : "font-semibold text-zinc-200 group-hover:text-emerald-500"
                  }
                >
                  {team.teamName}
                </h1>
              </div>
              <div className="flex gap-3 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <p className="truncate">{team.teamCountry}</p>
                  <img
                    src={getFlagImage(team.teamCountry)}
                    alt=""
                    className="w-4 h-3"
                  />
                </div>
                <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {team.teamStadium}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
