import getOverall from "../utils/getOverall";

export default class CreateGoalkepper {
    constructor(name, team, nationality, age, number, position, diving, handling, kicking, positioning, reflexes, reactions) {
      this.name = name;
      this.team = team;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.overall = getOverall(
        this.position,  
        this.diving, 
        this.handling, 
        this.kicking, 
        this.positioning, 
        this.reflexes, 
        this.reactions);
      this.diving = diving;
      this.handling = handling;
      this.kicking = kicking;
      this.positioning = positioning;
      this.reflexes = reflexes;
      this.reactions = reactions;
    }
  }