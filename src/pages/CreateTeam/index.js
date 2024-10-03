import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from './styled';
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import CreateTeam from '../../classes/team';

export default function Create() {
  const { teams, setTeams } = useContext(TeamsContext);
  const navigate = useNavigate();
  const initialTeamState = {
    teamName: '',
    teamCountry: '',
    teamStadium: '',
  };
  const [team, setTeam] = useState(initialTeamState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  }

  function saveTeam(e) {
    e.preventDefault();
    if (!team.teamName || !team.teamCountry || !team.teamStadium) return;
    const newTeam = new CreateTeam(team.teamName, team.teamCountry, team.teamStadium);
    setTeams([...teams, newTeam]);
    setTeam(initialTeamState);
    navigate('/');
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
              value={team.teamName}
              onChange={handleInputChange}
            /><br /><br />
            <label htmlFor="teamCountry">País:</label><br />
            <input
              type="text"
              id="teamCountry"
              name="teamCountry"
              value={team.teamCountry}
              onChange={handleInputChange}
            /><br /><br />
            <label htmlFor="teamStadium">Estádio do time:</label><br />
            <input
              type="text"
              id="teamStadium"
              name="teamStadium"
              value={team.teamStadium}
              onChange={handleInputChange}
            /><br /><br /><br />
            <button type="submit">Enviar</button>
          </form>
        </Form>
      </Container>
    </>
  );
}
