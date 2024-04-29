import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight, padWidth }				from './board/pad';
import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import animate from './threejs.js';

const	ballPosYMin		= borderHeight;
const 	ballPosYMax 	= boardHeight - borderHeight - ballDiameter;
const	ballPosXMin		= padWidth;
const	ballPosXMax		= boardWidth - padWidth - ballDiameter;

const	ballVXStart		= 0;
const	ballVYStart		= 5;

const BallHitHorizontalBorder = (ballPosY) => {
	if (ballPosY <= ballPosYMin
		|| ballPosY >= ballPosYMax)
		return (true);
	return (false);
}

const BallHitPad = (ballPosX, ballPosY, padLeftPosY, padRightPosY) => {
	if ((ballPosX <= ballPosXMin && ballPosY + ballDiameter >= padLeftPosY && ballPosY <= padLeftPosY + padHeight)
		|| (ballPosX >= ballPosXMax && ballPosY + ballDiameter >= padRightPosY && ballPosY <= padRightPosY + padHeight))
		return (true);
	return (false);
}


function Game() {
	const [paused, setPaused] = React.useState(true);

	const [ballPosition, setBallPosition] = React.useState({
		X: (boardWidth - ballDiameter)/2,
		Y: (boardHeight - ballDiameter)/2
	});

	const ballSpeedX = React.useRef(ballVXStart);
	const ballSpeedY = React.useRef(ballVYStart);

	const frameId 	 = React.useRef(0);

	const padLeftPosY = (boardHeight - padHeight)/2;
	const padRightPosY = (boardHeight - padHeight)/2;

	const UpdateBall = (ballSpeedX, ballSpeedY) => {
		const newBallPosition = {
			X: ballPosition.X + ballSpeedX.current,
			Y: ballPosition.Y + ballSpeedY.current
		}
		setBallPosition(newBallPosition);
	}
	

	const animate = () => {
		if (BallHitHorizontalBorder(ballPosition.Y))
			ballSpeedY.current *= -1;
		if (BallHitPad(ballPosition.X, ballPosition.Y, padLeftPosY, padRightPosY))
			ballSpeedX.current *= -1;				
		UpdateBall(ballSpeedX, ballSpeedY);
		// frameId.current = requestAnimationFrame(animate);
	}

	React.useEffect(() => {
		if (!paused)
			frameId.current = requestAnimationFrame(animate);
		else
			cancelAnimationFrame(frameId.current);
		return () => cancelAnimationFrame(frameId);
	  }, [ballPosition, paused]);

	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<Board	ballPositionX={ballPosition.X}
					ballPositionY={ballPosition.Y}
					padLeftPositionY={padLeftPosY}
					padRightPositionY={padRightPosY}/>
			<button id="gameButton"
				onClick={() => animate()}>
			</button>
		</div>
	);

	// return (
	// 	<div id="scene-box"></div>
	// );
}

export default Game;


// function Game() {
// 	const [paused, setPaused] = React.useState(true);

// 	const [ballPosition, setBallPosition] = React.useState({
// 		X: (boardWidth - ballDiameter)/2,
// 		Y: (boardHeight - ballDiameter)/2
// 	});

// 	const ballSpeedX = React.useRef(ballVXStart);
// 	const ballSpeedY = React.useRef(ballVYStart);
// 	const frameId 	 = React.useRef(0);

// 	const padLeftPosY = (boardHeight - padHeight)/2;
// 	const padRightPosY = (boardHeight - padHeight)/2;

// 	const getNewBallPos = (ballPos, ballSpeed, min, max) => {
// 		const newBallPos = ballPos + ballSpeed;
		
// 		if (newBallPos < min)
// 			return (min);
// 		if (newBallPos > max)
// 			return (max);
// 		return (newBallPos);
// 	}

// 	const UpdateBall = (ballSpeedX, ballSpeedY) => {
// 		const newBallPosition = {
// 			X: ballPosition.X + ballSpeedX.current,
// 			Y: ballPosition.Y + ballSpeedY.current
// 		}
// 		setBallPosition(newBallPosition);
// 	}
	

// 	const animate = () => {
// 		if (BallHitHorizontalBorder(ballPosition.Y))
// 			ballSpeedY.current = ballSpeedY.current * -1;
// 		if (BallHitPad(ballPosition.X, ballPosition.Y, padLeftPosY, padRightPosY))
// 			ballSpeedX.current = ballSpeedX.current * -1;		
// 		if (!paused)		
// 			UpdateBall(ballSpeedX, ballSpeedY);
// 		frameId.current = requestAnimationFrame(animate);
// 	}
// 	React.useEffect(() => {
// 		if (!paused)
// 			frameId.current = requestAnimationFrame(animate);
// 		else
// 			cancelAnimationFrame(frameId.current);
// 		return () => cancelAnimationFrame(frameId);
// 	  }, [paused, ballPosition]);

// 	return (
// 		<div className='container'>
// 			<h1>Ping pong game</h1>
// 			<Board	ballPositionX={ballPosition.X}
// 					ballPositionY={ballPosition.Y}
// 					padLeftPositionY={padLeftPosY}
// 					padRightPositionY={padRightPosY}/>
// 			<button id="gameButton"
// 				onClick={() => setPaused(!paused)}>
// 				{paused ? "Play" : "Pause"}
// 			</button>
// 		</div>
// 	);
// }
