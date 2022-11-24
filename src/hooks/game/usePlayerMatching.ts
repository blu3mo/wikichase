import React, {MouseEventHandler, useEffect} from "react";
import {getDatabase, ref, set, get, push, child, onValue, DatabaseReference, serverTimestamp} from "firebase/database";

import randomWords from "random-words"
import firebase from "firebase/compat";
import game from "../../components/Game";
import {useNavigate} from "react-router-dom";
import startPageTitles from "./startPageTitles.json";

function usePlayerMatching(lang: string) {

    const db = getDatabase();
    const navigate = useNavigate();

    const createGame = async () => {
        //TODO: Handle generation error
        const gameId = await createValidGameId()

        const db = getDatabase();
        const gameRef = ref(db, `games/${gameId}`);
        const hunterPageRef = child(gameRef, "hunter/pages");
        const runnerPageRef = child(gameRef, "runner/pages");

        set(push(hunterPageRef), generateStartTitle(true));
        set(push(runnerPageRef), generateStartTitle(false));

        navigate(`/${gameId}/hunter`, { state : { newGame: true } })
    }

    const createValidGameId = async (): Promise<string> => {
        const MAX_TRIAL = 10;

        for (let i = 0; i < MAX_TRIAL; i++) {
            const gameId = randomWords({exactly: 2, maxLength: 5, join: "-"});
            const isGameIdExist = await checkIfGameIdExist(gameId)
            if (!isGameIdExist) {
                return gameId
            }
        }
        throw new Error("Valid room id not generated.")
    }

    const checkIfGameIdExist = async (gameId: string): Promise<Boolean> => {
        const gameRef = ref(db, `games/${gameId}`);
        return new Promise((resolve) => {
            onValue(gameRef, (snapshot) => {
                const data = snapshot.val();
                if (data == null) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            });
        })
    }

    const joinGame = async () => {
        const gameId = window.prompt("What is the room id?");
        if (await checkIfGameIdExist(gameId || "")) {
            navigate(`/${gameId}/runner`)
        } else {
            window.alert("Your room id does not exist. Try again.")
        }
    }

    const generateStartTitle = (isHunter: boolean) => {
        //TODO: Handle null
        const titles = (startPageTitles as any)["lang"][lang][(isHunter ? "hunter" : "runner")]
        const title = titles[Math.floor((Math.random()*titles.length))]
        return title
    }

    return {createGame, joinGame}
}

export { usePlayerMatching }