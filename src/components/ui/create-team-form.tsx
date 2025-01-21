import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import TeamFormLabel from "./create-team-label";
import TeamFormInput from "./create-team-input";
import { useState } from "react";

const teamSchema = z.object({
  teamName: z.string().nonempty("Nome do time é obrigatório"),
  teamCountry: z.string().nonempty("País do time é obrigatório"),
  teamStadium: z.string(),
  id: z.string().optional(),
});

type TeamSchema = z.infer<typeof teamSchema>;

export default function CreateTeamForm() {
  const [output, setOutput] = useState("");
  const { register, handleSubmit } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });
  const handleTeam = (data: TeamSchema) => {
    console.log("oi");
    const newTeam = { ...data, id: uuidv4() };
    console.log(newTeam);
    setOutput(JSON.stringify(newTeam, null, 2));
  };
  return (
    <form
      onSubmit={handleSubmit(handleTeam)}
      className="bg-black text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Nome" htmlFor="teamName" />
          <TeamFormInput
            type="text"
            placeholder="Insira o país do time"
            {...register("teamName")}
          />
        </div>
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="País" htmlFor="teamCountry" />
          <TeamFormInput
            type="text"
            placeholder="Insira o país do time"
            {...register("teamCountry")}
          />
        </div>
        <div className="flex flex-col justify-between">
          <TeamFormLabel text="Estádio" htmlFor="teamStadium" />
          <TeamFormInput
            type="text"
            placeholder="Insira o país do time"
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
      <p>{output}</p>
    </form>
  );
}
