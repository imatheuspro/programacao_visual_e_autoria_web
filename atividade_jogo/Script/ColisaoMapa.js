
function desenharPlataformas() {
  ctx.fillStyle = "#654321"; // marrom
  for (let p of plataformas) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }
}
