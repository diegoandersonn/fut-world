import { PlayerType } from "../../../types/playerType";
import { TeamType } from "../../../types/teamType";

type CellProps = {
  content: string | number;
};

export function TableCell({ content }: CellProps) {
  return (
    <td className="px-4 py-2 border-t border-gray-700">
        {content}
    </td>
  );
}

type FlagProps = {
  entity: PlayerType | TeamType;
  type: string;
};

export function FlagCell({ entity, type }: FlagProps) {
  return (
    <td className="px-4 py-2 border-t border-gray-700">
        {type === "player" ? (
          <div className="flex items-center gap-1">
            {entity.country.name}
            <img src={entity.country.flag} className="w-4 h-3" alt="" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {entity.name}
            <img src={entity.country.flag} className="w-4 h-3" alt="" />
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
        <img src={content} className="h-14 w-14 rounded-md border-1 border-gray-700" />
    </td>
  );
}
