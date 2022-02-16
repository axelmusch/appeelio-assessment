import React from 'react'
import { Link } from "react-router-dom";

function RepoList(props) {
    const [userRepos, setUserRepos] = React.useState([])
    const [searchName, setSearchName] = React.useState(JSON.parse(localStorage.getItem("searchUser")) || props.searchName)
    const [userExists, setUserExists] = React.useState(false)
    const [searchField, setSearchField] = React.useState(searchName)
    const [sortBy, setSortBy] = React.useState("date")

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${searchName}/repos?per_page=100`)
            .then(res => {
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

    let repoElements
    if (userExists) {
        console.log(userRepos)
        if (sortBy == "stars") {
            userRepos.sort((a, b) => {
                return b.stargazers_count - a.stargazers_count
            })
        }
        if (sortBy == "name") {
            userRepos.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        if (sortBy == "date") {
            userRepos.sort((a, b) => {
                let fa = a.created_at.toLowerCase(),
                    fb = b.created_at.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            });
        }

        console.log(userRepos)

        repoElements = userRepos.map(repo => {
            return (
                <Link key={repo.id} to={`/${searchName}/${repo.name}`}>
                    <div className='shadow-slate-700 shadow p-5 cursor-pointer' key={repo.id} >
                        <h1 className="text-xl">{repo.name}</h1>

                        <h1>Stars: {repo.stargazers_count}</h1>
                    </div>
                </Link>
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

    function handleSort(sort) {
        setSortBy(sort)
    }

    return (
        <div className='text-white p-10 overflow-auto cust-scroll'>
            <form className='flex justify-center'>
                <input onChange={handleSearchField} name="searchField" className='rounded text-accent indent-2' value={searchField}></input>
                <button className='ml-10 px-4 py-2 rounded-full bg-cyan-500 outline-0' onClick={searchUser}>Search</button>
            </form>

            <h1 className='text-center text-3xl mt-10'>GIT repos for user: {searchName}</h1>

            <div className='flex text-xl'>Sort by:
                <div className={`px-1 cursor-pointer ${sortBy == 'date' && "underline"}`} onClick={() => handleSort("date")}>date</div>
                <div className={`px-1 cursor-pointer ${sortBy == 'name' && "underline"}`} onClick={() => handleSort('name')}>name</div>
                <div className={`px-1 cursor-pointer ${sortBy == 'stars' && "underline"}`} onClick={() => handleSort("stars")}>stars</div>
            </div>


            <div className='mt-20 grid grid-cols-3 gap-10 '>{userExists ? repoElements : `user '${searchField}' does not exist`}</div>
        </div>
    )
}

export default RepoList