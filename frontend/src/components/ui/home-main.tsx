import { useSearchParams } from "react-router-dom";
import PlayersTable from "./table/players-table";
import { Search, SearchX } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const playersFilterSchema = z.object({
  name: z.string(),
});

type PlayersFilterSchema = z.infer<typeof playersFilterSchema>;

export default function HomeMain() {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleFilterPlayers({ name }: PlayersFilterSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set("name", name);
      } else {
        state.delete("name");
      }
      return state;
    });
  }
  const { register, handleSubmit, reset } = useForm<PlayersFilterSchema>({
    resolver: zodResolver(playersFilterSchema),
    values: {
      name: searchParams.get("name") ?? "",
    },
  });
  function resetFilter() {
    reset();
    setSearchParams((state) => {
      state.delete("name");
      return state;
    });
  }
  return (
    <div className="flex-1 flex flex-col gap-8 bg-neutral-950 text-white rounded-md p-12 mr-2">
      <div className="flex">
        <form
          action=""
          className="flex gap-4"
          onSubmit={handleSubmit(handleFilterPlayers)}
        >
          <input
            type="text"
            className="p-3 h-8 w-96 text-white text-sm font-bold bg-neutral-950 border border-zinc-400 rounded-md hover:scale-105 focus:outline-none"
            placeholder="Name"
            {...register("name")}
          />
          <button
            type="submit"
            className="flex gap-2 items-center p-4 h-8 text-white text-sm font-bold rounded-md hover:scale-105 hover:text-zinc-400 focus:outline-none"
          >
            <Search />
            <div>Filtrar Jogadores</div>
          </button>
          <button
            onClick={resetFilter}
            className="flex gap-2 items-center p-4 h-8 text-white text-sm font-bold rounded-md hover:scale-105 hover:text-zinc-400 focus:outline-none"
          >
            <SearchX />
            <div>Resetar Filtro</div>
          </button>
        </form>
      </div>
      <div className="overflow-y-auto scrollbar-thumb">
        <PlayersTable />
      </div>
    </div>
  );
}
