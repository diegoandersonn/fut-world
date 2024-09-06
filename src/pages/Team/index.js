import React from "react";
import { useLocation } from 'react-router-dom';
import { Container, Main } from './styled';
import Header from '../../components/Header/index';
import tottenhamLogo from '../../imgs/120.webp'

export default function TeamPage() {
    const location = useLocation();
    const team = location.state;

    return (
        <>
            <Header />
            <Main>
            <Container>
                <div className="title">
                    <img src={tottenhamLogo} alt="Tottenham Logo" />
                    <h1>Nome: {team.name}</h1>
                    <h1>País: {team.country}</h1>
                    <h1>Estádio: {team.stadium}</h1>
                </div>
            </Container>
            </Main>
        </>
    );
}
