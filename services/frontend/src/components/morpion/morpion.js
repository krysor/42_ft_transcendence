import React, { useState } from 'react';
import './App.css';
import '../user/getUserData';
import getUserData from '../user/getUserData';

const user = await getUserData().then((user) => {
	if (user) {
		return user.username;
	}
	return user;
});

function Square({ value, onSquareClick }){
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay }) {
	function HandleClick(i) {
		if (calculateWinner(squares) || squares[i]) {
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

	function restartGame() {
		onPlay(Array(9).fill(null));
	}

	function botPlayer() {
		let i = Math.floor(Math.random() * 9);
		while (squares[i] !== null) {
			i = Math.floor(Math.random() * 9);
		}
		HandleClick(i);
	}

	const winner = calculateWinner(squares);
	const draw = calculateDraw(squares);
	let status;
	let restartBtn = null;
	if (winner) {
		status = 'Winner: ' + winner;
		sendScore(winner);
		restartBtn = <button className="restartButton" onClick={restartGame}>Restart</button>;
	} else if (draw) {
		status = 'Draw';
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
		<div className="game">
			<div className="game-board">
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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
			return squares[a] == 'X' ? user : "Bot";
		}
	}
	return null;
}

function sendScore(winner) {
	const authtoken = sessionStorage.getItem('authtoken');
	const data = { winner: winner };
	fetch('http://' + window.location.host.split(':')[0] + ':8000/user/update_score/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${authtoken}`
		},
		body: JSON.stringify(data)
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch((error) => {
			console.error('Error:', error);
		});
}