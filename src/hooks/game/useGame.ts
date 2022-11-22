import React, {MouseEventHandler, useEffect} from "react";
import {getDatabase, ref, set, get, push, child, onValue, DatabaseReference, serverTimestamp} from "firebase/database";
import {useInterval} from "usehooks-ts";

function useGame(gameId: string, isHunter: boolean) {
    const [title, setTitle] = React.useState("Loading...");

    const [playerPages, setPlayerPages] = React.useState<string[]>([]);
    const [opponentPages, setOpponentPages] = React.useState<string[]>([]);
    const [lastJumpedTime, setLastJumpedTime] = React.useState<number>(0);
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

    //Game Params
    const runnerCooldownDuration = 8 //sec

    React.useEffect(() => {
        get(playerPageRef).then((snapshot) => {
            if (snapshot.exists()) {
                const pages = Object.values(snapshot.val()) as string[]
                setTitle(pages.slice(-1)[0])
            } else {
                //初期設定
                //onLinkChange(isHunter ? "警察" : "怪盗")
                onLinkChange(isHunter ? "Detective" : "Fugitive")
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
                console.log("No data available");
            }
        })

        const timers: NodeJS.Timer[] = []

        if (!isHunter) {
            const cooldownInterval = setInterval(() => {
                setCooldownRemaining(
                    //refLastJumpedTimeは自プレイヤーのlastJumpedTimeを返す。この時はrunnerなので問題なし。
                    Math.max(0, runnerCooldownDuration - (new Date().getTime() - lastJumpedTime) / 1000)
                )
            }, 500);
            timers.push(cooldownInterval)
        }

        const judgeInterval = setInterval(() => {
            console.log(playerPages.slice(-1)[0])
            console.log(opponentPages.slice(-1)[0])
        }, 500);
        timers.push(judgeInterval)

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
        if (playerPages.slice(-1)[0] === opponentPages.slice(-1)[0] && playerPages.slice(-1)[0] !== undefined) {
            alert(`Game Set! Hunter caught runner at ${playerPages.slice(-1)[0]}`)
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
            console.log("ttt", lastJumpedTime)
            set(lastJumpedTimeRef, new Date().getTime());
            //setLastJumpedTime(new Date().getTime())
        }
    }

    return {title, onLinkChange, playerPages, opponentPages, cooldownRemaining, runnerCooldownDuration, isGameSet};
}

export { useGame };