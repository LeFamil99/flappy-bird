// JavaScript source code
console.log('Vlad')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

score = 0;
const gravity = 1
const obstacleSpeed = 3;
const obstacleGap = 159;
const obstacleThickness = 95;
const jumpStrength = 9.2
const playerRadius = 20;
const player = new Player(gravity, canvas.height, canvas.width, jumpStrength, playerRadius);
let obstacles = [];
obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, 300, canvas.width, canvas.height, obstacleGap, obstacleThickness))
obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness + canvas.width / 2, 500, canvas.width, canvas.height, obstacleGap, obstacleThickness))
let dead = false

const checkCollision = (x, y, r, minX, minY, maxX, maxY) => {
    var dx = Math.max(minX - x, 0, x - maxX);
    var dy = Math.max(minY - y, 0, y - maxY);
    d = Math.sqrt(dx * dx + dy * dy);
    return d < r

}

const update = () => {
    player.update();
    if (!dead) {

        for (let i in obstacles) {
            obstacles[i].update();
            obstacles[i].points(player.x, player.radius)
            if (obstacles[i].x < -(obstacleThickness / 2)) {
                obstacles[i] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, Math.random() * 620 + 140, canvas.width, canvas.height, obstacleGap, obstacleThickness)
            }
            //letters in canvas
            //console.log(obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)
            if (checkCollision(player.x, player.y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)) {
                player.death()
                dead = true
            }
            if (checkCollision(player.x, player.y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, obstacles[i].y + obstacles[i].gap / 2, obstacles[i].x + obstacles[i].thickness / 2, canvas.height)) {
                player.death()
                dead = true
            }
            if (player.y >= canvas.height - playerRadius - 1) {
                player.death()
                dead = true
            }
        }

    } else {
        obstacles[0].update(false);
        obstacles[1].update(false);
    }
    ctx.fillStyle = 'black';
    ctx.font = "50px Georgia";
    ctx.fillText(String(score), 500, 50);
 
    window.requestAnimationFrame(update)
}
update();

document.onkeypress = e => {
    if (!dead) {
        switch (e.keyCode) {
            case 32:
                player.jump()
                break;
        }
    }
}


