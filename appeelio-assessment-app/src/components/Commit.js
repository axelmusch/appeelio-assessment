import React from 'react'

function Commit(props) {

    return (
        <div className='text-white shadow-slate-700 shadow p-5 m-4'>
            <h1 className='text-2xl underline'>{props.commitData.commit.message}</h1>
            <h1>Committer: {props.commitData.committer.login}</h1>
            <h1>Date: {props.commitData.commit.committer.date.split("T")[0]}</h1>
            <h1>Time: {props.commitData.commit.committer.date.split("T")[1].slice(0, -1)}</h1>
        </div>
    )
}

export default Commit