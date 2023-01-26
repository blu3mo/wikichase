import WikipediaPage from "./WikipediaPage";
import React, {MouseEventHandler, useEffect} from "react";
import {useGame} from "../hooks/game/useGame";
import {useLocation, useParams} from "react-router-dom";
import {useValueRef} from "../hooks/helpers/useValueRef";

import { useDisclosure } from '@chakra-ui/react'
import GameStartModal from "./GameStartModal";

type Props = {
    gameId: string;
    isHunter: boolean;
    lang: string;
}

function Game(props: Props) {
    console.log(props)
    console.log(useParams().gameId!)

    const {title, onLinkChange, playerPages, opponentPages, hunterPages, runnerPages, cooldownRemaining, runnerCooldownDuration, isGameSet, goalPage, endingTime} = useGame(props.gameId, props.isHunter, props.lang);
    const refCooldownRemaining = useValueRef<number>(cooldownRemaining)

    const location = useLocation()
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

    useEffect(() => {
        if (location.state != null && location.state.newGame) {
            onModalOpen()
        }
    }, [])

    const maskPageList = (pageList: string[]): string[] => {
        return pageList.map((page, index) => {
            if (index % 2 === 0) {
                return page
            } else {
                return "??"
            }
        })
    }

    return (
        <>
            <GameStartModal gameId={props.gameId} isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose}></GameStartModal>
            <div className="game">
                <div className="statusBar">
                    <p className={"bold"}>You are: {props.isHunter ? "Hunter 👮" : "Runner 🏃"}</p>
                    <p className={"bold"}>{props.isHunter ?
                        `Catch the runner in 0:00 min!`:
                        `Go to ${goalPage} in 0:00 min before getting caught!`}</p>
                    {!props.isHunter &&
                        <>
                          <p className={"bold"}>{cooldownRemaining === 0 ? "🟢 You can move!" : `⏳ Wait ${runnerCooldownDuration} sec before next move...`}</p>
                          {
                              (Math.ceil(cooldownRemaining * 2) === 0) ?
                                  <br></br> :
                                  <p className={"bold"}>{"|".repeat(Math.ceil(cooldownRemaining * 2))}</p>
                          }
                        </>
                    }
                    {isGameSet &&
                      <>
                        <h3 className={"bold"}>🚨 GAME SET! 🚨</h3>
                      </>
                    }
                    <p className={"playerLog"}>
                        {"Runner Log: " + maskPageList(runnerPages).slice().reverse().join(" ← ")}
                    </p>
                    <p className={"playerLog"}>
                        {"Hunter Log: " + hunterPages.slice().reverse().join(" ← ")}
                    </p>
                </div>
                <WikipediaPage
                    lang={props.lang}
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
            </div>
        </>

    )
}

export default Game;