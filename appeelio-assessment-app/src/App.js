import React from "react"

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import CommitDetail from "./components/CommitDetail";
import CommitList from "./components/CommitList";
import Header from "./components/Header";
import RepoList from "./components/RepoList"

import "./index.css"

function App() {

  return (
    <Router>
      <div className="bg-main flex flex-col h-full">
        <Header />

        <Routes>

          <Route path="/" element={<RepoList searchName={"fireship-io"} />}>
          </Route>

          <Route path="/:user/:reponame" element={<CommitList />}>
          </Route>

          <Route path="/:user/:reponame/commits/:commitsha" element={<CommitDetail />}>
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;