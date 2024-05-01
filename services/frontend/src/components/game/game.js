import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight, padWidth }						from './board/pad';
// import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import { BallHitHorizontalBorder, BallHitPad, BallLeftBoard }	from './logic/collision'
// import { updatePosition, updatePaused }			from './logic/update'

import { playerKeys } from './logic/keys'; 

const	ballSpeedStartX	= 5;
const	ballSpeedStartY	= 5;
const	padSpeed		= 5;

function Game() {
	const [state, setState] = React.useState({
		paused: true,
		ball: {
			X: Math.random() > 0.5 ? padWidth : boardWidth - ballDiameter - padWidth,
			Y: (boardHeight - ballDiameter)/2
		},
		pad: {
			left : { Y: (boardHeight - padHeight)/2 },
			right: { Y: (boardHeight - padHeight)/2 }
		},
		score: {
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
			return { ...previousState, ball, pad }
		});
	}

	//score is not updating for some reason
	const updateScore = (ballPositionX) => {
		var newScoreLeft = state.score.left;
		var	newScoreRight = state.score.right;
		alert("before");
		alert(newScoreLeft);
		alert(newScoreRight);
		if (ballPositionX < -ballDiameter)
			newScoreRight += 1
		if (ballPositionX > boardWidth)
			newScoreLeft += 1
		alert("after");
		alert(newScoreLeft);
		alert(newScoreRight);
		const score = {
			left: newScoreLeft,
			right: newScoreRight
		}
		setState( previousState => {
			return { ...previousState, score}});
	}

	const animate = () => {
		if (BallHitHorizontalBorder(state.ball.Y))
			ballSpeed.current.Y *= -1;
		if (BallHitPad(state.ball.X, state.ball.Y, state.pad.left.Y, state.pad.right.Y))
			ballSpeed.current.X *= -1;
		if (BallLeftBoard(state.ball.X)) {
			// do something
			updateScore();
		}
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
			return { ...previousState, paused }
		});
	}

	return (
		<div className='gameWindow'>
			<h1>Ping pong game</h1>
			<h3>{state.score.left}:{state.score.right}</h3>
			<Board	ballPositionX={state.ball.X}
					ballPositionY={state.ball.Y}
					padLeftPositionY={state.pad.left.Y}
					padRightPositionY={state.pad.right.Y}/>
			<button id="gameButton"
				onClick={() => updatePaused()}>
				{state.paused ? "Play" : "Pause"}
			</button>
		</div>
	);
}

export default Game
// export { Game, state, setState }