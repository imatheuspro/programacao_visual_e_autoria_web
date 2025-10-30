// Mapas.js
//const canvas = document.getElementById("canvas");
//const ctx = canvas.getContext("2d");

//canvas.width = innerWidth;
//canvas.height = innerHeight;
const startScreen = document.getElementById('startScreen');

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = 600;
const gravidade = 0.8;
const pokeballImg = new Image();
pokeballImg.src = "Sprites/Personagem/HUD/Download HD Pokeball.png";
const plataformas = [
  { x: 0, y: 575, w: 120, h: 300 ,tipo:"rampa"},
  { x: 110, y: 560, w: 20, h: 300 ,tipo:"solido" },//base do morro
  
  { x: 120, y: 555, w: 20, h: 300 ,tipo:"rampa" },
   { x: 130, y: 550, w: 20, h: 300 ,tipo:"rampa"},
   { x: 140, y: 540, w: 20, h: 300 ,tipo:"rampa"},
   { x: 150, y: 530, w: 20, h: 300 ,tipo:"rampa"},
   { x: 160, y: 520, w: 20, h: 300 ,tipo:"rampa"},
   { x: 170, y: 510, w: 20, h: 300 ,tipo:"rampa"},
   { x: 180, y: 500, w: 20, h: 300 ,tipo:"rampa"},
    { x: 190, y: 490, w: 20, h: 300 ,tipo:"rampa"},
  
   { x: 200, y: 490, w: 80, h: 200,tipo:"solido" },//topo do primeiro morro


  { x: 350, y: 560, w: 20, h: 300 ,tipo:"rampa"},
  { x: 340, y: 555, w: 20, h: 300 ,tipo:"rampa"},
   { x: 330, y: 550, w: 20, h: 300 ,tipo:"rampa"},
   { x: 320, y: 545, w: 20, h: 300 ,tipo:"rampa"},
   { x: 310, y: 535, w: 20, h: 300 ,tipo:"rampa"},
   { x: 300, y: 525, w: 20, h: 300 ,tipo:"rampa"},
   { x: 290, y: 515, w: 20, h: 300 ,tipo:"rampa"},
   { x: 280, y: 505, w: 20, h: 300 ,tipo:"rampa"},
   { x: 270, y: 495, w: 20, h: 300 ,tipo:"rampa"},

   { x: 370, y: 575, w: 240, h: 300 ,tipo:"solido"},//descida do primeiro morro

   { x: 613, y: 365, w: 20, h: 200 ,tipo:"solido"},//primeira parede
   { x: 1275, y: 365, w: 20, h: 300 ,tipo:"solido"},//parede final
   { x: -20, y: 1, w: 20, h: 6000 ,tipo:"solido"},//inicial parede 
    { x: 630, y: 365, w: 170, h: 300 ,tipo:"rampa"},//topo do segundo morro   

  // { x: 200, y: 500, w: 20, h: 20 },
   //{ x: 210, y: 500, w: 20, h: 20 },
  { x: 140, y: 305, w: 170, h: 10,tipo:"solido" },//primeira plataforma

  { x: 360, y: 395, w: 170, h: 10 ,tipo:"solido"},//segunda plataforma
  { x: 395, y: 245, w: 135, h: 10,tipo:"solido" },//terceira plataforma

  { x: 790, y: 380, w: 20, h: 300 ,tipo:"rampa"},
  { x: 800, y: 390, w: 20, h: 300 ,tipo:"rampa"},
    { x: 810, y: 400, w: 20, h: 300,tipo:"rampa" },
   { x: 820, y: 410, w: 20, h: 300 ,tipo:"rampa"},
   { x: 830, y: 415, w: 20, h: 300,tipo:"rampa" },
   { x: 840, y: 425, w: 20, h: 300 ,tipo:"rampa"},
   { x: 850, y: 435, w: 20, h: 300 ,tipo:"rampa"},
   { x: 860, y: 445, w: 20, h: 300 ,tipo:"rampa"},
   { x: 870, y: 455, w: 20, h: 300 ,tipo:"rampa"},
   { x: 880, y: 465, w: 20, h: 300 ,tipo:"rampa"},
   { x: 890, y: 475, w: 20, h: 300 ,tipo:"rampa"},
   { x: 900, y: 485, w: 20, h: 300 ,tipo:"rampa"},
   { x: 915, y: 495, w: 20, h: 300 ,tipo:"rampa"},
   { x: 925, y: 505, w: 20, h: 300 ,tipo:"rampa"},
   { x: 935, y: 515, w: 20, h:300,tipo:"rampa" },
   { x: 945, y: 525, w: 20, h: 300 ,tipo:"rampa"},
   { x: 955, y: 535, w: 20, h: 300 ,tipo:"rampa"},
   { x: 965, y: 545, w: 20, h: 300 ,tipo:"rampa"},
   { x: 975, y: 555, w: 20, h: 300 ,tipo:"rampa"},
   { x: 985, y: 565, w: 20, h: 300 ,tipo:"rampa"},
   { x: 995, y: 567, w: 20, h: 300 ,tipo:"rampa"},
   { x: 1005, y: 575, w: 20, h: 300 ,tipo:"rampa"},

  { x: 1025, y: 578 , w:245, h: 300,tipo:"solido" },//base do Segundo morro
];
function startGame() {
    player = new Player(100, 100); // posição inicial
    player.setCharacter(charmanderImg, charmanderFrames); // sprite inicial
    
  iniciarMapa();
}
window.onload = startGame;

function GameOver(){
    setTimeout(() => {
    
     window.location.href= "inicio.html" ; // Chama a função que vai iniciar o jogo
    }, 1000);
};
const DEBUG_MODE=true;