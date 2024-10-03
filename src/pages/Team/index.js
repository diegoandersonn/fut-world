import React, { useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Nav, Main } from './styled';
import { IoAdd, IoTrash, IoPencilSharp } from 'react-icons/io5';
import { PlayersContext } from '../../Routes';
import Header from '../../components/Header/index';
import realMadridLogo from '../../imgs/realMadridLogo.webp';
import spainFlag from '../../imgs/spainFlag.webp';

export default function TeamPage() {
    const { players, setPlayers } = useContext(PlayersContext);
    const location = useLocation();
    const team = location.state?.team || { name: "Default Team", country: "Unknown" };
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
        player.position === 'Zagueiro' ||
        player.position === 'Goleiro'
    );

    function getTotalOverall(playersList) {
        if (playersList.length === 0) return 'XX';
        return (
            playersList.reduce((accumulator, player) => accumulator + Number(player.overall), 0) / playersList.length
        ).toFixed(0);
    }

    function removePlayer(id) {
        const updatedPlayers = players.filter((player) => player.id !== id);
        setPlayers(updatedPlayers);
    }
    return (
        <>
            <Header />
            <Main>
                <Nav>
                    <article>
                        <div className="logo">
                            <img src={realMadridLogo} alt="Tottenham" className="teamLogo" />
                        </div>
                        <div className="tittle">
                            <h1>{team.name}</h1>
                            <p><img src={spainFlag} alt="England" className="countryFlag" /> {team.country}</p>
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
                                    <th className="fixName">Nome</th>
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
                                        <td className="fixName">{player.name}</td>
                                        <td>{player.age}</td>
                                        <td>{player.position}</td>
                                        <td>{player.overall}</td>
                                        <td><Link to={`/Player/${player.name}`} state={{ player }}> <IoPencilSharp size={24} /> </ Link></td>
                                        <td><p onClick={() => removePlayer(player.id)}><IoTrash size={28}/></p></td>
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
