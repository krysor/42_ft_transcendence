import React, { useState } from 'react';
import './App.css';
import { Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const onClickHandler = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
};

let GetParties = async (username) => {
	try {
		const response = await fetch('https://' + window.location.host.split(':')[0] + ':8000/score/get_parties/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		let responseHtml = [];
		for (let i = 0; i < data.scores.length; i++) {
			console.log(data.scores[i].date);
			if (data.scores[i].user.username === username ){
				responseHtml.push(
					<tr>
						<td>
							{ data.scores[i].date.substring(0, 10)} { data.scores[i].date.substring(11, 19)}
						</td>
						<td>
							{ data.scores[i].oponent }
						</td>
						<td>
							{ data.scores[i].winner === 1 ? "Win" : (data.scores[i].winner === 0 ? "Draw" : "Lose")}
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

const GetScore = async () => {
	// const { t } = useTranslation();
	try {
        const response = await fetch(`https://${window.location.host.split(':')[0]}:8000/score/get_top_score/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let responseHtml = [];
        for (let i = 0; i < data.scores.length; i++) {
            const parties = await GetParties(data.scores[i].user.username);
            data.scores[i].id = i + 1;
            const SClass = "";
            const name = "multiCollapse" + (i + 1);
            const colName = "collapse";

            responseHtml.push(
                <tr key={i} onClick={onClickHandler}>
                    <td className={SClass}>
                        { data.scores[i].id }
                    </td>
                    <td className={SClass}>
                        { data.scores[i].user.username }
                    </td>
                    <td className={SClass}>
                        { data.scores[i].score }
                    </td>
                </tr>
            );
            responseHtml.push(
                <tr className={colName} id={name} key={`collapse${i}`}>
                    <td colSpan="3">
                        <div>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Opponent</th>
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
                <td colSpan="3">
                    {/* <p>{t('Log in to see the leaderboard')}</p> */}
                </td>
            </tr>
        );
    }
}

async function LoadAllScore() {
    const scores = await GetScore();
    return scores;
}

let allScores = await LoadAllScore();

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay, p1, p2, onGameEnd }) {
    const winner = calculateWinner(squares, p1, p2);

    function handleClick(i) {
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

    const draw = calculateDraw(squares);
    const { t } = useTranslation();
    let status;
    let restartBtn = null;

    if (winner) {
		if (winner === p1.username) {
			sendScore(p1, 1);
			sendParty(p1, 1, p2);
			sendScore(p2, -1);
			sendParty(p2, -1, p1);
			restartGame();
			onGameEnd(p1, 1, p2, 0);
		}
		else if (winner === p2.username) {
			sendScore(p2, 1);
			sendParty(p2, 1, p1);
			sendScore(p1, -1);
			sendParty(p1, -1, p2);
			restartGame();
			onGameEnd(p1, 0, p2, 1);
		}
    } else if (draw) {
        status = t('Draw');
        restartBtn = <button className="restartButton" onClick={restartGame}>{t('Restart')}</button>;
    } else {
        status = `${t('Next player')}: ${xIsNext ? p1.username : p2.username}`;
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <div className='restart'>{restartBtn}</div>
        </>
    );
}

const sendScore = async (player, points) => {
    const data = { playerId: player.id, points: points };
    try {
        await fetch(`https://${window.location.host.split(':')[0]}:8000/score/update_score_by_id/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    const data = { winnerId: winner.id, points: points, oponent: oponent.id };
    try {
        await fetch(`https://${window.location.host.split(':')[0]}:8000/score/update_parties_by_id/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
    return allScores;
}

export default function MorpionVS({ p1, p2, onGameEnd }) {
    const { t } = useTranslation();
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(squares) {
        const nextHistory = history.slice(0, currentMove + 1).concat([squares]);
        setHistory(nextHistory);
        setCurrentMove(currentMove + 1);
    }

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} p1={p1} p2={p2} onGameEnd={onGameEnd} />
                </div>
            </div>
            <div>
                <Table striped>
                    <thead className="thead-dark">
                        <tr>
                            <th colSpan="3">{t('Morpion\'s Leaderboard')}</th>
                        </tr>
                        <tr>
                        
							<th>#</th>
							<th>{t('Player')}</th>
							<th>{t('Score')}</th>
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

function calculateWinner(squares, p1, p2) {
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
			return (squares[a] === 'X' ? p1.username : p2.username);
		}
	}
	return null;
}
