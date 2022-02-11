import React from 'react'
import Commit from './Commit';



function CommitList(props) {
    const [commitList, setCommitList] = React.useState([])
    const [search, setSearch] = React.useState("")
    React.useEffect(() => {
        fetch(props.repoUrl)
            .then(res => res.json())
            .then(data => {

                setCommitList(data)
            })
            .catch(error => {
                console.error('User not found', error);

            });
    }, [])

    console.log(commitList)
    const commitElements = commitList.map(commit => {
        if (commit.commit.message.includes(search)) {
            return <Commit key={commit.node_id} commitData={commit} />

        } else {
            return
        }
    })
    console.log(commitElements)



    function handleSearch(event) {
        const { name, value } = event.target
        setSearch(value)
    }
    return (
        <div className='flex flex-col p-20 items-center'>
            <div className='bg-cyan-500 rounded-full text-white px-4 py-2 self-start cursor-pointer' onClick={props.backOnClick}>back</div>
            <form className=''>
                <input placeholder='Search for a commit' onChange={handleSearch} name="searchField" className='rounded text-accent indent-2' value={search} ></input>
            </form>
            <div className='pt-6'>{commitElements}</div>
        </div>

    )
}

export default CommitList