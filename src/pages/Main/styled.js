import styled from 'styled-components';
import * as colors from '../../cfg/colors';

export const TeamsList = styled.div`
  p {
    cursor: pointer;
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
  table{
    text-align: left;
  }
  th, td{
    padding: 10px;
    margin: 10px auto; 
  }
  svg {
    color: white;
  }
  img {
    border: 1px solid darkgray;
    border-radius: 4px;
    background-color: #312828;
    width: 65px;
    height: 65px;
  }
`;

export const Container = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  max-width: 60rem;
  margin: 3rem auto; 
  padding: 2rem; 
  border-radius: 0.4rem; 
  box-shadow: 0 0 1rem rgba(0,0,0,0.5); 
  overflow-x: auto;
`;