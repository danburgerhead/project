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
        newGame.src = src="2048.html";
        document.getElementById("arcade-screen").appendChild(newGame);
    });

    noButton.addEventListener('click', () => {
        alert('Maybe next time...');
        // You can replace this alert with code to handle the "No" action
    });
});