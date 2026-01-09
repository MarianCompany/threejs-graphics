import * as THREE from 'three'

export function createLights() {
    const lights = []

    const ambientLight = new THREE.AmbientLight('#ffffff', 2)
    
    lights.push(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#ffffff', 5)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    
    lights.push(directionalLight)

    const pointLight = new THREE.PointLight('#ffffff', 20, 20)
    pointLight.position.set(-5, 3, -3)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 512
    pointLight.shadow.mapSize.height = 512
    lights.push(pointLight)


    return lights
}