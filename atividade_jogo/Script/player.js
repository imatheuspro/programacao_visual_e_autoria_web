// =====================
// PLAYER (Charmander, Bulbasaur, Squirtle)
// =====================

const charmanderImg = new Image();
charmanderImg.src = "Sprites/Personagem/Charmander/charmander1.png";

const bulbasaurImg = new Image();
bulbasaurImg.src = "Sprites/Personagem/Bulba/bulbassaur1.png";

/*const squirtleImg = new Image();
squirtleImg.src = "Sprites/Player/squirtle.png";*/

const charmanderFrames = [
  { x: 0, y: 0, w: 37, h: 35 },
  { x: 42, y: 0, w: 37, h: 35 },
  { x: 87, y: 0, w: 37, h: 35 },
  { x: 135, y: 0, w: 35, h: 35 },
  { x: 180, y: 0, w: 34, h: 35 },
  { x: 219, y: 0, w: 35, h: 35 }
];
const charmanderFramescorrida = [
  { x: 0, y: 0, w: 42, h: 36 },
  { x: 54, y: 0, w: 37, h: 36 },
  { x: 104, y: 0, w: 36, h: 36 },
  { x: 150, y: 0, w: 36, h: 36 },
  { x: 197, y: 0, w: 35, h: 36 },
  { x: 242, y: 0, w: 37, h: 36 },
  { x: 286, y: 0, w: 35, h: 36 },
  { x: 325, y: 0, w: 37, h: 36 }
];
const bulbasaurFrames = [
  { x: 0, y: 0, w: 45, h: 49 },
  { x: 45, y: 0, w: 48, h: 49 },
  { x: 93, y: 0, w: 37, h: 49 },
  { x: 110, y: 0, w: 39, h: 49 },
];

/*const squirtleFrames = [
  { x: 0, y: 0, w: 48, h: 48 },
  { x: 48, y: 0, w: 48, h: 48 },
  { x: 96, y: 0, w: 48, h: 48 }, 
];*/



class Player {
  constructor(x, y) {
    this.x = 10;
    this.y = 400;
    this.velY = 0;
    this.vel = 0;
    this.width = 48;
    this.height = 48;
    this.speed = 5;
    this.jumpForce = -12.5;
    this.onGround = false;

    this.currentSprite = null;
    this.currentFrames = [];
    this.frameIndex = 0;
    this.lastFrameChange = performance.now();
    this.frameInterval = 150;
    this.direction = 1;
    this.FireRate = 600; // tempo entre tiros em ms
    this.UltimoTiro = 0;
    
    this.projectiles = [];
    this.lives = 3;    // número de pokébolas
    this.hp = 3;       // vida atual (3 = cheio)
    this.maxHp = 3;    // máximo de hits
    this.isInvincible = false;
    this.invincibleTime = 1000;
    this.lastHit = 0;



  }
  Dano() {
    if (!this.isInvincible) {
      this.hp--;
        console.log("O player tomou Dano!!")
      if (this.hp <= 0) {
        this.lives--;
        this.hp = this.maxHp; // reseta barra para próxima vida
        console.log("O player Perdeu uma vida!!")
      }

      this.isInvincible = true;
      this.lastHit = performance.now();

      if (this.lives <= 0) {
        console.log("GAME OVER!");
        GameOver();
      }
    }
  }




  setCharacter(image, frames) {
    this.currentSprite = image;
    this.currentFrames = frames;
  }

  moveLeft() {
     console.log("O jogador se movimentou para a Esquerda!!")
    this.x -= this.speed;
    this.direction = -1;
    if(this.x<=0) return this.x=0;
  }

  moveRight() {
    console.log("O jogador se movimentou para a Direita!!")
    
    this.x += this.speed;
    this.direction = 1;
  }

  jump() {
    if (this.onGround) {
        console.log("O jogador Pulou!!")
      this.velY = this.jumpForce;
      this.onGround = false;
    }
  }

  shoot() {
  const now = performance.now();
  if (now - this.UltimoTiro >= this.FireRate) {
    const proj = new Projectile(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.direction
    );
    this.projectiles.push(proj);
    this.lastShot = now; // registra o momento do disparo
    console.log("O jogador atirou um projetil!!");
  }
}

