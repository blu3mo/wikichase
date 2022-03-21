import WikipediaPage from "./WikipediaPage";
import React, {MouseEventHandler, useEffect} from "react";
import {useGame} from "../hooks/game/useGame";
import {useParams} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";

type Props = {
    gameId: string;
    isChaser: boolean;
}

function Game(props: Props) {
    console.log(props)
    console.log(useParams().gameId!)

    const {title, onLinkChange, opponentPages} = useGame(props.gameId, props.isChaser);

    return (
        <div className="game">
            <WikipediaPage
                lang="ja"
                title={title}
                onLinkClick={(e) => {
                    const target = e.target as HTMLAnchorElement
                    onLinkChange(target.title)
                    window.scrollTo(0, 0);
                    e.preventDefault()
                }}
            />
            <div className="Opponent Pages">
                <p>SideBar</p>
                <p>{opponentPages.join(" -> ")}</p>
            </div>
        </div>
    )
}

export default Game;