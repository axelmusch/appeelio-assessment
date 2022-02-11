import React from "react"
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
    <div className="bg-main flex flex-col h-full">
      <Header />
      {!commitInfo.show ? <RepoList searchName={"axelmusch"} repoOnClick={(repo, name) => handleRepoClick(repo, name)} /> : <CommitList backOnClick={handleBack} repoUrl={commitInfo.repo} repoName={commitInfo.name} />}
    </div>
  );
}

export default App;
