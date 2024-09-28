export default class CreatePlayer {
    overall;
    constructor(name, team, nationality, age, number, position, pace, shooting, passing, dribbling, defense, physical) {
      this.name = name;
      this.team = team;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.pace = pace;
      this.shooting = shooting;
      this.passing = passing;
      this.dribbling = dribbling;
      this.defense = defense;
      this.physical = physical;
    }
    getOverall() {
      if (this.position === 'Zagueiro') {
        return (this.defense * 0.6 + this.passing * 0.1 + this.physical * 0.3).toFixed(0);
      } else if (this.position === 'Lateral') {
        return (this.pace * 0.3 + this.passing * 0.2 + this.defense * 0.3 + this.dribbling * 0.2).toFixed(0);
      } else if (this.position === 'Volante') {
        return (this.defense * 0.4 + this.physical * 0.3 + this.passing * 0.3).toFixed(0);
      } else if (this.position === 'Meio-Campo') {
        return (this.shooting * 0.1 + this.passing * 0.3 + this.dribbling * 0.2 + this.defense * 0.2 + this.physical * 0.2).toFixed(0);
      } else if (this.position === 'Meia-Atacante') {
        return (this.shooting * 0.3 + this.dribbling * 0.3 + this.passing * 0.4).toFixed(0);
      } else if (this.position === 'Ponta') {
        return (this.shooting * 0.2 + this.dribbling * 0.5 + this.pace * 0.3).toFixed(0);
      } else if (this.position === 'Atacante') {
        return (this.shooting * 0.5 + this.dribbling * 0.2 + this.passing * 0.1 + this.physical * 0.2).toFixed(0);
      }
    }
  }