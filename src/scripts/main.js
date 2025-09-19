const button = document.getElementById("jogar");

const estado = {
    view: {
        squares: document.querySelectorAll(".campo"),
        enemy: document.querySelector(".inimigo"),
        timeLeft: document.querySelector("#tempo-restante"),
        score: document.querySelector("#pontuacao"),
    },
    values: {
        timerId: null,
        Timer: 60,
        gameVelocity: 1000, 
        gameTimer: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        countDownTimerId: null,
    }
    
}

function countDown() {
    estado.values.countDownTimerId = setInterval(() => {
        estado.values.currentTime--;
        estado.view.timeLeft.textContent = estado.values.currentTime;

        if (estado.values.currentTime <= 0) {
            alert("Game Over! O seu resultado foi " + estado.values.result);
            estado.values.result = 0; // Resetando a pontuação
            estado.values.hitPosition = null; // Resetando sprite
            estado.view.score.textContent = estado.values.result // Atualizando Score
            clearInterval(estado.values.countDownTimerId);
            clearInterval(estado.values.timerId);
            estado.values.currentTime = estado.values.Timer;
        }
    }, estado.values.gameTimer);
}

// função para randomizar a janela que o Ralph vai aparecer
function randomSquare() {
    estado.view.squares.forEach((square) => {
        square.classList.remove("inimigo");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = estado.view.squares[randomNumber];
    randomSquare.classList.add("inimigo");
    estado.values.hitPosition = randomSquare.id

}

// função para movimentar o Ralph
function moveEnemy() {
    estado.values.timerId = setInterval(randomSquare, estado.values.gameVelocity)
}

// função para verificar se o Ralph está na janela clicada e armazena pontuação
function addListenerHitBox(){
    estado.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === estado.values.hitPosition) {
                estado.values.result++
                estado.view.score.textContent = estado.values.result
                estado.values.hitPosition = null;
            }
        })
    })
}

function play() {
    addListenerHitBox();
    moveEnemy();
    countDown();
}

button.addEventListener("click", () => {
    play();
})