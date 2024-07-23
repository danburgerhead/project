document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.querySelector('.yes');
    const noButton = document.querySelector('.no');
    const startScreen = document.querySelector('.start-screen');

    yesButton.addEventListener('click', () => {
        alert('Game Starting...');
        // You can replace this alert with code to transition to the game screen
    });

    noButton.addEventListener('click', () => {
        alert('Maybe next time...');
        // You can replace this alert with code to handle the "No" action
    });
});