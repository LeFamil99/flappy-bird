// JavaScript source code
class Player {
    constructor(gravity, height, width, jumps, radius) {
        this.width = width;
        this.gravity = gravity;
        this.height = height;
        this.jumps = jumps;
        this.radius = radius;
        this.yVel = 0;
        this.y = height / 2;
        this.x = width / 2.5;
        this.color = 'yellow'
    }

    update() {
        this.yVel += gravity / 2
        this.y = this.y < this.height - this.radius ? this.y + this.yVel : this.y = this.height - this.radius;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        //console.log(this.x, this.y)
    }

    jump() {
        this.yVel = -this.jumps;
    }

    death() {
        this.yVel = 0
        this.color = 'red'
    }


}