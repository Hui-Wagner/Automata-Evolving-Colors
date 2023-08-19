

class Plant {

    // Constructor for the Plant class, initializing the properties
    constructor(hue, x, y, automata) {
        this.automata = automata;
        this.hue = hue;
        this.x = x;
        this.y = y;
        this.growth = 0;
    }

    normalize(value, max) {
        return (value + max) % max;
    }

    // Mutates the plant's properties to generate new values for reproduction.
    mutate() {
        let x = this.x + randomInt(3) - 1;  // Randomize the x-coordinate
        let y = this.y + randomInt(3) - 1;  // Randomize the y-coordinate
        let hue = this.hue + randomInt(21) - 10;  // Randomly adjust the hue value

        // Normalize the mutated values to ensure they are in valid ranges
        x = this.normalize(x, this.automata.size);
        y = this.normalize(y, this.automata.size);
        hue = this.normalize(hue, 360);

        return {hue, x, y};
    }

    // Updates the state of the plant
    update() {
        // Increase the plant's growth based on the defined growth rate
        this.growth += 80 / this.automata.plantGrowth;

        // If the plant's growth reaches or exceeds 80, it can reproduce
        if (this.growth >= 80) {
            // Generate properties for the new plant using mutation
            let newPlant = this.mutate();

            // Check if the targeted location in the automata grid is not occupied
            let isSpotEmpty = !this.automata.plants[newPlant.x][newPlant.y];

            // Check if there is no animat at the new location
            let isAnimatNotPresent = true;
            for (let animat of this.automata.animats) {
                if (animat.x === newPlant.x && animat.y === newPlant.y) {
                    isAnimatNotPresent = false;  // Found an animat at the new location
                    break;
                }
            }

            // If the location is available (both empty of plants and animats), create a new plant there
            if (isSpotEmpty && isAnimatNotPresent) {
                this.automata.plants[newPlant.x][newPlant.y] = new Plant(newPlant.hue, newPlant.x, newPlant.y, this.automata);

                // Reset the growth of the current plant after reproduction
                this.growth -= 80;
            }
        }
    }

    // draw the plant on the canvas
    draw(ctx) {
        // Determine the color of the plant based on its hue and growth level
        let color = hsl(this.hue, 20 + this.growth, 50);

        // Size of the cell
        let size = this.automata.cellSize;

        // Set the fill color and border color for drawing the plant
        ctx.fillStyle = color;
        ctx.strokeStyle = "dark gray";

        // Draw the plant
        ctx.fillRect(this.x * size, this.y * size, size, size);

        // Draw the border of the plant
        ctx.strokeRect(this.x * size, this.y * size, size, size);
    }
}







