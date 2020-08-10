document.addEventListener("DOMContentLoaded", () => {
    const height = "360px";
    const width = "360px";
    let grid = document.querySelector(".display-grid");
    let squares = null;
    console.log(grid);
    createGrid();
    

    function createGrid() {
        for (let index = 0; index < 324; index++) {
            let cell = document.createElement("div");
            grid.appendChild(cell);
        }
        
    }
    console.log(squares);
    
   
});
