import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PositionSelect from "../position-select";
import CountrySelect from "../country-select";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import getOverall from "../../../utils/getOverall";
import { TeamType } from "../../../types/teamType";
import { forwardRef } from "react";
import { playerSchema } from "../../../schemas/playerSchema";
import { FormField, FormLabel } from "./form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerType } from "../../../types/playerType";
import defaultPlayerPicture from "../../../assets/defaultplayerpicture.jpg";

type PlayerSchema = z.infer<typeof playerSchema>;

type Props = {
  team: TeamType;
};

const CreatePlayerForm = forwardRef<HTMLDialogElement, Props>(
  ({ team }, ref) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const queryClient = useQueryClient();
    const createPlayer = useMutation({
      mutationFn: async (player: PlayerType) => {
        const response = await fetch(`${API_URL}/players`, {
          method: "POST",
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
          console.error("Erro ao adicionar o jogador.");
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
    } = useForm<PlayerSchema>({
      resolver: zodResolver(playerSchema),
    });
    const handlePlayer = async (data: PlayerSchema) => {
      const overall = getOverall(
        data.position,
        data.atb1,
        data.atb2,
        data.atb3,
        data.atb4,
        data.atb5,
        data.atb6
      );

      const playerData = {
        ...data,
        id: uuidv4(),
        team: team,
        picture: defaultPlayerPicture,
        overall: Number(overall),
      };

      createPlayer.mutate(playerData);
    };

    const attributes: { name: string; key: keyof PlayerSchema }[] = [
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
        className="bg-neutral-950 text-white rounded-md shadow-slate-950 flex flex-col gap-8 p-16 "
      >
        <div className="flex flex-col gap-2">
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
                key={index}
                label={name}
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

export default CreatePlayerForm;
