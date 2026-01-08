import * as THREE from "three";

export const createPyramid = () => {
    const vertices = new Float32Array([
        0, 1.5, 0,
        -1, -0.5, -1,
        1, -0.5, -1,
        0, -0.5, 1
    ]);

    const indices = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 1,
        1, 3, 2
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({ color: 0xff6600 });
    return new THREE.Mesh(geometry, material);
}