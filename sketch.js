//Variaveis da bola
let xBola = 300;
let yBola = 200;
let dBola = 15;
let raio = dBola / 2;

//Variaveis da velocidade
let vxBola = 6;
let vyBola = 6;

//Variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let cRaquete = 10;
let tRaquete = 90;

//Variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let vRaqueteOponente;

//Variaveis do placar
let meusPontos = 0;
let oponentePontos = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  bordaLimite();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPontos();
  bolinhaNaoFicaPresa();
}

function mostraBola (){
    circle(xBola, yBola, dBola);
}

function movimentaBola(){
  xBola += vxBola;
  yBola += vyBola;
}

function bordaLimite(){
  if (xBola + raio > width ||
     xBola - raio < 0){
    vxBola *= -1
  }
  if (yBola + raio > height ||
    yBola - raio < 0 ){
    vyBola *= -1;
  }
}

function mostraRaquete(x, y){
    rect(x, y, cRaquete, tRaquete);
}

function movimentoRaquete(){
  if (keyIsDown(87)){
    yRaquete -= 10;
  }
  if (keyIsDown(83)){
    yRaquete += 10;
  }
}
function colisaoRaquete(){
  if (xBola - raio < xRaquete + cRaquete && yBola - raio < yRaquete + tRaquete && yBola + raio > yRaquete){
    vxBola *= -1;
      raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, cRaquete, tRaquete, xBola, yBola, raio);
  if (colidiu){
    vxBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(80)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(186)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(225);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(225);
  text(oponentePontos, 470, 26);
}

function marcaPontos(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    oponentePontos += 1;
        ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23
    }
}
