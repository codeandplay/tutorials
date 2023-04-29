import * as THREE from 'three';

export let Character = null;

const characterGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const characterMaterial = new THREE.MeshPhongMaterial({ color: "blue" });
Character = new THREE.Mesh(characterGeometry, characterMaterial);
Character.castShadow = true;
Character.receiveShadow = true;
Character.name = "player";
Character.position.set(1, 1, 1);

const gunGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.2);
const gunMaterial = new THREE.MeshPhongMaterial({ color: "gold" });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
gun.castShadow = true;
gun.receiveShadow = true;
gun.position.set(0, 0, -0.2);

Character.add(gun);