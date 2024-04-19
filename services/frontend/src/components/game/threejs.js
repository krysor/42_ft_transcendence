// import * as THREE from './threejs/src/Three.js';
import threeGltfLoader from 'https://cdn.skypack.dev/pin/three-gltf-loader@v1.111.0-nljU36r8PRJpg81IWD7g/mode=imports/optimized/three-gltf-loader.js';

// Mise en place three.js

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


let i = 0;

// camera.position.x = Math.cos(angle * Math.PI / 180) * radius;
// camera.position.z = Math.sin(angle * Math.PI / 180) * radius;
camera.position.y = 3;
// ---------------------------------------------------------------------------------- //

// Utilisation of webgl
const renderer = new THREE.WebGLRenderer({antialias: true});

// window size
renderer.setSize(window.innerWidth, window.innerHeight);

// ---------------------------------------------------------------------------------- //

// --------------- Load skybox ------------------------------------------------------ //

// let skyboxMaterial = [];
// // load static image/img...
// let texture_ft = new THREE.TextureLoader().load('/static/game/object/mystic_ft.jpg');
// let texture_bk = new THREE.TextureLoader().load('/static/game/object/mystic_bk.jpg');
// let texture_up = new THREE.TextureLoader().load('/static/game/object/mystic_up.jpg');
// let texture_dn = new THREE.TextureLoader().load('/static/game/object/mystic_dn.jpg');
// let texture_rt = new THREE.TextureLoader().load('/static/game/object/mystic_rt.jpg');
// let texture_lf = new THREE.TextureLoader().load('/static/game/object/mystic_lf.jpg');

// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_ft}));
// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_bk}));
// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_up}));
// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_dn}));
// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_rt}));
// skyboxMaterial.push(new THREE.MeshBasicMaterial({map: texture_lf}));

// for (let i = 0; i < 6; i++)
// skyboxMaterial[i].side = THREE.BackSide;

// let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
// let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);
// scene.add(skybox);

// ---------------------------------------------------------------------------------- //

const sceneBox = document.getElementById('scene-box');
sceneBox.appendChild(renderer.domElement);


// creation of the plane for floor
const planeGeometry = new THREE.PlaneGeometry(40, 40);

const planeMaterial = new THREE.MeshPhongMaterial({color: 0x5f5f5f});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -0.3;
scene.add(plane);

// ---------------------------------------------------------------------------------- //

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
ambientLight.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(ambientLight);

// ---------------------------------------------------------------------------------- //

camera.lookAt(new THREE.Vector3(0, 0, 0));

let offsetX = 0;

const animate = () => {
	let it = 0;
	
	// Gameloop
	UsersGroup.children.forEach((elem) => {

		// EXAMPLES:
			// if (keys.left && offsetX < (16 - parseInt(mapSetting.nbPlayer) + 2))
			// 	offsetX += 3 / radius;
			// else if (keys.right && offsetX > (-16 + parseInt(mapSetting.nbPlayer) - 2))
			// 	offsetX -= 3 / radius;
			// elem.lookAt(new THREE.Vector3(0, 0, 0));
	});


	// camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();