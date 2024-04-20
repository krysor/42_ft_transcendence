import { Border, borderHeight } from './border';
import { Ball } from './ball';
import { Pad, padWidth } from './pad';

const 	boardWidth		= 800;
const 	boardHeight		= 400;

function Board(props) {
	return (<div className='board' style={{'width':boardWidth,
										   'height':boardHeight}}>
				<Border posY={0}/>
				<Border posY={boardHeight - borderHeight}/>
				<Ball	posX={props.ballPosX} 
						posY={props.ballPosY}/>
				<Pad	posX={0}
						posY={props.padLeftPosY}/>
				<Pad	posX={boardWidth - padWidth}
						posY={props.padRightPosY}/>
			</div>)
}

export { Board, boardWidth, boardHeight }
