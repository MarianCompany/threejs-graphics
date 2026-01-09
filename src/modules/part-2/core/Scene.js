import * as THREE from "three";
import {OrbitControls} from "three/addons";

export const initScene = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(0, 2, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap


    const controls = new OrbitControls(camera, renderer.domElement)

    return { scene, camera, renderer, controls }
}