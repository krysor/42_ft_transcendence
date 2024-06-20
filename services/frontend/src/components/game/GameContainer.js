import React, { useState } from 'react';
import SelectionScreen from './selection_screen';
import ThreejsGame from './threejs_ai';

const GameContainer = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameMode, setGameMode] = useState('ai');
    const [ballSpeed, setBallSpeed] = useState(1);

    const startGame = (mode, speed) => {
        setGameMode(mode);
        setBallSpeed(speed);
        setGameStarted(true);
    };

    const handleGameEnd = (player1, score1, player2, score2) => {
        console.log(`Game Over. ${player1.username}: ${score1}, ${player2.username}: ${score2}`);
        setGameStarted(false);
    };

    return (
        <div>
            <h3>Game Container</h3>
            {/* {!gameStarted && <SelectionScreen onStartGame={startGame} />} */}
             <ThreejsGame mode={"ai"} ballSpeed={1} onGameEnd={handleGameEnd} />
        </div>
    );
};

export default GameContainer;
