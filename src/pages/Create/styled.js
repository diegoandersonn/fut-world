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
