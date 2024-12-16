import styled from 'styled-components';
import * as colors from '../../cfg/colors';

export const Form = styled.div`
  label {
    font-size: 1.8rem;
    font-weight: bold;
    align-self: flex-start;
  }

  input, select {
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
  input[type="file"] {
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

input[type="file"]::-webkit-file-upload-button {
  background-color: #007bff;
  color: #007bff;
  width: 15%;
  height: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #0056b3;
  color: #0056b3;
}
`;

export const Container = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  max-width: 40rem;
  margin: 3rem auto; 
  padding: 3rem; 
  border-radius: 0.4rem; 
  box-shadow: 0 0 1rem rgba(0,0,0,0.5); 
`;