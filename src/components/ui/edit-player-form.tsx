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

const attributteSchema = z.coerce
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
  atb1: attributteSchema,
  atb2: attributteSchema,
  atb3: attributteSchema,
  atb4: attributteSchema,
  atb5: attributteSchema,
  atb6: attributteSchema,
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
          <div className="flex flex-col">
            <FormLabel text="Pace" htmlFor="atb1" />
            <FormInput
              type="number"
              placeholder="Insert Player Pace"
              {...register("atb1")}
            />
            <p className="text-red-700 text-xs">{errors?.atb1?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Shooting" htmlFor="atb2" />
            <FormInput
              type="number"
              placeholder="Insert Player Shooting"
              {...register("atb2")}
            />
            <p className="text-red-700 text-xs">{errors?.atb2?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Passing" htmlFor="atb3" />
            <FormInput
              type="number"
              placeholder="Insert Player Passing"
              {...register("atb3")}
            />
            <p className="text-red-700 text-xs">{errors?.atb3?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Dribbling" htmlFor="atb4" />
            <FormInput
              type="number"
              placeholder="Insert Player Dribbling"
              {...register("atb4")}
            />
            <p className="text-red-700 text-xs">{errors?.atb4?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Defense" htmlFor="atb5" />
            <FormInput
              type="number"
              placeholder="Insert Player Defense"
              {...register("atb5")}
            />
            <p className="text-red-700 text-xs">{errors?.atb5?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="Physical" htmlFor="atb6" />
            <FormInput
              type="number"
              placeholder="Insert Player Physical"
              {...register("atb6")}
            />
            <p className="text-red-700 text-xs">{errors?.atb6?.message}</p>
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
);

export default CreateEditPlayerForm;