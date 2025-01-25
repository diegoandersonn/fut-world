import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import TeamFormLabel from "./team-form-label";
import TeamFormInput from "./team-form-input";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import { useNavigate } from "react-router-dom";
import TeamFormSelect from "./team-form-select";
import defaultTeamImage from "../../assets/defaultteamimage.jpg";

const teamSchema = z.object({
  teamName: z.string().nonempty("The Team Name field is Required"),
  teamCountry: z.string().nonempty("The Team Country field is Required"),
  teamStadium: z.string().nonempty("The Team Stadium field is Required"),
  id: z.string().optional(),
  logo: z.string().optional(),
});

type TeamSchema = z.infer<typeof teamSchema>;

export default function TeamForm() {
  const navigate = useNavigate();
  const { teams, setTeams } = useContext(TeamsContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });

  const handleTeam = (data: TeamSchema) => {
    const newTeam = { ...data, id: uuidv4(), logo: defaultTeamImage };
    setTeams([...teams, newTeam]);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleTeam)}
      className="bg-neutral-950 text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Name" htmlFor="teamName" />
          <TeamFormInput
            type="text"
            placeholder="Insert Team Name"
            {...register("teamName")}
          />
          <p>{errors?.teamName?.message}</p>
        </div>

        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Country" htmlFor="teamCountry" />
          <Controller
            name="teamCountry"
            control={control}
            render={({ field }) => (
              <TeamFormSelect placeholder="Insert Team Country" field={field} />
            )}
          />
        </div>

        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Estádio" htmlFor="teamStadium" />
          <TeamFormInput
            type="text"
            placeholder="Insira o estádio do time"
            {...register("teamStadium")}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-emerald-500 h-8 font-semibold hover:bg-emerald-700 rounded-md hover:scale-110"
      >
        Enviar
      </button>
    </form>
  );
}
