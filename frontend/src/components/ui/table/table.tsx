import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { PlayerType } from "../../../../../shared/types/playerType";
import { useRemovePlayer } from "../../../hooks/use-removePlayer";
import { TeamType } from "../../../../../shared/types/teamType";
import defaultFlagImage from "../../../assets/defaultflagimage.jpeg";
import { ReactNode, useContext, useState } from "react";
import { OrderContext } from "../../../contexts/order-context";

type CellProps = {
  content: string | number;
};

export function TableCell({ content }: CellProps) {
  return <td className="px-4 py-2 border-t border-gray-700">{content}</td>;
}

type FlagProps = {
  countryName: string;
  countryFlag: string;
  type: string;
};

export function FlagCell({ countryName, countryFlag, type }: FlagProps) {
  return (
    <td className="px-4 py-2 border-t border-gray-700">
      {type === "player" ? (
        <div className="flex items-center gap-1">
          {countryName}
          <img src={countryFlag} className="w-4 h-3" alt="" />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {countryName}
          <img src={countryFlag} className="w-4 h-3" alt="" />
        </div>
      )}
    </td>
  );
}

type ImageProps = {
  content: string;
};

export function ImageCell({ content }: ImageProps) {
  return (
    <td className="border-t border-gray-700">
      <img
        src={content}
        className="h-14 w-14 rounded-md border-1 border-gray-700"
      />
    </td>
  );
}
export function TableHead() {
  const [isDescending, toggleIsDescending] = useState<boolean>(false);
  const {order, setOrder } = useContext(OrderContext);
  function handleOrderClick() {
    setOrder((prevState) => {
      if (prevState.order === "Descending") {
        queryClient.invalidateQueries({
          queryKey: ["get-players"],
          exact: false,
        });
        toggleIsDescending(false);
        return { order: "Ascending", value: "name" };
      } else {
        console.log("Mudado");
        queryClient.invalidateQueries({
          queryKey: ["get-players"],
          exact: false,
        });
        toggleIsDescending(true);
        return { order: "Descending", value: "name" };
      }
    });
  }
  const queryClient = useQueryClient();
  return (
    <thead>
      <tr className="text-sm uppercase text-gray-300">
        <th></th>
        <th className="px-4 py-2">
          <button className="flex" onClick={handleOrderClick}>
            Name
            {isDescending && order.value === 'name' ? <ChevronUp /> : <ChevronDown />}
          </button>
        </th>
        <th className="px-4 py-2">Nationality</th>
        <th className="px-4 py-2">Team</th>
        <th className="px-4 py-2">Age</th>
        <th className="px-4 py-2">Position</th>
        <th className="px-4 py-2">Overall</th>
        <th className="px-4 py-2">Edit</th>
        <th className="px-4 py-2">Remove</th>
      </tr>
    </thead>
  );
}
type BodyProps = {
  team?: TeamType;
};

export function TableBody({ team }: BodyProps) {
  const { order } = useContext(OrderContext);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const removePlayer = useRemovePlayer();
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: playersResponse } = useQuery<PlayerType[]>({
    queryKey: ["get-players", name || "", team?.name || "all"],
    queryFn: async () => {
      const url = new URL(`${API_URL}/players`);
      if (name) url.searchParams.append("filter", name);
      if (team?.name) url.searchParams.append("type", team.name);
      if (order?.value) {
        url.searchParams.append("orderBy", order.value);
        url.searchParams.append("order", order.order);
      }

      const response = await fetch(url.toString());
      return await response.json();
    },
  });

  return (
    <tbody>
      {playersResponse && playersResponse.length > 0 ? (
        playersResponse.map((player) => (
          <tr
            key={player.id}
            className="hover:bg-neutral-800 transition-colors"
          >
            <ImageCell content={player.picture} />
            <TableCell content={player.name} />
            <FlagCell
              countryName={player.country?.name || "Default Country"}
              countryFlag={player.country?.flag || defaultFlagImage}
              type="player"
            />
            <FlagCell
              countryName={player.team.name || "Default Team"}
              countryFlag={player.team.country?.flag || defaultFlagImage}
              type="team"
            />
            <TableCell content={player.age} />
            <TableCell content={player.position} />
            <TableCell content={player.overall} />
            <td className="px-4 py-2 border-t border-gray-700">
              <Link
                to={`/Player/${player.name}`}
                state={{ player }}
                className="text-emerald-500 hover:text-emerald-300"
              >
                <Pencil />
              </Link>
            </td>
            <td className="px-4 py-2 border-t border-gray-700">
              <button
                className="text-red-500 hover:text-red-300"
                onClick={() => removePlayer.mutate(player)}
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="text-center py-4 text-gray-400">
            Não há jogadores no time.
          </td>
        </tr>
      )}
    </tbody>
  );
}

type TableProps = {
  children: ReactNode;
};

export function Table({ children }: TableProps) {
  return (
    <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
      {children}
    </table>
  );
}
