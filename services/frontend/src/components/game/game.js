import React from "react";
import './game.css'

const radiusBall = 30;
const widthBoard = 800;
const heightBoard = 400;

// const Collision = (posPaddleY) => {

// 	if (posY)

// 	return true;
// }

//   This one supposedly more optimal as UseEffect is only being called once
const Ball = () => {
	const [posX, setPosX] = React.useState((widthBoard - radiusBall)/2);
	const [posY, setPosY] = React.useState((heightBoard - radiusBall)/2);
	const [vX, setVX] = React.useState(1);
	const [vY, setVY] = React.useState(1);
	
	React.useEffect(() => {
		let frameId
		const animate = time => {
			// if collision
			// 		adjust speed
			
			setPosX(prevPosX => prevPosX + vX);
			setPosY(prevPosX => prevPosX + vY);
			frameId = requestAnimationFrame(animate);
		}
		requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frameId);
	  }, []);

	return <div id='ball'
				style={{'top':Math.round(posY),
						'left':Math.round(posX),
						'height':radiusBall,
						'width':radiusBall}}></div>
}

function Game() {
	
	
	return (
		<div className='container'>
			<h1>Ping pong game</h1>
			<div className='board'
				 style={{'width':widthBoard,
				 		 'height':heightBoard}}>
				<div id="upper" className="border"
					 style={{'width':widthBoard}}></div>
				<div id="lower" className="border"
					 style={{'width':widthBoard}}></div>
				<div id="left" className="pad"></div>
				<div id="right" className="pad"></div>
				<Ball />
			</div>

			{/* <button onClick={paused ? play : pause}>
				{paused ? "Play" : "Pause"}
			</button> */}

			<button className="pause">Start</button>
			<button className="pause">Pause</button>
		</div>
	);
}

export default Game;
