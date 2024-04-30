import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight }						from './board/pad';
// import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import { BallHitHorizontalBorder, BallHitPad }	from './logic/collision'
// import { updatePosition, updatePaused }			from './logic/update'

import { playerKeys } from './logic/keys'; 

// import animate from './threejs.js';

const	ballSpeedStartX	= 5;
const	ballSpeedStartY	= 5;
const	padSpeed		= 5;

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
		},
		points: {
			left :	0,
			right:	0
		}
	});
	const ballSpeed = React.useRef({
		X: ballSpeedStartX,
		Y: ballSpeedStartY
	});

	const updateBall = (ballSpeed) => {
		return {
			X: state.ball.X + ballSpeed.current.X,
			Y: state.ball.Y + ballSpeed.current.Y
		}
	}
	const updateSinglePad = (player, oldY) => {
		if (playerKeys[player]["upperKey"] && !playerKeys[player]["lowerKey"])
			return { Y: oldY - padSpeed }
		if (playerKeys[player]["lowerKey"] && !playerKeys[player]["upperKey"])
			return { Y: oldY + padSpeed }
		return { Y: oldY }
	}
	const updatePad = () => {
		const newLeft = updateSinglePad("left", state.pad.left.Y);
		const newRight = updateSinglePad("right", state.pad.right.Y);
		return {
			left: newLeft,
			right: newRight
		}
	}
	const updatePosition = (ballSpeed) => {
		const ball = updateBall(ballSpeed);
		const pad = updatePad();
		setState( previousState => {
			return { ...previousState, ball, pad}
		});
	}

	const animate = () => {
		if (BallHitHorizontalBorder(state.ball.Y))
			ballSpeed.current.Y *= -1;
		if (BallHitPad(state.ball.X, state.ball.Y, state.pad.left.Y, state.pad.right.Y))
			ballSpeed.current.X *= -1;				
		updatePosition(ballSpeed);
		// frameId.current = requestAnimationFrame(animate);
	}

	React.useEffect(() => {
		let frameID = 0;
		if (state.paused == false)
			frameID = requestAnimationFrame(animate);		
		return () => cancelAnimationFrame(frameID);
	}, [state]);

	const updatePaused = () => {
		const paused = !state.paused;
		setState( previousState => {
			return { ...previousState, paused}
		});
	}


	return (
		<div className='gameWindow'>
			<h1>Ping pong game</h1>
			<h3>{state.points.left}:{state.points.right}</h3>
			<Board	ballPositionX={state.ball.X}
					ballPositionY={state.ball.Y}
					padLeftPositionY={state.pad.left.Y}
					padRightPositionY={state.pad.right.Y}/>
			<button id="gameButton"
				onClick={() => updatePaused()}>
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

export default Game
// export { Game, state, setState }