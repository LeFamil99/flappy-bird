class Obstacle {
    constructor(speed, x, y, width, height, gap, thickness) {
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.thickness = thickness;
        this.point = false;
    }

    update(move = true) {
        if (!move) {
            this.speed = this.speed < 0.1 ? 0: 0 //this.speed - 0.1
        }
        this.x -= this.speed
        
        ctx.beginPath();
        ctx.rect(this.x - this.thickness / 2, 0, this.thickness, this.y - this.gap / 2)
        ctx.rect(this.x - this.thickness / 2, this.y + this.gap / 2, this.thickness, this.height-(this.y + this.gap / 2))
        ctx.fillStyle = "green";
        ctx.fill();
    }

    points(playerX, radius) {
        if (this.x + this.thickness / 2 < playerX - radius && !this.point) {
            score++;
            this.point = true
            console.log(score)
        }
    }
}