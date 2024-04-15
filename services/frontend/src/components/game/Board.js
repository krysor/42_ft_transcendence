import React from 'react';

const 	boardWidth		= 800;
const 	boardHeight		= 400;
const	borderHeight	= 10;
const	padHeight		= 100;
const	padWidth		= 10;
const 	ballDiameter	= 30;

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
	const borderUpper = borderHeight;
	const borderLower = boardHeight - borderHeight - ballDiameter;
	
	if (ballPosY <= borderUpper
		|| ballPosY >= borderLower)
		return (true);
	return (false);
}

const BallHitPad = (ballPosX, ballPosY, padLeftPosY, padRightPosY) => {
	
	if ((ballPosX <= padWidth && ballPosY + ballDiameter >= padLeftPosY && ballPosY <= padLeftPosY + padHeight)
		|| (ballPosX >= boardWidth - padWidth - ballDiameter && ballPosY + ballDiameter >= padRightPosY && ballPosY <= padRightPosY + padHeight))
		return (true);
	return (false);
}

const Board = (paused) => {
	const [ballPosX, setBallPosX] = React.useState((boardWidth - ballDiameter)/2);
	const [ballPosY, setBallPosY] = React.useState((boardHeight - ballDiameter)/2);
	const ballSpeedX = React.useRef(-5);
	const ballSpeedY = React.useRef(5);
	const frameId 	 = React.useRef(0);

	const padLeftPosY = (boardHeight - padHeight)/2;
	const padRightPosY = (boardHeight - padHeight)/2;

	const animate = () => {
		if (BallHitHorizontalBorder(ballPosY))
			ballSpeedY.current = ballSpeedY.current * -1;
		if (BallHitPad(ballPosX, ballPosY, padLeftPosY, padRightPosY))
			ballSpeedX.current = ballSpeedX.current * -1;		
		setBallPosX(ballPosX + ballSpeedX.current);
		setBallPosY(ballPosY + ballSpeedY.current);

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
