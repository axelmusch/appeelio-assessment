import React from "react"
import Header from "./components/Header";
import RepoList from "./components/RepoList"
import "./index.css"

function App() {


  return (
    <div className="bg-main flex flex-col h-full">
      <Header />
      <RepoList searchName={"wiven"} />
    </div>
  );
}

export default App;
