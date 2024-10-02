export default function getOverall(position, atb1, atb2, atb3, atb4, atb5, atb6) {
  if (position === 'Goleiro') {
    const atributtes = {
      diving: atb1,
      handling: atb2,
      kicking: atb3,
      positioning: atb4,
      reflexes: atb5,
      reactions: atb6
    }
    return (atributtes.diving * 0.2 + atributtes.handling * 0.2 + atributtes.kicking * 0.2 + atributtes.positioning * 0.2 + atributtes.reflexes * 0.1 + atributtes.reactions * 0.1).toFixed(0);
  } else {
    const atributtes = {
      pace: atb1,
      shooting: atb2,
      passing: atb3,
      dribbling: atb4,
      defense: atb5,
      physical: atb6
    }
    if (position === 'Zagueiro') {
      return (atributtes.defense * 0.6 + atributtes.passing * 0.1 + atributtes.physical * 0.3).toFixed(0);
    } else if (position === 'Lateral') {
      return (atributtes.pace * 0.3 + atributtes.passing * 0.2 + atributtes.defense * 0.3 + atributtes.dribbling * 0.2).toFixed(0);
    } else if (position === 'Volante') {
      return (atributtes.defense * 0.4 + atributtes.physical * 0.3 + atributtes.passing * 0.3).toFixed(0);
    } else if (position === 'Meio-Campo') {
      return (atributtes.shooting * 0.1 + atributtes.passing * 0.3 + atributtes.dribbling * 0.2 + atributtes.defense * 0.2 + atributtes.physical * 0.2).toFixed(0);
    } else if (position === 'Meia-Atacante') {
      return (atributtes.shooting * 0.3 + atributtes.dribbling * 0.3 + atributtes.passing * 0.4).toFixed(0);
    } else if (position === 'Ponta') {
      return (atributtes.shooting * 0.2 + atributtes.dribbling * 0.5 + atributtes.pace * 0.3).toFixed(0);
    } else if (position === 'Atacante') {
      return (atributtes.shooting * 0.5 + atributtes.dribbling * 0.2 + atributtes.passing * 0.1 + atributtes.physical * 0.2).toFixed(0);
    }
  }
}