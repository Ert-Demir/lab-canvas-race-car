window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = 500;
  canvas.height = 700;

  // Load images
  const roadImg = new Image();
  roadImg.src = "./images/road.png";

  const carImg = new Image();
  carImg.src = "./images/car.png";

  // Variables
  let x = 200;
  let y = 580;
  let dx = 0;
  let roadY = 0;
  let speed = 2;
  let score = 0;
  let obstacles = [];

  // Event listeners
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && x > 40) {
      dx = -10;
    } else if (event.code === "ArrowRight" && x < 360) {
      dx = 10;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      dx = 0;
    }
  });

  // Functions
  function draw() {
    // Draw road
    ctx.drawImage(roadImg, 0, roadY, canvas.width, canvas.height);

    // Move road
    roadY += speed;
    if (roadY > canvas.height) {
      roadY = 0;
    }

    // Draw car
    ctx.drawImage(carImg, x, y, 80, 120);

    // Move car
    x += dx;

    // Draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      obstacle.y += speed;
      ctx.fillStyle = "#870007";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      // Check collision
      if (
        obstacle.y < y + 120 &&
        obstacle.y + obstacle.height > y &&
        obstacle.x < x + 80 &&
        obstacle.x + obstacle.width > x
      ) {
        endGame();
      }

      // Remove obstacle if off screen
      if (obstacle.y > canvas.height) {
        obstacles.splice(i, 1);
        score++;
      }
    }

    // Add new obstacle
    if (Math.random() < 0.02) {
      const obstacle = {
        x: Math.random() * 400 + 50,
        y: 0,
        width: Math.random() * 50 + 50,
        height: Math.random() * 50 + 50,
      };
      obstacles.push(obstacle);
    }

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 60, 50);

    // Request next frame
    requestAnimationFrame(draw);
  }

  function startGame() {
    document.getElementById("game-board").style.display = "block";
    document.querySelector(".game-intro").style.display = "none";
    draw();
  }

  function endGame() {
    alert(`Game over! Your score is ${score}.`);
    location.reload();
  }

  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};
