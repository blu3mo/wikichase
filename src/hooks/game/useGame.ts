import React, {MouseEventHandler, useEffect} from "react";
import {getDatabase, ref, set, get, push, child, onValue, DatabaseReference, serverTimestamp} from "firebase/database";
import {useInterval} from "usehooks-ts";
import startPageTitles from './startPageTitles.json';

function useGame(gameId: string, isHunter: boolean, lang: string) {
    const [title, setTitle] = React.useState("Loading...");

    const [playerPages, setPlayerPages] = React.useState<string[]>([]);
    const [opponentPages, setOpponentPages] = React.useState<string[]>([]);
    const hunterPages = (isHunter ? playerPages : opponentPages)
    const runnerPages = (isHunter ? opponentPages : playerPages)

    const [lastJumpedTime, setLastJumpedTime] = React.useState<number>(0);
    const [goalPage, setGoalPage] = React.useState("");
    const [endingTime, setEndingTime] = React.useState<number>(0);
    const [cooldownRemaining, setCooldownRemaining] = React.useState<number>(0);

    const [isGameSet, setIsGameSet] = React.useState<boolean>(false);

    const db = getDatabase();
    const gameRef = ref(db, `games/${gameId}`);

    const hunterRef = child(gameRef, "hunter");
    const runnerRef = child(gameRef, "runner");


    const playerRef = isHunter ? hunterRef : runnerRef;
    const playerPageRef = child(playerRef, "pages")
    const opponentRef = !isHunter ? hunterRef : runnerRef;
    const opponentPageRef = child(opponentRef, "pages");

    const lastJumpedTimeRef = child(playerRef, "lastJumpedTime");
    const goalPageRef = child(gameRef, "goalPage");
    const endingTimeRef = child(gameRef, "endingTime");

    //Game Params
    const runnerCooldownDuration = 8 //sec

    React.useEffect(() => {
        const setFillHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        window.addEventListener('resize', setFillHeight);
        setFillHeight();

        console.log("RUN0")
        get(playerPageRef).then((snapshot) => {
            if (snapshot.exists()) {
                const pages = Object.values(snapshot.val()) as string[]
                setTitle(pages.slice(-1)[0])
            } else {
                console.log("Start Page Missing...")
            }
        })

        listenPages(playerPageRef, (pages) => {
            setPlayerPages(pages)
        });

        listenPages(opponentPageRef, (pages) => {
            setOpponentPages(pages)
        });

        onValue(lastJumpedTimeRef, (snapshot) => {
            if (snapshot.exists()) {
                const lastJumpedTime = snapshot.val()
                setLastJumpedTime(lastJumpedTime)
            } else {
                console.log("lastJumpedTime Unavailable");
            }
        })

        onValue(goalPageRef, (snapshot) => {
            if (snapshot.exists()) {
                setGoalPage(snapshot.val())
            } else {
                console.log("goalPage Unavailable");
            }
        })

        onValue(endingTimeRef, (snapshot) => {
            if (snapshot.exists()) {
                setEndingTime(snapshot.val())
            } else {
                console.log("endingTime Unavailable");
            }
        })

    }, []);

    useInterval(() => {
        //cooldown (runnerの時のみ)
        if (!isHunter) {
            setCooldownRemaining(
                //lastJumpedTimeは自プレイヤーのlastJumpedTimeを返す。この時はrunnerなので問題なし。
                Math.max(0, runnerCooldownDuration - (new Date().getTime() - lastJumpedTime) / 1000)
            )
        }

        //judge
        if (hunterPages.slice(-1)[0] === runnerPages.slice(-1)[0] && hunterPages.slice(-1)[0] !== undefined) {
            alert(`Game Set! Hunter caught runner at ${playerPages.slice(-1)[0]}`)
            setIsGameSet(true)
        } else if (runnerPages.slice(-1)[0] === goalPage) {
            alert(`Game Set! Runner reached the goal at ${runnerPages.slice(-1)[0]}`)
            setIsGameSet(true)
        }
    }, isGameSet ? null : 500)

    const listenPages = (pageRef: DatabaseReference, pageUpdated: (pages: string[]) => void) => {
        onValue(pageRef, (snapshot) => {
            if (snapshot.exists()) {
                const pages = snapshot.val()
                pageUpdated(Object.values(pages))
            } else {
                console.log("No data available");
            }
        })
    }

    const onLinkChange = (title: string) => {
        setTitle(title)
        set(push(playerPageRef), title);
        if (!isHunter) {
            set(lastJumpedTimeRef, new Date().getTime());
        }
    }

    return {title, onLinkChange, playerPages, opponentPages, hunterPages, runnerPages, cooldownRemaining, runnerCooldownDuration, isGameSet, goalPage, endingTime};
}

export { useGame };