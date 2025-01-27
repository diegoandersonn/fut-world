import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import FormInput from "./form-input";
import FormLabel from "./form-label";

const playerSchema = z.object({
  name: z.string().nonempty("Player Name Field is Required"),
  country: z.string().nonempty("Country Name Field is Required"),
  position: z.string().nonempty("Position Name Field is Required"),
  overall: z.string().optional(),
  id: z.string().optional(),
  team: z.string().optional(),
  teamId: z.string().optional(),
});

type PlayerSchema = z.infer<typeof playerSchema>;

export default function PlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerSchema>({
    resolver: zodResolver(playerSchema),
  });

  const handlePlayer = (data: PlayerSchema) => {
    console.log("oi");
    const newPlayer = { ...data, id: uuidv4() };
  };
  return (
    <form
      method="dialog"
      onSubmit={handleSubmit(handlePlayer)}
      className="bg-neutral-950 text-white rounded-md shadow-sm shadow-slate-950 flex flex-col gap-4 p-20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between">
          <FormLabel text="Name" htmlFor="name" />
          <FormInput
            type="text"
            placeholder="Insert Player Name"
            {...register("name")}
          />
          <p>{errors?.name?.message}</p>
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
