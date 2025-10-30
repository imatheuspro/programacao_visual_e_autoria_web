
const enemies = [];

const birdImage = new Image();
birdImage.src = "Sprites/Inimigos/sp2.png";
const slimeImage = new Image();
slimeImage.src = "Sprites/Inimigos/gengar1.png";
const groundImage = new Image();
groundImage.src = "Sprites/Inimigos/rato2.png";

const birdFrames = [
  { x: 0, y: 0, w: 52, h: 55 },
  { x: 53, y: 0, w: 58, h: 55 },
  { x: 112, y: 0, w: 50, h: 55 },
  { x: 163, y: 0, w: 58, h: 55 }
];
const slimeFrames = [
 { x: 0, y: 0, w: 48, h: 46 },
 { x: 48, y: 0, w: 48, h: 46 },
 { x: 96, y: 0, w: 48, h: 46 }
];
const groundFrames = [
 { x: 0, y: 0, w: 44, h: 48 },
 { x: 44, y: 0, w: 46, h: 48 },
 { x: 90, y: 0, w: 45, h: 48 },
 { x: 135, y: 0, w: 40, h: 48 },
 { x: 175, y: 0, w: 40, h: 48 },
 { x: 215, y: 0, w: 37, h: 48 }
];
// =====================================
// CLASSE BASE
// =====================================
class EnemyBase {
  constructor(x, y, image, frames) {
    this.image = image;
    this.frames = frames;
    this.currentFrame = 0;
    this.lastFrameChange = performance.now();
    this.frameInterval = 150;
    this.position = { x, y };

    this.size = frames
      ? { width: frames[0].w, height: frames[0].h }
      : { width: 30, height: 30 };

    this.velocity = { x: 0, y: 0 };
    this.maxHp = 3;
    this.hp = this.maxHp;
    this.alive = true;
    this.onGround = false;
  }

  DanoInimigo(dmg = 1) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.alive = false;
      console.log("Um inimigo morreu!!");
    }
  }

  getHitbox() {
    return {
      x: this.position.x,
      y: this.position.y,
      w: this.size.width,
      h: this.size.height,
    };
  }

  handleCollision(plataformas) {
  for (let p of plataformas) {
    const objLeft = this.position.x;
    const objRight = this.position.x + this.size.width;
    const objTop = this.position.y;
    const objBottom = this.position.y + this.size.height;

    const platLeft = p.x;
    const platRight = p.x + p.w;
    const platTop = p.y;
    const platBottom = p.y + p.h;

    if (
      objRight > platLeft &&
      objLeft < platRight &&
      objBottom > platTop &&
      objTop < platBottom
    ) {
      const overlapX = Math.min(objRight - platLeft, platRight - objLeft);
      const overlapY = Math.min(objBottom - platTop, platBottom - objTop);

      if (overlapX < overlapY) {
        //  colisão lateral
        if (objRight > platLeft && this.position.x < platLeft) {
          this.position.x = platLeft - this.size.width;
        } else if (objLeft < platRight && this.position.x > platLeft) {
          this.position.x = platRight;
        }

        //  inverter direção de movimento e flip visual
        if (this.velocity) {
          this.velocity.x *= +1;
          this.direction = this.direction ? this.direction * -1 : 1;
          this.directionX = this.direction;
        }
      } else {
        //  colisão vertical
        if (this.velocity && this.velocity.y > 0) {
          this.position.y = platTop - this.size.height;
          this.velocity.y = 0;
          this.onGround = true;
        } else if (this.velocity && this.velocity.y < 0) {
          this.position.y = platBottom;
          this.velocity.y = 0;
        }
      }
    }
  }
}

  updateAnimation() {
    const now = performance.now();
    if (now - this.lastFrameChange > this.frameInterval) {
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      this.lastFrameChange = now;
    }
  }

  draw() {
  if (!this.alive) return;

  if (this.image && this.frames) {
    const f = this.frames[this.currentFrame];
    ctx.save();

    //  Agora o flip acontece quando directionX === 1 (indo para direita)
    if (this.directionX === 1) {
      ctx.translate(this.position.x + f.w, this.position.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.image, f.x, f.y, f.w, f.h, 0, 0, f.w, f.h);
    } else {
      ctx.drawImage(
        this.image,
        f.x, f.y, f.w, f.h,
        this.position.x, this.position.y,
        f.w, f.h
      );
    }

    ctx.restore();
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

}


// =====================================
// INIMIGO PULADOR
// =====================================
class JumpingEnemy extends EnemyBase {
 constructor(x, y, image, frames) {
 super(x, y, image, frames);
 this.velocity.x = 2;
 this.direction = 1;
 this.onGround = false;
 this.lastJumpTime = 0;
 this.jumpInterval = 1500;
 }
 update() {
  const now = performance.now();

  // movimento lateral
  this.position.x += this.velocity.x * this.direction;

  // gravidade
  this.position.y += this.velocity.y;
  this.velocity.y += gravidade;
  this.onGround = false;

  // colisão com plataformas
  this.handleCollision(plataformas);

  // pulo automático
  if (this.onGround && now - this.lastJumpTime > this.jumpInterval) {
    this.velocity.y = -12;
    this.lastJumpTime = now;
  }

  this.updateAnimation();
}

}
// =====================================
// INIMIGO HORIZONTAL
// =====================================
class HorizontalEnemy extends EnemyBase {
  constructor(x, y, image, frames) {
    super(x, y, image, frames);
    this.velocity.x = 2;
    this.direction = 1;   // controla movimento
    this.directionX = 1;  // controla flip visual
  }

  update() {
  this.position.x += this.velocity.x * this.direction;

  // gravidade
  this.position.y += this.velocity.y;
  this.velocity.y += gravidade;
  this.onGround = false;

  // colisão com plataformas (já inverte direção se bater na lateral)
  this.handleCollision(plataformas);

  this.updateAnimation();
}
}

// =====================================
// INIMIGO VOADOR (com patrulha, perseguição e ataque)
// =====================================
class FlyingEnemy extends EnemyBase {
  constructor(x, y, image, frames, minX, maxX, minY, maxY) {
    super(x, y, image, frames);
    this.velocity = { x: 2, y: 2 };
    this.direction = { x: 1, y: 1 };

    // limites da área de patrulha
    this.minX = minX;
    
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.speed = 2;       // velocidade normal
    this.attackSpeed = 5; // velocidade de ataque
    this.mode = "patrol"; // "patrol" | "chase" | "attack"
    this.lastAttack = 0;
    this.attackCooldown = 2000; // 2s entre ataques

    this.directionX = 1; // usado no draw para virar sprite
  }

  update() {
  if (!this.alive) return;

  const now = performance.now();

  // verificar se o player está dentro da área
  const playerInArea =
    player.x + player.width > this.minX &&
    player.x < this.maxX &&
    player.y + player.height > this.minY &&
    player.y < this.maxY;

  if (playerInArea) {
    // se cooldown passou, entra em modo ataque
    if (now - this.lastAttack > this.attackCooldown) {
      this.mode = "attack";
      this.lastAttack = now;
    } else {
      this.mode = "chase";
    }
  } else {
    this.mode = "patrol";
  }

  if (this.mode === "attack") {
    // mergulha direto no player
    const dx = player.x - this.position.x;
    const dy = player.y - this.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0) {
      this.position.x += (dx / dist) * this.attackSpeed;
      this.position.y += (dy / dist) * this.attackSpeed;
      this.directionX = dx < 0 ? -1 : 1; // 🔹 vira para o lado do player
    }
  } else if (this.mode === "chase") {
    // segue o player mais devagar
    if (player.x < this.position.x) {
      this.position.x -= this.speed;
      this.direction.x = -1;
    } else {
      this.position.x += this.speed;
      this.direction.x = 1;
    }
    this.directionX = this.direction.x; // 🔹 vira sprite

    if (player.y < this.position.y) {
      this.position.y -= this.speed;
    } else {
      this.position.y += this.speed;
    }
  } else {
    // patrulha dentro da área
    this.position.x += this.velocity.x * this.direction.x;
    if (this.position.x + this.size.width > this.maxX || this.position.x < this.minX) {
      this.direction.x *= -1;
      this.directionX = this.direction.x; // 🔹 vira sprite ao bater no limite
    }

    this.position.y += this.velocity.y * this.direction.y;
    if (this.position.y + this.size.height > this.maxY || this.position.y < this.minY) {
      this.direction.y *= -1;
    }
  }

  this.updateAnimation();
}
}
// =====================================
// Perseguição
// =====================================


