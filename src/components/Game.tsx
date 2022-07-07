import WikipediaPage from "./WikipediaPage";
import React, {MouseEventHandler, useEffect} from "react";
import {useGame} from "../hooks/game/useGame";
import {useParams} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import {useValueRef} from "../hooks/helpers/useValueRef";

type Props = {
    gameId: string;
    isChaser: boolean;
}

function Game(props: Props) {
    console.log(props)
    console.log(useParams().gameId!)

    const {title, onLinkChange, playerPages, opponentPages, cooldownRemaining, evaderCooldownDuration, isGameSet} = useGame(props.gameId, props.isChaser);
    const refCooldownRemaining = useValueRef<number>(cooldownRemaining)

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
                    e.preventDefault()
                    console.log("cooldown", cooldownRemaining)
                    if (refCooldownRemaining.current === 0) {
                        const target = e.target as HTMLAnchorElement
                        onLinkChange(target.title)
                        window.scrollTo(0, 0);
                    } else {
                        console.log("test")
                        window.alert("Wait before next move...")
                    }
                }}
                hideBottomContent={!props.isChaser} //Evaderには隠される
            />
            <div className="sideBar">
                <p className={"bold"}>Game ID: {props.gameId}</p>
                <p className={"bold"}>You are: {props.isChaser ? "👮 CHASER" : "🦹‍ EVADER"}</p>
                <br></br>
                {!props.isChaser &&
                    <>
                      <p className={"bold"}>{cooldownRemaining === 0 ? "🟢 You can move!" : `⏳ Wait ${evaderCooldownDuration} sec before next move...`}</p>
                      <p className={"bold"}>{"|".repeat(Math.ceil(cooldownRemaining * 2))}</p>
                      <br></br>
                    </>
                }
                {isGameSet &&
                  <>
                    <h3 className={"bold"}>🚨 GAME SET! 🚨</h3>
                    <br></br>
                  </>
                }
                <p className={"bold"}>👮 Chaser Log</p>
                <p>{
                    (props.isChaser ? playerPages : opponentPages)
                        .slice().reverse().join(" ← ")
                }</p>
                <p className={"bold"}>🦹 Evader Log</p>
                <p>{
                    (isGameSet) ?
                        ((props.isChaser) ? opponentPages : playerPages)
                            .slice().reverse().join(" ← ") :
                        filterPageList((props.isChaser) ? opponentPages : playerPages)
                            .slice().reverse().join(" ← ")
                }</p>
            </div>
        </div>
    )
}

export default Game;