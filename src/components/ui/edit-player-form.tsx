import { Controller, useForm } from "react-hook-form";
import PositionSelect from "./position-select";
import CountrySelect from "./country-select";
import FormInput from "./form-input";
import FormLabel from "./form-label";
import { PlayerType } from "../../types/playerType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef, useContext, useEffect } from "react";
import { PlayersContext } from "../../context/PlayersContext";
import getOverall from "../../utils/getOverall";

const attributeSchema = z.coerce
  .number()
  .refine((value) => value >= 1 && value <= 99, {
    message: "Attribute value must be between 1 and 99",
  });

const editPlayerSchema = z.object({
  name: z.string().nonempty("The Player Name Field is Required"),
  age: z
    .string()
    .nonempty("Player Age Field is Required")
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) >= 16 && Number(value) <= 40,
      "Player Age must be a valid number between 16 and 40"
    ),
  nationality: z.string().nonempty("Player Nationality Field is Required"),
  position: z.string().nonempty("Player Position Field is Required"),
  atb1: attributeSchema,
  atb2: attributeSchema,
  atb3: attributeSchema,
  atb4: attributeSchema,
  atb5: attributeSchema,
  atb6: attributeSchema,
});

type EditPlayerSchema = z.infer<typeof editPlayerSchema>;

type Props = {
  player: PlayerType;
};

const CreateEditPlayerForm = forwardRef<HTMLDialogElement, Props>(
  ({ player }, ref) => {
    const { updatePlayer } = useContext(PlayersContext);
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm<EditPlayerSchema>({
      resolver: zodResolver(editPlayerSchema),
      defaultValues: {
        name: player.name,
        age: player.age,
        nationality: player.nationality,
        position: player.position,
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
        nationality: player.nationality,
        position: player.position,
        atb1: player.atb1,
        atb2: player.atb2,
        atb3: player.atb3,
        atb4: player.atb4,
        atb5: player.atb5,
        atb6: player.atb6,
      });
    }, [player, reset]);

    function handlePlayer(data: EditPlayerSchema) {
      const newPlayer: PlayerType = {
        ...data,
        id: player.id,
        team: player.team,
        teamId: player.teamId,
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
      updatePlayer(newPlayer);
      reset();
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    }

    const attributes = [
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
          <div className="flex flex-col">
            <FormLabel text="Name" htmlFor="name" />
            <FormInput
              type="text"
              placeholder="Insert Player Name"
              {...register("name")}
            />
            <p className="text-red-700 text-xs">{errors?.name?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Age" htmlFor="age" />
            <FormInput
              type="number"
              placeholder="Insert Player Age"
              {...register("age")}
            />
            <p className="text-red-700 text-xs">{errors?.age?.message}</p>
          </div>
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
            <FormLabel text="Nationality" htmlFor="nationality" />
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  placeholder="Insert Player Nationality"
                  field={field}
                />
              )}
            />
            <p className="text-red-700 text-xs">
              {errors?.nationality?.message}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {attributes.map(({ name, key }) => {
            return (
              <div key={key} className="flex flex-col w-30">
                <FormLabel text={name} htmlFor={key} />
                <FormInput
                  type="number"
                  min="1"
                  max="99"
                  placeholder={`${name}`}
                  {...register(key as keyof EditPlayerSchema)}
                />
              </div>
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
