const		ballDiameter = 30;

function	Ball(props) {
	return (<div id='ball'
				 style={{'width' : ballDiameter,
				 		 'height': ballDiameter,
						 'left'	 : props.positionX,
						 'top'	 : props.positionY}}>
			</div>)
}

export { ballDiameter, Ball }
