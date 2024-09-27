export default function isValidPlayer(player) {
    const { name, nationality, age, number, pace, shooting, passing, dribbling, defense, physical } = player;
  
    if (!name || !nationality || !age || !number || !player.position || !pace || !shooting || !passing || !dribbling || !defense || !physical) {
      return false;
    }
    const attributes = [pace, shooting, passing, dribbling, defense, physical];
    return (number >= 0 && number <= 99 && attributes.every(attr => attr >= 0 && attr <= 99) && age > 16 && age <= 100);
  }
  