import {initScene} from "./core/Scene.js";
import {createSRGBLabPointCloud} from "./objects/srgb-lab-points.js";
import {createLABAxes} from "./objects/lab-axes.js";
import {PointsManager} from "./modules/PointsManager.js";
import {initPointUi} from "./modules/PointUi.js";
import {initPointEditor} from "./modules/PointEditor.js";
import {initDeltaETable} from "./modules/DeltaETable.js";

const { scene, camera, renderer, controls } = initScene()

const pointCloud = createSRGBLabPointCloud();
scene.add(pointCloud);

const { group: axesGroup, labelRenderer } = createLABAxes(120);
scene.add(axesGroup);

camera.position.set(0, 50, 150);
controls.target.set(0, 50, 0);
controls.update();

const PM = new PointsManager(scene);
initPointUi(PM);
initPointEditor(PM, scene, camera, renderer);
const deltaETable = initDeltaETable(PM);

PM.on('points-change', () => deltaETable.update());


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    labelRenderer.render(scene, camera);
}

animate();