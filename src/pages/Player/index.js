import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { PlayersContext } from "../../Routes";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';
import CreatePlayer from '../../classes/player';
import isValidPlayer from "../../validators/isValidPlayer";


export default function PlayerPage() {
  const { players, setPlayers } = useContext(PlayersContext);
  const location = useLocation();
  const team = location.state?.team || { name: "Default Team" };

  const initialPlayerState = {
    name: "",
    nationality: "",
    age: "",
    number: "",
    position: "",
    pace: "",
    shooting: "",
    passing: "",
    dribbling: "",
    defense: "",
    physical: "",
  };
  const [player, setPlayer] = useState(initialPlayerState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }
  function getOverall(position, pace, shooting, passing, dribbling, defense, physical) {
    if (position === 'Zagueiro') {
      return (defense * 0.6 + passing * 0.1 + physical * 0.3).toFixed(0);
    } else if (position === 'Lateral') {
      return (pace * 0.3 + passing * 0.2 + defense * 0.3 + dribbling * 0.2).toFixed(0);
    } else if (position === 'Volante') {
      return (defense * 0.4 + physical * 0.3 + passing * 0.3).toFixed(0);
    } else if (position === 'Meio-Campo') {
      return (shooting * 0.1 + passing * 0.3 + dribbling * 0.2 + defense * 0.2, physical * 0.2).toFixed(0);
    } else if (position === 'Meia-Atacante') {
      return (shooting * 0.3 + dribbling * 0.3 + passing * 0.4).toFixed(0);
    } else if (position === 'Ponta') {
      return (shooting * 0.2 + dribbling * 0.5 + pace * 0.3).toFixed(0);
    } else if (position === 'Atacante') {
      return (shooting * 0.5 + dribbling * 0.2 + passing * 0.1 + physical * 0.2).toFixed(0);
    }
  }
  function savePlayer(e) {
    e.preventDefault();
    if (!isValidPlayer(player)) return;
    const overall = getOverall(player.position, player.pace, player.shooting, player.passing, player.dribbling, player.defense, player.physical);
    const newPlayer = new CreatePlayer(
      player.name,
      team.name,
      player.nationality,
      player.age,
      player.number,
      player.position,
      overall,
      player.pace,
      player.shooting,
      player.passing,
      player.dribbling,
      player.defense,
      player.physical);
    setPlayers([...players, newPlayer]);
    setPlayer(initialPlayerState);
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
            <div className="row">
              <div className="attributeForm">
                <input type="number" name="pace" placeholder="Pace" value={player.pace} onChange={handleInputChange} />
                <input type="number" name="shooting" placeholder="Shooting" value={player.shooting} onChange={handleInputChange} />
                <input type="number" name="passing" placeholder="Passing" value={player.passing} onChange={handleInputChange} />
              </div>
              <div className="attributeForm">
                <input type="number" name="dribbling" placeholder="Dribbling" value={player.dribbling} onChange={handleInputChange} />
                <input type="number" name="defense" placeholder="Defense" value={player.defense} onChange={handleInputChange} />
                <input type="number" name="physical" placeholder="Physical" value={player.physical} onChange={handleInputChange} />
              </div>
            </div>
            <div className="formButtons">
              <button type="submit">Enviar</button>
              <button type="reset" onClick={() => setPlayer({
                name: "",
                nationality: "",
                age: "",
                number: "",
                position: "",
                pace: "",
                shooting: "",
                passing: "",
                dribbling: "",
                defense: "",
                physical: "",
              })}>Resetar</button>
            </div>
          </form>
        </Container>
      </Form >
    </>
  );
}