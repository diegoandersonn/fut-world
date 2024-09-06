import React, { useState, useContext } from "react";
import { Container, Form } from './styled';
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';

export default function Create() {
  const [teamName, setTeamName] = useState("");
  const [teamCountry, setTeamCountry] = useState("");
  const [teamStadium, setTeamStadium] = useState("");
  const { teams, setTeams } = useContext(TeamsContext);

  class CreateTeam {
    constructor(name, country, stadium) {
      this.name = name;
      this.country = country;
      this.stadium = stadium;
    }
  }

  function saveTeam(e) {
    e.preventDefault();
    if (!teamName || !teamCountry || !teamStadium) return;
    const newTeam = new CreateTeam(teamName, teamCountry, teamStadium);
    setTeams([...teams, newTeam]);
    setTeamName("");
    setTeamCountry("");
    setTeamStadium("");
  }

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={saveTeam}>
          <form action="">
            <label htmlFor="teamName">Nome do Time:</label><br />
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            /><br /><br />
            <label htmlFor="teamCountry">País:</label><br />
            <input
              type="text"
              id="teamCountry"
              name="teamCountry"
              value={teamCountry}
              onChange={(e) => setTeamCountry(e.target.value)}
            /><br /><br />
            <label htmlFor="teamStadium">Estádio do time:</label><br />
            <input
              type="text"
              id="teamStadium"
              name="teamStadium"
              value={teamStadium}
              onChange={(e) => setTeamStadium(e.target.value)}
            /><br /><br /><br />
            <button type="submit">Enviar</button>
          </form>
        </Form>
      </Container>
    </>
  );
}
