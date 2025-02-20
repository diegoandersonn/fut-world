import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import CountrySelect from "../country-select";
import defaultTeamImage from "../../../assets/defaultteamimage.jpg";
import { teamSchema } from "../../../schemas/teamSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamType } from "../../../../../shared/types/teamType";
import { FormField, FormLabel } from "./form";
import { forwardRef } from "react";
import { toast } from "react-toastify";

type TeamSchema = z.infer<typeof teamSchema>;

const CreateTeamForm = forwardRef<HTMLDialogElement>((_, ref) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const createTeam = useMutation({
    mutationFn: async (team: TeamType) => {
      const response = await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });
      if (response.ok) {
        toast.success("Time adicionado!")
        reset();
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.close();
        }
      } else {
        toast.error("Erro ao adicionar o time.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
    },
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });

  const handleTeam = async (data: TeamSchema) => {
    const newTeam = {
      ...data,
      id: uuidv4(),
      logo: defaultTeamImage,
      manager: "Default Manager",
      league: "Default League",
    };
    createTeam.mutate(newTeam);
  };

  return (
    <form
      onSubmit={handleSubmit(handleTeam)}
      className="bg-neutral-950 text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <FormField
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Player Name"
          register={register}
          errors={errors}
        />

        <div className="flex flex-col gap-2">
          <FormLabel text="Country" htmlFor="country" />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelect placeholder="Insert Team Country" field={field} />
            )}
          />
          <p className="text-xs text-red-600 font-bold">
            {errors?.country?.message}
          </p>
        </div>

        <FormField
          label="Stadium"
          name="stadium"
          type="text"
          placeholder="Insert Player Stadium"
          register={register}
          errors={errors}
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-500 h-8 font-semibold hover:bg-emerald-700 rounded-md hover:scale-110"
      >
        Enviar
      </button>
    </form>
  );
});

export default CreateTeamForm;
