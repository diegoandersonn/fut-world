import { Controller, useForm } from "react-hook-form";
import PositionSelect from "../position-select";
import CountrySelect from "../country-select";
import { PlayerType } from "../../../../../shared/types/playerType"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormLabel } from "./form";
import { forwardRef, useEffect } from "react";
import getOverall from "../../../utils/getOverall";
import { playerSchema } from "../../../schemas/playerSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditPlayerSchema = z.infer<typeof playerSchema>;

type Props = {
  player: PlayerType;
};

const CreateEditPlayerForm = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const queryClient = useQueryClient();
    const editPlayer = useMutation({
      mutationFn: async (player: PlayerType) => {
        const response = await fetch(`${API_URL}/players/${player.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(player),
        });
        if (response.ok) {
          reset();
          if (ref && typeof ref !== "function" && ref.current) {
            ref.current.close();
          }
        } else {
          console.error("Erro ao criar o jogador.");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-players"] });
      },
    });
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm<EditPlayerSchema>({
      resolver: zodResolver(playerSchema),
      defaultValues: {
        name: player.name,
        age: player.age,
        country: player.country,
        position: player.position,
        picture: player.picture,
        atb1: player.atb1,
        atb2: player.atb2,
        atb3: player.atb3,
        atb4: player.atb4,
        atb5: player.atb5,
        atb6: player.atb6,
      },
    });
    useEffect(() => {
      reset({
        name: player.name,
        age: player.age,
        country: player.country,
        position: player.position,
        picture: player.picture,
        atb1: player.atb1,
        atb2: player.atb2,
        atb3: player.atb3,
        atb4: player.atb4,
        atb5: player.atb5,
        atb6: player.atb6,
      });
    }, [player, reset]);

    async function handlePlayer(data: EditPlayerSchema) {
      const newPlayer: PlayerType = {
        ...data,
        id: player.id,
        team: player.team,
        picture: player.picture,
        overall: Number(
          getOverall(
            data.position,
            data.atb1,
            data.atb2,
            data.atb3,
            data.atb4,
            data.atb5,
            data.atb6
          )
        ),
      };
      editPlayer.mutate(newPlayer);
    }

    const attributes: { name: string; key: keyof EditPlayerSchema }[] = [
      { name: "Pace", key: "atb1" },
      { name: "Shooting", key: "atb2" },
      { name: "Passing", key: "atb3" },
      { name: "Dribbling", key: "atb4" },
      { name: "Defense", key: "atb5" },
      { name: "Physical", key: "atb6" },
    ];

    return (
      <form
        method="dialog"
        onSubmit={handleSubmit(handlePlayer)}
        className="bg-neutral-950 text-white rounded-md shadow-slate-950 flex flex-col gap-4 p-16 "
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            placeholder="Insert Player Name"
            register={register}
            errors={errors}
          />
          <FormField
            label="Age"
            name="age"
            type="text"
            placeholder="Insert Player Age"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col">
            <FormLabel text="Position" htmlFor="position" />
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <PositionSelect
                  placeholder="Insert Player position"
                  field={field}
                />
              )}
            />
            <p className="text-red-700 text-xs">{errors?.position?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Nationality" htmlFor="country" />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  placeholder="Insert Player Nationality"
                  field={field}
                />
              )}
            />
            <p className="text-red-700 text-xs">{errors?.country?.message}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {attributes.map(({ name, key }, index) => {
            return (
              <FormField
                label={name}
                key={index}
                name={key}
                type="number"
                placeholder="Insert Player Name"
                register={register}
                errors={errors}
              />
            );
          })}
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
);

export default CreateEditPlayerForm;
