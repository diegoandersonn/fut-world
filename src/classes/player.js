import getOverall from "../utils/getOverall";

export default class CreatePlayer {
    id;
    constructor(name, team, nationality, age, number, position, pace, shooting, passing, dribbling, defense, physical) {
      this.name = name;
      this.team = team;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.overall = getOverall(
        this.position,  
        this.pace, 
        this.shooting, 
        this.passing, 
        this.dribbling, 
        this.defense, 
        this.physical);
      this.pace = pace;
      this.shooting = shooting;
      this.passing = passing;
      this.dribbling = dribbling;
      this.defense = defense;
      this.physical = physical;
    }
  }