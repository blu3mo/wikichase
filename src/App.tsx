import React from 'react';
import './App.css';
import WikipediaPage from "./components/WikipediaPage";
import {Element} from "html-react-parser";

function App() {
  return (
      <div className="game">
          <WikipediaPage
              lang="ja"
              title="Wikipedia"
              onLinkClick={(e) => {
                  console.log(e.target)
                  console.log((e.target as HTMLAnchorElement).title)
                  e.preventDefault()
              }}
          />
          <div className="sideBar">
              <p>SideBar</p>
          </div>
      </div>
  );
}

export default App;
