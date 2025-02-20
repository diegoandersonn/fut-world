export default function getOverall(
  position: string,
  atb1: number,
  atb2: number,
  atb3: number,
  atb4: number,
  atb5: number,
  atb6: number
) {
  if (position === "Goalkeeper") {
    const atributtes = {
      diving: atb1,
      handling: atb2,
      kicking: atb3,
      positioning: atb4,
      reflexes: atb5,
      reactions: atb6,
    };
    const overall = (
      atributtes.diving * 0.2 +
      atributtes.handling * 0.2 +
      atributtes.kicking * 0.2 +
      atributtes.positioning * 0.2 +
      atributtes.reflexes * 0.1 +
      atributtes.reactions * 0.1
    ).toFixed(0);
    if (Number(overall) > 99) return 99;
    return overall;
  } else {
    const atributtes = {
      pace: atb1,
      shooting: atb2,
      passing: atb3,
      dribbling: atb4,
      defense: atb5,
      physical: atb6,
    };
    if (position === "Centre-Back") {
      const overall = (
        atributtes.defense * 0.6 +
        atributtes.passing * 0.1 +
        atributtes.physical * 0.3
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Left-Back" || position == "Right-Back") {
      const overall = (
        atributtes.pace * 0.3 +
        atributtes.passing * 0.2 +
        atributtes.defense * 0.3 +
        atributtes.dribbling * 0.2
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Defensive Midfield") {
      const overall = (
        atributtes.defense * 0.4 +
        atributtes.physical * 0.3 +
        atributtes.passing * 0.3
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Central Midfield") {
      const overall = (
        atributtes.shooting * 0.1 +
        atributtes.passing * 0.3 +
        atributtes.dribbling * 0.2 +
        atributtes.defense * 0.2 +
        atributtes.physical * 0.2
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Attacking Midfield") {
      const overall = (
        atributtes.shooting * 0.3 +
        atributtes.dribbling * 0.3 +
        atributtes.passing * 0.4
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Left Winger" || position === "Right Winger") {
      const overall = (
        atributtes.shooting * 0.2 +
        atributtes.dribbling * 0.5 +
        atributtes.pace * 0.3
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    } else if (position === "Centre-Forward") {
      const overall = (
        atributtes.shooting * 0.5 +
        atributtes.dribbling * 0.2 +
        atributtes.passing * 0.1 +
        atributtes.physical * 0.2
      ).toFixed(0);
      if (Number(overall) > 99) return 99;
      return overall;
    }
  }
}
