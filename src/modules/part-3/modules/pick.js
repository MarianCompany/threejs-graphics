import * as THREE from 'three';

let selectedObject = null;
const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

export function initRaycastPicker(scene, camera, renderer, onSelect = () => {}) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('click', onDocumentMouseDown, false);

    function onDocumentMouseDown(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (selectedObject) {
            scene.remove(selectedObject.outline);
            selectedObject = null;
        }

        if (intersects.length > 0) {
            let object = intersects[0].object;
            while (object.parent && object.parent !== scene) {
                object = object.parent;
            }

            const box = new THREE.Box3().setFromObject(object);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            const outlineGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
            const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
            outline.position.copy(center);
            outline.renderOrder = 999;
            outline.material.depthTest = false;
            outline.material.opacity = 0.5;
            outline.material.transparent = true;

            scene.add(outline);

            selectedObject = { object, outline };
            onSelect(object)

            console.log('Выделен объект:', object);
        }
    }
}