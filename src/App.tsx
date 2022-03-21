import React, {useEffect} from 'react';
import './App.css';
import WikipediaPage from "./components/WikipediaPage";
import { useGame } from "./hooks/game/useGame";
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import Game from "./components/Game";

function App() {

    const GameRouter = () => {
        const { gameId, playerType } = useParams();
        switch (playerType) {
            case 'chaser':
                return <Game gameId={gameId!} isChaser={true}/>;
            case 'evader':
                return <Game gameId={gameId!} isChaser={false}/>;
            default:
                return <></>;
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/:gameId/:playerType"
                    element={
                        <GameRouter />
                    }
                >
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
