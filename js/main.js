console.log('Vlad')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const button = document.getElementById('button')

let score = 0;
let highScore = 0;
const gravity = 1
const obstacleSpeed = 3;
const obstacleGap = 165;
const obstacleThickness = 130;
const jumpStrength = 9.2
const playerRadius = 25;
const numPlayer = 1;
let deathCount = 0;
let ingame = false
let flappy = new Image()
flappy.src = 'https://lefamil99.github.io/Flappy2.png'
let pipe = new Image()
pipe.src = 'https://lefamil99.github.io/flappy-bird/pipe.png'

let player = []//= new Player(gravity, canvas.height, canvas.width, jumpStrength, playerRadius);
let obstacles = [];
//obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, 300, canvas.width, canvas.height, obstacleGap, obstacleThickness))
//obstacles.push(new Obstacle(obstacleSpeed, canvas.width + obstacleThickness + canvas.width / 2, 500, canvas.width, canvas.height, obstacleGap, obstacleThickness))
let dead// = false

const reset = () => {
    //console.log(1)
    player = [];
    for (let i = 0; i < numPlayer; i++) {
        player.push(new Player(gravity, canvas.height, canvas.width, jumpStrength, playerRadius, i));

    }
    obstacles[0] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, 300, canvas.width, canvas.height, obstacleGap, obstacleThickness)
    obstacles[1] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness + canvas.width / 2, 500, canvas.width, canvas.height, obstacleGap, obstacleThickness)
    dead = false
    ingame = true
    button.style.display = 'none';
    score = 0;
    deathCount = 0;
}

const checkCollision = (x, y, r, minX, minY, maxX, maxY) => {
    var dx = Math.max(minX - x, 0, x - maxX);
    var dy = Math.max(minY - y, 0, y - maxY);
    d = Math.sqrt(dx * dx + dy * dy);
    return d < r

}

const death = (i) => {
    player[i].death()
    deathCount++
    console.log(deathCount, numPlayer)
    if (deathCount >= numPlayer) {
        dead = true
        button.style.display = 'block';
        document.getElementById('p').innerHTML = 'Restart'
        highScore = score > highScore ? score : highScore;
    }
}

var d = new Date();
var milli = d.getMilliseconds();
let frameLength

const update = () => {
    d = new Date();
    frameLength = (d.getMilliseconds() - milli) / 17
    if (frameLength < 0) frameLength = (d.getMilliseconds() + 1000 - milli) / 17
    if (frameLength < 0.5) console.log(frameLength)
    milli = d.getMilliseconds();
    for (let i in player)
        player[i].update();

    if (ingame) {
        if (!dead) {
            for (let i in obstacles) {
                obstacles[i].update();
                obstacles[i].points(player[0].x, player[0].radius)
                for (let j in player) {
                    if (obstacles[i].x < -(obstacleThickness / 2)) {
                        obstacles[i] = new Obstacle(obstacleSpeed, canvas.width + obstacleThickness / 2, Math.random() * 520 + 190, canvas.width, canvas.height, obstacleGap, obstacleThickness)
                    }
                    //letters in canvas
                    //console.log(obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)
                    if (checkCollision(player[j].x, player[j].y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, 0, obstacles[i].x + obstacles[i].thickness / 2, obstacles[i].y - obstacles[i].gap / 2)) {
                        death(j)
                    }
                    if (checkCollision(player[j].x, player[j].y, playerRadius, obstacles[i].x - obstacles[i].thickness / 2, obstacles[i].y + obstacles[i].gap / 2, obstacles[i].x + obstacles[i].thickness / 2, canvas.height)) {
                        death(j)
                    }
                    if (player[j].y >= canvas.height - playerRadius) {
                        death(j)
                    }
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
                player[0].jump()
                break;
        }
    }
}

document.onmousedown = e => {
    if (!dead && ingame) {
        player[0].jump()
            
    }
}
