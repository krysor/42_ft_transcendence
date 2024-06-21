import React, { useState } from 'react';
import SelectionScreen from './selection_screen';
import ThreejsGame from './threejs_ai';
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
const GameContainer = () => {
    const { t } = useTranslation()
    const [gameStarted, setGameStarted] = useState(false);
    const [gameMode, setGameMode] = useState('ai');
    const [ballSpeed, setBallSpeed] = useState(1);
    const [scoreP1, setScoreP1] = useState(0);
    const [scoreP2, setScoreP2]= useState(0);
    const startGame = (mode, speed) => {
        setGameMode(mode);
        setBallSpeed(speed);
        setGameStarted(true);
    };

    const handleGameEnd = (player1, score1, player2, score2) => {
        // console.log(`Game Over. ${player1.username}: ${score1}, ${player2.username}: ${score2}`);
        setScoreP1(score1);
        setScoreP2(score2);
        setGameStarted(false);
    };

    return (
        <div>
            {!gameStarted && <SelectionScreen onStartGame={startGame} />}
            {gameStarted && <ThreejsGame mode={gameMode} ballSpeed={ballSpeed} onGameEnd={handleGameEnd} />}
            {!gameStarted && scoreP1 > scoreP2 && (
			<>
			<h3>{t('Congratulations')} !!! {t('You won against the bot')} :)</h3>
			<img src='/win_image.jpg' alt="Winner"/>
          	<br />
			</>
		)}

		{!gameStarted && scoreP1 < scoreP2 && (
			<>
			<h3>{t('Ho you have lost... You suck at this game')} :c</h3>
          	<br />
			</>
		)}
        
        </div>
    );
};

export default GameContainer;
