import React from 'react';

import { ballDiameter, Ball }		from './ball'
import { padHeight, padWidth, Pad }	from './pad'
import { borderHeight, Border }		from './border'

const 	boardWidth		= 800;
const 	boardHeight		= 400;

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

//this one to score the points / displace the ball from side back to the game
// const BallHitPad = (ballPosX, ballPosY, padLeftPosY, padRightPosY) => {
// 	if ((ballPosX <= padLeft && ballPosY + ballDiameter >= padLeftPosY && ballPosY <= padLeftPosY + padHeight)
// 		|| (ballPosX >= padRight && ballPosY + ballDiameter >= padRightPosY && ballPosY <= padRightPosY + padHeight))
// 		return (true);
// 	return (false);
// }


function Board(props) {
	const [ballPosX, setBallPosX] = React.useState((boardWidth - ballDiameter)/2);
	const [ballPosY, setBallPosY] = React.useState((boardHeight - ballDiameter)/2);
	const ballSpeedX = React.useRef(ballVXStart);
	const ballSpeedY = React.useRef(ballVYStart);
	const frameId 	 = React.useRef(0);

	// class ballSpeed {
	// 	constructor() {
	// 		this.X = React.useRef(ballVXStart);
	// 		this.Y = React.useRef(ballVYStart);
	// 	}
	// }

	const padLeftPosY = (boardHeight - padHeight)/2;
	const padRightPosY = (boardHeight - padHeight)/2;

	const getNewBallPos = (ballPos, ballSpeed, min, max) => {
		const newBallPos = ballPos + ballSpeed;
		
		if (newBallPos < min)
			return (min);
		if (newBallPos > max)
			return (max);
		return (newBallPos);
	}

	const UpdateBall = (ballPosX, ballPosY, ballSpeedX, ballSpeedY) => {
		setBallPosX(ballPosX + ballSpeedX.current);
		setBallPosY(ballPosY + ballSpeedY.current);
	}
	

	const animate = () => {
		if (BallHitHorizontalBorder(ballPosY))
			ballSpeedY.current = ballSpeedY.current * -1;
		if (BallHitPad(ballPosX, ballPosY, padLeftPosY, padRightPosY))
			ballSpeedX.current = ballSpeedX.current * -1;		
		UpdateBall(ballPosX, ballPosY, ballSpeedX, ballSpeedY);
		frameId.current = requestAnimationFrame(animate);
	}
	React.useEffect(() => {
		if (!props.paused)
			frameId.current = requestAnimationFrame(animate);
		else
			cancelAnimationFrame(frameId.current);
		return () => cancelAnimationFrame(frameId);
	  }, [props.paused, ballPosX, ballPosY]);


	return (<div className='board' style={{'width':boardWidth,
										   'height':boardHeight}}>
				<Border posY={0}/>
				<Border posY={boardHeight - borderHeight}/>
				<Ball	posX={ballPosX} posY={ballPosY}/>
				<Pad	posX={0} posY={padLeftPosY}/>
				<Pad	posX={boardWidth - padWidth} posY={padRightPosY}/>
			</div>)
}

export { Board, boardWidth }
