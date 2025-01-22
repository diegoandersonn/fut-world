import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import TeamFormLabel from "./team-form-label";
import TeamFormInput from "./team-form-input";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import TeamFormSelect from "./team-form-select";

const teamSchema = z.object({
  teamName: z.string().nonempty("Nome do time é obrigatório"),
  teamCountry: z.object({
    name: z.string().nonempty(),
    flag: z.string().nonempty(),
  }),
  teamStadium: z.string(),
  id: z.string().optional(),
});

type TeamSchema = z.infer<typeof teamSchema>;

export default function TeamForm() {
  const { teams, setTeams } = useContext(TeamsContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });

  

  const handleTeam = (data: TeamSchema) => {
    const newTeam = { ...data, id: uuidv4() };
    setTeams([...teams, newTeam]);
  };
  return (
    <form
      onSubmit={handleSubmit(handleTeam)}
      className="bg-neutral-950 text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Nome" htmlFor="teamName" />
          <TeamFormInput
            type="text"
            placeholder="Insira o país do time"
            {...register("teamName")}
          />
          <p>{errors?.teamName?.message}</p>
        </div>
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="País" htmlFor="teamCountry" />
          <TeamFormSelect
            placeholder="Insira o país do time"
            {...register("teamStadium")}
          />
          <p>{errors?.teamCountry?.message}</p>
        </div>
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Estádio" htmlFor="teamStadium" />
          <TeamFormInput
            type="text"
            placeholder="Insira o estadio do time"
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
