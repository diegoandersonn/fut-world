import styled from 'styled-components';
import { primaryDarkColor } from '../../cfg/colors'

export const HeaderStyle = styled.header`
  background-color: ${primaryDarkColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a{
    color: white;
    margin: 0 25px 0 0;
    font-weight: bold;
  }
`;