import React from 'react'
import { useParams } from "react-router-dom"


function CommitDetail() {
    const { user, reponame, commitsha } = useParams()
    const [commitInfo, setCommitInfo] = React.useState()

    React.useEffect(() => {
        fetch(`https://api.github.com/repos/${user}/${reponame}/commits/${commitsha}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCommitInfo(data)
            })
            .catch(error => {
                console.error('User not found', error);

            });
    }, [])


    return (
        <div className='text-white px-60 py-20'>
            <p>Message: {commitInfo && commitInfo.commit.message}</p>
            <p>Committer: {commitInfo && commitInfo.committer.login}</p>
            <p>Date: {commitInfo && commitInfo.commit.committer.date.split("T")[0]}</p>
            <p>Time: {commitInfo && commitInfo.commit.committer.date.split("T")[1].slice(0, -1)}</p>
            <p>Additions: {commitInfo && commitInfo.stats.additions}</p>
            <p>Deletions: {commitInfo && commitInfo.stats.deletions}</p>
            <p>Changed files: {commitInfo && commitInfo.files.length}</p>
            <div>{commitInfo && commitInfo.files.map(file => {
                return <p key={file.sha} className='ml-6'>{file.filename}</p>
            })}</div>
            <a href={commitInfo && commitInfo.html_url} target='_blank'>View on github</a>
        </div>
    )
}

export default CommitDetail