class Automata {
    constructor(size) {
        this.size = size;  // Size of the automata
        this.cellSize = 10;  // Size of each cell in the grid
        this.plants = this.initializeGrid();  // Grid containing plants
        this.animats = [];  // List of animats in the automata

        // Growth rates and properties
        this.plantGrowth = 10;
        this.animatGrowth = 10;
        this.animatFoodSelectivity = 0.5;
    }

    // Initializes a grid with null values to represent empty cells
    initializeGrid() {
        let grid = [];
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push(null);
            }
            grid.push(row);
        }
        return grid;
    }

    // Clears the automata grid and resets the list of animats
    clear() {
        this.plants = this.initializeGrid();
        this.animats = [];
    }

    // Adds a plant to a random empty cell in the automata grid
    addPlant() {
        let x, y;
        do {
            x = randomInt(this.size);
            y = randomInt(this.size);
        } while (this.plants[x][y] !== null);
        this.plants[x][y] = new Plant(Math.random() * 360, x, y, this);
    }

    // Adds an animat to a random empty cell in the automata grid
    addAnimat() {
        let x, y;
        do {
            x = randomInt(this.size);
            y = randomInt(this.size);
            // Make sure the chosen cell doesn't already have an animat
        } while (this.animats.find(animat => animat.x === x && animat.y === y));
        this.animats.push(new Animat(Math.random() * 360, x, y, this));
    }

    // Updates the state of all plants and animats
    update() {
        // Update each plant in the grid
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                if (plant) {
                    plant.update();
                    // Random chance to remove a plant
                    if (Math.random() < 0.01) this.plants[x][y] = null;
                }
            });
        });

        // Update each animat in the list
        this.animats.forEach(animat => animat.update());
    }

    // Draws all plants and animats on canvas
    draw(ctx) {
        // Draw each plant in the grid
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                // If the plant exists, draw it
                plant?.draw(ctx);
            });
        });

        this.animats.forEach(animat => animat.draw(ctx));
    }
}












