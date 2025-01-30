import { useEffect, useState } from "react";
import { PlayerType } from "../../types/playerType";
import getFlagImage from "../../utils/getFlagImage";

type Props = {
  players: PlayerType[];
  player: PlayerType;
};

export default function FlagCell({ players, player }: Props) {
  const [flags, setFlags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const player of players) {
        const flagUrl = await getFlagImage(player.nationality);
        flagUrls[player.nationality] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    if (players.length > 0) {
      fetchFlags();
    }
  }, [players]);
  return (
    <td className="px-4 py-2 border-t border-gray-700">
      <div className="flex items-center gap-1">
        {player.nationality}
        <img src={flags[player.nationality || ""]} className="w-4 h-3" alt="" />
      </div>
    </td>
  );
}
