import styled from 'styled-components';
import * as colors from '../../cfg/colors';

export const Form = styled.div`
  label {
    font-size: 1.8rem;
    font-weight: bold;
    align-self: flex-start;
  }

  input {
    background-color: ${colors.primaryLightColor};
    color: white;
    border: 0.2rem solid ${colors.primaryColor}; 
    width: 25rem;  
    height: 3.5rem; 
    border-radius: 0.5rem; 
    font-size: 1.8rem;
    padding: 0.5rem;  
    margin-bottom: 1rem; /* Adiciona espaço entre os inputs */
  }

  button {
    background-color: ${colors.primaryLightColor};
    width: 25rem;  
    height: 4rem;  
  }

  button:hover {
    background-color: ${colors.primaryDarkColor};
  }
`;

export const Container = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 60rem; 
  margin: 3rem auto; 
  padding: 3rem; 
  border-radius: 0.4rem;
  border: 0.1rem solid white;
  box-shadow: 0 0 1rem rgba(0,0,0,0.5);
  .formTittle{
    margin-top: 1rem;
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .mainForm, .attributeForm {
    display: flex;
    flex-direction: column;
  }
  h1{

  }
  `;

