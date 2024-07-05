import React from "react";
import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import Header from '../../components/Header/index';

export default function Create() {
  return (
    <>
      <Header />
      <Container>
        <Form>
          <form>
          <label htmlFor="teamName">Nome do Time:</label><br />
          <input type="text" id="teamName" name="teamName"/><br /><br />
          <label htmlFor="teamCountry">País:</label><br />
          <input type="text" id="teamCountry" name="teamCountry"/><br /><br />
          <label htmlFor="teamStadium">Estádio do time:</label><br />
          <input type="text" id="lnateamStadiumme" name="teamStadium"/><br /><br /><br />
          <button type="submit"> Enviar </button>
          </form>
        </Form>
      </Container>
    </>
  );
}
