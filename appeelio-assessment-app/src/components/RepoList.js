import React from 'react'

function RepoList(props) {
    const [userRepos, setUserRepos] = React.useState([])
    const [searchName, setSearchName] = React.useState(JSON.parse(localStorage.getItem("searchUser")) || props.searchName)
    const [userExists, setUserExists] = React.useState(false)
    const [searchField, setSearchField] = React.useState(searchName)

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${searchName}/repos`)
            .then(res => {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.error('User not found');
                    setUserExists(false)
                }

            })
            .then(data => {
                console.log(data)
                if (data) {
                    setUserRepos(data)
                    setUserExists(true)
                }

            })
            .catch(error => {
                console.error('User not found', error);
                setUserExists(false)

            });
    }, [searchName])

    //console.log(userRepos)
    let repoElements
    if (userExists) {
        repoElements = userRepos.map(repo => {
            return (
                <div className='shadow-slate-700 shadow p-5 cursor-pointer' key={repo.id} onClick={() => handleRepoClick(repo.commits_url, repo.name)} > {repo.name} </div>
            )
        })
    }


    function handleSearchField(event) {
        const { name, value } = event.target
        setSearchField(value)
    }
    function searchUser(e) {
        e.preventDefault()
        console.log(searchField)
        setSearchName(searchField)
        localStorage.setItem("searchUser", JSON.stringify(searchField))
    }

    function handleRepoClick(url, name) {
        console.log("repo clicked " + url.slice(0, -6))
        console.log(name)
        props.repoOnClick(url.slice(0, -6), name)
    }
    return (
        <div className='text-white p-10 overflow-auto'>
            <form className='flex justify-center'>
                <input onChange={handleSearchField} name="searchField" className='rounded text-accent indent-2' value={searchField}></input>
                <button className='ml-10 p-2 rounded bg-green-800 outline-0' onClick={searchUser}>Search</button>
            </form>
            <h1 className='text-center text-3xl mt-10'>GIT repos for user: {searchName}</h1>
            <div className='mt-20 grid grid-cols-3 gap-10 '>{userExists ? repoElements : `user '${searchField}' does not exist`}</div>
        </div>
    )
}

export default RepoList