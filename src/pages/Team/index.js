import React from "react";
import { useLocation } from 'react-router-dom';
import { Container, Main } from './styled';
import Header from '../../components/Header/index';
import tottenhamLogo from '../../imgs/tottenhamlogo.png';
import englandFlag from '../../imgs/england.png';

export default function TeamPage() {
    const location = useLocation();
    const { team } = location.state;

    return (
        <>
            <Header />
            <Main>
                <Container>
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
                                <em tittle="83">83</em>
                                <div className="sub">Overall</div>
                            </div>
                        </div>
                        <div className="Ataque">
                            <div className="col">
                                <em tittle="83">83</em>
                                <div className="sub">Overall</div>
                            </div>
                        </div>
                        <div className="Meio">
                            <div className="col">
                                <em tittle="83">83</em>
                                <div className="sub">Overall</div>
                            </div>
                        </div>
                        <div className="Defesa">
                            <div className="col">
                                <em tittle="83">83</em>
                                <div className="sub">Overall</div>
                            </div>
                        </div>
                        </div>
                    </article>
                </Container>
            </Main>
        </>
    );
}
