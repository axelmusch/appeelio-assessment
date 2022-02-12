import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import { Link, Route, Routes } from "react-router-dom";
import CommitDetail from "./CommitDetail";

import CommitList from "./components/CommitList";
import Header from "./components/Header";
import RepoList from "./components/RepoList"
import "./index.css"

function App() {
  const [commitInfo, setCommitInfo] = React.useState(
    { show: false, repo: "", name: "name" }
  )

  function handleRepoClick(repo, name) {
    console.log(`Show commits for repo: ${repo + "?per_page=20"} `)
    setCommitInfo({ show: true, repo: repo + "?per_page=20", name: name })
  }

  function handleBack() {
    setCommitInfo(prevCommit => {
      return {
        ...prevCommit,
        show: false
      }
    })
  }
  return (
    <Router>
      <div className="bg-main flex flex-col h-full">
        <Header />

        <Routes>
          <Route path="/" element={<RepoList searchName={"axelmusch"} repoOnClick={(repo, name) => handleRepoClick(repo, name)} />}>
          </Route>

          <Route path="/:user/:reponame" element={<CommitList backOnClick={handleBack} />}>

          </Route>
          <Route path="/:user/:reponame/commits/:commitsha" element={<CommitDetail />}>
          </Route>
        </Routes>


      </div>
    </Router>
  );
}

export default App;
