const	ballDiameter = 30;

function Ball(props) {
	return (<div id='ball'
				 style={{'width'	: ballDiameter,
				 		 'height'	: ballDiameter,
						 'left'		: Math.round(props.posX),
						 'top'		: Math.round(props.posY)}}></div>)
}

export { ballDiameter, Ball }
