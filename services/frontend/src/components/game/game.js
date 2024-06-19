import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight, padWidth }						from './board/pad';
// import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import { BallHitHorizontalBorder, BallHitPad, BallLeftBoard }	from './logic/collision'
// import { updatePosition, updatePaused }			from './logic/update'

import { playerKeys } from './logic/keys'; 
import { useTranslation } from 'react-i18next';

const	ballSpeedStartX	= 5;
const	ballSpeedStartY	= 5;
const	padSpeed		= 5;

function Game() {
	const { t }	= useTranslation();
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
			return { Y: (oldY - padSpeed) > 0 ? oldY - padSpeed : 0}
		if (playerKeys[player]["lowerKey"] && !playerKeys[player]["upperKey"])
			return { Y: (oldY + padSpeed) < (boardHeight - padHeight) ? oldY + padSpeed : (boardHeight - padHeight)}
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
		if (ballPositionX < -ballDiameter)
			newScoreRight += 1
		if (ballPositionX > boardWidth)
			newScoreLeft += 1
		const score = {
			left: newScoreLeft,
			right: newScoreRight
		}
		if (newScoreLeft > 9 || newScoreRight > 9)
			{
				console.log("======================Game Over======================");
				setState( previousState => {
					return { ...previousState, score: { left: 0, right: 0}}
				});
				updatePaused();
				//send score to backend via api
			}
		else
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
			updateScore(state.ball.X);
			// reset ball position
			state.ball.X = 400;
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
			<h1>{t('Ping pong game')}</h1>
			<h3>{state.score.left}:{state.score.right}</h3>
			<Board	ballPositionX={state.ball.X}
					ballPositionY={state.ball.Y}
					padLeftPositionY={state.pad.left.Y}
					padRightPositionY={state.pad.right.Y}/>
			<button id="gameButton"
				onClick={() => updatePaused()}>
				{state.paused ? t('Play') : t('Pause')}
			</button>
		</div>
	);
}

export default Game
// export { Game, state, setState }

const sendScore = async (player, player_id, oponent, score, winner) => {
	const authtoken = localStorage.getItem('authtoken');
	const data = {
		player1_name: player['p1'],
		player2_name: player['p2'],
		player1_id: player_id['p1'],
		player2_id: player_id['p2'],
		player1_score: score['left'],
		player2_score: score['right'],
		winner_id: winner['id'],
		winner_name: winner['name'],
	};
	try {
		const response = await fetch('https://localhost:3001/api/score', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authtoken}`
			},
			body: JSON.stringify({ score }),
		});
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}
