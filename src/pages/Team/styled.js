import styled from 'styled-components';
import * as colors from '../../cfg/colors';

export const Main = styled.div`
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
  p {
    cursor: pointer;
  }
  `;

export const Nav = styled.section`
  color: white;
  display: flex;
  max-width: 80rem;
  margin: 3rem auto; 
  padding: 3rem;
  border-radius: 0.4rem; 
  box-shadow: 0 0 1rem rgba(0,0,0,0.5);
  .teamLogo{
     width: 110px;
     background-color: aliceblue;
     border-radius: 50%;
   }
   .countryFlag{
     width: 2rem;
     border: 1px solid black;
   }
   article{
     display: flex;
     flex-direction: row
   }
   p{
     font-size: 2rem;
   }
   .tittle{
     display: flex;
     flex-direction: column;
     align-items: center;
     text-align: center;
     font-size: 2rem;
     padding: 15px;
     margin: 15px auto;
   }
   .grid{
     display: flex;
     gap: 35px;
     font-size: 15px;
     text-align: center;
     height: 25px;
     margin-left: 100px;
   }
   .col{
  
   }
   em{
     background-color: white;
     color: black;
     padding: 5px;
     border-radius: 3px;
   }
   .sub{
     margin-top: 8px;
   }
   a{
     color: white;
     margin: 0 25px 0 0;
     font-weight: bold;
   }
   .playerTittle{
     display: flex;
     justify-content: space-between;
     width: 100%;
  }
  footer{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  table{
    max-width: 100%;
    text-align: left;
  }
  th, td{
    color: white;
    min-width: 100px;
    padding: 10px;
    margin: 10px auto; 
    text-align: center;
  }
  .fixName{
    text-align: left;
  }
  `;