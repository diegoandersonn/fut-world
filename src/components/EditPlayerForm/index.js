import React from "react";

export default function EditPlayerForm({
  player,
  playerState,
  handleInputChange,
  AttributesState,
  handleInputChangeAtrib,
}) {
  return (
    <form action="">
    <div className="formTittle">
      <h1>Informações Gerais</h1>
    </div>
    <div className="row">
      <div className="mainForm">
        <input type="text" name="name" placeholder="Commom Name" value={playerState.name} onChange={handleInputChange} />
        <input type="text" name="nationality" placeholder="Nationality" value={playerState.nationality} onChange={handleInputChange} />
        <input type="number" name="age" placeholder="Age" value={playerState.age} onChange={handleInputChange} />
      </div>
      <div className="mainForm">
        <select name="position" value={playerState.position} onChange={handleInputChange}>
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
        <input type="number" name="number" placeholder="Number" value={playerState.number} onChange={handleInputChange} />
      </div>
    </div>
    <div className="formTittle">
      <h1 className="formTittle">Atributos</h1>
    </div>
    {player.position !== 'Goleiro' ? (
      <>
        <div className="row">
          <div className="attributeForm">
            <input type="number" name="pace" placeholder="Pace" value={AttributesState.pace} onChange={handleInputChangeAtrib} />
            <input type="number" name="shooting" placeholder="Shooting" value={AttributesState.shooting} onChange={handleInputChangeAtrib} />
            <input type="number" name="passing" placeholder="Passing" value={AttributesState.passing} onChange={handleInputChangeAtrib} />
          </div>
          <div className="attributeForm">
            <input type="number" name="dribbling" placeholder="Dribbling" value={AttributesState.dribbling} onChange={handleInputChangeAtrib} />
            <input type="number" name="defense" placeholder="Defense" value={AttributesState.defense} onChange={handleInputChangeAtrib} />
            <input type="number" name="physical" placeholder="Physical" value={AttributesState.physical} onChange={handleInputChangeAtrib} />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="row">
          <div className="attributeForm">
            <input type="number" name="diving" placeholder="Diving" value={AttributesState.diving} onChange={handleInputChangeAtrib} />
            <input type="number" name="handling" placeholder="Handling" value={AttributesState.handling} onChange={handleInputChangeAtrib} />
            <input type="number" name="kicking" placeholder="Kicking" value={AttributesState.kicking} onChange={handleInputChangeAtrib} />
          </div>
          <div className="attributeForm">
            <input type="number" name="positioning" placeholder="Positioning" value={AttributesState.positioning} onChange={handleInputChangeAtrib} />
            <input type="number" name="reflexes" placeholder="Reflexes" value={AttributesState.reflexes} onChange={handleInputChangeAtrib} />
            <input type="number" name="reactions" placeholder="Reactions" value={AttributesState.reactions} onChange={handleInputChangeAtrib} />
          </div>
        </div>
      </>
    )}
    <div className="formButtons">
      <button type="submit">Enviar</button>
      <button type="reset">Resetar</button>
    </div>
  </form>
  );
}