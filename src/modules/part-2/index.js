import {initScene} from "./core/Scene.js";
import {createGround} from "./objects/ground.js";
import {createCube} from "./objects/cube.js";
import {createLights} from "./objects/lights.js";
import {createPyramid} from "./objects/pyramid.js";
import {createSphere} from "./objects/sphere.js";
import {initDragNDrop} from "./modules/drag-n-drop.js";
import {initRaycastPicker} from "./modules/pick.js";
import {initTransformUI} from "./modules/transform-objects.js";
import {initTransformDisplay} from "./modules/transform-display.js";

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

initDragNDrop(scene)

const objectTransformCallback = initTransformUI()
const objectInfoCallback = initTransformDisplay()

const objectSelectCallback = (object) => {
    objectTransformCallback(object)
    objectInfoCallback(object)
}
initRaycastPicker(scene, camera, renderer, objectSelectCallback)

function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})