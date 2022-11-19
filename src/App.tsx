import React, {useEffect} from 'react';
import './App.css';
import WikipediaPage from "./components/WikipediaPage";
import { useGame } from "./hooks/game/useGame";
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import Game from "./components/Game";
import Lobby from "./components/Lobby";

function App() {

    const GameRouter = () => {
        const { gameId, playerType } = useParams();
        switch (playerType) {
            case 'hunter':
                return <Game gameId={gameId!} isHunter={true}/>;
            case 'runner':
                return <Game gameId={gameId!} isHunter={false}/>;
            default:
                return <></>;
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Lobby />
                    }
                ></Route>
                <Route
                    path="/:gameId/:playerType"
                    element={
                        <GameRouter />
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
