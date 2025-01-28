import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import PositionSelect from "./position-select";
import CountrySelect from "./country-select";
import FormInput from "./form-input";
import FormLabel from "./form-label";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import getOverall from "../../utils/getOverall";
import { TeamType } from "../../types/teamType";
import { forwardRef, useContext } from "react";
import { PlayersContext } from "../../context/PlayersContext";

const attributteSchema = z.coerce
  .number()
  .refine((value) => value >= 1 && value <= 99, {
    message: "Attribute value must be between 1 and 99",
  });

const playerSchema = z.object({
  name: z.string().nonempty("Player Name Field is Required"),
  age: z
    .string()
    .nonempty("Player Age Field is Required")
    .refine(
      (value) =>
        !isNaN(Number(value)) && Number(value) >= 16 && Number(value) <= 40,
      "Player Age must be a valid number between 16 and 40"
    ),
  nationality: z.string().nonempty("Country Name Field is Required"),
  position: z.string().nonempty("Position Name Field is Required"),
  overall: z.number().optional(),
  id: z.string().optional(),
  team: z.string().optional(),
  teamId: z.string().optional(),
  atb1: attributteSchema,
  atb2: attributteSchema,
  atb3: attributteSchema,
  atb4: attributteSchema,
  atb5: attributteSchema,
  atb6: attributteSchema,
});

type PlayerSchema = z.infer<typeof playerSchema>;

type Props = {
  team: TeamType;
};

const CreatePlayerForm = forwardRef<HTMLDialogElement, Props>(
  ({ team }, ref) => {
    const { setPlayers } = useContext(PlayersContext);
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm<PlayerSchema>({
      resolver: zodResolver(playerSchema),
    });

    const handlePlayer = (data: PlayerSchema) => {
      const overall = getOverall(
        data.position,
        data.atb1,
        data.atb2,
        data.atb3,
        data.atb4,
        data.atb5,
        data.atb6
      );

      setPlayers((prevPlayers) => [
        ...prevPlayers,
        {
          ...data,
          id: uuidv4(),
          team: team.name,
          teamId: team.id,
          overall: Number(overall),
        },
      ]);
      reset();
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.close();
      }
    };

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
            <FormLabel text="position" htmlFor="position" />
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
            <FormLabel text="atb1" htmlFor="atb1" />
            <FormInput
              type="number"
              placeholder="Insert Player atb1"
              {...register("atb1")}
            />
            <p className="text-red-700 text-xs">{errors?.atb1?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="atb2" htmlFor="atb2" />
            <FormInput
              type="number"
              placeholder="Insert Player atb2"
              {...register("atb2")}
            />
            <p className="text-red-700 text-xs">{errors?.atb2?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="atb3" htmlFor="atb3" />
            <FormInput
              type="number"
              placeholder="Insert Player atb3"
              {...register("atb3")}
            />
            <p className="text-red-700 text-xs">{errors?.atb3?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="atb4" htmlFor="atb4" />
            <FormInput
              type="number"
              placeholder="Insert Player atb4"
              {...register("atb4")}
            />
            <p className="text-red-700 text-xs">{errors?.atb4?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="atb5" htmlFor="atb5" />
            <FormInput
              type="number"
              placeholder="Insert Player atb5"
              {...register("atb5")}
            />
            <p className="text-red-700 text-xs">{errors?.atb5?.message}</p>
          </div>
          <div className="flex flex-col">
            <FormLabel text="atb6" htmlFor="atb6" />
            <FormInput
              type="number"
              placeholder="Insert Player atb6"
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

export default CreatePlayerForm;
