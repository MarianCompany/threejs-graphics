import * as THREE from 'three';
import { generateSRGBLabPoints } from '../utils/colors.js';

export function createSRGBLabPointCloud() {
    const points = generateSRGBLabPoints();

    const vertexCount = points.length;
    const positions = new Float32Array(vertexCount * 3);
    const colors = new Uint8Array(vertexCount * 3);

    for (let i = 0; i < vertexCount; i++) {
        const { lab, rgb } = points[i];
        const [L, a, b] = lab;
        const [r, g, b_rgb] = rgb;

        positions[i * 3 + 0] = a;
        positions[i * 3 + 1] = L;
        positions[i * 3 + 2] = b;

        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b_rgb;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3, true));

    const material = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        sizeAttenuation: false,
        alphaTest: 0.5,
        transparent: false
    });

    const pointCloud = new THREE.Points(geometry, material);

    pointCloud.userData.pointCount = vertexCount;

    return pointCloud;
}