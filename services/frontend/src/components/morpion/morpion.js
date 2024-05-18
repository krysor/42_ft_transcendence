import React, { useState } from 'react';
import './App.css';
import '../user/getUserData';
import getUserData from '../user/getUserData';
import { Spinner } from 'react-bootstrap';


let user = await getUserData().then((user) => {
	if (user) {
		return user.username;
	}
	return "Guest";
});

let getScore = async () => {
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
		let responseHtml = [];
		for (let i = 0; i < data.scores.length; i++) {
			data.scores[i].id = i + 1;
			const SClass = data.scores[i].user.username === user ? "bg-warning" : "";
			responseHtml.push(
					<tr>
						<td class={SClass}>
							{ data.scores[i].id }
						</td>
						<td class={SClass}>
							{ data.scores[i].user.username }
						</td>
						<td class={SClass}>
							{ data.scores[i].score }
						</td>
					</tr>);
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
async function loadAllScore() {
	return (
		await getScore().then((data) => {
			if (data) {
				return data;
			}
			return "Error: No data found.";
		}));
	}

let allScores = await loadAllScore();

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
		allScores = await loadAllScore();
		onPlay(Array(9).fill(null));
	}
	
	async function botPlayer() {
		allScores = await loadAllScore();
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
		restartBtn = <button className="restartButton" onClick={restartGame}>Restart</button>;
	} else if (draw) {
		status = 'Draw';
		sendScore(user, 0);
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
		allScores = await loadAllScore();

	} catch (error) {
		console.error('Error:', error);
		return null;
	}
}



function LoadScore() {
	return (allScores);
}

export default function Morpion() {
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
				<table class="table table-striped">
					<thead class="thead-dark">
						<tr>
							<th colspan="3">Morpion's Leaderboard</th>
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
				</table>
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

