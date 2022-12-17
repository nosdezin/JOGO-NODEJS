const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const camera = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

let playerPos = {
  linha: 2,
  coluna: 3,
};

const senhaInputPos = {
  linha: 4,
  coluna: 0,
};

const enigma = {
  linha: 0,
  coluna: 0,
};

const cores = ["\x1b[40m", "\x1b[44m", "\x1b[41m", "\x1b[47m"];

const condiçaoSC = (condicao, coluna, linha = 0) => {
  if (condicao) {
    playerPos.coluna += coluna;
    playerPos.linha += linha;
    camera[playerPos.linha + -linha][playerPos.coluna + -coluna] = 1;
  }
  console.clear();
  jogo();
};
const pin = () => {
  rl.question("Digite a senha:", (resp) => {
    if (resp == "4930") {
      console.clear();
      console.log("Parabéns, você terminou o Jogo!");
    } else {
      console.clear();
      console.log("Senha errada");
      jogo();
    }
  });
};
const mensagem = () => {
  console.clear();
  console.log("TU1NTUNNWFhY\n\nB8^2");
  rl.question("Aperte qualquer coisa para sair", () => {
    console.clear();
    jogo();
  });
};

const interacoes = () => {
  const distanciaEn = playerPos.coluna - enigma.coluna;
  const distanciaPW = playerPos.coluna - senhaInputPos.coluna;
  let colisionEn,colisionPW = false

  if (distanciaEn <= 1 && playerPos.linha == enigma.linha) {
    // console.log("Colidiu com Enigma");
    colisionEn = true
    mensagem();
  }
  if (distanciaPW <= 1 && playerPos.linha == senhaInputPos.linha) {
    // console.log("Colidiu com Senha");
    colisionPW = true
    pin();
  }
  if(!colisionEn && !colisionPW){
    console.clear()
    jogo()
  }
};

const jogo = () => {
  camera[playerPos.linha][playerPos.coluna] = 2;
  camera[senhaInputPos.linha][senhaInputPos.coluna] = 3;
  camera[enigma.linha][enigma.coluna] = 3;

  camera.map((item) => {
    let str = "";
    item.map((i) => {
      str += `${cores[i]}  \x1b[0m`;
    });
    console.log(str);
    str = "";
  });

  rl.question(">>", (resp) => {
    switch (resp[0]) {
      case "a":
        condiçaoSC(playerPos.coluna != 0, -1);
        break;
      case "d":
        condiçaoSC(playerPos.coluna != 7, 1);
        break;
      case "w":
        condiçaoSC(playerPos.linha != 0, 0, -1);
        break;
      case "s":
        condiçaoSC(playerPos.linha != 5, 0, 1);
        break;
      case "e":
        interacoes();
        break;
      default:
        console.clear();
        jogo();
        break;
    }
  });
};

jogo();