
export function initDeltaETable(manager) {
    const container = document.getElementById('deltae-table-container');
    const tbody = document.getElementById('deltae-table-body');


    function rgbToHex(r, g, b) {
        return '#' + [r, g, b]
            .map(x => Math.max(0, Math.min(255, x))
                .toString(16)
                .padStart(2, '0'))
            .join('');
    }

    function updateTable() {
        const data = manager.getDeltaETableData();
        tbody.innerHTML = '';

        if (data.length === 0) {
            const row = tbody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 3;
            cell.textContent = 'Добавьте минимум два цвета';
            return;
        }

        data.forEach(item => {
            const row = tbody.insertRow();

            const cell1 = row.insertCell();
            cell1.style.backgroundColor = rgbToHex(...item.rgb1);
            cell1.title = `RGB(${item.rgb1.join(', ')})`;

            const cell2 = row.insertCell();
            cell2.style.backgroundColor = rgbToHex(...item.rgb2);
            cell2.title = `RGB(${item.rgb2.join(', ')})`;

            const cell3 = row.insertCell();
            cell3.textContent = item.deltaE;
        });
    }

    updateTable();

    return { update: updateTable };
}