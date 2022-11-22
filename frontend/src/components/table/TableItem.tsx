import React from 'react'
import "./tableItem.css"

const names = ["RP", "JP", "JJ", "JA", "RP", "JP", "JJ", "JA", "SS"]

export const TableItem = () => {

    const loadAvatares = () => {
        let content = names.map((name, i) => {
            if (i < 8) {

                return (
                    <a className={`avatar avatar-${i + 1}`}>{name}</a>
                )
            }
        })
        return content
    }

    return (
        <div className='table-item'>
            <div className='first-item'>
                <div className='first-item-icon'>TM</div>
                <p>Terraforming Mars</p>
            </div>
            <p>October 24th, 2022</p>
            <div className='players-item'>
                <p>{names.length} players</p>
                <div className='avatares-div'>
                    <div className='avatares'>
                        {loadAvatares()}
                    </div>
                    {names.length > 8 ?
                        <p>+{names.length - 8}</p>
                        : null
                    }
                </div>
            </div>
            <p>Winner</p>
            <p>High Score</p>
            <p>Your place</p>
        </div>
    )
}
