import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../cfg/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  
  html {
    font-size: 62%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: ${colors.primaryColor};
    font-size: 1.8rem; 
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: ${colors.primaryColor};
    color: white;
    border: none;
    padding: 0.5rem 6rem; 
    border-radius: 0.4rem;
    font-size: 2rem;
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
  max-width: 40rem;
  margin: 3rem auto; 
  padding: 3rem; 
  border-radius: 0.4rem; 
  box-shadow: 0 0 1rem rgba(0,0,0,0.5); 
`;
