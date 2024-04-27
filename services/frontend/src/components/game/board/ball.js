const		ballDiameter = 30;

function	Ball(props) {
	const ballStyle = {
		'width' : ballDiameter,
		'height': ballDiameter,
		'left'	: props.positionX,
		'top'	: props.positionY
	};
	return (<div id='ball' class="boardElement" style={ballStyle}></div>)
}

export { ballDiameter, Ball }
