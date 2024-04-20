import './game.css'
import { Board } from './board'
import React from 'react';

function Game() {
	const [paused, setPaused] = React.useState(true);
	
	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<Board paused={paused}/>
			<button id="gameButton"
				onClick={() => setPaused(!paused)}>
				{paused ? "Play" : "Pause"}
			</button>
		</div>
	);
}

export default Game;
