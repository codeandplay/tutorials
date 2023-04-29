import * as THREE from 'three';
import { Character } from "./modules/character.js";
import { Camera } from "./modules/camera.js";
import { Scene } from "./modules/scene.js";
import { createRigidBody, physicsWorld, setupPhysicsWorld, updatePhysics } from "./modules/physics.js";
import { AmmoDebugDrawer, DefaultBufferSize } from "./modules/AmmoDebugDrawer.js";
import Stats from 'three/addons/libs/stats.module.js';

const GAME_STATE = {
    PAUSED: "PAUSED",
    GAME_OVER: "GAME_OVER",
    PLAYING: "PLAYING"
}

const GUN_STATE = {
    IDLE: "IDLE",
    FIRING: "FIRING"
}

let renderer, stats;
let GAME_STATUS = GAME_STATE.PAUSED;
let GUN_STATUS = GUN_STATE.IDLE;
let followCam = new THREE.Object3D();
let lineA;
let lineB;

// Debug variables
let debugGeometry;
let debugDrawer;
let DEBUGMODE = 0 // 0 = off , 1 = wireframe, 2 = aabb
let BALLS_COUNTER = 0;

const colorArray = [0x80FF33, 0x33E6FF, 0xFFF633, 0xFF33BB, 0xFF33CA, 0xFF5714, 0x6EEB83];
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const listener = new THREE.AudioListener();
const sound_bg = new THREE.Audio(listener);
const sound_lazer = new THREE.Audio(listener);
const sound_gameover = new THREE.Audio(listener);
const sound_hit = new THREE.Audio(listener);
const sound_error = new THREE.Audio(listener);
const keys = {
    a: 0,
    s: 0,
    d: 0,
    w: 0
};

let stopWatch = document.getElementById('stopwatch');
let remainingBalls = document.querySelector('#ball-remaining span');



const initDebug = () => {
    const debugVertices = new Float32Array(DefaultBufferSize);
    const debugColors = new Float32Array(DefaultBufferSize);
    debugGeometry = new THREE.BufferGeometry();
    debugGeometry.setAttribute("position", new THREE.BufferAttribute(debugVertices, 3).setUsage(THREE.DynamicDrawUsage));
    debugGeometry.setAttribute("color", new THREE.BufferAttribute(debugColors, 3).setUsage(THREE.DynamicDrawUsage));
    const debugMaterial = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
    const debugMesh = new THREE.LineSegments(debugGeometry, debugMaterial);
    debugMesh.frustumCulled = false;
    Scene.add(debugMesh);
    debugDrawer = new AmmoDebugDrawer(null, debugVertices, debugColors, physicsWorld);
    debugDrawer.enable();
    debugDrawer.setDebugMode(DEBUGMODE);
}


const initEnvironment = () => {
    const wall1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 30.5),
        new THREE.MeshStandardMaterial({ color: "red" })
    );
    wall1.position.y = 0;
    wall1.position.x = 14;
    wall1.castShadow = true;
    wall1.name = "wall";
    Scene.add(wall1);

    let wal1Shape = new Ammo.btBoxShape(new Ammo.btVector3(0.25, 1, 15.25));
    wal1Shape.setMargin(0.05);

    createRigidBody(physicsWorld, wall1, wal1Shape, 0, wall1.position, wall1.quaternion);

    const wall2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2, 30.5),
        new THREE.MeshStandardMaterial({ color: "red" })
    );
    wall2.position.y = 0;
    wall2.position.x = -14;
    wall2.castShadow = true;
    wall2.name = "wall";

    let wal2Shape = new Ammo.btBoxShape(new Ammo.btVector3(0.25, 1, 15.25));
    wal2Shape.setMargin(0.05);

    createRigidBody(physicsWorld, wall2, wal2Shape, 0, wall2.position, wall2.quaternion);

    const wall3 = new THREE.Mesh(
        new THREE.BoxGeometry(28, 2, 0.5),
        new THREE.MeshStandardMaterial({ color: "red" })
    );
    wall3.position.y = 0;
    wall3.position.z = 15;
    wall3.castShadow = true;
    wall3.name = "wall";

    let wal3Shape = new Ammo.btBoxShape(new Ammo.btVector3(14, 1, 0.25));
    wal3Shape.setMargin(0.05);

    createRigidBody(physicsWorld, wall3, wal3Shape, 0, wall3.position, wall3.quaternion);

    const wall4 = new THREE.Mesh(
        new THREE.BoxGeometry(28, 2, 0.5),
        new THREE.MeshStandardMaterial({ color: "red" })
    );
    wall4.position.y = 0;
    wall4.position.z = -15;
    wall4.castShadow = true;
    wall4.name = "wall";

    let wal4Shape = new Ammo.btBoxShape(new Ammo.btVector3(14, 1, 0.25));
    wal4Shape.setMargin(0.05);

    createRigidBody(physicsWorld, wall4, wal4Shape, 0, wall4.position, wall4.quaternion);
}



