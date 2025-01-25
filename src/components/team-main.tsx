import { useLocation } from "react-router-dom";
import { Share, PencilLine, Send } from "lucide-react";
import { useContext, useState } from "react";
import { TeamsContext } from "../context/TeamsContext";

export default function HomeMain() {
  const { updateTeam } = useContext(TeamsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedKey, setEditedKey] = useState("");
  const location = useLocation();
  const team = location.state?.team || {
    name: "Default Team",
    country: "Unknown",
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const updatedTeam = { ...team, logo: fileURL };
      updateTeam(updatedTeam);
    }
  }

  function handleClick() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setEditedKey(team.teamName);
      setIsEditing(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditedKey(e.target.value);
  }

  function handleSubmit() {
    updateTeam({ ...team, teamName: editedKey });
    console.log(team);
    setIsEditing(false);
  }

  return (
    <div className="flex flex-col bg-neutral-950 w-full mr-2 text-white rounded-md">
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
                onChange={handleFileChange}
              />
            </button>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedKey}
                  onChange={(e) => handleChange(e)}
                  className="text-3xl bg-transparent border-b border-white outline-none w-full"
                  style={{ width: `${team.teamName.length}ch` }}
                />
                <button type="submit" onClick={handleSubmit}>
                  <Send />
                </button>
                <button onClick={handleClick}>
                  <PencilLine />
                </button>
              </>
            ) : (
              <>
                <h1 className="text-3xl">{team.teamName}</h1>
                <button onClick={handleClick}>
                  <PencilLine />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center m-4">
          <form action="" className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">OIII</label>
              <input type="text" />
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1>FORM DE JOGADORES</h1>
      </div>
    </div>
  );
}
