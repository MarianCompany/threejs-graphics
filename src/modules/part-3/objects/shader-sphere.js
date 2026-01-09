import * as THREE from 'three';

const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec3 vNormal;
  void main() {
    vec3 color = 0.5 * sin(vNormal * 3.0 + time) + 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createShaderSphere() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.tick = (delta) => {
        material.uniforms.time.value += delta;
    };

    return mesh;
}