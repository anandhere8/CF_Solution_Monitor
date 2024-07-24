console.log("Content script loaded");

function addHeaderCell() {
    const table = document.querySelector('table.problems');
    
    if (table) {
        const headerRow = table.querySelector('tbody > tr');
        
        if (headerRow) {
            const newTh = document.createElement('th');
            newTh.style.width = '5em';
            newTh.className = 'top right';
            newTh.style.borderLeft = '1px solid #e1e1e1';
            newTh.innerHTML = '&nbsp;';
            
            headerRow.appendChild(newTh);
        }
    }
}

function addOfficialCountColumn(data) {
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const idCell = row.querySelector('td.id a');
        if (idCell) {
            const problemId = idCell.textContent.trim();
            const count = data[problemId];
            
            const lastTd = row.querySelector('td:last-of-type');
            if (lastTd) {
                const newTd = lastTd.cloneNode(true);
                
                newTd.style.fontSize = lastTd.style.fontSize;
                newTd.style.textAlign = lastTd.style.textAlign;
                newTd.style.padding = lastTd.style.padding;
                newTd.style.borderLeft = '1px solid #e1e1e1';
                
                newTd.innerHTML = '';
                const a = document.createElement('a');
                a.title = `Official count for problem ${problemId}`;
                a.href = lastTd.querySelector('a').href; // Redirect to the same URL as the last <td>
                
                const img = document.createElement('img');
                img.src = '//codeforces.org/s/99378/images/icons/user.png';
                img.style.verticalAlign = 'middle';
                
                a.appendChild(img);
                a.innerHTML += `&nbsp;x${count !== undefined ? count : ''}`;
                
                newTd.appendChild(a);

                row.appendChild(newTd);
            }
        }
    });
}

function updateTable(data) {
    addHeaderCell();
    addOfficialCountColumn(data);
}

function testUpdateTable() {
    const testData = {
        "A": 14364,
        "B1": 9111,
        "B2": 2608,
        "C": 1926,
        "D": 139,
        "E1": 4,
        "E2": 1
    };
    updateTable(testData);
}

window.testUpdateTable = testUpdateTable;
window.updateTable = updateTable;
