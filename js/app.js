let scene = new THREE.Scene();

let degressToRadians = (degrees) => {
	return degrees * (Math.PI / 180);
};

let createCamera = () => {
	let camera = new THREE.PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
    camera.position.x = 5;
    camera.position.y = -5;
    camera.position.z = 100;

	return camera;
};

let createRenderer = () => {
	let renderer = new THREE.WebGLRenderer();
	document.querySelector("#container").appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	return renderer;
};

let createLight = () => {
	let light = new THREE.PointLight(0xffffff, 1);
	light.position.set(0, 0, 50);
	return light;
};

let createCube = () => {
	let textureLoader = new THREE.TextureLoader();
	let texture1 = textureLoader.load("textures/1.jpg");
	let texture2 = textureLoader.load("textures/2.jpg");
	let texture3 = textureLoader.load("textures/3.jpg");
	let texture4 = textureLoader.load("textures/4.jpg");
	let texture5 = textureLoader.load("textures/5.jpg");
	let texture6 = textureLoader.load("textures/6.jpg");

	let materials = [
		new THREE.MeshLambertMaterial({ map: texture1 }),
		new THREE.MeshLambertMaterial({ map: texture2 }),
		new THREE.MeshLambertMaterial({ map: texture3 }),
		new THREE.MeshLambertMaterial({ map: texture4 }),
		new THREE.MeshLambertMaterial({ map: texture5 }),
		new THREE.MeshLambertMaterial({ map: texture6 }),
	];
	let geometry = new THREE.BoxGeometry(20, 20, 20),
		// MultiMaterial removed pass materials array into Mesh instead.
		// material = new THREE.MultiMaterial(materials),
		mesh = new THREE.Mesh(geometry, materials);
	return mesh;
};

let draw = (scene, camera, cube) => {
	window.requestAnimationFrame(() => {
		cube.rotation.x = cube.rotation.x + 0.007;
		cube.rotation.y = cube.rotation.y + 0.009;
		cube.rotation.z = cube.rotation.z + 0.001;
		renderer.render(scene, camera);
		draw(scene, camera, cube);
	});
};
let camera = createCamera(),
	renderer = createRenderer(),
	light = createLight(),
	cube = createCube();

// cube.rotation.x = degressToRadians(45);
// cube.rotation.y = degressToRadians(45);

scene.add(light);
scene.add(camera);
scene.add(cube);

draw(scene, camera, cube);
