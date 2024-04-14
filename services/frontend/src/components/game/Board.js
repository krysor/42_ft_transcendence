import React from 'react';

const 	widthBoard		= 800;
const 	heightBoard		= 400;
const	heightPad		= 50;
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

//my idea, trigger rending on delta vBallX
const Board = () => {
	//this one incorrect
	const padY = (heightBoard - heightPad)/2;

	const [ball, setBall] = React.useState({
		posX : (widthBoard - radiusBall)/2,
		posY : (heightBoard - radiusBall)/2
	});
	const vXBall = React.useRef(1);
	const vYBall = React.useRef(1);

	React.useEffect(() => {
		let frameId
		const animate = time => {
			if (ball.posY <= heightBorder || ball.posY >= heightBoard - heightBorder)
				vYBall.current = vYBall.current * -1;	
			setBall(prevBall => ({posX: prevBall.posX + vXBall.current, posY: prevBall.posY + vYBall.current}));
			// setBall((prevaBll, vBallY) => {return { posX: prevBall.posX + vX, posY: prevBall.posY + vBallY});
			frameId = requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	  }, []);


	return (<div className='board' style={{'width':widthBoard,
										   'height':heightBoard}}>
				{Border(0)}
				{Border(heightBoard - heightBorder)}
				{Ball(ball.posX, ball.posY)}
				{Pad(0, padY)}
				{Pad(widthBoard - widthPad, padY)}
			</div>)
}

export default Board
