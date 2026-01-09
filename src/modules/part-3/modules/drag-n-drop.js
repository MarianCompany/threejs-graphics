import {GLTFLoader} from "three/addons";

export const initDragNDrop = (scene) => {
    const loader = new GLTFLoader();

    let dropZone = document.body;

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length === 0) return;

        const file = files[0];
        const extension = file.name.split('.').pop().toLowerCase();

        if (extension === 'glb') {
            const reader = new FileReader();

            reader.onload = function(event) {
                const contents = event.target.result;
                const blob = new Blob([contents], { type: file.type });
                const url = URL.createObjectURL(blob);

                loader.load(url, (gltf) => {
                    const model = gltf.scene;

                    model.position.set(0, 1, 0);
                    model.scale.set(1, 1, 1);
                    scene.add(model);

                }, undefined, (error) => {
                    console.error('Ошибка загрузки модели:', error);
                });

                URL.revokeObjectURL(url);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Поддерживаются только .glb файлы');
        }
    });
}