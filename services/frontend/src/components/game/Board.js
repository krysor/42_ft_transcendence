import React from "react";

const 	widthBoard		= 800;
const 	heightBoard		= 400;
const	heightPad		= 50;
const	heightBorder	= 10;
const 	radiusBall		= 30;


const Board = () => {
	// const [paused, setPaused] = React.useState(false)
	const [xBall, setXBall] = React.useState((widthBoard - radiusBall)/2);
	const [yBall, setYBall] = React.useState((heightBoard - radiusBall)/2);
	const [vBallX, setVBallX] = React.useState(1);
	const [vBallY, setVBallY] = React.useState(1);
	const [yPadLeft, setYPadLeft] = React.useState((heightBoard - heightPad)/2);
	const [yPadRight, setYPadRight] = React.useState((heightBoard - heightPad)/2);
	
	React.useEffect(() => {
		let frameId
		const animate = time => {
			// if (paused === true)
			// 	return ;
			
			console.log("yBall:");
			console.log({yBall});

			if (yBall <= heightBorder || yBall >= heightBoard - heightBorder)
				setVBallY(prevVBallY => -prevVBallY);

			console.log("yBall before:");
			console.log({yBall});

			setXBall(prevXBall => prevXBall + vBallX);
			setYBall(prevYBall => prevYBall + vBallY);

			console.log("yBall after:");
			console.log({yBall});


			frameId = requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	  }, []);

	
	return (<div className='board'
				 style={{'width':widthBoard, 'height':heightBoard}}>
				<div id="upper" className="border"
								style={{'width':widthBoard,
										'height':heightBorder}}></div>
				<div id="lower" className="border"
								style={{'width':widthBoard,
								'height':heightBorder}}></div>
				<div id='ball'
					style={{'left':Math.round(xBall),
					'top':Math.round(yBall),
					'height':radiusBall,
					'width':radiusBall}}></div>
				<div id="left" className="pad"
							style={{'height':heightPad, 
									'top':yPadLeft}}></div>
				<div id="right" className="pad"
							style={{'height':heightPad, 
							'top':yPadRight}}></div>
			</div>)
}

export default Board