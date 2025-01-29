import { Pencil, Trash2 } from "lucide-react";
import EditPlayerDialog from "./edit-player-dialog";
import { useState, useEffect, useRef } from "react";
import getFlagImage from "../../utils/getFlagImage";
import { PlayerType } from "../../types/playerType";
import FooterTableHead from "./footer-table-head";
import FooterTableBody from "./footer-table-body";

type Props = {
  teamPlayers: PlayerType[];
};

export default function MainFooterTable({ teamPlayers }: Props) {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [flags, setFlags] = useState<{ [key: string]: string }>({});
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);

  useEffect(() => {
    const fetchFlags = async () => {
      const flagUrls: { [key: string]: string } = {};
      for (const player of teamPlayers) {
        const flagUrl = await getFlagImage(player.nationality);
        flagUrls[player.nationality] = flagUrl || "";
      }
      setFlags(flagUrls);
    };

    if (teamPlayers.length > 0) {
      fetchFlags();
    }
  }, [teamPlayers]);

  return (
    <>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <FooterTableHead />
        <FooterTableBody teamPlayers={teamPlayers} />
      </table>
      {selectedPlayer && (
        <EditPlayerDialog ref={editDialogRef} player={selectedPlayer} />
      )}
    </>
  );
}
