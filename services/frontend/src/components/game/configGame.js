
let listPseudo = []

function loadGame()
{
	const mainBalise = document.querySelector("main")
	const board =`
	<p>one day it will be possible to play pong here but it's not done yet :c</p>
	<canvas id="pongCanvas" width="800" height="400">
	</canvas>
		<button id="startGameBtn">Submit</button>
	`;
	console.log("test")
	mainBalise.innerHTML = board
}

function loadPseudoSelecetion(nbOfPlayers) {
	const mainBalise = document.querySelector("main")
	
	let board =`
	<div id="gameBoard">
		<form>
	`;

	for ( let i = 0 ; i < nbOfPlayers ; i++ )
	{
		console.log(i)
		let idPlayer = i + 1

		board +=	`<label for="pseudo">Player ${idPlayer} what is your pseudo ?</label>
				<input type="text" name="pseudo${i}" id="pseudo${i}">
				<br>
		`;

	}
	board += `
	</form>
		</div>
			<button id="startGameBtn">Confirm the pseudo</button>
	`;
	mainBalise.innerHTML = board

	let btn = document.getElementById("startGameBtn")
	btn.addEventListener("click", () => {
	for ( let i = 0 ; i < nbOfPlayers ; i++ )
	{
		let pseudo = document.getElementById("pseudo" + i);

		console.log("Here");
		if (pseudo.value === "")
			pseudo.value = "anon";
		listPseudo[i] = pseudo.value
		console.log(listPseudo[i])
	}
	console.log("test")
	loadGame()
});


}

function loadNbPlayers() {
	const mainBalise = document.querySelector("main")

	const board =`
	<div id="gameBoard">
		<form>
			<label for="nbOfPlayers">How many players will play in the tournament ?</label>
			<input type="number" name="nbOfPlayers" id="nbOfPlayers" min="1" max="16">
		</form>
	</div>
		<button id="startGameBtn">Submit</button>
	`;

	mainBalise.innerHTML = board

	let btn = document.getElementById("startGameBtn")
	btn.addEventListener("click", () => {
		let nbOfPlayers = document.getElementById("nbOfPlayers")
		if ( 1 <= nbOfPlayers.value && nbOfPlayers.value <= 16 )
			loadPseudoSelecetion(nbOfPlayers.value)
	});
}

function ConfigGame() {
	let mainBalise = document.querySelector("main")

	let board =`
		<button id="startGameBtn">START THE TOURNAMENT !</button>
	`;

	mainBalise.innerHTML = board

	let btn = document.getElementById("startGameBtn")
	btn.addEventListener("click", () => {
		loadNbPlayers()
	});
}

export default ConfigGame;