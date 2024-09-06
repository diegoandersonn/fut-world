import styled from 'styled-components';
import * as colors from '../../cfg/colors';

export const Main = styled.div`
 .teamLogo{
    width: 110px;
  }
  .countryFlag{
    width: 1.6rem;
    border: 1px solid black;
  }
  article{
    display: flex;
    flex-direction: row
  }
  p{
    font-size: 1.6rem;
  }
  .tittle{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px;
    margin: 15px auto;
  }
  label {
    font-size: 1.8rem;
    font-weight: bold;
    align-self: flex-start;
  }

  input {
    background-color: ${colors.primaryLightColor};
    color: white;
    border: 2px solid ${colors.primaryColor};
    width: 250px;
    height: 35px;
    border-radius: 5px;
    font-size: 1.8rem;
  }

  button {
    background-color: ${colors.primaryLightColor};
    width: 250px;
    height: 40px;
  }

  button:hover {
    background-color: ${colors.primaryDarkColor};
  }
`;

export const Container = styled.section`
  color: white;
  display: flex;
  max-width: 60rem;
  margin: 3rem auto; 
  padding: 3rem;
  border-radius: 0.4rem; 
  box-shadow: 0 0 1rem rgba(0,0,0,0.5); 
`;