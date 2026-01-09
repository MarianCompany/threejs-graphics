import * as THREE from 'three';
import {CSS2DObject, CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function createLABAxes(length = 120) {
    const group = new THREE.Group();

    const lAxis = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        length,
        0xaaaaaa,
        10,
        5
    );
    group.add(lAxis);

    const aAxis = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        length,
        0xff0000,
        10,
        5
    );

    const aAxisNegative = new THREE.ArrowHelper(
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        length,
        0x00ff00,
        10,
        5
    );
    group.add(aAxis);
    group.add(aAxisNegative);

    const bAxis = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        length,
        0xffff00,
        10,
        5
    );
    const bAxisNegative = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 0),
        length,
        0x0000ff,
        10,
        5
    );
    group.add(bAxis);
    group.add(bAxisNegative);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';

    function createLabel(text, position) {
        const div = document.createElement('div');
        div.textContent = text;
        div.style.color = '#FFF';
        div.style.fontSize = '32px';
        div.style.padding = '4px 8px';
        div.style.backgroundColor = 'rgba(0,0,0,0.6)';

        const label = new CSS2DObject(div);
        label.position.copy(position);
        group.add(label);
        return label;
    }

    createLabel('L*', new THREE.Vector3(0, length + 8, 0));
    createLabel('a*', new THREE.Vector3(length + 8, 0, 0));
    createLabel('b*', new THREE.Vector3(0, 0, length + 8));

    document.body.appendChild(labelRenderer.domElement);

    window.addEventListener('resize', () => {
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { group, labelRenderer };
}