import React from "react";
import { useLocation, Link } from 'react-router-dom';
import { Nav, Main } from './styled';
import { IoAdd, IoTrash } from 'react-icons/io5';
import Header from '../../components/Header/index';
import tottenhamLogo from '../../imgs/tottenhamlogo.png';
import englandFlag from '../../imgs/england.png';

export default function TeamPage() {
    const location = useLocation();
    const { team } = location.state;
    // const teamOverall = (attackOverall + midOverall + defenseOverall)/3; 
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
                                    <em tittle="XX">XX</em>
                                    <div className="sub">Overall</div>
                                </div>
                            </div>
                            <div className="ataque">
                                <div className="col">
                                    <em tittle="XX">XX</em>
                                    <div className="sub">Ataque</div>
                                </div>
                            </div>
                            <div className="meio">
                                <div className="col">
                                    <em tittle="XX">XX</em>
                                    <div className="sub">Meio-Campo</div>
                                </div>
                            </div>
                            <div className="defesa">
                                <div className="col">
                                    <em tittle="XX">XX</em>
                                    <div className="sub">Defesa</div>
                                </div>
                            </div>
                        </div>
                    </article>
                </Nav>
                <Nav>
                    <div className="playerTittle">
                        <h1>Jogadores: </h1>
                        <div className="managePlayers">
                            <Link to={"/Player"} state={{ team }}><IoAdd size={35} /></ Link>
                            <Link to="/Player"> <IoTrash size={28} /> </ Link>
                        </div>
                    </div>
                </Nav>
            </Main>
        </>
    );
}
