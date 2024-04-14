import './game.css'
import Board from './Board.js'

function Game() {
	return (
		<div className='container'>
			<h1>Ping pong game</h1>

			<Board />
			{/* <button onClick={paused ? play : pause}>
				{paused ? "Play" : "Pause"}
			</button> */}

			<button className="pause">Start</button>
			<button className="pause">Pause</button>
		</div>
	);
}

export default Game;
