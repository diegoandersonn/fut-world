import { useLocation } from "react-router-dom";
import { Share, PencilLine, Send, Plus } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";
import PlayerDialog from "./ui/player-dialog";
import CountrySelect from "./ui/country-select";

export default function TeamMain() {
  const { teams, updateTeam } = useContext(TeamsContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState("");
  const location = useLocation();
  let team = location.state?.team;
  team = teams.find((t) => t.id === team.id);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const updatedTeam = { ...team, logo: fileURL };
      updateTeam(updatedTeam);
    }
  }

  function toggleDialog() {
    if (!dialogRef.current) return;
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }

  function toggleEditMode() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setTeamName(team.teamName);
      setIsEditing(true);
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTeamName(e.target.value);
  }

  function submitNameChange() {
    updateTeam({ ...team, teamName: teamName });
    setIsEditing(false);
  }

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) {
    updateTeam({ ...team, [value]: e.target.value });
  }

  return (
    <div className="flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md gap-28">
      <div className="flex justify-between">
        <div className="m-4">
          <div className="flex items-center justify-center gap-3">
            <button className="w-36 h-36 bg-slate-50 hover:bg-neutral-500 rounded-full group relative">
              <img
                src={team.logo}
                alt=""
                className="w-full h-full rounded-full group-hover:brightness-50"
              />
              <Share
                size={30}
                className="invisible group-hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleLogoChange}
              />
            </button>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={team.teamName}
                  onChange={(e) => handleNameChange(e)}
                  className="text-3xl bg-transparent border-b border-white outline-none w-full"
                  style={{ width: `${team.teamName.length}ch` }}
                />
                <button type="submit" onClick={submitNameChange}>
                  <Send />
                </button>
                <button onClick={toggleEditMode}>
                  <PencilLine />
                </button>
              </>
            ) : (
              <>
                <h1 className="text-3xl">{team.teamName}</h1>
                <button onClick={toggleEditMode}>
                  <PencilLine />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center m-4">
          <form action="" className="grid grid-cols-2 gap-2">
            <div className="flex gap-2 items-center">
              <label
                htmlFor="teamStadium"
                className="text-zinc-400 font-semibold"
              >
                Team Stadium
              </label>
              <input
                type="text"
                className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
                value={team.teamStadium}
                onChange={(e) => handleFieldChange(e, "teamStadium")}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="teamCountry"
                className="text-zinc-400 font-semibold"
              >
                Team Country
              </label>
              {/* <CountrySelect placeholder="Country"/> */}
            </div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="teamManager"
                className="text-zinc-400 font-semibold"
              >
                Team Manager
              </label>
              <input
                type="text"
                className="text-sm p-1 outline-none rounded-md border-2 border-zinc-400 bg-transparent"
                value={team.manager}
                onChange={(e) => handleFieldChange(e, "manager")}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 text-zinc-400">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Jogadores</h1>
          <button onClick={toggleDialog}>
            <Plus size={30} />
          </button>
          <PlayerDialog ref={dialogRef} />
        </div>
        <table className="">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Posição</th>
              <th>Overall</th>
              <th>Editar</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>asdas</td>
              <td>dasdas</td>
              <td>dasdasd</td>
              <td>asdasd</td>
              <td>dasd</td>
              <td>asd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
