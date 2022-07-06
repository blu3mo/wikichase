import React, {MouseEventHandler} from "react";
import {getDatabase, ref, set, get, push, child, onValue, DatabaseReference, serverTimestamp} from "firebase/database";

function useGame(gameId: string, isChaser: boolean) {
    const [title, setTitle] = React.useState("Start");

    const [playerPages, setPlayerPages] = React.useState<string[]>([]);
    const [opponentPages, setOpponentPages] = React.useState<string[]>([]);

    const db = getDatabase();
    const gameRef = ref(db, `games/${gameId}`);

    const chaserRef = child(gameRef, "chaser");
    const evaderRef = child(gameRef, "evader");

    const playerRef = isChaser ? chaserRef : evaderRef;
    const playerPageRef = child(playerRef, "pages")
    const opponentRef = !isChaser ? chaserRef : evaderRef;
    const opponentPageRef = child(opponentRef, "pages");

    const lastJumpedTimeRef = child(chaserRef, "lastJumpedTime");

    React.useEffect(() => {
        get(playerPageRef).then((snapshot) => {
            if (snapshot.exists()) {
                const pages = Object.values(snapshot.val()) as string[]
                setTitle(pages.slice(-1)[0])
            } else {
                console.log("No data available");
            }
        })

        listenPages(playerPageRef, (pages) => {
            setPlayerPages(pages)
        });

        listenPages(opponentPageRef, (pages) => {
            setOpponentPages(pages)
        });

    }, []);

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
        if (!isChaser) {
            set(lastJumpedTimeRef, serverTimestamp());
        }
    }

    return {title, onLinkChange, playerPages, opponentPages};
}

export { useGame };