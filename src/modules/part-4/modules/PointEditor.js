import * as THREE from 'three';
import GUI from 'lil-gui';

export function initPointEditor(manager, scene, camera, renderer) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let currentGUI = null;
    let selectedPoint = null;

    function destroyGUI() {
        if (currentGUI) {
            currentGUI.destroy();
            currentGUI = null;
        }
        selectedPoint = null;
    }

    function createGUIForPoint(point) {
        destroyGUI();

        const gui = new GUI({ title: 'Edit Point' });
        currentGUI = gui;

        const colorParams = {
            r: point.rgb[0],
            g: point.rgb[1],
            b: point.rgb[2]
        };

        gui.add(colorParams, 'r', 0, 255).step(1).onChange((value) => {
            updatePointColor(point, value, colorParams.g, colorParams.b);
        });
        gui.add(colorParams, 'g', 0, 255).step(1).onChange((value) => {
            updatePointColor(point, colorParams.r, value, colorParams.b);
        });
        gui.add(colorParams, 'b', 0, 255).step(1).onChange((value) => {
            updatePointColor(point, colorParams.r, colorParams.g, value);
        });

        gui.add({ remove: () => removePoint(point) }, 'remove').name('Remove Point');

        selectedPoint = point;
    }

    function updatePointColor(point, r, g, b) {
        manager.updatePoint(point.id, r, g, b);
    }

    function removePoint(point) {
        manager.removePoint(point.id);
        destroyGUI();
    }

    function onDocumentMouseDown(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const meshes = manager.getAllPoints().map(p => p.mesh);
        const intersects = raycaster.intersectObjects(meshes, false);

        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;
            const point = manager.getAllPoints().find(p => p.mesh === clickedMesh);
            if (point) {
                createGUIForPoint(point);
            }
        } else {
            destroyGUI();
        }
    }

    renderer.domElement.addEventListener('click', onDocumentMouseDown, false);

    return { deselect: destroyGUI };
}