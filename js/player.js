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
        /*ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();*/
        ctx.save()
        ctx.translate(this.x, this.y );
        ctx.rotate((Math.PI / 180) * (105 * (1 / (1 + Math.exp(-0.7 * (this.yVel - 9.5)))) - 20));
        
        ctx.drawImage(flappy, -(17 / 12) * this.radius, -this.radius, (17 / 12) * this.radius * 2, this.radius * 2)
        ctx.restore();
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