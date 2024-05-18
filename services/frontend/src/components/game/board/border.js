import { boardWidth } from './board'

const		borderHeight = 10;

function	Border(props) {
	const borderStyle = {
		'width' : boardWidth,
		'height': borderHeight,
		'top'	: props.positionY
	};
	return (<div class="boardElement" style={borderStyle}></div>)
}

export { borderHeight, Border }
