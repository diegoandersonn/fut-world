import React, { useContext } from "react";
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import { TeamsList, Container } from './styled';
import { Link } from 'react-router-dom';

export default function Main() {
    const { teams } = useContext(TeamsContext);
    return (
        <>
            <Header />
            <Container>
                <TeamsList>
                    <h1>Main</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Country</th>
                                <th>Stadium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => (
                                <tr key={`team-${index}`}>
                                    <Link to={`/Team/${team.name}`} state={{ team }}>
                                        <td>{team.name}</td>
                                    </Link>
                                    <td>{team.country}</td>
                                    <td>{team.stadium}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TeamsList>
            </Container>
        </>
    );
}
