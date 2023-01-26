import WikipediaPage from "./WikipediaPage";
import React, {MouseEventHandler, useEffect} from "react";
import {useGame} from "../hooks/game/useGame";
import {useLocation, useParams} from "react-router-dom";
import {useValueRef} from "../hooks/helpers/useValueRef";

import { useDisclosure } from '@chakra-ui/react'
import GameStartModal from "./GameStartModal";
import StatusBar from "./StatusBar";

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


    return (
        <>
            <GameStartModal gameId={props.gameId} isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} />
            <div className="game">
                <StatusBar
                    goalPage={goalPage}
                    cooldownRemaining={cooldownRemaining}
                    runnerCooldownDuration={runnerCooldownDuration}
                    isGameSet={isGameSet}
                    runnerPages={runnerPages}
                    hunterPages={hunterPages}
                    isHunter={props.isHunter}
                />
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