import React from 'react'
import Commit from './Commit';



function CommitList(props) {
    const [commitList, setCommitList] = React.useState([])

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
        return <Commit key={commit.node_id} commitData={commit} />
    })
    console.log(commitElements)
    return (
        <div className='d'>{commitElements}</div>
    )
}

export default CommitList