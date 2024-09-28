export default function isValidPlayer(player, attributes) {
  if (!player.name || !player.nationality || !player.age || !player.number || !player.position) {
    alert("Preencha todos os campos obrigatórios do jogador.");
    return false;
  }

  if (player.position === "Goleiro") {
    const { diving, handling, kicking, positioning, reflexes, reactions } = attributes;
    if (
      diving === "" ||
      handling === "" ||
      kicking === "" ||
      positioning === "" ||
      reflexes === "" ||
      reactions === ""
    ) {
      alert("Preencha todos os atributos do goleiro.");
      return false;
    }
  } else {
    const { pace, shooting, passing, dribbling, defense, physical } = attributes;
    if (
      pace === "" ||
      shooting === "" ||
      passing === "" ||
      dribbling === "" ||
      defense === "" ||
      physical === ""
    ) {
      alert("Preencha todos os atributos do jogador de linha.");
      return false;
    }
  }

  return true;
}
