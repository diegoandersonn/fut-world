import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from './styled';
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import CreateTeam from '../../classes/team';
import TeamForm from '../../components/CreateTeamForm';
let id = 1;

export default function Create() {
  const { teams, setTeams } = useContext(TeamsContext);
  const navigate = useNavigate();
  const initialTeamState = {
    teamName: '',
    teamCountry: '',
    teamStadium: '',
    teamLogo: '',
    id: '',
  };
  const [team, setTeam] = useState(initialTeamState);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }))
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file)
    
    setTeam((prevTeam) => ({
      ...prevTeam,
      teamLogo: previewURL,
    }));
  }

  function saveTeam(e) {
    e.preventDefault();
    if (!team.teamName || !team.teamCountry || !team.teamStadium || !team.teamLogo) return;
    const newTeam = new CreateTeam(team.teamName, team.teamCountry, team.teamStadium, team.teamLogo, id);
    setTeams([...teams, newTeam]);
    setTeam(initialTeamState);
    id++;
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
            handleFileChange={handleFileChange}
          />
        </Container>
      </Form>
    </>
  );
}
