import { Ball } from './ball';
import { Border, borderHeight } from './border';
import { Pad, padWidth } from './pad';

const 		boardWidth	= 800;
const 		boardHeight	= 400;

function	Board(props) {
	return (<div className='board' style={{'width' :boardWidth,
										   'height':boardHeight}}>
				<Border positionY={0}/>
				<Border positionY={boardHeight - borderHeight}/>
				<Ball	positionX={props.ballPositionX} 
						positionY={props.ballPositionY}/>
				<Pad	positionX={0}
						positionY={props.padLeftPositionY}/>
				<Pad	positionX={boardWidth - padWidth}
						positionY={props.padRightPositionY}/>
			</div>)
}

export { Board, boardWidth, boardHeight }
