import React from "react"
import Header from "./components/Header";
import RepoList from "./components/RepoList"
import "./index.css"

function App() {
  const [commitInfo, setCommitInfo] = React.useState(
    { show: false, repo: "" }
  )

  function handleRepoClick(repo) {
    console.log(`Show commits for repo: ${repo + "?per_page=20"} `)
  }

  return (
    <div className="bg-main flex flex-col h-full">
      <Header />

      {!commitInfo.show ? <RepoList searchName={"axelmusch"} repoOnClick={(repo) => handleRepoClick(repo)} /> : "xd"}
    </div>
  );
}

export default App;
