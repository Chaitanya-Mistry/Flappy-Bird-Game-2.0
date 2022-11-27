const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole");
const gameInstructions = document.getElementById("gameInstructions");
const gameContainer = document.getElementById("gameContainer");
const gameOver = document.getElementById("gameOver");
const playGameBtn = document.getElementById("playGameBtn");
const playersList = document.getElementById("playersList");

// Audio file Provided by https://mixkit.co/ 🔥
// Game over Audio 🔊
const playSound = document.createElement("audio");

// Player jump Audio 🔊
const playerJumpSound = document.createElement("audio");

let selectedPlayer = "";

player.style.display = "none";
obstacle.style.display = "none";
hole.style.display = "none";

// Game Background 
const changeGameBackground = (background) => {
    if (background === "vampire") {
        gameContainer.style.backgroundImage = "url('https://img.freepik.com/free-vector/space-game-background-neon-night-alien-landscape_107791-1624.jpg?w=1380&t=st=1669512771~exp=1669513371~hmac=0564b156901e2c14b92f5cabd4f5a7e834c2883c78165ade399ee0cc78d58918')";
    } else if (background === "space") {
        gameContainer.style.backgroundImage = "url('https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds_181624-11068.jpg?w=1380&t=st=1669513793~exp=1669514393~hmac=f4667459abe54f3fbb9b93202cffb4a61383ac548ce23bf912e2e5ec483f67d2')";
    } else if (background === "zombie") {
        gameContainer.style.backgroundImage = "url('https://img.freepik.com/free-vector/game-landscape-with-tree-with-green-dripping-slime_107791-12220.jpg?w=1380&t=st=1669514118~exp=1669514718~hmac=9168c0a490d39e5cbb996ccd1840336b778b137fc087962d778fb55147ce75c8')";
    } else if (background === "smile_cool") {
        gameContainer.style.backgroundImage = "url('https://img.freepik.com/free-vector/hot-air-balloons-flying-fields-rocks_107791-7872.jpg?w=1380&t=st=1669514204~exp=1669514804~hmac=9b60c36c1172e557abd1e9a8e3dbdf138511da661e1131b7f35c3442d1485445')";
    } else{
        gameContainer.style.backgroundImage = "url('https://img.freepik.com/free-vector/air-balloon-flying-sea-water-night-sky-with-full-moon-stars-clouds-scenery-background-aerial-travel-with-beautiful-ocean-landscape-view-journey-adventure-cartoon-vector-illustration_107791-8822.jpg?w=1380&t=st=1669514628~exp=1669515228~hmac=efb04f5902c72089281f9ff6020202aa5f784314cb4ab1a0b5f04526fdd0c98b')";
    }
}
// Player Selection 🤾‍♀️
const handlePlayerSelection = (event) => {
    if ((event.target.textContent).length < 10) {
        // Dynamically change background image based on user's player choice ... 🔥
        changeGameBackground(event.target.className);
        // if user chooses new player then deselect old player
        if (selectedPlayer) {
            selectedPlayer.style.transform = "scale(1)";
        }
        // Current player
        event.target.style.transform = "scale(2)";
        selectedPlayer = event.target; // Store selected player
        player.innerHTML = selectedPlayer.textContent;
    }
}

function attachClickEvents() {
    playersList.addEventListener("click", handlePlayerSelection);

    playGameBtn.addEventListener("click", () => {
        if (!selectedPlayer) {
            alert("Please select a player 🙄");
            window.location.reload();
        } else {
            startGame();
        }
    }, { once: true });
}

attachClickEvents();

// Start the Game 🏁
function startGame() {
    let score = 0;
    let gravity = 10;
    let isPlayerJumping = false;

    gameInstructions.style.display = "none"; // Hide instructions

    // Player jump 🤾‍♂️
    const playerJump = (event) => {
        if (event.key === "ArrowUp" || event.type === "click") {
            isPlayerJumping = true; // Update player jump state
            playerJumpSound.src = "./Public/Sound_Effects/mixkit-player-jumping-in-a-video-game-2043.wav";
            playerJumpSound.play().catch((err) => console.log(err));
            // Disable player jumping effect so user needs to press Arrow key ⬆️ or Click  continuously ...
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

    // Hole position change dynamically on each animation ...
    hole.addEventListener("animationiteration", () => {
        const randomPosition = Math.random() * 69;
        hole.style.top = `${randomPosition}vh`;
        score = score + 1;
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
            stopGame(score);
        }
        // Player Collide Detection 🥶
        else if ((playerLeftPosition >= obstacleLeftPosition - 30) && (!(playerTop > holeTop && playerBottom > holeBottom)) && playerLeftPosition < obstacleLeftPosition + 5) {
            clearInterval(playerFall);
            stopGame(score);
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
const stopGame = (gameScore) => {
    gameOver.style.display = "block";
    // Gameover sound ...
    playSound.src = "./Public/Sound_Effects/mixkit-player-losing-or-failing-2042.wav";
    playSound.play();
    gameOver.innerHTML = `Your score is : ${gameScore} 😃<br></br>`;
    gameInstructions.style.display = "flex";
    player.style.display = "none";
    hole.style.display = "none";
    obstacle.style.display = "none";

    attachClickEvents();
};