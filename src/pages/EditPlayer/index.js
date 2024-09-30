import React from "react";
import { useLocation } from "react-router-dom";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';

export default function EditPlayer() {
  const location = useLocation();
  const { player } = location.state;
  console.log(player);
  return (
    <>
      <Header />
      <Form onSubmit={console.log('oi')}>
        <Container>
          <form action="">
            <div className="formTittle">
              <h1>Informações Gerais</h1>
            </div>
            <div className="row">
              <div className="mainForm">
                <input type="text" name="name" placeholder="Commom Name" />
                <input type="text" name="nationality" placeholder="Nationality" />
                <input type="number" name="age" placeholder="Age" />
              </div>
              <div className="mainForm">
                <select name="position">
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
                <input type="number" name="number" placeholder="Number" />
              </div>
            </div>
            <div className="formTittle">
              <h1 className="formTittle">Atributos</h1>
            </div>
            {player.position !== 'Goleiro' ? (
              <>
                <div className="row">
                  <div className="attributeForm">
                    <input type="number" name="pace" placeholder="Pace" />
                    <input type="number" name="shooting" placeholder="Shooting" />
                    <input type="number" name="passing" placeholder="Passing" />
                  </div>
                  <div className="attributeForm">
                    <input type="number" name="dribbling" placeholder="Dribbling" />
                    <input type="number" name="defense" placeholder="Defense" />
                    <input type="number" name="physical" placeholder="Physical" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="attributeForm">
                    <input type="number" name="diving" placeholder="Diving" />
                    <input type="number" name="handling" placeholder="Handling" />
                    <input type="number" name="kicking" placeholder="Kicking" />
                  </div>
                  <div className="attributeForm">
                    <input type="number" name="positioning" placeholder="Positioning" />
                    <input type="number" name="reflexes" placeholder="Reflexes" />
                    <input type="number" name="reactions" placeholder="Reactions" />
                  </div>
                </div>
              </>
            )}
            <div className="formButtons">
              <button type="submit">Enviar</button>
              <button type="reset">Resetar</button>
            </div>
          </form>
        </Container>
      </Form >
    </>
  );
}