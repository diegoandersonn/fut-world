import React, { useState, useContext } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { PlayersContext, TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import { Container, Form } from './styled';
import getOverall from '../../utils/getOverall';
import EditPlayerForm from '../../components/EditPlayerForm';

export default function EditPlayer() {
  const { teams } = useContext(TeamsContext);
  const { updatePlayer } = useContext(PlayersContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { player } = location.state;
  const playerTeam = teams.find(team => team.name === player.team);
  console.log('edit page', playerTeam)
  const initialPlayerState = {
    name: player.name,
    id: player.id,
    team: player.team,
    nationality: player.nationality,
    age: player.age,
    position: player.position,
    number: player.number,
  };
  const [playerState, setPlayerState] = useState(initialPlayerState);
  const initialPlayerAttributesState = player.position !== "Goleiro" ? {
    pace: player.pace,
    shooting: player.shooting,
    passing: player.passing,
    dribbling: player.dribbling,
    defense: player.defense,
    physical: player.physical,
  } : {
    diving: player.diving,
    handling: player.handling,
    kicking: player.kicking,
    positioning: player.positioning,
    reflexes: player.reflexes,
    reactions: player.reactions,
  };
  const [AttributesState, setAttributesState] = useState(initialPlayerAttributesState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPlayerState((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }

  function handleInputChangeAtrib(e) {
    const { name, value } = e.target;
    setAttributesState((prevAttributes) => ({
      ...prevAttributes,
      [name]: value,
    }));
  }

  function savePlayer(e) {
    e.preventDefault();
    if (playerState !== "Goleiro") {
      const updatedPlayer = {
        ...playerState,
        overall: getOverall(
          playerState.position,
          AttributesState.pace,
          AttributesState.shooting,
          AttributesState.passing,
          AttributesState.dribbling,
          AttributesState.defense,
          AttributesState.physical),
        ...AttributesState,
      };
      updatePlayer(updatedPlayer);
      console.log('após o save', playerTeam);
      navigate(`/Team/${playerState.team}`, { state: { team: playerTeam } } );
    } else {
      const updatedPlayer = {
        ...playerState,
        overall: getOverall(
          playerState.position,
          AttributesState.diving,
          AttributesState.handling,
          AttributesState.kicking,
          AttributesState.positioning,
          AttributesState.reflexes,
          AttributesState.reactions),
        ...AttributesState,
      };
      updatePlayer(updatedPlayer);
      navigate(`/Team/${playerState.team}`, { state: playerTeam });
    }
  }

  return (
    <>
      <Header />
      <Form onSubmit={savePlayer}>
        <Container>
          <EditPlayerForm 
            player = {player}
            playerState = {playerState}
            handleInputChange = {handleInputChange}
            AttributesState = {AttributesState}
            handleInputChangeAtrib = {handleInputChangeAtrib}
            />
        </Container>
      </Form >
    </>
  );
}
