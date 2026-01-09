import * as THREE from 'three';

const infoElement = document.getElementById('transform-info');

let currentObject = null;
let animationId = null;

function formatVector(v) {
    return `${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)}`;
}

function formatRotation(r) {
    const degX = THREE.MathUtils.radToDeg(r.x).toFixed(1);
    const degY = THREE.MathUtils.radToDeg(r.y).toFixed(1);
    const degZ = THREE.MathUtils.radToDeg(r.z).toFixed(1);
    return `${degX}°, ${degY}°, ${degZ}°`;
}

function updateDisplay() {
    if (!currentObject || !infoElement) return;

    const pos = currentObject.position;
    const rot = currentObject.rotation;
    const scale = currentObject.scale;

    infoElement.innerHTML = `
        <strong>Position:</strong> ${formatVector(pos)}<br>
        <strong>Rotation:</strong> ${formatRotation(rot)}<br>
        <strong>Scale:</strong> ${formatVector(scale)}
    `;
    infoElement.style.display = 'block';
}

function animate() {
    if (currentObject) {
        updateDisplay();
        animationId = requestAnimationFrame(animate);
    }
}

export function initTransformDisplay() {
    return (object) => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        currentObject = object;

        if (object) {
            updateDisplay();
            animate();
        } else {
            if (infoElement) {
                infoElement.style.display = 'none';
            }
        }
    };
}