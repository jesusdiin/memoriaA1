let jwtToken = null;
let currentUser = null;

document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "http://localhost:3001/auth/facebook";
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("token")) {
  jwtToken = urlParams.get("token");
  localStorage.setItem("token", jwtToken);
  history.replaceState(null, null, window.location.pathname); 

  fetchUserData();
} else {
  jwtToken = localStorage.getItem("token");
  if (jwtToken) fetchUserData();
}

async function fetchUserData() {
  try {
    const response = await fetch("http://localhost:3001/auth/me", {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    if (!response.ok) throw new Error("No autorizado");

    currentUser = await response.json();
    document.getElementById("loginBtn").textContent = `👤 ${currentUser.name}`;
    document.getElementById("loginBtn").disabled = true;
  } catch (e) {
    console.error("Error al obtener el usuario", e);
    jwtToken = null;
    localStorage.removeItem("token");
  }
}


    const allImages = [
      "https://i.imgur.com/PLnNFRY.jpeg", // efecto explosión 💥
      "https://i.imgur.com/xksxztO.jpeg", // texto A1
      "https://i.imgur.com/J8sPTJQ.jpeg",
      "https://i.imgur.com/x96IVje.jpeg", // bandera LGBT 🌈
      "https://i.imgur.com/iYz3DLj.jpeg", // BANEADO
      "https://i.imgur.com/HgPrKpC.jpeg",
      "https://i.imgur.com/ZIerSUG.jpeg", // reemplazo y efecto luna 🌙
      "https://i.imgur.com/EuvCj1h.jpeg",
      "https://i.imgur.com/YsLeKS4.jpeg",
      "https://i.imgur.com/lcvEpgv.jpeg",
      "https://i.imgur.com/LUfXWbK.jpeg", // texto SIMP
      "https://i.imgur.com/c8Z49ZJ.jpeg"  // emoji hongo 🍄
    ];

    const TOTAL_NIVELES = 6;
    let nivelActual = 1;
    let cards = [], firstCard = null, secondCard = null, lockBoard = false;
    let matchedPairs = 0;
    let startTime = null, timerInterval = null;
    let totalTimeLimit = 150; // segundos

    const board = document.getElementById("game-board");
    const timerDisplay = document.getElementById("timer");
    const nivelDisplay = document.getElementById("nivelActual");
    const nombreInput = document.getElementById("nombreJugador");

    // Sonidos
    const flipSound = document.getElementById("flipSound");
    const matchSound = document.getElementById("matchSound");
    const winSound = document.getElementById("winSound");
    const endSound = document.getElementById("endSound");

    function startTimer() {
      if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          timerDisplay.textContent = `Tiempo: ${elapsed}s`;

          if (elapsed >= totalTimeLimit) {
            clearInterval(timerInterval);
            endGame(false);
          }
        }, 1000);
      }
    }

    function stopTimer() {
      clearInterval(timerInterval);
      return Math.floor((Date.now() - startTime) / 1000);
    }

    function createCard(image) {
      const card = document.createElement("div");
      card.classList.add("card");

      const front = document.createElement("div");
      front.classList.add("front");

      const back = document.createElement("div");
      back.classList.add("back");
      back.style.backgroundImage = `url(${image})`;

      card.appendChild(front);
      card.appendChild(back);

      card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flip")) return;

        try {
          flipSound.play();
        } catch (e) {
          console.warn("Audio no permitido aún", e);
        }


        card.classList.add("flip");
        if (!startTime) startTimer();

        if (!firstCard) {
          firstCard = card;
        } else {
          secondCard = card;
          checkMatch();
        }
      });

      return card;
    }

    function showEffect(card, content) {
      const overlay = document.createElement("div");
      overlay.className = "effect-overlay";
      overlay.textContent = content;
      card.appendChild(overlay);
      setTimeout(() => {
        overlay.remove();
      }, 2000);
    }

    function showEmojiEffect(card, emoji) {
      const overlay = document.createElement("div");
      overlay.className = "effect-overlay";
      overlay.textContent = emoji;
      overlay.style.color = "black";
      overlay.style.fontSize = "36px";
      card.appendChild(overlay);
      setTimeout(() => {
        overlay.remove();
      }, 2000);
    }

    function checkMatch() {
      lockBoard = true;
      const img1 = firstCard.querySelector(".back").style.backgroundImage;
      const img2 = secondCard.querySelector(".back").style.backgroundImage;

      if (img1 === img2) {
        matchedPairs++;
        matchSound.play();

        // Efectos especiales por imagen
        if (img1.includes("PLnNFRY.jpeg")) {
          showEmojiEffect(firstCard, "💥");
          showEmojiEffect(secondCard, "💥");
        } else if (img1.includes("xksxztO.jpeg")) {
          showEffect(firstCard, "A1");
          showEffect(secondCard, "A1");
        } else if (img1.includes("x96IVje.jpeg")) {
          showEmojiEffect(firstCard, "🏳️‍🌈");
          showEmojiEffect(secondCard, "🏳️‍🌈");
        } else if (img1.includes("iYz3DLj.jpeg")) {
          // BANEADO
          [firstCard, secondCard].forEach((card) => {
            card.innerHTML = "";
            const texto = document.createElement("div");
            texto.textContent = "BANEADO";
            texto.style.color = "red";
            texto.style.fontWeight = "bold";
            texto.style.fontSize = "18px";
            texto.style.display = "flex";
            texto.style.justifyContent = "center";
            texto.style.alignItems = "center";
            texto.style.height = "100%";
            card.appendChild(texto);
          });
        } else if (img1.includes("ZIerSUG.jpeg")) {
          showEmojiEffect(firstCard, "🌙");
          showEmojiEffect(secondCard, "🌙");
        } else if (img1.includes("LUfXWbK.jpeg")) {
          showEffect(firstCard, "SIMP");
          showEffect(secondCard, "SIMP");
        } else if (img1.includes("c8Z49ZJ.jpeg")) {
          showEmojiEffect(firstCard, "🍄");
          showEmojiEffect(secondCard, "🍄");
        }

        resetTurn();

        if (matchedPairs === cards.length / 2) {
            if (nivelActual === TOTAL_NIVELES) {
                endGame(true); 
            } else {
                nivelActual++;
                setTimeout(() => {
                loadLevel(nivelActual);
                }, 1000);
            }
        }

      } else {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          resetTurn();
        }, 800);
      }
    }

    function resetTurn() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }

