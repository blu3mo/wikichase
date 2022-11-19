import WikipediaPage from "./WikipediaPage";
import React, {MouseEventHandler, useEffect} from "react";
import {useGame} from "../hooks/game/useGame";
import {useParams} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import {useValueRef} from "../hooks/helpers/useValueRef";

type Props = {
    gameId: string;
    isHunter: boolean;
}

function Game(props: Props) {
    console.log(props)
    console.log(useParams().gameId!)

    const {title, onLinkChange, playerPages, opponentPages, cooldownRemaining, runnerCooldownDuration, isGameSet} = useGame(props.gameId, props.isHunter);
    const refCooldownRemaining = useValueRef<number>(cooldownRemaining)

    const filterPageList = (pageList: string[]): string[] => {
        return pageList.map((page, index) => {
            if (index % 2 === 0) {
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
                hideBottomContent={!props.isHunter} //Runnerには隠される
            />
            <div className="sideBar">
                <p className={"bold"}>Game ID: {props.gameId}</p>
                <p className={"bold"}>You are: {props.isHunter ? "👮 HUNTER" : "🏃 RUNNER"}</p>
                <br></br>
                {!props.isHunter &&
                    <>
                      <p className={"bold"}>{cooldownRemaining === 0 ? "🟢 You can move!" : `⏳ Wait ${runnerCooldownDuration} sec before next move...`}</p>
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
                <p className={"bold"}>👮 Hunter Log</p>
                <p>{
                    (props.isHunter ? playerPages : opponentPages)
                        .slice().reverse().join(" ← ")
                }</p>
                <p className={"bold"}>🦹 Runner Log</p>
                <p>{
                    (isGameSet) ?
                        ((props.isHunter) ? opponentPages : playerPages)
                            .slice().reverse().join(" ← ") :
                        filterPageList((props.isHunter) ? opponentPages : playerPages)
                            .slice().reverse().join(" ← ")
                }</p>
            </div>
        </div>
    )
}

export default Game;