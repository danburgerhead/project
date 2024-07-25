document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.querySelector('.yes');
    const noButton = document.querySelector('.no');
    const startScreen = document.querySelector('.start-screen');

    yesButton.addEventListener('click', () => {
        alert('Game Starting...');
        // You can replace this alert with code to transition to the game screen
        let newGame = document.createElement("iframe");
        newGame.id = "game";
        newGame.style.border = "0px solid";
        newGame.src = games[currentGame].toLowerCase() + ".html";
        document.getElementById("arcade-screen").appendChild(newGame);
    });

    noButton.addEventListener('click', () => {
        alert('Maybe next time...');
        // You can replace this alert with code to handle the "No" action
    });
    
    let games = ["2048","Ball","Snake"]
    let currentGame = 0;
    document.getElementById("GameText").textContent = games[currentGame];
    document.getElementById("rightButton").addEventListener('click', () => {
        currentGame++;
        if (currentGame >= games.length) {
            currentGame = 0;
        }
        document.getElementById("GameText").textContent = games[currentGame];
    })
    document.getElementById("leftButton").addEventListener('click', () => {
        currentGame--;
        if (currentGame < 0) {
            currentGame = games.length;
        }
        document.getElementById("GameText").textContent = games[currentGame];
    })
    document.getElementById("joystick").addEventListener('click', () => {
        document.getElementById("game").remove();
    })
});