import React, { useState } from 'react'
import "./tableItem.css"
import { Match, Player } from '../../@types/games'
import useAuth from '../../middleware/hooks/useAuth'

interface Props {
    match: Match
}
const sortPlayers = (match: Match) => {
    if (match.game.is_point_system) {
        return match.players.sort((a, b) => (a.score < b.score) ? 1 : -1)
    } else {
        return match.players.sort((a, b) => (a.winner < b.winner) ? 1 : -1)
    }
}

export const TableItem: React.FC<Props> = ({ match }) => {
    const [sortedPlayers, setSortedPlayers] = useState<Player[]>(sortPlayers(match))
    const { auth } = useAuth()

    const dateFormatString = () => {
        let date = new Date(match.inserted_at)
        var options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        return date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
    }

    const gameInitials = () => {
        let game_initials = ""
        match.game.name.split(" ").forEach((value) => {
            game_initials = game_initials + Array.from(value)[0]
        })

        return game_initials
    }

    const getWinners = () => {
        return sortedPlayers.filter((value) => (value.winner))
    }

    const yourPlace = () => {
        if (match.game.is_point_system) {
            return sortedPlayers.findIndex(player => player.user.email === auth.user.email) + 1;
        } else {
            let result = sortedPlayers.find(player => player.user.email === auth.user.email).winner ? "Winner" : "Loser"
            return result
        }
    }

    const loadAvatares = (players_array: Player[]) => {
        let content = players_array.map((player, i) => {
            if (i < 8) {
                let first = Array.from(player.user.first_name)[0] as string
                let last = Array.from(player.user.last_name)[0] as string
                let avatar_name = (first + last).toUpperCase()

                return (
                    <a key={player.user.short_slug} className={`avatar avatar-${i + 1}`}>{avatar_name}</a>
                )
            }
        })
        return content
    }

    const playerItems = (players_array: Player[]) => {
        if (players_array.length > 1) {
            return (
                <div className='players-item'>
                    <p>{players_array.length} players</p>
                    <div className='avatares-div'>
                        <div className='avatares'>
                            {loadAvatares(players_array)}
                        </div>
                        {players_array.length > 8 ?
                            <p>+{players_array.length - 8}</p>
                            : null
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className='single-player-item'>
                    {loadAvatares(players_array)}
                    <p>{players_array[0]?.user.username}</p>
                </div>
            )
        }
    }

    return (
        <div className='table-item' key={match.id}>
            <div className='first-item'>
                <div className='first-item-icon'>{gameInitials()}</div>
                <p>{match.game.name}</p>
            </div>
            <p>{dateFormatString()}</p>
            {playerItems(match.players)}
            {playerItems(getWinners())}
            <p>{match.game.is_point_system ? sortedPlayers[0].score : "-"}</p>
            <p>{yourPlace()}</p>
        </div>
    )
}
