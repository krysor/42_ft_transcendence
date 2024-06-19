import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.module.js';
import { useTranslation } from 'react-i18next';

const ThreejsGame = ({ p1, p2, onGameEnd, mode, ballSpeed }) => {
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

	// State for displaying scores
	const [scoreP1, setScoreP1] = useState(0);
	const [scoreP2, setScoreP2] = useState(0);

	useEffect(() => {
		// Initialize Three.js scene, camera, and renderer
		const initScene = () => {
			scene.current = new THREE.Scene();

			camera.current = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
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



			//resize test
			window.addEventListener('resize', () => {			

				if (window.innerHeight <= 143)
				{
					camera.fov = 75 * (143 / window.innerHeight);
				}

				
				if ( window.innerHeight - 143 >= window.innerWidth ) {
					renderer.current.setSize(window.innerWidth, window.innerWidth);
				}
				else {
					renderer.current.setSize(window.innerHeight - 143, window.innerHeight - 143);
				}
				
				camera.current.updateProjectionMatrix ();
				// renderer.current.setSize(window.innerWidth, window.innerHeight - 143);
			})



		};

		// Handle key down events
		const handleKeyDown = (event) => {
			const key = event.key;
			playerKeys.current = {
				...playerKeys.current,
				player1: { ...playerKeys.current.player1, [key]: true },
				player2: { ...playerKeys.current.player2, [key]: true },
			};
		};

		// Handle key up events
		const handleKeyUp = (event) => {
			const key = event.key;
			playerKeys.current = {
				...playerKeys.current,
				player1: { ...playerKeys.current.player1, [key]: false },
				player2: { ...playerKeys.current.player2, [key]: false },
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

		const ballSpeedFactor = 50 + ballSpeed * 10; // Adjust as needed
		const animate = (currentTime) => {
			const paddleSpeed = 10; // Adjust as needed
			if (!scene.current || !camera.current || !renderer.current || !player1.current || !player2.current || !ball.current) return;

			// Calculate the time difference since the last frame
			currentTime = performance.now();
			const delta = (currentTime - lastTime) / 1000; // Convert to seconds
			lastTime = currentTime;

			// Define the movement speed

			if (playerKeys.current.player1.w) {
				if (player1.current.position.z > -5.6) player1.current.position.z -= paddleSpeed * delta;
			}

			if (playerKeys.current.player1.s) {
				if (player1.current.position.z < 5.6) player1.current.position.z += paddleSpeed * delta;
			}

			// ADDED THIS ONE TO TRY TO MAKE MOVING P2 POSSIBLE
			if (mode === '2players')
			{
				if (playerKeys.current.player2.ArrowUp) {
					if (player2.current.position.z > -5.6) player2.current.position.z -= paddleSpeed * delta;
				}
				if (playerKeys.current.player2.ArrowDown) {
					if (player2.current.position.z < 5.6) player2.current.position.z += paddleSpeed * delta;
				}
			}
			else
			{
				const threshold = 0.1; // Define a threshold value

				const diff = ball.current.position.z - player2.current.position.z;
				if (Math.abs(diff) > threshold) {
					player2.current.position.z += (diff > 0) ? ((ball.current.position.z >= 5.7) ? 0 : 0.05 * delta * ballSpeed * 20) : ((ball.current.position.z <= -5.7) ? 0 : -0.05 * delta * ballSpeed * 20);
				}
			}

			ball.current.position.x += ballVelocity.current.x * ballSpeedFactor * delta;
			ball.current.position.y += ballVelocity.current.y * ballSpeedFactor * delta;
			ball.current.position.z += ballVelocity.current.z * ballSpeedFactor * delta;

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
				resetPositions();
			} else if (ball.current.position.x > 12) {
				setScoreP1(prevScore => prevScore + 1);
				resetPositions();
			}

			if (scoreP1 >= 10 || scoreP2 >= 10) {
				onGameEnd(p1, scoreP1, p2, scoreP2);
			} else {
				renderer.current.render(scene.current, camera.current);
				requestAnimationFrame(animate);
			}
		};

		initScene();

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
			cancelAnimationFrame(animate);
		};
	}, []);

	if (scoreP1 > 9 || scoreP2 > 9) {
		console.log("======================Game Over======================");
	}
	console.log("Score P2: ", scoreP2);

	return (
		<div>
		{p1 && p2 && (
			<div>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{p1.username} Score: {scoreP1}</p>
					<p style={{ fontWeight: 'bold', fontSize: '18px' }}>{p2.username} Score: {scoreP2}</p>
				</div>
				<canvas ref={refContainer} />
			</div>
		)}
		{!p1 && !p2 && (
			<div>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{t('Player 1 Score')} : {scoreP1}</p>
					<p style={{ fontWeight: 'bold', fontSize: '18px' }}>{t('Player 2 Score')} : {scoreP2}</p>
				</div>
				<canvas ref={refContainer} />
			</div>
		)}
	</div>
	);
};

export default ThreejsGame;
