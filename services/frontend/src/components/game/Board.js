import React from 'react';

const 	boardWidth		= 800;
const 	boardHeight		= 400;
const	borderHeight	= 10;
const	padHeight		= 100;
const	padWidth		= 10;
const 	ballDiameter	= 30;

const	ballPosYMin		= borderHeight;
const 	ballPosYMax 	= boardHeight - borderHeight - ballDiameter;
const	ballPosXMin		= padWidth;
const	ballPosXMax		= boardWidth - padWidth - ballDiameter;

const	ballVXStart		= 0;
const	ballVYStart		= 5;

const Border = (posY) => {
	return (<div className="border"
				 style={{'width' 	: boardWidth,
						 'height'	: borderHeight,
						 'top'	 	: posY}}></div>)
}

const Pad = (posX, posY) => {
	return (<div className="pad"
				 style={{'width'	: padWidth,
						 'height'	: padHeight, 
				 		 'left'	  	: posX,		 
				 		 'top'	  	: posY}}></div>)
}

const Ball = (posX, posY) => {
	return (<div id='ball'
				 style={{'width'	: ballDiameter,
				 		 'height'	: ballDiameter,
						 'left'		: Math.round(posX),
						 'top'		: Math.round(posY)}}></div>)
}

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


const Board = (paused) => {
	const [ballPosX, setBallPosX] = React.useState((boardWidth - ballDiameter)/2);
	const [ballPosY, setBallPosY] = React.useState((boardHeight - ballDiameter)/2);
	const ballSpeedX = React.useRef(ballVXStart);
	const ballSpeedY = React.useRef(ballVYStart);
	const frameId 	 = React.useRef(0);


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
		
		// console.log("getNewBallPos: ");
		// console.log(getNewBallPos(ballPosY, ballSpeedY.current));

		// console.log("newBallPos: ", ballPosY + ballSpeedY.current);
		//console.log(getNewBallPos(ballPosY, ballSpeedY.current));

		// setBallPosY(getNewBallPos(ballPosY, ballSpeedY.current));
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
		if (!paused)
			frameId.current = requestAnimationFrame(animate);
		else
			cancelAnimationFrame(frameId.current);
		return () => cancelAnimationFrame(frameId);
	  }, [paused, ballPosX, ballPosY]);


	return (<div className='board' style={{'width':boardWidth,
										   'height':boardHeight}}>
				{Border(0)}
				{Border(boardHeight - borderHeight)}
				{Ball(ballPosX, ballPosY)}
				{Pad(0, padLeftPosY)}
				{Pad(boardWidth - padWidth, padRightPosY)}
			</div>)
}

export default Board
