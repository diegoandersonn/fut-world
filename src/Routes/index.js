import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from '../pages/Main';
import Create from '../pages/CreateTeam';
import Page404 from '../pages/Page404';
import TeamPage from '../pages/Team';
import PlayerPage from '../pages/Player';
import EditPlayer from '../pages/EditPlayer';

export const TeamsContext = createContext();
export const PlayersContext = createContext();

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};
const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <PlayersProvider>
        <TeamsProvider>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/Create' element={<Create />} />
            <Route path='*' element={<Page404 />} />
            <Route path='/Team/*' element={<TeamPage />} />
            <Route path='/Player' element={<PlayerPage />} />
            <Route path='/Player/*' element={<EditPlayer />} />
          </Routes>
        </TeamsProvider>
      </PlayersProvider>
    </BrowserRouter>
  );
}
