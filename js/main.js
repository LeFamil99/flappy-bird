console.log('Vlad')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const button = document.getElementById('button')

let score = 0;
let highScore = 0;
const gravity = 1
const obstacleSpeed = 3;
const obstacleGap = 160;
const obstacleThickness = 110;
const jumpStrength = 9.2
const playerRadius = 26;
let ingame = false
let flappy = new Image()
flappy.src = 'https://lefamil99.github.io/Flappy2.png'
let pipe = new Image()
pipe.src = 'https://lefamil99.github.io/flappy-bird/pipe.png'

let player //= new Player(gravity, canvas.height, canvas.width, jumpStrength, playerRadius);
let obstacles = [];
//obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, 300, canvas.width, canvas.height, obstacleGap, obstacleThickness))
//obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness + canvas.width / 2, 500, canvas.width, canvas.height, obstacleGap, obstacleThickness))
let dead// = false

const reset = () => {
    //console.log(1)
    player = new Player(gravity, canvas.height, canvas.width, jumpStrength, playerRadius);
    obstacles[0] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, 300, canvas.width, canvas.height, obstacleGap, obstacleThickness)
    obstacles[1] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness + canvas.width / 2, 500, canvas.width, canvas.height, obstacleGap, obstacleThickness)
    dead = false
    ingame = true
    button.style.display = 'none';
    score = 0;
}

const checkCollision = (x, y, r, minX, minY, maxX, maxY) => {
    var dx = Math.max(minX - x, 0, x - maxX);
    var dy = Math.max(minY - y, 0, y - maxY);
    d = Math.sqrt(dx * dx + dy * dy);
    return d < r

}

const death = () => {
    player.death()
    dead = true
    button.style.display = 'block';
    document.getElementById('p').innerHTML = 'Restart'
    highScore = score > highScore ? score : highScore;
}

const update = () => {
    if (ingame) {
        player.update();
        if (!dead) {

            for (let i in obstacles) {
                obstacles[i].update();
                obstacles[i].points(player.x, player.radius)
                if (obstacles[i].x < -(obstacleThickness / 2)) {
                    obstacles[i] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, Math.random() * 520 + 190, canvas.width, canvas.height, obstacleGap, obstacleThickness)
                }
                //letters in canvas
                //console.log(obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)
                if (checkCollision(player.x, player.y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)) {
                    death()
                }
                if (checkCollision(player.x, player.y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, obstacles[i].y + obstacles[i].gap / 2, obstacles[i].x + obstacles[i].thickness / 2, canvas.height)) {
                    death()
                }
                if (player.y >= canvas.height - playerRadius) {
                    death()
                }

            }

        } else {
            obstacles[0].update(false);
            obstacles[1].update(false);
        }
        ctx.fillStyle = 'black';
        ctx.font = "50px Georgia";
        ctx.fillText(String(score), 500, 50);
        ctx.font = "15px Georgia";
        ctx.fillText('High score : ' + String(highScore), 475, 80);
    }
 
    window.requestAnimationFrame(update)
}
update();

document.onkeypress = e => {
    if (!dead && ingame) {
        switch (e.keyCode) {
            case 32:
                player.jump()
                break;
        }
    }
}

document.onmousedown = e => {
    if (!dead && ingame) {
        player.jump()
            
    }
}
