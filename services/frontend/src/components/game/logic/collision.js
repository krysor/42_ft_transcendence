import { ballDiameter }						from '../board/ball';
import { boardWidth, boardHeight, Board }	from '../board/board';
import { borderHeight }						from '../board/border';
import { padHeight, padWidth }				from '../board/pad';

const	ballPosYMin		= borderHeight;
const 	ballPosYMax 	= boardHeight - borderHeight - ballDiameter;
const	ballPosXMin		= padWidth;
const	ballPosXMax		= boardWidth - padWidth - ballDiameter;

const BallHitHorizontalBorder = (ballPosY) => {
	if (ballPosY <= ballPosYMin
		|| ballPosY >= ballPosYMax)
		return (true);
	return (false);
}

const BallHitPad = (ballPosX, ballPosY, padLeftPosY, padRightPosY) => {
	if ((ballPosX <= ballPosXMin && ballPosY + ballDiameter >= padLeftPosY && ballPosY <= padLeftPosY + padHeight)
		|| (ballPosX >= ballPosXMax && ballPosY + ballDiameter >= padRightPosY && ballPosY <= padRightPosY + padHeight))
		return (true);
	return (false);
}

export { BallHitHorizontalBorder, BallHitPad }