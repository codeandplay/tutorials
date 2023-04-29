import * as THREE from 'three';
import { Scene } from "./scene.js";

export let Camera = null;

Camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
Camera.position.set(0, 3, 3);

Scene.add(Camera);
