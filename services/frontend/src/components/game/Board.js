import React from 'react';

const 	widthBoard		= 800;
const 	heightBoard		= 400;
// 50 before
const	heightPad		= 100;
const	widthPad		= 10;
const	heightBorder	= 10;
const 	radiusBall		= 30;

const Border = (posY) => {
	return (<div className="border"
				 style={{'width' 	: widthBoard,
						 'height'	: heightBorder,
						 'top'	 	: posY}}></div>)
}

const Pad = (posX, posY) => {
	return (<div className="pad"
				 style={{'width'	: widthPad,
						 'height'	: heightPad, 
				 		 'left'	  	: posX,		 
				 		 'top'	  	: posY}}></div>)
}

const Ball = (posX, posY) => {
	return (<div id='ball'
				 style={{'width'	: radiusBall,
				 		 'height'	: radiusBall,
						 'left'		: Math.round(posX),
						 'top'		: Math.round(posY)}}></div>)
}

const Board = (paused) => {
	const padY = (heightBoard - heightPad)/2;
	const [posX, setPosX] = React.useState((widthBoard - radiusBall)/2);
	const [posY, setPosY] = React.useState((heightBoard - radiusBall)/2);
	const vXBall = React.useRef(5);
	const vYBall = React.useRef(5);
	const frameId = React.useRef(0);
	
	const animate = time => {
		if (posY <= heightBorder || posY >= heightBoard - heightBorder - radiusBall)
			vYBall.current = vYBall.current * -1;
		setPosX(posX + vXBall.current);
		setPosY(posY + vYBall.current);
		frameId.current = requestAnimationFrame(animate);
	}


	React.useEffect(() => {
		if (!paused)
			frameId.current = requestAnimationFrame(animate);
		else
			cancelAnimationFrame(frameId.current);
		return () => cancelAnimationFrame(frameId);
	  }, [paused, posX, posY]);


	return (<div className='board' style={{'width':widthBoard,
										   'height':heightBoard}}>
				{Border(0)}
				{Border(heightBoard - heightBorder)}
				{Ball(posX, posY)}
				{Pad(0, padY)}
				{Pad(widthBoard - widthPad, padY)}
			</div>)
}

export default Board