async function saveScore(seconds) {
  if (!jwtToken || !currentUser) return;

  try {
    const res = await fetch("http://localhost:3001/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
      body: JSON.stringify({ tiempo: seconds })
    });

    if (!res.ok) throw new Error("Error al guardar");

    const data = await res.json();
    console.log("Score guardado:", data);
  } catch (e) {
    console.error("Error guardando score:", e);
  }
}

  async function loadTopScores() {
  try {
    const res = await fetch("http://localhost:3001/scores");
    const scores = await res.json();

    const list = document.getElementById("score-list");
    list.innerHTML = "";

    scores.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = `${s.user.name}: ${s.tiempo} segundos`;
      list.appendChild(li);
    });
  } catch (e) {
    console.error("Error cargando scores", e);
  }
}


    function loadLevel(nivel) {
      nivelDisplay.textContent = `Nivel ${nivel} de ${TOTAL_NIVELES}`;

      let paresPorNivel = [4,5,6,7,8,12];
      const nivelPares = paresPorNivel[nivel - 1];
      const selectedImages = allImages.slice(0, nivelPares);

      cards = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());
      board.innerHTML = "";
      matchedPairs = 0;
      firstCard = null;
      secondCard = null;
      lockBoard = false;

      cards.forEach(image => board.appendChild(createCard(image)));

      if (!startTime) startTimer();
    }

function endGame(won) {
  lockBoard = true;
  const finalTime = stopTimer();

  if (jwtToken && currentUser) {
    saveScore(finalTime);
  }

  if (won) {
    alert("🎉 Eres Todo Un Unificador 🎉");
  } else {
    alert("😞 No Pudiste unificarlas 😞");
  }

  loadTopScores(); 
}



function init() {
  nivelActual = 1;
  startTime = null;
  clearInterval(timerInterval);
  timerDisplay.textContent = "Tiempo: 0s";
  loadLevel(nivelActual);
  loadTopScores();
  document.getElementById("startBtn").style.display = "none"; // ocultar botón
}



    init();
