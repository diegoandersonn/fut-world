import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import FormLabel from "./form-label";
import FormInput from "./form-input";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./country-select";
import defaultTeamImage from "../../assets/defaultteamimage.jpg";

const teamSchema = z.object({
  name: z.string().nonempty("The Team Name field is Required"),
  country: z.string().nonempty("The Team Country field is Required"),
  stadium: z.string().nonempty("The Team Stadium field is Required"),
  id: z.string().optional(),
  logo: z.string().optional(),
  manager: z.string().optional(),
});

type TeamSchema = z.infer<typeof teamSchema>;

export default function CreateTeamForm() {
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
    const newTeam = { ...data, id: uuidv4(), logo: defaultTeamImage, manager: 'Default Manager', league: 'Default League' };
    setTeams([...teams, newTeam]);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleTeam)}
      className="bg-neutral-950 text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <FormLabel text="Name" htmlFor="name" />
          <FormInput
            type="text"
            placeholder="Insert Team Name"
            {...register("name")}
          />
          <p className="text-xs text-red-600 font-bold">{errors?.name?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <FormLabel text="Country" htmlFor="country" />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelect placeholder="Insert Team Country" field={field} />
            )}
          />
          <p className="text-xs text-red-600 font-bold">{errors?.country?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <FormLabel text="Estádio" htmlFor="stadium" />
          <FormInput
            type="text"
            placeholder="Insira o estádio do time"
            {...register("stadium")}
          />
        </div>
        <p className="text-xs text-red-600 font-bold">{errors?.stadium?.message}</p>
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
