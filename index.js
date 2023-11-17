const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2,
    dy: -2,
    bounceCount: 0
};

const bounceCounterElement = document.getElementById("bounceCounter");

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
        ball.bounceCount++;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        ball.bounceCount++;
    }

    bounceCounterElement.textContent = "Bounces: " + ball.bounceCount;
}

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.bounceCount = 0;
    bounceCounterElement.textContent = "Bounces: 0";
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    moveBall();
    requestAnimationFrame(updateGame);
}

document.getElementById("gameCanvas").addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    ball.x = clickX;
    ball.y = clickY;
});

document.getElementById("resetButton").addEventListener("click", function () {
    resetGame();
});

updateGame();