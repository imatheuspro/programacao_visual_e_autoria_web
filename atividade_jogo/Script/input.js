let keys = {};

window.addEventListener("keydown", e => {
  keys[e.key] = true;

  // Trocar Pokémon
  if (e.key === "1") player.setCharacter(charmanderImg, charmanderFrames);
  if (e.key === "2") player.setCharacter(bulbasaurImg, bulbasaurFrames);
  //if (e.key === "3") player.setCharacter(squirtleImg, squirtleFrames);

  // Atirar
  if (e.key === "z"||e.key === "Enter") player.shoot();
});

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function handlePlayerMovement() {
  if (keys["ArrowLeft"]|| keys["a"]) player.moveLeft();
  if (keys["ArrowRight"]|| keys["d"]) player.moveRight();
  if (keys["ArrowUp"]|| keys["w"]) player.jump();
}