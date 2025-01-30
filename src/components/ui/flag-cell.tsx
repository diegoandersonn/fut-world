import { useEffect, useState } from "react";
import { PlayerType } from "../../types/playerType";
import getFlagImage from "../../utils/getFlagImage";
import { TeamType } from "../../types/teamType";

type Props = {
  entities: PlayerType[] | TeamType[];
  entity: PlayerType | TeamType;
  type: string;
};

export default function FlagCell({ entities, entity, type }: Props) {
  const [flags, setFlags] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const entity of entities) {
        const flagUrl = await getFlagImage(entity.country);
        flagUrls[entity.country] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    if (entities.length > 0) {
      fetchFlags();
    }
  }, [entities]);
  return (
    <td className="px-4 py-2 border-t border-gray-700">
      {type === "player" ? (
        <div className="flex items-center gap-1">
          {entity.country}
          <img src={flags[entity.country || ""]} className="w-4 h-3" alt="" />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {entity.name}
          <img src={flags[entity.country || ""]} className="w-4 h-3" alt="" />
        </div>
      )}
    </td>
  );
}
