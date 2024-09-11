import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { PlayersContext } from "../../Routes";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';

export default function PlayerPage() {
  const { players, setPlayers } = useContext(PlayersContext);
  const [player, setPlayer] = useState({
    name: "",
    nationality: "",
    age: "",
    number: "",
    position: "",
    overall: "",
    pace: "",
    shooting: "",
    passing: "",
    dribbling: "",
    defense: "",
    physical: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  }

  class CreatePlayer {
    constructor(name, team, nationality, age, number, position, overall, pace, shooting, passing, dribbling, defense, physical) {
      this.name = name;
      this.team = team;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.overall = overall;
      this.pace = pace;
      this.shooting = shooting;
      this.passing = passing;
      this.dribbling = dribbling;
      this.defense = defense;
      this.physical = physical;
    }
  }
  const location = useLocation();
  const team = location.state?.team;
  function saveTeam(e) {
    e.preventDefault();
    if (!player.name || !team.name || !player.nationality || !player.age || !player.number || !player.position || !player.overall || !player.pace || !player.shooting || !player.passing || !player.dribbling || !player.defense || !player.physical) return;
    if (player.value > 100 || player.value < 0 || player.number > 99 || player.number < 0 || player.overall > 99 || player.overall < 0 || player.pace > 99 || player.pace < 0 || player.shooting > 99 || player.shooting < 0 || player.passing > 99 || player.passing < 0 || player.dribbling > 99 || player.dribbling < 0 || player.defense > 99 || player.defense < 0 || player.physical > 99 || player.physical < 0) return;
    const newPlayer = new CreatePlayer(
      player.name,
      team.name,
      player.nationality,
      player.age,
      player.number,
      player.position,
      player.overall,
      player.pace,
      player.shooting,
      player.passing,
      player.dribbling,
      player.defense,
      player.physical);
    setPlayers([...players, newPlayer]);
    setPlayer({
      name: "",
      nationality: "",
      age: "",
      number: "",
      position: "",
      overall: "",
      pace: "",
      shooting: "",
      passing: "",
      dribbling: "",
      defense: "",
      physical: "",
    })
  }
  return (
    <>
      <Header />
      <Form onSubmit={saveTeam}>
        <Container>
          <form action="">
            <div className="formTittle">
              <h1>Informações Gerais</h1>
            </div>
            <div className="row">
              <div className="mainForm">
                <input type="text" name="name" placeholder="Commom Name" value={player.name} onChange={handleInputChange} />
                <input type="text" name="nationality" placeholder="nationality" value={player.nationality} onChange={handleInputChange} />
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
                  <option value="Atacante">Atacante</option>
                </select>
                <input type="number" name="number" placeholder="Number" value={player.number} onChange={handleInputChange} />
                <input type="text" name="overall" placeholder="Overall" value={player.overall} onChange={handleInputChange} />
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
                overall: "",
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