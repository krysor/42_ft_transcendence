import { boardWidth } from './board'

const		borderHeight = 10;

function	Border(props) {
	return (<div className="border"
				 style={{'width' : boardWidth,
						 'height': borderHeight,
						 'top'	 : props.positionY}}>
			</div>)
}

export { borderHeight, Border }
