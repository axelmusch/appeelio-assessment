import React from 'react'

function Commit(props) {

    return (
        <div className='text-white shadow-slate-700 shadow p-5 m-4'>
            <h1 className='text-2xl underline'>{props.commitData.commit.message}</h1>

        </div>
    )
}

export default Commit