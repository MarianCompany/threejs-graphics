import * as THREE from "three";

export const createGround = () => {
    const vertices = new Float32Array([
        -5, 0, -5,
        5, 0, -5,
        -5, 0,  5,
        5, 0,  5
    ]);

    const indices = [
        0, 1, 2,
        1, 3, 2
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({ color: 0x444444, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
}