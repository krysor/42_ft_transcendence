import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight, padWidth }				from './board/pad';
import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import { BallHitHorizontalBorder, BallHitPad } from './logic/collision'

// import animate from './threejs.js';

const	ballVXStart		= 5;
const	ballVYStart		= 5;

// let playerKeys = {};
// function initKeys() {

// 	playerKeys[player1_name] = {
// 		ArrowUp: false,		
// 		ArrowDown: false
// 	};

// 	playerKeys[player2_name] = {
// 		ArrowUp: false,
// 		ArrowDown: false
// 	};
// }

// initKeys();

// function handleKeyDown(event) {
// 	if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
// 		playerKeys[player1_name][event.key] = true;
// 	}
// }

// function handleKeyUp(event) {
// 	if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
// 		playerKeys[player1_name][event.key] = false;
// 	}
// }

// document.addEventListener('keydown', handleKeyDown);
// document.addEventListener('keyup', handleKeyUp);

function Game() {
	const [state, setState] = React.useState({
		paused: true,
		ball: {
			X: (boardWidth - ballDiameter)/2,
			Y: (boardHeight - ballDiameter)/2
		},
		pad: {
			left : { Y: (boardHeight - padHeight)/2 },
			right: { Y: (boardHeight - padHeight)/2 }
		}
	});

	const ballSpeedX = React.useRef(ballVXStart);
	const ballSpeedY = React.useRef(ballVYStart);
	const frameId 	 = React.useRef(0);

	const UpdatePosition = (ballSpeedX, ballSpeedY) => {
		const ball = {
			X: state.ball.X + ballSpeedX.current,
			Y: state.ball.Y + ballSpeedY.current
		}
		setState( previousState => {
			return { ...previousState, ball}
		});
	}
	
	const animate = () => {
		if (BallHitHorizontalBorder(state.ball.Y))
			ballSpeedY.current *= -1;
		if (BallHitPad(state.ball.X, state.ball.Y, state.pad.left.Y, state.pad.right.Y))
			ballSpeedX.current *= -1;				
			UpdatePosition(ballSpeedX, ballSpeedY);
		// frameId.current = requestAnimationFrame(animate);
	}

	React.useEffect(() => {
		if (state.paused)
			cancelAnimationFrame(frameId.current);
		else
			frameId.current = requestAnimationFrame(animate);		
		return () => cancelAnimationFrame(frameId);
	  }, [state]);

	const changePaused = () => {
		const paused = !state.paused;
		setState( previousState => {
			return { ...previousState, paused}
		});
	}

	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<Board	ballPositionX={state.ball.X}
					ballPositionY={state.ball.Y}
					padLeftPositionY={state.pad.left.Y}
					padRightPositionY={state.pad.right.Y}/>
			<button id="gameButton"
				onClick={() => changePaused()}>
				{state.paused ? "Play" : "Pause"}
			</button>
			{/* <button id="gameButton"
				onClick={() => animate()}>
			</button> */}
		</div>
	);
	// return (
	// 	<div id="scene-box"></div>
	// );
}

export default Game;
