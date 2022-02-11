import React from 'react'

function Commit(props) {

    return (
        <div className='text-white'>{props.commitData.commit.message}</div>
    )
}

export default Commit