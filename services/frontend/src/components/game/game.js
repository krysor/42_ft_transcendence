import './game.css';
import React from 'react';

import { ballDiameter }						from './board/ball';
import { padHeight }						from './board/pad';
// import { borderHeight }						from './board/border';
import { boardWidth, boardHeight, Board }	from './board/board';

import { BallHitHorizontalBorder, BallHitPad }	from './logic/collision'
// import { updatePosition, updatePaused }			from './logic/update'

// import animate from './threejs.js';

const	ballSpeedStartX	= 5;
const	ballSpeedStartY	= 5;

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
	const ballSpeed = React.useRef({
		X: ballSpeedStartX,
		Y: ballSpeedStartY
	});

	const updatePosition = (ballSpeed) => {
		const ball = {
			X: state.ball.X + ballSpeed.current.X,
			Y: state.ball.Y + ballSpeed.current.Y
		}
		setState( previousState => {
			return { ...previousState, ball}
		});
	}
	
	const updatePaused = () => {
		const paused = !state.paused;
		setState( previousState => {
			return { ...previousState, paused}
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


	return (
		<div className='gameWindow'>
			<h1>Ping pong game</h1>
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