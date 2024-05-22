const	playerLeftKeyUpper	= "w";
const	playerLeftKeyLower	= "s";
const	playerRightKeyUpper	= "ArrowUp";
const	playerRightKeyLower	= "ArrowDown";

let playerKeys = {};
function initKeys() {
	playerKeys["left"] = {
		upperKey: false,
		lowerKey: false
	};
	playerKeys["right"] = {
		upperKey: false,
		lowerKey: false
	};
}

initKeys();

function handleKeyDown(event) {
	if (event.key === playerLeftKeyUpper)
		playerKeys["left"]["upperKey"] = true;
	if (event.key === playerLeftKeyLower)
		playerKeys["left"]["lowerKey"] = true;
	if (event.key === playerRightKeyUpper)
		playerKeys["right"]["upperKey"] = true;
	if (event.key === playerRightKeyLower)
		playerKeys["right"]["lowerKey"] = true;
}

function handleKeyUp(event) {
	if (event.key === playerLeftKeyUpper)
		playerKeys["left"]["upperKey"] = false;
	if (event.key === playerLeftKeyLower)
		playerKeys["left"]["lowerKey"] = false;
	if (event.key === playerRightKeyUpper)
		playerKeys["right"]["upperKey"] = false;
	if (event.key === playerRightKeyLower)
		playerKeys["right"]["lowerKey"] = false;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

export { playerKeys }