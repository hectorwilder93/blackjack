var crupier = 0;
var jugador1 = 0;
var crupierCount = 0;
var jugadorCount = 0;
var cartaOculta;
var mazo;
var sumaJuego = true;

window.onload = function () {
  barajar();
  barajarMazo();
  startGame();
};

function barajar() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  mazo = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      mazo.push(values[j] + "-" + types[i]);
    }
  } //console.log(mazo);
}

function barajarMazo() {
  for (let i = 0; i < mazo.length; i++) {
    let j = Math.floor(Math.random() * mazo.length);
    let temp = mazo[i];
    mazo[i] = mazo[j];
    mazo[j] = temp;
  }
}

function startGame() {
  cartaOculta = mazo.pop();
  crupier += getValue(cartaOculta);
  crupierCount += checkAce(cartaOculta);

  while (crupier < 17) {
    let cardImg = document.createElement("img");
    let img = mazo.pop();
    cardImg.src = "./imagenes/img-baraja/" + img + ".png";
    crupier += getValue(img);
    crupierCount += checkAce(img);
    document.getElementById("crupier-baraja").append(cardImg);
  }

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let img = mazo.pop();
    cardImg.src = "./imagenes/img-baraja/" + img + ".png";
    jugador1 += getValue(img);
    jugadorCount += checkAce(img);
    document.getElementById("jugador1-baraja").append(cardImg);

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
  }

  function hit() {
    if (!sumaJuego) {
      return;
    }
    let cardImg = document.createElement("img");
    let img = mazo.pop();
    cardImg.src = "./imagenes/img-baraja/" + img + ".png";
    jugador1 += getValue(img);
    jugadorCount += checkAce(img);
    document.getElementById("jugador1-baraja").append(cardImg);

    if (reduceAce(jugador1, jugadorCount) > 21) {
      sumaJuego = false;
    }
  }

  function stay() {
    crupier = reduceAce(crupier, crupierCount);
    jugador1 = reduceAce(jugador1, jugadorCount);

    sumaJuego = false;
    document.getElementById("cartaOculta").src =
      "./imagenes/img-baraja/" + cartaOculta + ".png";

    let mensaje = "";
    if (jugador1 > 21) {
      mensaje = "Haz perdido!";
    } else if (crupier > 21) {
      mensaje = "crupier ganador";
    } else if (jugador1 == crupier) {
      mensaje = "Empate ";
    } else if (jugador1 > crupier) {
      mensaje = "Eres el ganador";
    } else if (jugador1 < crupier) {
      mensaje = "Haz perdido";
    }

    document.getElementById("crupier").innerText = crupier;
    document.getElementById("jugador1").innerText = jugador1;
    document.getElementById("resultado").innerText = mensaje;
  }

  function getValue(img) {
    let data = img.split("-");
    let value = data[0];
    if (isNaN(value)) {
      if (value == "A") {
        return 11;
      }
      return 10;
    }
    return parseInt(value);
  }

  function checkAce(img) {
    if (img[0] == "A") {
      return 1;
    }
    return 0;
  }

  function reduceAce(sumaJugador, cuentaJugador) {
    while (sumaJugador > 21 && cuentaJugador > 0) {
      sumaJugador -= 10;
      cuentaJugador -= 1;
    }
    return sumaJugador;
  }
}
