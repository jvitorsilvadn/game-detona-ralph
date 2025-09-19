const button = document.getElementById("jogar");

const estado = {
  view: {
    squares: document.querySelectorAll(".campo"),
    timeLeft: document.querySelector("#tempo-restante"),
    score: document.querySelector("#pontuacao"),
  },
  values: {
    timerId: null,
    countDownTimerId: null,
    gameDuration: 60,       // Tempo total da partida
    gameVelocity: 1000,     // Velocidade que o inimigo aparece
    hitPosition: null,
    result: 0,
    currentTime: 60,
    isPlaying: false,       // Evita múltiplos jogos rodando ao mesmo tempo
  },
};

function playSound(audioname) {
    let audio = new Audio(`./src/audios/${audioname}`);
    audio.volume = 0.2;
    audio.play();
}

// Atualiza a interface do tempo e placar
function updateView() {
  estado.view.timeLeft.textContent = estado.values.currentTime;
  estado.view.score.textContent = estado.values.result;
}

// Reseta os valores do jogo
function resetGame() {
  clearInterval(estado.values.timerId);
  clearInterval(estado.values.countDownTimerId);
  estado.values.result = 0;
  estado.values.hitPosition = null;
  estado.values.currentTime = estado.values.gameDuration;
  estado.values.isPlaying = false;
  updateView();
}

// Contagem regressiva
function countDown() {
  estado.values.countDownTimerId = setInterval(() => {
    estado.values.currentTime--;
    updateView();

    if (estado.values.currentTime <= 0) {
      alert(`⏳ Game Over! Sua pontuação foi: ${estado.values.result}`);
      playSound("gameOver.mp3");
      resetGame();
    }
  }, 1000);
}

// Escolhe posição aleatória para o inimigo
function randomSquare() {
  estado.view.squares.forEach((square) => {
    square.classList.remove("inimigo");
  });

  const randomIndex = Math.floor(Math.random() * estado.view.squares.length);
  const chosenSquare = estado.view.squares[randomIndex];

  chosenSquare.classList.add("inimigo");
  estado.values.hitPosition = chosenSquare.id;
}

// Move o inimigo constantemente
function moveEnemy() {
  estado.values.timerId = setInterval(randomSquare, estado.values.gameVelocity);
}

// Adiciona evento de clique nas janelas
function addListenerHitBox() {
  estado.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === estado.values.hitPosition) {
        estado.values.result++;
        estado.values.hitPosition = null;
        playSound("hit.m4a")
        updateView();
      }
    });
  });
}

// Inicia o jogo
function play() {
  if (estado.values.isPlaying) return; // evita múltiplos jogos
  estado.values.isPlaying = true;

  resetGame(); // garante que começa do zero
  addListenerHitBox();
  moveEnemy();
  countDown();
}

button.addEventListener("click", play);
