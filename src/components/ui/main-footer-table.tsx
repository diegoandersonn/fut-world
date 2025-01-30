import { useState, useRef } from "react";
import EditPlayerDialog from "./edit-player-dialog";
import FooterTableHead from "./footer-table-head";
import FooterTableBody from "./footer-table-body";
import { PlayerType } from "../../types/playerType";

type Props = {
  players: PlayerType[];
};

export default function MainFooterTable({ players }: Props) {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);
  function toggleEditDialog(player: PlayerType) {
    setSelectedPlayer(player);
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
    }
  }
  return (
    <>
      <table className="w-full table-auto border-collapse text-left bg-neutral-950 text-white">
        <FooterTableHead />
        <FooterTableBody teamPlayers={players} onEdit={toggleEditDialog} />
      </table>
      {selectedPlayer && (
        <EditPlayerDialog ref={editDialogRef} player={selectedPlayer} />
      )}
    </>
  );
}
