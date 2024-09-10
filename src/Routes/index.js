import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from '../pages/Main';
import Create from '../pages/Create';
import Page404 from '../pages/Page404';
import TeamPage from '../pages/Team';
import PlayerPage from '../pages/Player';

export const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <TeamsProvider>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/Create' element={<Create />} />
          <Route path='*' element={<Page404 />} />
          <Route path='/Team/*' element={<TeamPage />} />
          <Route path='/Player/*' element={<PlayerPage />} />
        </Routes>
      </TeamsProvider>
    </BrowserRouter>
  );
}
