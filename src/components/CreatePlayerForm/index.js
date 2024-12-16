import React from "react";
import { flags } from '../../cfg/flags';

export default function PlayerForm({
  player,
  handleInputChange,
  fieldPlayerAttributes,
  handleInputChangePlayerAtrib,
  goalkepperAttributes,
  setPlayer,
  handleInputChangeGKAtrib,
  initialPlayerState
}) {
  return (
    <form action="">
      <div className="formTittle">
        <h1>Informações Gerais</h1>
      </div>
      <div className="row">
        <div className="mainForm">
          <input type="text" name="name" placeholder="Commom Name" value={player.name} onChange={handleInputChange} />
          <select name="nationality" value={player.nationality} onChange={handleInputChange}>
            <option value="" disabled>Selecione a Nacionalidade</option>
            {flags.map((flag, index) => (
              <option value={flag.name}>{flag.name}</option>
            ))}
          </select>
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
  );
}