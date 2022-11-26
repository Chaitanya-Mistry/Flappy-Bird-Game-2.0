const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole");
const gameInstructions = document.getElementById("gameInstructions");
const gameOver = document.getElementById("gameOver");
const playGameBtn = document.getElementById("playGameBtn");
const playersList = document.getElementById("playersList");

playersList.addEventListener("click",handlePlayerSelection);

playGameBtn.addEventListener("click",()=>{
    
});

player.style.display = "none";
obstacle.style.display = "none";
hole.style.display = "none";


// Start the Game 🏁
function startGame() {
    let gravity = 10;
    let isPlayerJumping = false;

    gameInstructions.style.display = "none"; // Hide instructions

    // Player jump 🤾‍♂️
    const playerJump = (event) => {
        if (event.key === "ArrowUp" || event.type === "click") {
            isPlayerJumping = true; // Update player jump state

            // Disable player jumping effect so user needs to press Arrow key ⬆️ or Click  continuously 😆 ...
            setTimeout(() => {
                isPlayerJumping = false;
            }, 200);
        }
    }

    document.addEventListener("keyup", playerJump); // For keyboard event
    document.addEventListener("click", playerJump); // For mouse click event

    // Show player & Obstacles
    player.style.top = "";
    player.style.display = "block";
    obstacle.style.display = "block";
    hole.style.display = "block";
    const playerLeftPosition = parseInt(window.getComputedStyle(player).left.split("px")[0]);

    // Hole position change dynamically ...
    hole.addEventListener("animationiteration", () => {
        const randomPosition = Math.random() * 69;
        hole.style.top = `${randomPosition}vh`;
    });

    // Player gravity effect 🔥
    let playerFall = setInterval(() => {
        var playerTop = parseInt(window.getComputedStyle(player).top.split("px")[0]);
        var playerBottom = parseInt(window.getComputedStyle(player).bottom.split("px")[0]);
        var obstacleLeftPosition = parseInt(window.getComputedStyle(obstacle).left.split("px")[0]);
        var holeTop = parseInt(window.getComputedStyle(hole).top.split("px")[0]);
        var holeBottom = parseInt(window.getComputedStyle(hole).bottom.split("px")[0]);

        // Player Collide detection to the bottom of the screen 📉
        if (playerTop == window.innerHeight - 48) {
            clearInterval(playerFall);
            stopGame(true);
        }
        // Player Collide Detection 🥶
        else if ((playerLeftPosition >= obstacleLeftPosition - 30) && (!(playerTop > holeTop && playerBottom > holeBottom)) && playerLeftPosition < obstacleLeftPosition + 5) {
            clearInterval(playerFall);
            stopGame(true);
        }
        // Player Jumping 
        else if (!isPlayerJumping) {
            player.style.top = `${playerTop + 2}px`;
        } else {
            player.style.top = `${playerTop - 6}px`;
        }
    }, gravity);
}

// Stop the game 🛑
const stopGame = (isGameOver) => {
    if (isGameOver) {
        gameOver.style.display = "block";
        gameOver.innerText = `Your score is : ${score} 😃`;
        gameInstructions.style.display = "flex";
        player.style.display = "none";
        hole.style.display = "none";
        obstacle.style.display = "none";
    }
};

