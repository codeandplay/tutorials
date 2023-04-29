import * as THREE from 'three';

export const Scene = new THREE.Scene();

Scene.background = new THREE.Color(0xF02050);
Scene.fog = new THREE.Fog(0xF02050, 1, 26);