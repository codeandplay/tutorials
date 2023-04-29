import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { Sky } from 'three/addons/objects/Sky.js';

let Camera, Scene, renderer, stats, controls;
let plane;
let pointer, raycaster, isShiftDown = false;
let cubeGeo, cubeMaterial;
let sky, sun;

const objects = [];
const clock = new THREE.Clock();

const listener = new THREE.AudioListener();
const sound_bg = new THREE.Audio(listener);
const sound_break = new THREE.Audio(listener);
const sound_create = new THREE.Audio(listener);

const GAME_STATE = {
    MENU: "MENU",
    PLAYING: "PLAYING"
}

const TEXTURES = {
    GRASS: null,
    BRICK: null,
    BRICK_B: null,
    GLASS: null,
    SAND: null
}

let GAME_STATUS = GAME_STATE.MENU;

const init = () => {

    stats = new Stats();
    document.body.appendChild(stats.dom);

    Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    Camera.position.set(500, 800, 1300);
    Camera.lookAt(0, 0, 0);


    Scene = new THREE.Scene();
    Scene.background = new THREE.Color(0xf0f0f0);


    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const geometry = new THREE.PlaneGeometry(4000, 4000);
    geometry.rotateX(- Math.PI / 2);

    const texture = new THREE.TextureLoader().load('textures/grass_plane.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(80, 80);


    plane = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture }));
    Scene.add(plane);

    objects.push(plane);

    const ambientLight = new THREE.AmbientLight(0x606060);
    Scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    Scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new FirstPersonControls(Camera, renderer.domElement);

    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;

    document.addEventListener('mouseenter', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('keyup', onDocumentKeyUp);

    window.addEventListener('resize', onWindowResize);

    initSky();
    initTexture();

    const textures = document.querySelectorAll('.texture');

    textures.forEach((texture) => {
        texture.addEventListener('click', function () {
            document.querySelector('.texture.active').classList.remove('active');
            texture.classList.add('active');

            console.log(texture.getAttribute('data-texture'));
            cubeMaterial = eval(`TEXTURES.${texture.getAttribute('data-texture')}`);
            gamePlay();
        })
    });
}

const gamePaused = () => {
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    document.body.style.cursor = 'unset';
    instructions.style.display = 'flex';
    blocker.style.display = 'block';
    GAME_STATUS = GAME_STATE.MENU;
}

const gamePlay = () => {
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.style.display = 'none';
    blocker.style.display = 'none';
    GAME_STATUS = GAME_STATE.PLAYING;
    sound_bg.play();
}

const initTexture = () => {

    TEXTURES.GRASS = new THREE.MeshLambertMaterial({ transparent: true, map: new THREE.TextureLoader().load('textures/grass_block.jpg') });
    TEXTURES.BRICK = new THREE.MeshLambertMaterial({ transparent: true, map: new THREE.TextureLoader().load('textures/brick_block.jpg') });
    TEXTURES.BRICK_B = new THREE.MeshLambertMaterial({ transparent: true, map: new THREE.TextureLoader().load('textures/brick2_block.jpg') });
    TEXTURES.GLASS = new THREE.MeshLambertMaterial({ transparent: true, map: new THREE.TextureLoader().load('textures/glass_block.png') });
    TEXTURES.SAND = new THREE.MeshLambertMaterial({ transparent: true, map: new THREE.TextureLoader().load('textures/sand_block.jpg') });

    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
}

const initSky = () => {
    sky = new Sky();
    sky.scale.setScalar(450000);
    Scene.add(sky);

    sun = new THREE.Vector3();

    const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 10,
        azimuth: 180,
        exposure: renderer.toneMappingExposure
    };

    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = effectController.turbidity;
    uniforms['rayleigh'].value = effectController.rayleigh;
    uniforms['mieCoefficient'].value = effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(Scene, Camera);
}


const onWindowResize = () => {

    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();

}

const onPointerMove = (event) => {

    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(pointer, Camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {

        const intersect = intersects[0];

    }

}

const onPointerDown = (event) => {

    if (GAME_STATUS != GAME_STATE.PLAYING) {
        return;
    }

    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(pointer, Camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {

        const intersect = intersects[0];

        if (isShiftDown) {

            if (intersect.object !== plane) {
                if (sound_break.isPlaying) {
                    sound_break.stop();
                }
                sound_break.play();

                Scene.remove(intersect.object);

                objects.splice(objects.indexOf(intersect.object), 1);

            }


        } else {

            if (sound_create.isPlaying) {
                sound_create.stop();
            }
            sound_create.play();
            const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            Scene.add(voxel);

            objects.push(voxel);

        }

    }

}

const onDocumentKeyDown = (event) => {

    switch (event.keyCode) {

        case 16: isShiftDown = true; break;

    }

}

const onDocumentKeyUp = (event) => {
    switch (event.keyCode) {

        case 16: isShiftDown = false; break;
        case 27: GAME_STATUS === GAME_STATE.MENU ? gamePlay() : gamePaused(); break;
    }

}

const render = () => {

    controls.update(clock.getDelta());

    requestAnimationFrame(render);

    stats.update();

    if (GAME_STATUS === GAME_STATE.PLAYING) {
        renderer.render(Scene, Camera);
    }

}

const addAudio = () => {
    Camera.add(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/birds.mp3', function (buffer) {
        sound_bg.setBuffer(buffer);
        sound_bg.setLoop(true);
        sound_bg.setVolume(0.3);
    })

    audioLoader.load('sounds/break.ogg', function (buffer) {
        sound_break.setBuffer(buffer);
        sound_break.setVolume(1);
    })

    audioLoader.load('sounds/create.ogg', function (buffer) {
        sound_create.setBuffer(buffer);
        sound_create.setVolume(1);
    })
}

init();
addAudio();
render();
