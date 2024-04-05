import React from "react";
import './game.css'

import circle_icon from '../assets/ball.png'

function Game() {
	return (
		<div className='container'>
			<h1>Ping pong <span>game</span></h1>
			<div className='board'>
				<p>test</p>
			</div>
			<button className="pause">Pause</button>
		</div>
	);
}

export default Game;