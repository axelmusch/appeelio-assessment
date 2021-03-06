import React from 'react'

import { useParams, Link } from "react-router-dom"

import Commit from './Commit';

function CommitList() {
    const { user, reponame } = useParams()

    const [commitList, setCommitList] = React.useState([])
    const [search, setSearch] = React.useState("")

    React.useEffect(() => {
        fetch(`https://api.github.com/repos/${user}/${reponame}/commits?per_page=20`)
            .then(res => res.json())
            .then(data => {
                setCommitList(data)
            })
            .catch(error => {
                console.error('User not found', error);
            });
    }, [user, reponame])

    const commitElements = commitList.map(commit => {
        if (commit.commit.message.includes(search)) {
            return (
                <Link key={commit.node_id} to={`/${user}/${reponame}/commits/${commit.sha}`}>
                    <Commit commitData={commit} />
                </Link>)
        } else {
            return <></>
        }
    })

    function handleSearch(event) {
        const { value } = event.target
        setSearch(value)
    }

    return (
        <div className='flex flex-col p-20 items-center h-screen'>
            <h1 className='text-white'>Commits for {reponame}</h1>
            <form className=''>
                <input placeholder='Search for a commit' onChange={handleSearch} name="searchField" className='rounded text-accent indent-2' value={search} ></input>
            </form>
            <div className='mt-6 overflow-auto cust-scroll'>{commitElements}</div>
        </div>

    )
}

export default CommitList