export default class CreateGoalkepper {
    overall;
    constructor(name, team, nationality, age, number, position, diving, handling, kicking, positioning, reflexes, reactions) {
      this.name = name;
      this.team = team;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.diving = diving;
      this.handling = handling;
      this.kicking = kicking;
      this.positioning = positioning;
      this.reflexes = reflexes;
      this.reactions = reactions;
    }
    getOverall() {
      return ((Number(this.diving) + Number(this.handling) + Number(this.kicking) + Number(this.positioning) + Number(this.reflexes) + Number(this.reactions))/6).toFixed(0);
    }
  }