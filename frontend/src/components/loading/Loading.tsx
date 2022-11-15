import React from 'react'
import loading_gif from '../../assets/loading.gif'
import "./loading.css"

const Loading = () => {
    return (
        <div className='loading-div'>
            <img src={loading_gif} alt="Loading..." />
        </div>
    )
}

export default Loading