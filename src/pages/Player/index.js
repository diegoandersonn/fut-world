import React from "react";
import { useLocation } from "react-router-dom";
import Header from '../../components/Header/index';
import { Container, Form } from './styled';

export default function PlayerPage() {
  class CreatePlayer {
    constructor(name, nationality, age, number, position, overall, pace, shooting, passing, driblling, defense, physical) {
      this.name = name;
      this.nationality = nationality;
      this.age = age;
      this.number = number;
      this.position = position;
      this.overall = overall;
      this.pace = pace;
      this.shooting = shooting;
      this.passing = passing;
      this.driblling = driblling;
      this.defense = defense;
      this.physical = physical;
    }
  }
  const location = useLocation();
  const team = location.state?.team;
  return (
    <>
      <Header />
      <Form>
        <Container>
          <div className="formTittle">
            <h1>Informações Gerais</h1>
          </div>
          <div className="row">
            <div className="mainForm">
              <input type="text" placeholder="Commom Name" />
              <input type="text" placeholder="Nationality" />
              <input type="text" placeholder="Age" />
            </div>
            <div className="mainForm">
              <input type="text" placeholder="Position" />
              <input type="text" placeholder="Shirt Number" />
              <input type="text" placeholder="Overall" />
            </div>
          </div>
          <div className="formTittle">
            <h1 className="formTittle">Atributos</h1>
          </div>
          <div className="row">
            <div className="attributeForm">
              <input type="text" placeholder="Pace" />
              <input type="text" placeholder="Shooting" />
              <input type="text" placeholder="Passing" />
            </div>
            <div className="attributeForm">
              <input type="text" placeholder="Dribbling" />
              <input type="text" placeholder="Defense" />
              <input type="text" placeholder="Physical" />
            </div>
          </div>
        </Container>
      </Form>
    </>
  );

}