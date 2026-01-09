import * as THREE from "three";

export const createCube = () => {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: '#FF0000' })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.y = 0.5
    cube.castShadow = true

    return cube
}