import * as THREE from 'three';
import { srgbToLab } from '../utils/colors.js';

const EVENTS = {
    POINTS_CHANGE: 'points-change'
};

export class PointsManager {
    constructor(scene) {
        this.scene = scene;
        this.points = [];
        this.nextId = 1;

        this.listeners = {};

        this.connectionsGeometry = new THREE.BufferGeometry();
        this.connectionsMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });
        this.lineSegments = new THREE.LineSegments(this.connectionsGeometry, this.connectionsMaterial);
        this.lineSegments.renderOrder = 1;
        this.scene.add(this.lineSegments);
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(data));
    }

    _updateConnections() {
        const points = this.points;
        const numPoints = points.length;

        if (numPoints < 2) {
            this.connectionsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
            return;
        }

        const maxEdges = (numPoints * (numPoints - 1)) / 2;
        const positions = new Float32Array(maxEdges * 2 * 3);
        let index = 0;

        for (let i = 0; i < numPoints; i++) {
            for (let j = i + 1; j < numPoints; j++) {
                const p1 = points[i].mesh.position;
                const p2 = points[j].mesh.position;

                positions[index++] = p1.x;
                positions[index++] = p1.y;
                positions[index++] = p1.z;
                positions[index++] = p2.x;
                positions[index++] = p2.y;
                positions[index++] = p2.z;
            }
        }

        this.connectionsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.connectionsGeometry.attributes.position.needsUpdate = true;
    }

    addPoint(r, g, b) {
        if (this.points.length >= 4) {
            alert('Достигнуто максимальное количество точек (4). Новая точка не добавлена.');
            return null;
        }

        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));

        const [L, a, b_lab] = srgbToLab(r, g, b);

        const geometry = new THREE.SphereGeometry(2.8, 16, 12);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(r / 255, g / 255, b / 255)
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(a, L, b_lab);

        const id = this.nextId++;
        const point = { id, rgb: [r, g, b], lab: [L, a, b_lab], mesh };

        this.scene.add(mesh);
        this.points.push(point);

        this._updateConnections();
        this.emit(EVENTS.POINTS_CHANGE, { point });

        return point;
    }

    updatePoint(id, r, g, b) {
        const point = this.getPointById(id);
        if (!point) return;

        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));

        const [L, a, b_lab] = srgbToLab(r, g, b);

        point.rgb = [r, g, b];
        point.lab = [L, a, b_lab];
        point.mesh.position.set(a, L, b_lab);
        point.mesh.material.color.setRGB(r / 255, g / 255, b / 255);

        this._updateConnections();
        this.emit(EVENTS.POINTS_CHANGE, { point });
    }

    removePoint(id) {
        const index = this.points.findIndex(p => p.id === id);
        if (index === -1) return;

        const point = this.points[index];
        this.scene.remove(point.mesh);
        if (point.mesh.geometry) point.mesh.geometry.dispose();
        if (point.mesh.material) point.mesh.material.dispose();

        this.points.splice(index, 1);
        this._updateConnections();
        this.emit(EVENTS.POINTS_CHANGE, { point });
    }

    clearAll() {
        this.points.forEach(point => {
            this.scene.remove(point.mesh);
            if (point.mesh.geometry) point.mesh.geometry.dispose();
            if (point.mesh.material) point.mesh.material.dispose();
        });
        this.points = [];
        this._updateConnections();
        this.emit(EVENTS.POINTS_CHANGE, {  });
    }

    getPointById(id) {
        return this.points.find(p => p.id === id) || null;
    }

    getAllPoints() {
        return this.points;
    }

    calculateDeltaE76(lab1, lab2) {
        const dL = lab1[0] - lab2[0];
        const da = lab1[1] - lab2[1];
        const db = lab1[2] - lab2[2];
        return Math.sqrt(dL * dL + da * da + db * db);
    }

    getDeltaETableData() {
        const points = this.points;
        const tableData = [];

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const p1 = points[i];
                const p2 = points[j];
                const deltaE = this.calculateDeltaE76(p1.lab, p2.lab);

                tableData.push({
                    id1: p1.id,
                    id2: p2.id,
                    rgb1: p1.rgb,
                    rgb2: p2.rgb,
                    deltaE: parseFloat(deltaE.toFixed(2))
                });
            }
        }

        return tableData;
    }

    dispose() {
        this.clearAll();
        this.scene.remove(this.lineSegments);
        if (this.connectionsGeometry) this.connectionsGeometry.dispose();
        if (this.connectionsMaterial) this.connectionsMaterial.dispose();
    }
}