import React, { useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Nav, Main } from './styled';
import { IoAdd, IoTrash, IoPencilSharp } from 'react-icons/io5';
import { PlayersContext } from '../../Routes';
import Header from '../../components/Header/index';
import tottenhamLogo from '../../imgs/tottenhamlogo.png';
import englandFlag from '../../imgs/england.png';

export default function TeamPage() {
    const location = useLocation();
    const { team } = location.state;
    const { players } = useContext(PlayersContext);
    const filteredPlayers = players.filter((player) => player.team === team.name);
    const attackPlayers = filteredPlayers.filter((player) =>
        player.position === 'Ponta' ||
        player.position === 'Atacante'
    );
    const midPlayers = filteredPlayers.filter((player) =>
        player.position === 'Volante' ||
        player.position === 'Meio-Campo' ||
        player.position === 'Meia-Atacante'
    );
    const defensePlayers = filteredPlayers.filter((player) =>
        player.position === 'Lateral' ||
        player.position === 'Zagueiro'
    );
    function getTotalOverall(filteredPlayers) {
        if(filteredPlayers.length === 0) return 'XX'
        return (filteredPlayers.reduce((accumulator, player) => accumulator + Number(player.overall), 0)/filteredPlayers.length).toFixed(0);
    }
    return (
        <>
            <Header />
            <Main>
                <Nav>
                    <article>
                        <div className="logo">
                            <img src={tottenhamLogo} alt="Tottenham" className="teamLogo" />
                        </div>
                        <div className="tittle">
                            <h1>{team.name}</h1>
                            <p><img src={englandFlag} alt="England" className="countryFlag" /> {team.country}</p>
                        </div>
                        <div className="grid">
                            <div className="over">
                                <div className="col">
                                    <em title="XX">
                                        {getTotalOverall(filteredPlayers)}
                                    </em>
                                    <div className="sub">Overall</div>
                                </div>
                            </div>
                            <div className="ataque">
                                <div className="col">
                                    <em tittle="XX">{getTotalOverall(attackPlayers)}</em>
                                    <div className="sub">Ataque</div>
                                </div>
                            </div>
                            <div className="meio">
                                <div className="col">
                                    <em tittle="XX">{getTotalOverall(midPlayers)}</em>
                                    <div className="sub">Meio-Campo</div>
                                </div>
                            </div>
                            <div className="defesa">
                                <div className="col">
                                    <em tittle="XX">{getTotalOverall(defensePlayers)}</em>
                                    <div className="sub">Defesa</div>
                                </div>
                            </div>
                        </div>
                    </article>
                </Nav>
                <Nav>
                    <footer>
                        <div className="playerTittle">
                            <h1>Jogadores: </h1>
                            <div className="managePlayers">
                                <Link to={"/Player"} state={{ team }}><IoAdd size={35} /></ Link>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Posição</th>
                                    <th>Overall</th>
                                    <th>Editar</th>
                                    <th>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPlayers.map((player, index) => (
                                    <tr key={`player-${index}`}>
                                        <td>{player.name}</td>
                                        <td>{player.age}</td>
                                        <td>{player.position}</td>
                                        <td>{player.overall}</td>
                                        <td><Link to="/Player"> <IoPencilSharp size={24} /> </ Link></td>
                                        <td><Link to="/Player"> <IoTrash size={28} /> </ Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </footer>
                </Nav>
            </Main>
        </>
    );
}
