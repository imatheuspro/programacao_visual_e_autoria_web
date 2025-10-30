// =====================
// MAPA
// =====================
let mapaImage = new Image();
let mapaCarregado = false;
let mapaPronto = false;
let mapaVelocidade = 0.5;
let offset = 0;

mapaImage.src = "Sprites/Mapa/mapa222.png";

function desenharPlataformas() {
  ctx.fillStyle = "#654321"; // cor marrom para o chão
  for (let p of plataformas) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }
}

mapaImage.onload = () => {
  mapaCarregado = true;
  console.log("Mapa carregado!");
  tentarIniciar();
};

// Desenha o fundo
function desenharMapa() {
  ctx.drawImage(mapaImage, 0, 0, canvas.width, canvas.height);
}

function atualizarMapa() {
  offset += mapaVelocidade;
}

// =====================
// INÍCIO DO JOGO
// =====================
let player; // jogador global

function iniciarMapa() {
  // Quando inimigos estiverem prontos, chamamos tentarIniciar()
  window.onInimigosProntos = tentarIniciar;
}

function tentarIniciar() {
  if (mapaCarregado && inimigosCarregados === 3 && !mapaPronto) {
    console.log("Tudo carregado, iniciando jogo!");
    addEnemies();

    // cria o player
    player = new Player(100, canvas.height - 100);
    player.setCharacter(charmanderImg, charmanderFrames);

    mapaPronto = true;
    loopMapa();
  }
}

// =====================
// HUD
// =====================
function desenharHUD() {
  const barWidth = 150;
  const barHeight = 20;
  const x = 20;
  const y = 20;

  // proporção da barra
  const ratio = player.hp / player.maxHp;

  // cor da barra
  let color = "green";
  if (player.hp === 2) color = "yellow";
  if (player.hp === 1) color = "red";

  // fundo da barra
  ctx.fillStyle = "gray";
  ctx.fillRect(x, y, barWidth, barHeight);

  // preenchimento
  ctx.fillStyle = color;
  ctx.fillRect(x, y, barWidth * ratio, barHeight);

  ctx.strokeStyle = "black";
  ctx.strokeRect(x, y, barWidth, barHeight);

  // desenhar pokébolas
  for (let i = 0; i < 3; i++) {
    if (i < player.lives) {
      ctx.drawImage(pokeballImg, x + i * 40, y + 40, 30, 30);
    } else {
      ctx.save();
      ctx.filter = "grayscale(100%)";
      ctx.drawImage(pokeballImg, x + i * 40, y + 40, 30, 30);
      ctx.restore();
    }
  }
}

function desenharBarraHP() {
  const barWidth = 150;
  const barHeight = 20;
  const x = 20;
  const y = 20;

  const ratio = player.hp / player.maxHp;

  let color = "green";
  if (player.hp === 2) color = "yellow";
  if (player.hp === 1) color = "red";

  ctx.fillStyle = "gray";
  ctx.fillRect(x, y, barWidth, barHeight);

  if (ratio > 0) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth * ratio, barHeight);
  }

  ctx.strokeStyle = "black";
  ctx.strokeRect(x, y, barWidth, barHeight);
}

// =====================
// LOOP PRINCIPAL
// =====================
function loopMapa() {
  requestAnimationFrame(loopMapa);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  atualizarMapa();
  desenharMapa();
 desenharPlataformas();

  // Player
  handlePlayerMovement();
  player.update();
  player.draw();

  // Inimigos
  for (let e of enemies) {
    e.update();
    e.draw();
  }

  // Colisão projétil ↔ inimigo
  for (const proj of player.projectiles) {
    for (const enemy of enemies) {
      if (!enemy.alive) continue;

      const hb = enemy.getHitbox();
      if (
        proj.x < hb.x + hb.w &&
        proj.x + proj.size > hb.x &&
        proj.y < hb.y + hb.h &&
        proj.y + proj.size > hb.y
      ) {
        proj.destroyed = true;
        enemy.DanoInimigo(1);
      }
    }
  }

  // Colisão player ↔ inimigo
  for (const enemy of enemies) {
    if (!enemy.alive) continue;

    const hb = enemy.getHitbox();
    if (
      player.x < hb.x + hb.w &&
      player.x + player.width > hb.x &&
      player.y < hb.y + hb.h &&
      player.y + player.height > hb.y
    ) {
      player.Dano();
    }
  }

  // Remover inimigos mortos
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (!enemies[i].alive) enemies.splice(i, 1);
  }

  // HUD
  desenharBarraHP();
  desenharHUD();
}