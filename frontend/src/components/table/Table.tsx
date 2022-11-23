import React from 'react'
import "./table.css"
import { Match } from '../../@types/games'
import { TableItem } from './TableItem'

interface Props {
    matches: Match[];
}

const Table: React.FC<Props> = ({ matches }) => {
    return (
        <table className='fixed_header'>
            <thead>
                <tr>
                    <th><p>Game</p></th>
                    <th>Date</th>
                    <th>Players</th>
                    <th>Winner</th>
                    <th>Highest Score</th>
                    <th>Your place</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match, i) => {
                    return <TableItem key={match.id} match={match} />
                })}
            </tbody>
        </table>
    )
}

export default Table