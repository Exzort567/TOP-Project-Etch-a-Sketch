let size = 16; // Default grid size
const navActions = document.getElementById("nav-actions");
let isMouseDown = false;




document.addEventListener('DOMContentLoaded', () => createGrid(size));
// Create a grids
function createGrid(size) {
    const container = document.getElementById('container');
    container.textContent = ''; // Clear the container before creating a new grid

    container.style.display = 'grid'; // Set display to grid
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let rowNum = 1; rowNum <= size; rowNum++) {
        for (let colNum = 1; colNum <= size; colNum++) {
            const sqr = document.createElement('div');
            sqr.className = 'sqr';
            container.appendChild(sqr);
        }
    }
}


document.getElementById('container').addEventListener('mousedown', () => {
    isMouseDown = true;
});

document.getElementById('container').addEventListener('mouseup', () => {
    isMouseDown = false;
});


document.getElementById('color-type').addEventListener('change', (event) => {
    const colorType = event.target.value;
    const squares = document.querySelectorAll("#container .sqr");

    squares.forEach(sqr => {
        let opacity = 0;
        sqr.addEventListener('mouseover', () => {
            if (isMouseDown) {
                opacity = Math.min(opacity + 0.05, 1)
                if (colorType === 'random-color') {
                    sqr.style.backgroundColor = randomColor();
                } else if (colorType === 'black') {
                    sqr.style.backgroundColor = 'black';
                } else if (colorType === 'opacity') {
                    sqr.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
                }
            }
        })
    })
})

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`
}

// Handle button clicks

navActions.addEventListener('click', (event) => {
    if (event.target.id === 'clear-btn') {
        clearGrid();
    } else if (event.target.id === 'eraser-btn') {
        gridEraser();
    }
})


// Nav buttons
function clearGrid() {
    const squares = document.querySelectorAll("#container .sqr");
    squares.forEach(sqr => sqr.style.backgroundColor = '');
}

function gridEraser() {
    const squares = document.querySelectorAll("#container .sqr");
    squares.forEach(sqr => {
        sqr.addEventListener('click', () => {
            if(isMouseDown) {
                sqr.style.backgroundColor = '';
            }
            
        })
    })
}


const changeSizeBtn = document.querySelector("#change-size");
changeSizeBtn.addEventListener("click", () => {
    let size = parseInt(prompt("Enter new grid size (under 100):")) || 16;
    if (isNaN(size) || size < 1 || size > 100) {
        size = 16; // Fallback to default value if input is invalid
        alert("Invalid input. Using default size 16.");
    }

    createGrid(size);
})


