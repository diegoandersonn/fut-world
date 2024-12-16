import React from 'react';

export default function TeamForm({
  team,
  handleInputChange
}) {
  return (<form action="">
    <label htmlFor="teamName">Nome do Time:</label><br />
    <input
      type="text"
      id="teamName"
      name="teamName"
      value={team.teamName}
      onChange={handleInputChange}
    /><br /><br />
    <label htmlFor="teamCountry">País:</label><br />
    <select name="teamCountry" value={team.teamCountry} onChange={handleInputChange}>
      <option value="" disabled>Selecione o País</option>
      <option value="Inglaterra">Inglaterra</option>
      <option value="Espanha">Espanha</option>
      <option value="Alemanha">Alemanha</option>
      <option value="Italia">Italia</option>
      <option value="França">França</option>
      <option value="Brasil">Brasil</option>
      <option value="Portugal">Portugal</option>
      <option value="Argentina">Argentina</option>
      <option value="Estados Unidos">Estados Unidos</option>
      <option value="Arábia Saudita">Arábia Saudita</option>
    </select>
    <br /><br />
    <label htmlFor="teamStadium">Estádio do time:</label><br />
    <input
      type="text"
      id="teamStadium"
      name="teamStadium"
      value={team.teamStadium}
      onChange={handleInputChange}
    /><br /><br /><br />
    <button type="submit">Enviar</button>
  </form>);
};
