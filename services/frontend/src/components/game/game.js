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
	const [paused, setPaused] = React.useState(true);

	const [position, setPosition] = React.useState({
		ball: {
			X: (boardWidth - ballDiameter)/2,
			Y: (boardHeight - ballDiameter)/2
		},
		pad: {
			left : { Y: (boardHeight - padHeight)/2 },
			right: { Y: (boardHeight - padHeight)/2 }
		}
	});
	// const [ballPosition, setBallPosition] = React.useState({
	// 	X: (boardWidth - ballDiameter)/2,
	// 	Y: (boardHeight - ballDiameter)/2
	// });
	// const [padPositionY, setPadPositionY] = React.useState({
	// 	left : (boardHeight - padHeight)/2,
	// 	right: (boardHeight - padHeight)/2
	// })

	const ballSpeedX = React.useRef(ballVXStart);
	const ballSpeedY = React.useRef(ballVYStart);
	const frameId 	 = React.useRef(0);

	const UpdatePosition = (ballSpeedX, ballSpeedY) => {
		const ball = {
			X: position.ball.X + ballSpeedX.current,
			Y: position.ball.Y + ballSpeedY.current
		}
		setPosition( previousPosition => {
			return { ...previousPosition, ball}
		});
	}
	// const UpdateBall = (ballSpeedX, ballSpeedY) => {
	// 	const newBallPosition = {
	// 		X: ballPosition.X + ballSpeedX.current,
	// 		Y: ballPosition.Y + ballSpeedY.current
	// 	}
	// 	setBallPosition(newBallPosition);
	// }
	
	const animate = () => {
		if (BallHitHorizontalBorder(position.ball.Y))
			ballSpeedY.current *= -1;
		if (BallHitPad(position.ball.X, position.ball.Y, position.pad.left.Y, position.pad.right.Y))
			ballSpeedX.current *= -1;				
			UpdatePosition(ballSpeedX, ballSpeedY);
		// if (BallHitHorizontalBorder(position.ball.Y))
		// 	ballSpeedY.current *= -1;
		// if (BallHitPad(ballPosition.X, ballPosition.Y, padPositionY.left, padPositionY.right))
		// 	ballSpeedX.current *= -1;				
		// 	UpdatePosition(ballSpeedX, ballSpeedY);

		// frameId.current = requestAnimationFrame(animate);
	}

	React.useEffect(() => {
		if (paused)
			cancelAnimationFrame(frameId.current);
		else
			frameId.current = requestAnimationFrame(animate);		
		return () => cancelAnimationFrame(frameId);
	  }, [position, paused]);
	//   }, [ballPosition, paused]);

	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<Board	ballPositionX={position.ball.X}
					ballPositionY={position.ball.Y}
					padLeftPositionY={position.pad.left.Y}
					padRightPositionY={position.pad.right.Y}/>
			{/* <Board	ballPositionX={ballPosition.X}
					ballPositionY={ballPosition.Y}
					padLeftPositionY={padPositionY.left}
					padRightPositionY={padPositionY.right}/> */}
			<button id="gameButton"
				onClick={() => setPaused(!paused)}>
				{paused ? "Play" : "Pause"}
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
