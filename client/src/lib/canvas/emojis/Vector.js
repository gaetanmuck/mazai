export class Vector {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    static random(world) {
        const x = world.minX + Math.random() * (world.maxX - world.minX);
        const y = world.minY + Math.random() * (world.maxY - world.minY);
        return new Vector(x, y);
    }
    
    static mult(vec, rate) {
        return new Vector(vec.x * rate, vec.y * rate)
    }

    static opposite(vec) {
        return Vector.mult(vec, -1)
    }

    static add(vec1, vec2) { 
        return new Vector(vec1.x + vec2.x, vec1.y + vec2.y)
    }

    static sub(vec1, vec2) { 
        return new Vector(vec1.x - vec2.x, vec1.y - vec2.y)
    }

    static mag2(vec) { 
        return vec.x * vec.x + vec.y * vec.y
    }

    static mag(vec) { 
        return Math.sqrt(Vector.mag2(vec))
    }

    static normalize(vec) {
        const size = Vector.mag(vec);
        return new Vector(vec.x / size, vec.y / size);
    }

    static limit(vec, value) {
        if(value == 0) return new Vector(0, 0);
        const rate = Vector.mag(vec) / value;
        if (rate > 1) return Vector.mult(vec, 1 / rate);
        return vec
    }

    static distance(vec1, vec2) {
        const x = (vec1.x - vec2.x) * (vec1.x - vec2.x)
        const y = (vec1.y - vec2.y) * (vec1.y - vec2.y)
        return Math.sqrt(x + y)
    }
}