const init = () => {

    stats = new Stats();
    document.body.appendChild(stats.dom);

    Camera.lookAt(Scene.position);

    followCam.position.copy(Camera.position);
    Scene.add(followCam);
    followCam.parent = Character;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding
    // shadows
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    const AmbientLight = new THREE.AmbientLight(0xffffff, 1);
    Scene.add(AmbientLight);


    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 10, -2);
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.top += 10;
    // dirLight.shadow.camera.bottom -= 10;
    // dirLight.shadow.camera.left -= 10;
    // dirLight.shadow.camera.right += 10;
    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;
    dirLight.target.position.set(0, 0, 0)
    Scene.add(dirLight);
    Scene.add(dirLight.target);


    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    window.addEventListener('mousemove', mouselocation);
    window.addEventListener('pointerdown', checkCollision);
    window.addEventListener('pointerup', function () { GUN_STATUS = GAME_STATE.IDLE });

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
        GAME_STATUS = GAME_STATE.PLAYING;
        sound_bg.play();
    });

    initEnvironment();
    setPlane();
}


const characterMovement = () => {

    const movementSpeed = 6;
    const rotationSpeed = 3;

    let moveX = keys.d - keys.a;
    let moveZ = keys.s - keys.w;
    let moveY = 0;

    const physicsBody = Character.userData.physicsBody;
    physicsBody.setAngularVelocity(0, 0, 0);


    if (moveZ || moveX) {
        //movement
        const temporaryEuler = new THREE.Vector3(moveX * movementSpeed, 0, moveZ * movementSpeed).applyQuaternion(Character.quaternion)
        physicsBody.applyForce(new Ammo.btVector3(temporaryEuler.x, temporaryEuler.y, temporaryEuler.z))
    }


    if (mouse.y) {
        //rotation
        const resultantImpulseRotation = new Ammo.btVector3(0, -mouse.x, 0);
        resultantImpulseRotation.op_mul(rotationSpeed);
        physicsBody.setAngularVelocity(resultantImpulseRotation);
    }

}


const setPlane = () => {
    const pos = new THREE.Vector3(0, -0.65, 0);
    const scale = new THREE.Vector3(100, 1, 100);
    const quat = new THREE.Vector4(0, 0, 0, 1);
    const mass = 0;

    const wfloor = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshPhongMaterial({
            color: 0x000000,
        })
    );
    wfloor.position.set(pos.x, pos.y - 0.2, pos.z);
    wfloor.scale.set(scale.x, scale.y, scale.z);
    Scene.add(wfloor)

    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshPhongMaterial({
            color: 0x000000,
            opacity: 0.5,
            transparent: true
        })
    );
    floor.receiveShadow = true;

    floor.position.set(pos.x, pos.y, pos.z);
    floor.scale.set(scale.x, scale.y, scale.z);

    floor.castShadow = true;
    floor.receiveShadow = true;

    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
    colShape.setMargin(0.05);


    var gridHelper = new THREE.GridHelper(150, 120, 0xFF0000, "red");
    gridHelper.position.y = -0.2;
    gridHelper.name = "floor"
    Scene.add(gridHelper);

    createRigidBody(physicsWorld, floor, colShape, mass, pos, quat);
}

const setCharacterPhysics = () => {
    let pos = { x: 0, y: 0, z: 0 };
    let quat = { x: 0, y: 0, z: 0, w: 1 };
    let mass = 1;
    let scale = { x: 0.3, y: 0.3, z: 0.3 };

    Character.position.set(pos.x, pos.y, pos.z);

    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
    colShape.setMargin(0.05);

    const playerBody = createRigidBody(physicsWorld, Character, colShape, mass, pos, quat);
    playerBody.setAngularFactor(0, 1, 0);
}

const createBall = () => {
    const totalEnemies = 25
    for (let i = 0; i < totalEnemies; i++) {
        let pos = { x: getRandomInt(-8, 8), y: 20, z: getRandomInt(-8, 8) };
        let radius = getRandomInt(4, 8) * 0.1;
        let quat = { x: 0, y: 0, z: 0, w: 1 };
        let mass = 1;

        let ball = new THREE.Mesh(new THREE.SphereGeometry(radius), new THREE.MeshPhongMaterial({ color: colorArray[Math.floor(Math.random() * colorArray.length)] }));

        ball.position.set(pos.x, pos.y, pos.z);
        ball.name = "enemy"
        ball.castShadow = true;
        ball.receiveShadow = true;
        ball.isHit = false;
        ball.hitSound = sound_hit;
        ball.errorSound = sound_error;

        let colShape = new Ammo.btSphereShape(radius);
        colShape.setMargin(0.05);

        createRigidBody(physicsWorld, ball, colShape, mass, pos, quat);
    }

    remainingBalls.innerHTML = totalEnemies;
    BALLS_COUNTER = totalEnemies;

}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


