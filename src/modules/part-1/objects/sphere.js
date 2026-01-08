import * as THREE from "three";

export const createSphere = () => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
    return new THREE.Mesh(geometry, material);
}