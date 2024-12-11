import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayersContext } from "../../Routes";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';
import CreatePlayer from '../../classes/player';
import CreateGoalkepper from "../../classes/goalkepper";
import isValidPlayer from "../../validators/isValidPlayer";
import getOverall from "../../utils/getOverall";
import PlayerForm from '../../components/PlayerForm';

let idCounter = 1;

export default function PlayerPage() {
  const { players, setPlayers } = useContext(PlayersContext);
  const navigate = useNavigate();
  const location = useLocation();
  const team = location.state?.team || { name: "Default Team" };

  const initialPlayerState = {
    name: "",
    nationality: "",
    age: "",
    number: "",
    position: "",
    id: "",
  };
  const [player, setPlayer] = useState(initialPlayerState);

  const initialPlayerAttributesState = {
    pace: "",
    shooting: "",
    passing: "",
    dribbling: "",
    defense: "",
    physical: ""
  };
  const [fieldPlayerAttributes, setFieldPlayerAttributes] = useState(initialPlayerAttributesState);

  const initialGoalkepperAttributesState = {
    diving: "",
    handling: "",
    kicking: "",
    positioning: "",
    reflexes: "",
    reactions: ""
  };
  const [goalkepperAttributes, setGoalkepperAttributes] = useState(initialGoalkepperAttributesState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }
  function handleInputChangePlayerAtrib(e) {
    const { name, value } = e.target;
    setFieldPlayerAttributes((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }
  function handleInputChangeGKAtrib(e) {
    const { name, value } = e.target;
    setGoalkepperAttributes((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }
  function savePlayer(e) {
    let newPlayer;
    e.preventDefault();
    const attributes = player.position === 'Goleiro' ? goalkepperAttributes : fieldPlayerAttributes;

    if (!isValidPlayer(player, attributes)) return;

    if (player.position === 'Goleiro') {
      newPlayer = new CreateGoalkepper(
        player.name,
        team.name,
        player.nationality,
        player.age,
        player.number,
        player.position,
        getOverall(
          player.position,
          goalkepperAttributes.diving,
          goalkepperAttributes.handling,
          goalkepperAttributes.kicking,
          goalkepperAttributes.positioning,
          goalkepperAttributes.reflexes,
          goalkepperAttributes.reactions
        ),
        goalkepperAttributes.diving,
        goalkepperAttributes.handling,
        goalkepperAttributes.kicking,
        goalkepperAttributes.positioning,
        goalkepperAttributes.reflexes,
        goalkepperAttributes.reactions
      );
    } else {
      newPlayer = new CreatePlayer(
        player.name,
        team.name,
        player.nationality,
        player.age,
        player.number,
        player.position,
        getOverall(
          player.position,
          fieldPlayerAttributes.pace,
          fieldPlayerAttributes.shooting,
          fieldPlayerAttributes.passing,
          fieldPlayerAttributes.dribbling,
          fieldPlayerAttributes.defense,
          fieldPlayerAttributes.physical,
        ),
        fieldPlayerAttributes.pace,
        fieldPlayerAttributes.shooting,
        fieldPlayerAttributes.passing,
        fieldPlayerAttributes.dribbling,
        fieldPlayerAttributes.defense,
        fieldPlayerAttributes.physical
      );
    }
    newPlayer.id = idCounter++;
    setPlayers([...players, newPlayer]);
    setPlayer(initialPlayerState);
    setFieldPlayerAttributes({
      pace: "",
      shooting: "",
      passing: "",
      dribbling: "",
      defense: "",
      physical: ""
    });
    setGoalkepperAttributes({
      diving: "",
      handling: "",
      kicking: "",
      positioning: "",
      reflexes: "",
      reactions: ""
    });
    navigate(`/Team/${team.name}`, { state: { team } });
  }

  return (
    <>
      <Header />
      <Form onSubmit={savePlayer}>
        <Container>
          <PlayerForm
            player={player}
            handleInputChange={handleInputChange}
            fieldPlayerAttributes={fieldPlayerAttributes}
            handleInputChangePlayerAtrib={handleInputChangePlayerAtrib}
            goalkepperAttributes={goalkepperAttributes}
            handleInputChangeGKAtrib={handleInputChangeGKAtrib}
            setPlayer={setPlayer}
            initialPlayerState={initialPlayerState}
          />
        </Container>
      </Form >
    </>
  );
}