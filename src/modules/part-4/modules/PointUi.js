export function initPointUi(manager) {
    const panel = document.createElement('div');
    panel.id = 'point-input-panel';
    panel.style.position = 'absolute';
    panel.style.top = '10px';
    panel.style.left = '10px';
    panel.style.background = 'rgba(30, 30, 30, 0.85)';
    panel.style.color = 'white';
    panel.style.padding = '12px';
    panel.style.borderRadius = '8px';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.zIndex = '100';

    const title = document.createElement('h3');
    title.textContent = 'Добавить цвет';
    title.style.marginTop = '0';
    title.style.fontSize = '16px';
    panel.appendChild(title);

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ff0000';
    colorInput.style.width = '100%';
    colorInput.style.height = '32px';
    colorInput.style.marginBottom = '8px';
    panel.appendChild(colorInput);

    const addButton = document.createElement('button');
    addButton.textContent = 'Добавить точку';
    addButton.style.width = '100%';
    addButton.style.padding = '6px';
    addButton.style.backgroundColor = '#4CAF50';
    addButton.style.color = 'white';
    addButton.style.border = 'none';
    addButton.style.borderRadius = '4px';
    addButton.style.cursor = 'pointer';
    addButton.style.fontSize = '14px';

    addButton.addEventListener('click', () => {
        const hex = colorInput.value;

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        manager.addPoint(r, g, b);
    });

    panel.appendChild(addButton);

    document.body.appendChild(panel);
}