const animate = () => {
    let delta = clock.getDelta();

    if (GAME_STATUS === GAME_STATE.PLAYING) {
        characterMovement();
        stopWatch.innerHTML = Math.round(clock.getElapsedTime() * 10) / 10;
    }

    if (followCam) {
        Camera.position.lerp(followCam.getWorldPosition(new THREE.Vector3()), 0.085);
        Camera.lookAt(Character.position.x, Character.position.y + .5, Character.position.z);
    }

    requestAnimationFrame(animate);

    updatePhysics(delta);


    if (debugDrawer) {
        if (debugDrawer.index !== 0) {
            debugGeometry.attributes.position.needsUpdate = true;
            debugGeometry.attributes.color.needsUpdate = true;
        }

        debugGeometry.setDrawRange(0, debugDrawer.index);
        debugDrawer.update();
    }

    stats.update();

    renderer.render(Scene, Camera);

    Camera.updateProjectionMatrix();

}


const checkCollision = () => {

    if (GAME_STATUS != GAME_STATE.PLAYING) {
        return;
    }
    const dir = new THREE.Vector3();
    Character.getWorldDirection(dir)

    raycaster.set(Character.position, new THREE.Vector3(-dir.x, dir.y, -dir.z), 10, 50);

    const intersects = raycaster.intersectObjects(Scene.children);

    if (sound_lazer.isPlaying) {
        sound_lazer.stop();
    }

    GUN_STATUS = GUN_STATE.FIRING;
    sound_lazer.play();

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name === "enemy") {

            if (GAME_STATUS == GAME_STATE.PLAYING) {
                const physicsBody = intersects[i].object.userData.physicsBody;
                physicsBody.applyForce(new Ammo.btVector3(0, 250, 0))

                if (!intersects[i].object.isHit) {
                    intersects[i].object.material.color.setHex(0xff0000);
                    BALLS_COUNTER -= 1;
                    intersects[i].object.isHit = true;
                    intersects[i].object.hitSound.play();
                }
                else {
                    intersects[i].object.material.color.setHex(colorArray[Math.floor(Math.random() * colorArray.length)]);
                    BALLS_COUNTER += 1;
                    intersects[i].object.isHit = false;
                    intersects[i].object.errorSound.play();
                }
                remainingBalls.innerHTML = BALLS_COUNTER
            }

            if (BALLS_COUNTER === 0) {
                GAME_STATUS = GAME_STATE.GAME_OVER;
                sound_gameover.play();
            }

            break;
        }
    }

}

const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    Camera.aspect = width / height;
    Camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

const keyup = (e) => {
    keys[e.key] = 0;
    if (e.key === "Escape") {
        document.body.style.cursor = 'unset';
        instructions.style.display = 'flex';
        blocker.style.display = 'block';
        GAME_STATUS = GAME_STATE.PAUSED;
    }
}
const keydown = (e) => {
    keys[e.key] = 1;
}

const mouselocation = (event) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    mouse.x = (event.clientX / width * 2 - 1);
    mouse.y = -(event.clientY / height) * 2 + 1;

}

const setProjectile = () => {
    const pointsA = [];
    const pointsB = [];

    const material = new THREE.LineBasicMaterial({ color: "yellow" });

    pointsA.push(new THREE.Vector3(-0.08, 0, 0));
    pointsA.push(new THREE.Vector3(-0.08, 0, -1));

    pointsB.push(new THREE.Vector3(0.08, 0, 0));
    pointsB.push(new THREE.Vector3(0.08, 0, -1));

    const geometryA = new THREE.BufferGeometry().setFromPoints(pointsA);
    lineA = new THREE.Line(geometryA, material);

    const geometryB = new THREE.BufferGeometry().setFromPoints(pointsB);
    lineB = new THREE.Line(geometryB, material);

    lineA.geometry.attributes.position.needsUpdate = true;
    lineB.geometry.attributes.position.needsUpdate = true;

    Character.add(lineA);
    Character.add(lineB);
}

const addAudio = () => {

    Camera.add(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/background.mp3', function (buffer) {
        sound_bg.setBuffer(buffer);
        sound_bg.setLoop(true);
        sound_bg.setVolume(0.3);
    })

    audioLoader.load('sounds/lazer.mp3', function (buffer) {
        sound_lazer.setBuffer(buffer);
        sound_lazer.setVolume(1);
    })

    audioLoader.load('sounds/game-over.mp3', function (buffer) {
        sound_gameover.setBuffer(buffer);
        sound_gameover.setVolume(1);
        sound_gameover.setLoop(true);
    })

    audioLoader.load('sounds/error.mp3', function (buffer) {
        sound_error.setBuffer(buffer);
        sound_error.setVolume(0.5);
    })

    audioLoader.load('sounds/hit.mp3', function (buffer) {
        sound_hit.setBuffer(buffer);
        sound_hit.setVolume(0.5);
    })
}


const start = () => {
    setupPhysicsWorld();
    init();
    setCharacterPhysics();
    createBall();
    initDebug();
    setProjectile();
    animate();
    addAudio();
}

Ammo().then(start);