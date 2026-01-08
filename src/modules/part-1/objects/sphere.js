import * as THREE from "three";
import image from '../../../assets/mesh.jpg'

export const createSphere = () => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const texture = new THREE.TextureLoader().load(image);

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
        metalness: 0.2
    });

    return new THREE.Mesh(geometry, material);
};