import React from 'react'

export default function Room_detail(props) {
    return (
        <div className='roomDetail' >
            <h2>{props.room.title}</h2>
            <p>{props.room.description}</p>
        </div>
    )
}
