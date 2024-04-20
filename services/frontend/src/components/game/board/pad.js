const		padHeight = 100;
const		padWidth  = 10;

function	Pad(props) {
	return (<div className="pad"
				 style={{'width' : padWidth,
						 'height': padHeight, 
				 		 'left'	 : props.positionX,		 
				 		 'top'	 : props.positionY}}>
			</div>)
}

export { padHeight, padWidth, Pad }