class ChasingEnemy extends EnemyBase {
  constructor(x, y, image, frames) {
    super(x, y, image, frames);
    this.speed = 1.5; // velocidade de perseguição
  }

  update() {
  if (!player) return;

  // mover no eixo X em direção ao player
  if (player.x < this.position.x) {
    this.position.x -= this.speed;
    this.directionX = -1;
  } else {
    this.position.x += this.speed;
    this.directionX = 1;
  }

  // gravidade
  this.position.y += this.velocity.y;
  this.velocity.y += gravidade;
  this.onGround = false;

  // colisão com plataformas
  this.handleCollision(plataformas);

  this.updateAnimation();
}
}
// =====================================
// LISTA DE INIMIGOS
// =====================================
let inimigosCarregados = 0;

[birdImage, slimeImage, groundImage].forEach(img => {
  img.onload = () => {
    inimigosCarregados++;
    console.log(img.src + " carregado");
    if (inimigosCarregados === 3) {
      //  Só adiciona inimigos depois que TUDO carregar
      if (typeof onInimigosProntos === "function") {
        onInimigosProntos();
      }
    }
  };
  img.onerror = () => console.error("Erro ao carregar " + img.src);
});

function addEnemies() {
  // inimigos voadores
  for (let i = 0; i < 1; i++) {
    enemies.push(new FlyingEnemy(200, 50, birdImage, birdFrames, 100, 1000, 50, 300));
    enemies.push(new FlyingEnemy(840, 100, birdImage, birdFrames, 100, 1000, 50, 300));
    enemies.push(new FlyingEnemy(800, 200, birdImage, birdFrames, 100, 1000, 50, 300));
    enemies.push(new FlyingEnemy(60, 63, birdImage, birdFrames, 40, 1000, 50, 300));
  }



  // inimigos horizontais
  for (let i = 0; i < 4; i++) {
    enemies.push(new HorizontalEnemy(Math.random() * (1000-250)+250,150, groundImage, groundFrames));
  }

  // inimigos perseguidores
  for (let i = 0; i < 0; i++) {
    enemies.push(new ChasingEnemy(Math.random() * canvas.width, canvas.height - 100, slimeImage, slimeFrames));
  }
}
