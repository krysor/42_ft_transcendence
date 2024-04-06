import React from "react";
import './game.css'

function Game() {
	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<div className='board'>
				<div id="upper" className="border"></div>
				<div id="lower" className="border"></div>
				<div id="left" className="pad"></div>
				<div id="right" className="pad"></div>
				<div className="ball"></div>
			</div>
			<button className="pause">Pause</button>
		</div>
	);
}

export default Game;