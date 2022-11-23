import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';
import useAuth from '../../middleware/hooks/useAuth';
import Button from "../../components/button/Button";
import useAxiosPrivate from '../../middleware/hooks/useAxiosPrivate';
import axios, { CancelTokenSource } from 'axios';
import { GameInfo } from '../../@types/games';
import "./addMatch.css"
import { UserInfo } from '../../@types/auth';
import { Navigate } from 'react-router-dom';

interface PlayerParams {
    user_short_slug: string;
    winner: boolean;
    score?: number;
}

interface PostParams {
    game_slug: string;
    players: PlayerParams[];
}

function searchGamesByName(axiosPrivate, name: string, source: CancelTokenSource) {
    return axiosPrivate.get(`/api/v1/games/search?name=${name}`, {
        cancelToken: source.token
    });
}

function searchFriendsByUsername(axiosPrivate, username: string, source: CancelTokenSource) {
    return axiosPrivate.get(`/api/v1/friendship/search?username=${username}`, {
        cancelToken: source.token
    });
}

const AddMatch = () => {
    const { auth, setAuth } = useAuth();
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [gameName, setGameName] = useState<string>('');
    const [gamesData, setGamesData] = useState<GameInfo[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameInfo>(null);
    const [gameFocus, setGameFocus] = useState<boolean>(false);

    const [username, setUsername] = useState<string>('');
    const [userData, setUserData] = useState<UserInfo[]>([]);
    const [scores, setScores] = useState<number[]>([]);
    const [winners, setWinners] = useState<boolean[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([auth.user]);
    const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
    const [validNumberOfPlayers, setValidNumberOfPlayers] = useState<boolean>(false);


    const [errMsg, setErrMsg] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setIsLoading(true);
        const source = axios.CancelToken.source();
        (async () => {
            try {
                const result = await searchGamesByName(axiosPrivate, gameName, source);
                console.log(result.data.data.games)
                setGamesData(result.data.data.games);
                setIsLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error("axios error: ", error.message);
                } else {
                    console.error(error);
                }
            }
        })();
        return () => {
            source.cancel("Pervious request canceled");
        };
    }, [gameName]);

    useEffect(() => {
        setIsLoading(true);
        const source = axios.CancelToken.source();
        (async () => {
            try {
                const result = await searchFriendsByUsername(axiosPrivate, username, source);
                setUserData(result.data.data.friends);
                setIsLoading(false);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error("axios error: ", error.message);
                } else {
                    console.error(error);
                }
            }
        })();
        return () => {
            source.cancel("Pervious request canceled");
        };
    }, [username]);

    useEffect(() => {
        if (selectedGame) {
            if (selectedUsers.length >= selectedGame.min_players && selectedUsers.length <= selectedGame.max_players) {
                setValidNumberOfPlayers(true);
            }
            else {
                setValidNumberOfPlayers(false);
            }
        } else {
            setValidNumberOfPlayers(false);
        }
    }, [selectedUsers, selectedGame]);

    useEffect(() => {
        if (selectedUsers.length > scores.length) {
            setScores([...scores, 0])
            setWinners([...winners, false])
        }
    }, [selectedUsers]);



    const onGameItemClick = (e: React.MouseEvent<HTMLDivElement>, game: GameInfo) => {
        setSelectedGame(game)
        setGameFocus(false)
    }

    const onUserItemClick = (e: React.MouseEvent<HTMLDivElement>, user: UserInfo, key: string) => {
        const exists_players = selectedUsers.filter((val, id) => val.short_slug == key);
        if (exists_players.length === 0) {
            setSelectedUsers([...selectedUsers, user])
        }
        setUsernameFocus(false)
    }

    const loadGameSelectContent = () => {
        return (
            <div>
                {gamesData.map((game, i) => {
                    return (<div onClick={event => onGameItemClick(event, game)} className='select-item' key={game.slug}>
                        <p>{game.name}</p>
                    </div>
                    )
                })}
            </div>
        )
    }

    const loadUserSelectContent = () => {
        return (
            <div>
                {userData ? userData.map((user, i) => {
                    return (<div onClick={event => onUserItemClick(event, user, user.short_slug)} className='select-item' key={user.short_slug}>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.username}</p>
                    </div>
                    )
                }) : <div className='select-item'>
                    <p>You have no friends. Consider adding some.</p>
                </div>}
            </div>
        )

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const players: PlayerParams[] = selectedUsers.map((user, i) => {
            if (selectedGame.is_point_system) {
                const max = Math.max(...scores);
                let WinnerIndex = scores.indexOf(max);
                let winner_bool = WinnerIndex === i ? true : false
                return ({ user_short_slug: user.short_slug, winner: winner_bool, score: scores[i] })
            } else {
                return ({ user_short_slug: user.short_slug, winner: winners[i] })
            }
        })

        const params: PostParams =
        {
            game_slug: selectedGame.slug,
            players: players
        }

        setIsLoading(true);

        axiosPrivate.post("/api/v1/match/create", params).then(response => {
            setIsLoading(false);
            setIsSuccess(true);
            setSelectedGame(null);
            setSelectedUsers([auth.user]);
            setErrMsg([]);
        }).catch(error => {
            setIsLoading(false);
            setIsSuccess(false);
            const data = error.response.data
            setErrMsg([...errMsg, data.error?.message, JSON.stringify(data.errors), data.message])
            errRef.current.focus()
        });
    }

    const removeUser = (e: React.MouseEvent<HTMLButtonElement>, key: number) => {
        if (key != 0) {
            const filtered = selectedUsers.filter((value, index) => index != key);
            const scores_filtered = scores.filter((value, index) => index != key);
            const winners_filtered = winners.filter((value, index) => index != key);
            setSelectedUsers(filtered)
            setScores(scores_filtered)
            setWinners(winners_filtered)
        }
    }

    const onChangeScore = (e: React.ChangeEvent<HTMLInputElement>, index) => {
        let scores_copy = [...scores]
        scores_copy[index] = Number(e.target.value)
        setScores(scores_copy)
    }

    const onChangeWinner = (e: React.ChangeEvent<HTMLInputElement>, index) => {
        let winners_copy = [...winners]
        winners_copy[index] = !winners[index]
        setWinners(winners_copy)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            transition={{
                duration: 0.6,
            }}
            animate={{ opacity: 1 }}
        >
            <h3>Add Match</h3>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            {isLoading ? <p>Loading...</p> : ""}
            <form className='search-form' onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder={"Search games by name"}
                        type="text"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setGameName(e.target.value)}
                        onFocus={() => { setUsernameFocus(false); setGameFocus(true) }}
                    />
                    {gameFocus ? loadGameSelectContent() : null}
                </div>

                <div>
                    <input
                        placeholder={"Add friends by username"}
                        type="text"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => { setUsernameFocus(true); setGameFocus(false) }}
                    />
                    {usernameFocus ? loadUserSelectContent() : null}
                </div>
            </form>
            <div className='second-content'>

                {selectedGame ?
                    <div>
                        <p>Selected Game: {selectedGame.name}</p>
                        <p>Allowed Number of Players: {selectedGame.min_players}-{selectedGame.max_players}</p>
                    </div>
                    : null}
                {selectedUsers ?
                    <div>
                        <p>Selected Players:</p>
                        {selectedUsers.map((user, i) => {
                            return (<div className='selected-players-item' key={user.short_slug}>
                                <p>{user.username}</p>
                                {selectedGame?.is_point_system ?
                                    <input
                                        className='score'
                                        placeholder={"Score"}
                                        type="number"
                                        required
                                        onChange={event => onChangeScore(event, i)}
                                    />
                                    :
                                    <div className='winner-check-container'>
                                        <label htmlFor="winner">Winner</label>
                                        <input
                                            className='winner-check'
                                            type="checkbox"
                                            id="winner"
                                            onChange={event => onChangeWinner(event, i)}
                                            checked={winners[i]}
                                        />
                                    </div>
                                }
                                {i !== 0 ?
                                    <Button onClick={event => removeUser(event, i)}>X</Button>
                                    :
                                    null}
                            </div>
                            )
                        })}
                    </div>
                    : null}
                <Button type="submit" disabled={!validNumberOfPlayers}>Save</Button>
            </div>
        </motion.div >

    )
}

export default AddMatch