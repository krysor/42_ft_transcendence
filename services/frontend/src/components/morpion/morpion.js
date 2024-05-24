import React, { useState } from 'react';
import './App.css';
import '../user/getUserData';


import getUserData from '../user/getUserData';
import { Spinner, Table, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


let user = await getUserData().then((user) => {
	if (user) {
		return user.username;
	}
	return "Guest";
});

let onClickHandler = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
};

let GetParties = async (user) => {
	try {
		const authtoken = sessionStorage.getItem('authtoken');
		const response = await fetch('http://' + window.location.host.split(':')[0] + ':8000/user/get_parties/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			}
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		let responseHtml = [];
		const option = { day: 'numeric', month: 'long', year: 'numeric' };
		for (let i = 0; i < data.scores.length; i++) {
			console.log(data.scores[i].date);
			if (data.scores[i].user.username === user) {
				responseHtml.push(
					<tr>
						<td>
							{ data.scores[i].date.substring(0, 10)} { data.scores[i].date.substring(11, 19)}
						</td>
						<td>
							{ data.scores[i].oponent }
						</td>
						<td>
							{ data.scores[i].winner == 1 ? "Win" : (data.scores[i].winner == 0 ? "Draw" : "Lose")}
						</td>
					</tr>
				);
			}
		}
		return responseHtml;
	} catch (error) {
		console.error('Error:', error);
		return (
			<tr>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
			</tr>
		);
	}
}


let GetScore = async () => {
	try {
		const authtoken = sessionStorage.getItem('authtoken');
		const response = await fetch('http://' + window.location.host.split(':')[0] + ':8000/user/get_top_score/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			}
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		let parties;
		
		let responseHtml = [];
		for (let i = 0; i < data.scores.length; i++) {
			parties = await GetParties(data.scores[i].user.username);
			data.scores[i].id = i + 1;
			const SClass = data.scores[i].user.username === user ? "bg-warning" : "";
			const name = "multiCollapse" + (i + 1);
			const colName = "collapse ";

			responseHtml.push(
				<tr onClick={onClickHandler}>
					<td class={SClass}>
						{ data.scores[i].id }
					</td>
					<td class={SClass}>
						{ data.scores[i].user.username }
					</td>
					<td class={SClass}>
						{ data.scores[i].score }
					</td>
				</tr>
				);
			responseHtml.push(
				<tr class={colName} id={name}>
					<td colSpan="4">
						<div>
							<Table striped>
								<thead>
									<tr class="info">
										<th>Date</th>
										<th>Opennent</th>
										<th>Score</th>
									</tr>
								</thead>
								<tbody>
									{parties}
								</tbody>
							</Table>
						</div>
					</td>
				</tr>
				);
		}
		return responseHtml;
	} catch (error) {
		return (
			<tr>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
				<td>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</td>
			</tr>
		);
	}
}
async function LoadAllScore() {
	return (
		await GetScore().then((data) => {
			if (data) {
				return data;
			}
			return "Error: No data found.";
		}));
	}

let allScores = await LoadAllScore();

function Square({ value, onSquareClick }){
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	let winner = calculateWinner(squares);
	function HandleClick(i) {
		winner = calculateWinner(squares);
		if (winner || squares[i]) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = 'X';
		} else {
			nextSquares[i] = 'O';
		}
		onPlay(nextSquares);
	}

	async function restartGame() {
		allScores = await LoadAllScore();
		onPlay(Array(9).fill(null));
	}
	
	async function botPlayer() {
		allScores = await LoadAllScore();
		let i = Math.floor(Math.random() * 9);
		while (squares[i] !== null) {
			i = Math.floor(Math.random() * 9);
		}
		HandleClick(i);
	}

	const draw = calculateDraw(squares);
	let status;
	let restartBtn = null;
	winner = calculateWinner(squares);
	if (winner) {
		status = 'Winner: ' + winner;
		sendScore(user, winner === user ? 1 : -1);
		sendParty(user, winner === user ? 1 : -1, "Bot");
		restartBtn = <button className="restartButton" onClick={restartGame}>Restart</button>;
	} else if (draw) {
		status = 'Draw';
		sendScore(user, 0);
		sendParty(user, 0, "Bot");
		restartBtn = <button className="restartButton" onClick={restartGame}>Restart</button>;
	} else {
		status = 'Next player: ' + (xIsNext ? user : "Bot");
	}
	if (!xIsNext && !winner && !draw) {
		setTimeout(() => {
			botPlayer();
		}, 1000);
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => HandleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => HandleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => HandleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => HandleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => HandleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => HandleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => HandleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => HandleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => HandleClick(8)} />
			</div>
			<div className='restart'>{restartBtn}</div>
		</>
	);
}

const sendScore = async (winner, points) => {
	const authtoken = sessionStorage.getItem('authtoken');
	const data = { winner: winner, points: points};
	try {

		const response = await fetch('http://' + window.location.host.split(':')[0] + ':8000/user/update_score/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			},
			body: JSON.stringify(data)
		});
		allScores = await LoadAllScore();

	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}

const sendParty = async (winner, points, oponent) => {
	const authtoken = sessionStorage.getItem('authtoken');
	const data = { winner: winner, points: points, oponent: oponent};
	try {

		const response = await fetch('http://' + window.location.host.split(':')[0] + ':8000/user/update_parties/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${authtoken}`
			},
			body: JSON.stringify(data)
		});
		allScores = await LoadAllScore();

	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}



function LoadScore() {
	return (allScores);
}

export default function Morpion({ p1, p2, onGameEnd }) {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(squares) {
		const nextHistory = history.slice(0, currentMove + 1).concat([squares]);
		setHistory(history.slice(0, currentMove + 1).concat([squares]));
		setCurrentMove(currentMove + 1);
	}

	return (
		<div>
			<div className="game">
				<div className="game-board">
					<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
				</div>
			</div>
			<div>
				<Table striped>
					<thead class="thead-dark">
						<tr>
							<th colSpan="3">Morpion's Leaderboard</th>
						</tr>
						<tr>
							<th>#</th>
							<th>Player</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						<LoadScore />
					</tbody>
				</Table>
			</div>
		</div>
	);
}

function calculateDraw(squares) {
	for (let i = 0; i < squares.length; i++) {
		if (squares[i] === null) {
			return false;
		}
	}
	return true;
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return (squares[a] == 'X' ? user : "Bot");
		}
	}
	return null;
}

