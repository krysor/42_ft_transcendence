import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.js';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import getUserData from '../user/getUserData';
const backendHost = 'http://' + window.location.hostname + ':8000';
const ThreejsGameAI = ({ p1, p2 }) => {
	const { t }	= useTranslation();
	const scene = useRef(null);
	const camera = useRef(null);
	const renderer = useRef(null);
	const player1 = useRef(null);
	const player2 = useRef(null);
	const ball = useRef(null);
	const playerKeys = useRef({});
	const paddleDepth = useRef(0.5);
	const ballVelocity = useRef({ x: 0.1, y: 0, z: 0 });
	const refContainer = useRef();
	const frameID = useRef();//POSSIBLY UNNECESSARY
	
	const [end, setEnd] = useState(false);
	// State for displaying scores
	const [scoreP1, setScoreP1] = useState(0);
	const [scoreP2, setScoreP2] = useState(0);

	// State for keeping the scores up to date inside the animate function: 
	// 		useState variables don't change in the animate function
	//		because the animation loop doesn't rerender.
	const scoreP1Ref = useRef(0);
	const scoreP2Ref = useRef(0);

	const getUser = () => {
		const authtoken = sessionStorage.getItem('authtoken');
		fetch(backendHost + '/user/user_detail/', {
			method: 'GET',
			headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authtoken}`
            },
		})
		.then(response => { return response.json(); })
		.then(data => {
			console.log(data);
			if (data.Token) {
				sessionStorage.setItem('authtoken', data.Token);
				sessionStorage.setItem('user', JSON.stringify(data.user));
				return data.user;
			}
			else if (data.error) {
				throw data.error;
			}
		})
		.catch(error => { console.error('There was a problem with the fetch operation:', error); });
	}

	const fetchMatchResult = (player1, p1Result, botResult) => {
		const today = new Date();
		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;
		const is_pong = true;

		const jsonData = {
		  p1ID: player1.id,
		  p1Result: p1Result,
		  p2ID: "0",
		  p2Result: botResult,
		  date: formattedDate,
		  is_pong: is_pong,
		};
	
		fetch(backendHost + '/tournament/add_match_to_historic/', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(jsonData)
		})
		  .then(response => {
			if (!response.ok) {
			  throw response.error;
			}
		  })
		  .catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		  });
	  }

	useEffect(() => {
		// Initialize Three.js scene, camera, and renderer
		const initScene = () => {
			scene.current = new THREE.Scene();

			camera.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			camera.current.position.x = 0;
			camera.current.position.y = 12;
			camera.current.position.z = 5;
			camera.current.lookAt(0, 0, 0);

			renderer.current = new THREE.WebGLRenderer({ antialias: true, canvas: refContainer.current });
			renderer.current.setSize(window.innerWidth, window.innerHeight - 143);

			let skyboxMaterial = [];
			// load static image/img...
			let texture_ft = new THREE.TextureLoader().load('skybox/mystic_ft.jpg');
			let texture_bk = new THREE.TextureLoader().load('skybox/mystic_bk.jpg');
			let texture_up = new THREE.TextureLoader().load('skybox/mystic_up.jpg');
			let texture_dn = new THREE.TextureLoader().load('skybox/mystic_dn.jpg');
			let texture_rt = new THREE.TextureLoader().load('skybox/mystic_rt.jpg');
			let texture_lf = new THREE.TextureLoader().load('skybox/mystic_lf.jpg');

			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_up }));
			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
			skyboxMaterial.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

			for (let i = 0; i < 6; i++)
				skyboxMaterial[i].side = THREE.BackSide;

			let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
			let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);
			scene.current.add(skybox);

			// creation of the plane for floor
			const planeGeometry = new THREE.PlaneGeometry(22, 15);

			const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x5f5f5f });
			const plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.position.y = -0.3;
			plane.rotation.x = -Math.PI / 2;
			scene.current.add(plane);

			// ---------------------------------------------------------------------------------- //

			// Light
			const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
			ambientLight.position.set(0, 10, 0);
			// ambientLight.castShadow = true;
			scene.current.add(ambientLight);

			loadShapes();
			initKeys();
			animate();
		};

		// Load shapes and add to the scene
		const loadShapes = () => {

			// Load players
			player1.current = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 3), new THREE.MeshPhongMaterial({ color: 0x5f005f, side: THREE.DoubleSide }));
			player1.current.position.set(-10.8, 0, 0);
			scene.current.add(player1.current);

			player2.current = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 3), new THREE.MeshPhongMaterial({ color: 0x5f005f, side: THREE.DoubleSide }));
			player2.current.position.set(10.8, 0, 0);
			scene.current.add(player2.current);

			let bordeurUp = new THREE.Mesh(
				new THREE.BoxGeometry(22, 0.5, 0.1),
				new THREE.MeshPhongMaterial({
					color: 0x9f9f9f,
					side: THREE.DoubleSide
				})
			);
			bordeurUp.name = "borderUp";
			bordeurUp.position.x = 0;
			bordeurUp.position.y = 0;
			bordeurUp.position.z = 7.4;
			scene.current.add(bordeurUp);

			let borderDown = new THREE.Mesh(
				new THREE.BoxGeometry(22, 0.5, 0.1),
				new THREE.MeshPhongMaterial({
					color: 0x9f9f9f,
					side: THREE.DoubleSide
				})
			);
			borderDown.name = "borderDown";
			borderDown.position.x = 0;
			borderDown.position.y = 0;
			borderDown.position.z = -7.4;
			scene.current.add(borderDown);

			// Load ball
			ball.current = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshPhongMaterial({ color: 0x9f9f00, side: THREE.DoubleSide }));
			ball.current.name = "ball";
			ball.current.position.x = 0; //ballpos
			ball.current.position.y = 0;
			ball.current.position.z = 0; //ballpos
			scene.current.add(ball.current);
		};

		// Initialize key state
		const initKeys = () => {
			playerKeys.current = {
				player1: { w: false, s: false },

				// MODIFIED THIS ONE TO TRY TO MAKE MOVING P2 POSSIBLE
				// player2: { ArrowUp: false, ArrowDown: false },
				player2: { ArrowUp: false, ArrowDown: false },
			};

			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('keyup', handleKeyUp);
		};

		// Handle key down events
		const handleKeyDown = (event) => {
			const key = event.key;
			playerKeys.current = {
				...playerKeys.current,
				player1: { ...playerKeys.current.player1, [key]: true },
				// player2: { ...playerKeys.current.player2, [key]: true },
			};
		};

		// Handle key up events
		const handleKeyUp = (event) => {
			const key = event.key;
			playerKeys.current = {
				...playerKeys.current,
				player1: { ...playerKeys.current.player1, [key]: false },
				// player2: { ...playerKeys.current.player2, [key]: false },
			};
		};

		function resetPositions() {
			player1.current.position.z = 0;
			player2.current.position.z = 0;
			ball.current.position.x = 0;
			ball.current.position.y = 0;
			ball.current.position.z = 0;
			ballVelocity.current = { x: 0.1, y: 0, z: 0 };
		}

		let lastTime = performance.now();

		const animate = (currentTime) => {
			if (!scene.current || !camera.current || !renderer.current || !player1.current || !player2.current || !ball.current) return;

			// Calculate the time difference since the last frame
			currentTime = performance.now();
			const delta = (currentTime - lastTime) / 1000; // Convert to seconds
			lastTime = currentTime;

			// Define the movement speed
			const paddleSpeed = 10; // Adjust as needed
			const ballSpeedFactor = 80; // Adjust as needed

			if (playerKeys.current.player1.w) {
				if (player1.current.position.z > -5.6) player1.current.position.z -= paddleSpeed * delta;
			}

			if (playerKeys.current.player1.s) {
				if (player1.current.position.z < 5.6) player1.current.position.z += paddleSpeed * delta;
			}

			// // ADDED THIS ONE TO TRY TO MAKE MOVING P2 POSSIBLE
			// if (player2 && playerKeys.current.player2.ArrowUp) {
			// 	if (player2.current.position.z > -5.6) player2.current.position.z -= paddleSpeed * delta;
			// }
			// if (player2 && playerKeys.current.player2.ArrowDown) {
			// 	if (player2.current.position.z < 5.6) player2.current.position.z += paddleSpeed * delta;
			// }

			ball.current.position.x += ballVelocity.current.x * ballSpeedFactor * delta;
			ball.current.position.y += ballVelocity.current.y * ballSpeedFactor * delta;
			ball.current.position.z += ballVelocity.current.z * ballSpeedFactor * delta;



			// THIS THE PRIMITIVE AI

			// player2.current.position.z += (ball.current.position.z > player2.current.position.z) ? ((ball.current.position.z >= 5.7) ? 0 : 0.05) : ((ball.current.position.z <= -5.7) ? 0 : -0.05);
			const threshold = 0.1; // Define a threshold value

			const diff = ball.current.position.z - player2.current.position.z;

			if (Math.abs(diff) > threshold) {
				player2.current.position.z += (diff > 0) ? ((ball.current.position.z >= 5.7) ? 0 : 0.05) : ((ball.current.position.z <= -5.7) ? 0 : -0.05);
			}


			// Check for collision with the game area's top and bottom boundaries
			if (ball.current.position.z > 7.1 || ball.current.position.z < -7.1) {
				ballVelocity.current.z *= -1; // Reverse the ball's Z-velocity
			}

			// Check for collision with player paddles
			const deviation = 0.1; // Adjust as needed
			if (
				ball.current.position.x < player1.current.position.x + paddleDepth.current &&
				ball.current.position.x > player1.current.position.x - paddleDepth.current
			) {
				if (
					ball.current.position.z < player1.current.position.z + 1.5 &&
					ball.current.position.z > player1.current.position.z - 1.5
				) {
					ballVelocity.current.x *= -1; // Reverse the ball's X-velocity
					let hitPosZ = ball.current.position.z - player1.current.position.z; // Collision point
					ballVelocity.current.z = hitPosZ * deviation; // This factor controls the influence of hit position on velocity
				}
			}

			if (
				ball.current.position.x < player2.current.position.x + paddleDepth.current &&
				ball.current.position.x > player2.current.position.x - paddleDepth.current &&
				ballVelocity.current.x > 0
			) {
				if (
					ball.current.position.z < player2.current.position.z + 1.5 &&
					ball.current.position.z > player2.current.position.z - 1.5
				) {
					ballVelocity.current.x *= -1; // Reverse the ball's X-velocity
					let hitPosZ = ball.current.position.z - player2.current.position.z; // Collision point
					ballVelocity.current.z = hitPosZ * deviation; // This factor controls the influence of hit position on velocity
				}
			}

			// DETECTION OF MISSED BALL
			if (ball.current.position.x < -12) {
				setScoreP2(prevScore => prevScore + 1);
				scoreP2Ref.current = scoreP2Ref.current + 1;
				resetPositions();
			} else if (ball.current.position.x > 12) {
				setScoreP1(prevScore => prevScore + 1);
				scoreP1Ref.current = scoreP1Ref.current + 1;
				resetPositions();
			}

			let higherScore = Math.max(scoreP1Ref.current, scoreP2Ref.current);			
			if ( (higherScore === 19 || (higherScore === 11
								&& Math.abs(scoreP2Ref.current - scoreP1Ref.current) >= 2))) {
				setEnd(true);
				getUser();
				const user = JSON.parse(sessionStorage.getItem('user'));
				if (user) {
					fetchMatchResult(user, scoreP1Ref.current, scoreP2Ref.current);
				}
			} else {
				renderer.current.render(scene.current, camera.current);
				frameID.current = requestAnimationFrame(animate);
			}
		};

		// frameID.current = requestAnimationFrame(animate);

		initScene();

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
			cancelAnimationFrame(frameID);
		};
	}, []);

	// if (scoreP1 > 9 || scoreP2 > 9) {
	// 	console.log("======================Game Over======================");
	// }
	// console.log("Score P2: ", scoreP2);

	return (
		<div>
		{p1 && p2 && !end && (
			<div>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{p1.username} Score: {scoreP1}</p>
					<p style={{ fontWeight: 'bold', fontSize: '18px' }}>{p2.username} Score: {scoreP2}</p>
				</div>
				<canvas ref={refContainer} />
			</div>
		)}

		{!p1 && !p2 && !end && (
			<div>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{t('Player 1 Score')} : {scoreP1}</p>
					<p style={{ fontWeight: 'bold', fontSize: '18px' }}>{t('Player 2 Score')} : {scoreP2}</p>
				</div>
				<canvas ref={refContainer} />
			</div>
		)}

		{end && scoreP1 > scoreP2 && (
			<>
			<h3>{t('Congratulations')} !!! {t('You won against the bot')} :)</h3>
			<img src='/win_image.jpg' alt="Winner"/>
          	<br />
			<NavLink to="/tournament" className="btn btn-secondary mt-4">{t('Play again')}</NavLink>
			</>
		)}

		{end && scoreP1 < scoreP2 && (
			<>
			<h3>{t('Ho you have lost... You suck at this game')} :c</h3>
          	<br />
			<NavLink to="/tournament" className="btn btn-secondary mt-4">{t('Play again')}</NavLink>
			</>
		)}
		</div>
	);
};

export default ThreejsGameAI;
