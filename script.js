// Game states\
let SCORE = 0;
let jump = 60;
let bird_position = 200;
let gravity = 5;
let pipes = [...document.querySelectorAll(".pipe")];
let bird = document.querySelector(".bird");
let score = document.querySelector(".score span");
function play() {
    setInterval(() => {
        const randomHeight = Math.floor(Math.random() * 50) + 5;
        pipes[1].style.height = `${randomHeight}%`;
        pipes[0].style.height = `${100 - (randomHeight + 20)}%`;
        pipes[0].style.top = `${randomHeight + 20}%`;
        SCORE += 1;
    }, 4000);
    setInterval(() => {
        bird.style.top = `${bird_position}px`;
        score.innerText = SCORE;
    }, 100);
    setInterval(() => {
        bird_position += gravity;
        if (bird_position >= 550) gameOver();
        if (bird_position <= 0) bird_position = 0;
        if (collided(bird, pipes[0]) || collided(bird, pipes[1])) gameOver();
    }, 100);
    window.addEventListener('keydown', function(e) {
        if (e.code !== 'Space') return;
        bird_position -= jump;
    })
}
function collided(source, target) {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return (
        sourceRect.right >= targetRect.left &&
        sourceRect.left <= targetRect.right &&
        sourceRect.bottom >= targetRect.top &&
        sourceRect.top <= targetRect.bottom
    );
}
function gameOver() {
    window.location.reload();
}
window.onload = play;



