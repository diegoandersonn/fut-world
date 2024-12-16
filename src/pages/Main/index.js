import React, { useContext } from "react";
import { TeamsContext } from '../../Routes';
import Header from '../../components/Header/index';
import { IoTrash, IoPencilSharp } from 'react-icons/io5';
import { TeamsList, Container } from './styled';
import { Link } from 'react-router-dom';

export default function Main() {
    const { teams, setTeams } = useContext(TeamsContext);

    function removeTeam(id) {
        const updatedTeams = teams.filter((team) => team.id !== id);
        setTeams(updatedTeams);
    }
    return (
        <>
            <Header />
            <Container>
                <TeamsList>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Team</th>
                                <th>Country</th>
                                <th>Stadium</th>
                                <th>Editar</th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr>
                                    <td><img src={team.logo} alt="" /></td>
                                    <td>{team.name}</td>
                                    <td>{team.country}</td>
                                    <td>{team.stadium}</td>
                                    <td className="oi"><Link to={`/Team/${team.name}`} state={{ team }}> <IoPencilSharp size={28} /></ Link></td>
                                    <td><p onClick={() => removeTeam(team.id)}><IoTrash size={28} /></p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TeamsList>
            </Container>
        </>
    );
}
