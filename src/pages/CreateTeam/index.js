import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from './styled';
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import CreateTeam from '../../classes/team';
import TeamForm from '../../components/TeamForm';

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
    }))
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
      <Form onSubmit={saveTeam}>
        <Container>
          <TeamForm
            team={team}
            handleInputChange={handleInputChange}
          />
        </Container>
      </Form>
    </>
  );
}
