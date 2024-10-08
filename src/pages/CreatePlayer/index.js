import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayersContext } from "../../Routes";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';
import CreatePlayer from '../../classes/player';
import CreateGoalkepper from "../../classes/goalkepper";
import isValidPlayer from "../../validators/isValidPlayer";
import getOverall from "../../utils/getOverall";

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
    id:"",
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
    navigate(`/Team/${team.name}`, { state: { team }});
  }
  
  return (
    <>
      <Header />
      <Form onSubmit={savePlayer}>
        <Container>
          <form action="">
            <div className="formTittle">
              <h1>Informações Gerais</h1>
            </div>
            <div className="row">
              <div className="mainForm">
                <input type="text" name="name" placeholder="Commom Name"  value={player.name} onChange={handleInputChange} />
                <input type="text" name="nationality" placeholder="Nationality" value={player.nationality} onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Age" value={player.age} onChange={handleInputChange} />
              </div>
              <div className="mainForm">
                <select name="position" value={player.position} onChange={handleInputChange}>
                  <option value="" disabled>Selecione a posição</option>
                  <option value="Goleiro">Goleiro</option>
                  <option value="Zagueiro">Zagueiro</option>
                  <option value="Lateral">Lateral</option>
                  <option value="Volante">Volante</option>
                  <option value="Meio-Campo">Meio-Campo</option>
                  <option value="Meia-Atacante">Meia-Atacante</option>
                  <option value="Ponta">Ponta</option>
                  <option value="Atacante">Atacante</option>
                </select>
                <input type="number" name="number" placeholder="Number" value={player.number} onChange={handleInputChange} />
              </div>
            </div>
                <div className="formTittle">
                <h1 className="formTittle">Atributos</h1>
                </div>
              {player.position !== 'Goleiro' ? (
              <>
              <div className="row">
                <div className="attributeForm">
                  <input type="number" name="pace" placeholder="Pace" value={fieldPlayerAttributes.pace} onChange={handleInputChangePlayerAtrib} />
                  <input type="number" name="shooting" placeholder="Shooting" value={fieldPlayerAttributes.shooting} onChange={handleInputChangePlayerAtrib} />
                  <input type="number" name="passing" placeholder="Passing" value={fieldPlayerAttributes.passing} onChange={handleInputChangePlayerAtrib} />
                </div>
                <div className="attributeForm">
                  <input type="number" name="dribbling" placeholder="Dribbling" value={fieldPlayerAttributes.dribbling} onChange={handleInputChangePlayerAtrib} />
                  <input type="number" name="defense" placeholder="Defense" value={fieldPlayerAttributes.defense} onChange={handleInputChangePlayerAtrib} />
                  <input type="number" name="physical" placeholder="Physical" value={fieldPlayerAttributes.physical} onChange={handleInputChangePlayerAtrib} />
                </div>
              </div>
              </>
            ) : (
              <>
              <div className="row">
                <div className="attributeForm">
                  <input type="number" name="diving" placeholder="Diving" value={goalkepperAttributes.diving} onChange={handleInputChangeGKAtrib} />
                  <input type="number" name="handling" placeholder="Handling" value={goalkepperAttributes.handling} onChange={handleInputChangeGKAtrib} />
                  <input type="number" name="kicking" placeholder="Kicking" value={goalkepperAttributes.kicking} onChange={handleInputChangeGKAtrib} />
                </div>
                <div className="attributeForm">
                  <input type="number" name="positioning" placeholder="Positioning" value={goalkepperAttributes.positioning} onChange={handleInputChangeGKAtrib} />
                  <input type="number" name="reflexes" placeholder="Reflexes" value={goalkepperAttributes.reflexes} onChange={handleInputChangeGKAtrib} />
                  <input type="number" name="reactions" placeholder="Reactions" value={goalkepperAttributes.reactions} onChange={handleInputChangeGKAtrib} />
                </div>
              </div>
              </>
            )}
            <div className="formButtons">
              <button type="submit">Enviar</button>
              <button type="reset" onClick={() => setPlayer(initialPlayerState)}>Resetar</button>
            </div>
          </form>
        </Container>
      </Form >
    </>
  );
}