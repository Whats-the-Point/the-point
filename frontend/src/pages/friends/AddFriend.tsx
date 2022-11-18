
import React, { useState } from 'react';
import { User } from '../../@types/auth';
import Button from '../../components/button/Button';
import './AddFriend.css';
import SearchResult from './searchResult';


const Addu: React.FC = () => {
    interface User {
        firstName: string;
        lastName: string;
        username: string;
    }

    const userList: User[]  = [
        { firstName: 'Johni' , lastName: 'Macarroni', username:'suptheredoe'},
        { firstName: 'Jose' , lastName: 'Mourinho', username:'specialone'},
        { firstName: 'Arthas' , lastName: 'Lightbringer', username:'lixoking'},
    ]

    const [searchQuery, setSearchQuery]=  useState<string>('');
    const searchIsEmpty:boolean = searchQuery.length === 0;

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className='container'>
            <form onSubmit={handleSearch}>
            <label htmlFor='searchInput'>Search user ID or Username:</label>
            <input 
                style={{marginLeft: '10px'}} 
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}  />
                <Button type='submit' disabled={searchIsEmpty}>Search</Button>
            </form>
            <div className="searchResults">
                {userList.map((u) => {
                    return (
                        <div key={u.username}>
                            <SearchResult username={u.username} fullName={u.firstName + ' ' + u.lastName} />
                        </div>
                    )
                })}
            </div>            
            
        </div>
    )
}

export default Addu;
export type {User}
