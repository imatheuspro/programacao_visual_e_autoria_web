const startScreen = document.getElementById('startScreen');


  // Detecta qualquer tecla
  window.addEventListener('keydown', () => {
    iniciarJogo();
  }, { once: true }); // garante que só executa uma vez
  function iniciarCena() {
    console.log("Jogo iniciado!");
    window.location.href= "Echos.html";
  }

  function iniciarJogo() {
    // Faz o fade-out da tela inicial
    startScreen.classList.add('fade-out');


    // Depois do fade-out, inicia o jogo
    setTimeout(() => {
      startScreen.style.display = 'none';
      iniciarCena(); // Chama a função que vai iniciar o jogo
    }, 1000);
  }


