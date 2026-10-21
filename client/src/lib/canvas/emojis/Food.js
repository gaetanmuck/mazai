import { Vector } from "./Vector"


export class Food {

    static CREATION_RATE = 0.03; // Chance of getting a new random food, each frame
    static MASS = 2; // Food mass

    static createRandom(world) {
        const food = new Food(world, Vector.random(world))
        world.things.push(food)
    }

    static foodGeneration(world) {
        if (Math.random() < Food.CREATION_RATE) this.createRandom(world)
    }

    constructor(world, position, mass=Food.MASS) {
        this.is = 'food'

        this.world = world;
        this.position = position;
        this.alive = true;

        this.mass = mass
        this.age = 0
    }

    next() {
        this.age++
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.font = '12px serif';
        ctx.fillText('🍕', this.position.x, this.position.y);
    }

    drawSelected(canvas, ctx) {
        // Make the selection visible
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2)
        ctx.stroke()

        // display information about selection
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Helvetica';
        ctx.fillText('Food', canvas.width - 10, 10);
        ctx.fillText('Age: ' + this.age, canvas.width - 10, 25);
        ctx.fillText('Mass: ' + this.mass, canvas.width - 10, 40);
    }
}