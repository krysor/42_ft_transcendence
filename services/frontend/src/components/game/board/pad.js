const		padHeight = 100;
const		padWidth  = 10;

function	Pad(props) {
	const padStyle = {
		'width' : padWidth,
		'height': padHeight, 
		'left'	 : props.positionX,		 
		'top'	 : props.positionY
	};
	return (<div class="boardElement" style={padStyle}></div>)
}

export { padHeight, padWidth, Pad }
