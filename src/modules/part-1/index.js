import * as THREE from 'three'
import {initScene} from "./core/Scene.js";
import {createGround} from "./objects/ground.js";
import {createCube} from "./objects/cube.js";
import {createLights} from "./objects/lights.js";
import {createPyramid} from "./objects/pyramid.js";
import {createSphere} from "./objects/sphere.js";
import GUI from "lil-gui";

const { scene, renderer, camera } = initScene()


const cube = createCube();
cube.position.set(2, 1, 0);
scene.add(cube);

const sphere = createSphere();
sphere.position.set(-2, 1, 0);
scene.add(sphere);

const plane = createGround();
plane.position.set(0, 0, 0);
scene.add(plane);

const pyramid = createPyramid();
pyramid.position.set(0, 1, 3);
scene.add(pyramid);


const lights = createLights()

lights.forEach((light) => scene.add(light))

function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
}
animate()

const params = {
    lightIntensity: 1,
    lightColor: '#ffffff',
    cubeColor: '#ff0000'
};
const gui = new GUI();

gui.add(params, 'lightIntensity', 0, 20, 0.01).name('Интенсивность света')
    .onChange(value => {
        lights[0].intensity = value;
    });

gui.addColor(params, 'lightColor').name('Цвет света')
    .onChange(value => {
        lights[0].color.set(value);
    });

gui.addColor(params, 'cubeColor').name('Цвет куба')
    .onChange(value => {
        cube.material.color.set(value);
    });

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})