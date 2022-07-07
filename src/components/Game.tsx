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

    const {title, onLinkChange, playerPages, opponentPages} = useGame(props.gameId, props.isChaser);

    const filterPageList = (pageList: string[]): string[] => {
        return pageList.map((page, index) => {
            if (index % 3 === 0) {
                return page
            } else {
                return "??"
            }
        })
    }

    return (
        <div className="game">
            <WikipediaPage
                lang="ja"
                title={title}
                onLinkClick={(e) => {
                    console.log(e.target)
                    const target = e.target as HTMLAnchorElement
                    onLinkChange(target.title)
                    window.scrollTo(0, 0);
                    e.preventDefault()
                }}
                hideBottomContent={!props.isChaser} //Evaderには隠される
            />
            <div className="sideBar">
                <p className={"bold"}>Game ID: {props.gameId}</p>
                <p className={"bold"}>You are: {props.isChaser ? "👮 CHASER" : "🦹‍ EVADER"}</p>
                <br></br>
                <p className={"bold"}>👮 Chaser Log</p>
                <p>{
                    (props.isChaser ? playerPages : opponentPages)
                        .slice().reverse().join(" ← ")
                }</p>
                <p className={"bold"}>🦹 Evader Log</p>
                <p>{
                    filterPageList(props.isChaser ? opponentPages : playerPages)
                        .slice().reverse().join(" ← ")
                }</p>
            </div>
        </div>
    )
}

export default Game;