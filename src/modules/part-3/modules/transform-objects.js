import * as THREE from 'three';
import GUI from 'lil-gui';

let gui = null;
let currentFolder = null;
let selectedObject = null;

function updateGUI() {
    if (!selectedObject || !currentFolder) return;

    const pos = selectedObject.position;
    const rot = selectedObject.rotation;
    const scale = selectedObject.scale;

    currentFolder.__controllers[0].setValue(pos.x);
    currentFolder.__controllers[1].setValue(pos.y);
    currentFolder.__controllers[2].setValue(pos.z);

    currentFolder.__controllers[3].setValue(THREE.MathUtils.radToDeg(rot.x));
    currentFolder.__controllers[4].setValue(THREE.MathUtils.radToDeg(rot.y));
    currentFolder.__controllers[5].setValue(THREE.MathUtils.radToDeg(rot.z));

    currentFolder.__controllers[6].setValue(scale.x);
    currentFolder.__controllers[7].setValue(scale.y);
    currentFolder.__controllers[8].setValue(scale.z);
}

function clearGUI() {
    if (gui && currentFolder) {
        currentFolder.destroy()
        currentFolder = null;
    }
}

function createGUIForObject(object) {
    if (!gui) {
        gui = new GUI();
        gui.title('Transform');
    }

    clearGUI();

    const folder = gui.addFolder('Object Transform');
    folder.open();

    const pos = object.position.clone();
    const rotDeg = new THREE.Vector3(
        THREE.MathUtils.radToDeg(object.rotation.x),
        THREE.MathUtils.radToDeg(object.rotation.y),
        THREE.MathUtils.radToDeg(object.rotation.z)
    );
    const scale = object.scale.clone();

    folder.add(pos, 'x', -100, 100).name('Position X').onChange(v => { object.position.x = v; });
    folder.add(pos, 'y', -100, 100).name('Position Y').onChange(v => { object.position.y = v; });
    folder.add(pos, 'z', -100, 100).name('Position Z').onChange(v => { object.position.z = v; });

    folder.add(rotDeg, 'x', -180, 180).name('Rotation X (°)').onChange(v => {
        object.rotation.x = THREE.MathUtils.degToRad(v);
    });
    folder.add(rotDeg, 'y', -180, 180).name('Rotation Y (°)').onChange(v => {
        object.rotation.y = THREE.MathUtils.degToRad(v);
    });
    folder.add(rotDeg, 'z', -180, 180).name('Rotation Z (°)').onChange(v => {
        object.rotation.z = THREE.MathUtils.degToRad(v);
    });

    folder.add(scale, 'x', 0.1, 5).name('Scale X').onChange(v => { object.scale.x = v; });
    folder.add(scale, 'y', 0.1, 5).name('Scale Y').onChange(v => { object.scale.y = v; });
    folder.add(scale, 'z', 0.1, 5).name('Scale Z').onChange(v => { object.scale.z = v; });

    currentFolder = folder;
    selectedObject = object;
}

export function initTransformUI(onSelectCallback) {
    return (object) => {
        if (object) {
            createGUIForObject(object);
        } else {
            clearGUI();
        }
        if (onSelectCallback) onSelectCallback(object);
    };
}