  update() {
  // gravidade
  this.velY += gravidade;
  this.y += this.velY;

  this.onGround = false;
  this.onParede=false;

  // colisão com chão
  if (this.y + this.height >= canvas.height) {
    this.y = canvas.height - this.height;
    this.velY = 0;
    this.onGround = true;
  }
  if (this.x + this.height >= canvas.width) {
    this.x = canvas.width - this.width;
    this.velX = 0;
    this.onParede = true;
  }

  // colisão com plataformas
  for (let p of plataformas) {
    if (
      this.x < p.x + p.w &&
      this.x + this.width > p.x &&
      this.y + this.height > p.y &&
      this.y + this.height < p.y + p.h &&
      this.velY >= 0
    ) {
      // encostou em cima da plataforma
      this.y = p.y - this.height;
      this.velY = 0;
      this.onGround = true;
    }

    if (
      this.y < p.y + p.w &&
      this.y + this.width > p.y &&
      this.x + this.height > p.x &&
      this.x + this.height < p.x + p.h &&
      this.velX >= 0
    ) {
      // encostou em cima da plataforma
      this.y = p.x - this.width;
      this.velX = 0;
      this.onGround = true;
    }
  }
  for (let p of plataformas) {
  // só queremos a parede
  if (p.x === 613 && p.y === 365||p.x === 1275 && p.y === 365) {
    // hitbox do player
    const playerLeft   = this.x;
    const playerRight  = this.x + this.width;
    const playerTop    = this.y;
    const playerBottom = this.y + this.height;

    // hitbox da parede
    const platLeft   = p.x;
    const platRight  = p.x + p.w;
    const platTop    = p.y;
    const platBottom = p.y + p.h;

    // colisão
    
    if (
      playerRight > platLeft &&
      playerLeft < platRight &&
      playerBottom > platTop &&
      playerTop < platBottom
    ) {
      // se o player veio da esquerda
      if (this.x < platLeft) {
        this.x = platLeft - this.width;
      }
      // se o player veio da direita (caso queira bloquear dos dois lados)
      else if (this.x > platLeft) {
        this.x = platRight;
      }
    }
  }
  
}


   // animação
  const now = performance.now();
  if (this.currentFrames.length && now - this.lastFrameChange > this.frameInterval) {
    this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
    this.lastFrameChange = now;
  }


   // projéteis
  this.projectiles = this.projectiles.filter(p => !p.destroyed);
  for (const p of this.projectiles) p.update();


    // controlar invencibilidade
    if (this.isInvincible && performance.now() - this.lastHit > this.invincibleTime) {
      this.isInvincible = false;
    }

    // atualizar projéteis
    this.projectiles = this.projectiles.filter(p => !p.destroyed);
    for (const p of this.projectiles) p.update();
    

  }

  draw() {
    // piscar quando invencível
    if (this.isInvincible && Math.floor(performance.now() / 100) % 2 === 0) {
      return; // não desenha em alguns frames
    }

    if (this.currentSprite && this.currentFrames.length) {
      const f = this.currentFrames[this.frameIndex];
      ctx.save();
      if (this.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(this.currentSprite, f.x, f.y, f.w, f.h, -this.x - f.w, this.y, f.w, f.h);
      } else {
        ctx.drawImage(this.currentSprite, f.x, f.y, f.w, f.h, this.x, this.y, f.w, f.h);
      }
      ctx.restore();
    }

    for (const p of this.projectiles) p.draw();
  }
}

// =====================
// PROJETIL
// =====================
class Projectile {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = 8;
    this.size = 8;
    this.destroyed = false;
    
  }

  update() {
    
    
  this.x += this.speed * this.direction;

  // se sair da tela
  if (this.x < 0 || this.x > canvas.width) {
    this.destroyed = true;
    return;
  }

  // colisão com plataformas
  for (let p of plataformas) {
    if (
      this.x + this.size > p.x &&
      this.x - this.size < p.x + p.w &&
      this.y + this.size > p.y &&
      this.y - this.size < p.y + p.h
    ) {
      this.destroyed = true;
      break; // já colidiu, não precisa checar mais
    }  
    }
}

  draw() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}