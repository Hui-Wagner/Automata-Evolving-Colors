class Animat {
    constructor(hue, x, y, automata) {
        this.automata = automata;
        this.hue = hue;
        this.x = x;
        this.y = y;
        this.energy = 50;
    }
    normalize(value, max) {
        return (value + max) % max;
    }

    // Determines the movement direction for the animat based on nearby plants
    move() {
        // possible movement directions x, y values
        let dx = [0, 1, 0, -1, 1, -1, 1, -1];
        let dy = [1, 0, -1, 0, 1, -1, -1, 1];

        // Variable to store the smallest hue difference between animat and plants
        let minDiff = Infinity;
        // Store the next position for the animat
        let nextPos = {x: this.x, y: this.y};

        // Iterate over all possible movement directions
        for (let i = 0; i < 8; i++) {
            let nx = this.x + dx[i];
            let ny = this.y + dy[i];

            // Normalize coordinates to ensure they are within the grid bounds
            nx = this.normalize(nx, this.automata.size);
            ny = this.normalize(ny, this.automata.size);

            // Check for a plant at the potential new position
            let plant = this.automata.plants[nx][ny];
            if (plant) {
                // Calculate hue difference between animat and plant
                let diff = Math.abs(this.hue - plant.hue);
                if (diff < minDiff) {
                    minDiff = diff;
                    nextPos = {x: nx, y: ny};
                }
            }
        }

        // Update the animat's x position based on the chosen direction
        this.x = nextPos.x;

        // Update the animat's y position based on the chosen direction
        this.y = nextPos.y;
    }

    // Calculate the hue difference between the animat and a given plant
    hueDifference(plant) {
        let diff = plant ? Math.abs(this.hue - plant.hue) : 180;
        if (diff > 180) diff = 360 - diff;
        return (90 - diff) / 90;
    }

    // Let the animat eat a plant at current location, if there is one
    eat() {
        let plant = this.automata.plants[this.x][this.y];
        let diff = this.hueDifference(plant);

        // Check if there is a plant at the location and the hue difference meets the selectivity
        if (plant && diff >= Math.abs(this.automata.animatFoodSelectivity)) {
            this.automata.plants[this.x][this.y] = null;  // Remove the eaten plant
            this.energy += 80 / this.automata.animatGrowth * diff;  // Increase energy based on the hue difference
        }
    }

    // Reproduce a new animat if energy is enough
    reproduce() {
        if (this.energy > 80) {
            this.energy -= 80;  // Deduct energy cost for reproduction
            let newAnimat = this.mutate();  // Create properties for the new animat
            this.automata.animats.push(new Animat(newAnimat.hue, newAnimat.x, newAnimat.y, this.automata));  // Add the new animat to the automata
        }
    }

    // Remove the animat if it dies
    die() {
        let index = this.automata.animats.indexOf(this);
        if (index > -1) {
            this.automata.animats.splice(index, 1);
        }
    }

    // Mutates the animat's properties to generate new values for reproduction
    mutate() {
        let x = this.x + randomInt(3) - 1;  // Randomly adjust the x-coordinate
        let y = this.y + randomInt(3) - 1;  // Randomly adjust the y-coordinate
        let hue = this.hue + randomInt(21) - 10;  // Randomly adjust the hue value

        // Normalize the mutated values to ensure they are within valid ranges
        x = this.normalize(x, this.automata.size);
        y = this.normalize(y, this.automata.size);
        hue = this.normalize(hue, 360);

        return {hue, x, y};
    }

    // Updates the state of the animat in the automata
    update() {
        this.move();
        this.eat();
        this.reproduce();

        // Check if the animat dies
        if (this.energy < 1 || Math.random() < 0.01) this.die();
    }

    // Draws the animat on the canvas
    draw(ctx) {
        // Determine the color of the animat based on its hue
        let color = hsl(this.hue, 75, 50);

        // Size of the cell
        let size = this.automata.cellSize;

        // Set the fill color and border color for the animat
        ctx.fillStyle = color;
        ctx.strokeStyle = "light gray";

        // Draw the animat with a filled circle
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * size, (this.y + 0.5) * size, size / 2 - 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}






