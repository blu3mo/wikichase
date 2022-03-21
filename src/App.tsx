import React from 'react';
import './App.css';
import WikipediaPage from "./components/WikipediaPage";
import {Element} from "html-react-parser";
import useGame from "./hooks/useGame";
import useMediaWikiPage from "./hooks/useMediaWikiPage";

function App() {

    const {title, setTitle} = useGame();

    return (
        <div className="game">
            <WikipediaPage
                lang="ja"
                title={title}
                onLinkClick={(e) => {
                    console.log(e.target)
                    console.log((e.target as HTMLAnchorElement).title)
                    setTitle((e.target as HTMLAnchorElement).title)
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
