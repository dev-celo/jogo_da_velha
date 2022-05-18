let player1 = 'X'
let player2 = 'O'

let playTime = player1

let gameOver = false

atualizaMostrador()
inicializarEspacos()

function atualizaMostrador() {
  if (gameOver) {
    return
  }

  if (playTime == player1) {
    let player = document.querySelectorAll('div#mostrador img')[0]
    player.setAttribute('src', 'imagens/x.png')
  } else {
    let player = document.querySelectorAll('div#mostrador img')[0]
    player.setAttribute('src', 'imagens/bola.png')
  }
}

function inicializarEspacos() {
  let espacos = document.getElementsByClassName('espaco')

  for (let i = 0; i < espacos.length; i++) {
    espacos[i].addEventListener('click', function () {
      if (gameOver) {
        return
      }

      if (this.getElementsByTagName('img').length == 0) {
        if (playTime == player1) {
          this.innerHTML = "<img src='imagens/x.png' height='50'>"
          this.setAttribute('jogada', player1)
          playTime = player2
        } else {
          this.innerHTML = "<img src='imagens/bola.png' height='50'>"
          this.setAttribute('jogada', player2)
          playTime = player1
        }
      }

      atualizaMostrador()
      verificarVencedor()
    })
  }
}

async function verificarVencedor() {

  let a1 = document.getElementById('a1').getAttribute('jogada')
  let a2 = document.getElementById('a2').getAttribute('jogada')
  let a3 = document.getElementById('a3').getAttribute('jogada')

  let b1 = document.getElementById('b1').getAttribute('jogada')
  let b2 = document.getElementById('b2').getAttribute('jogada')
  let b3 = document.getElementById('b3').getAttribute('jogada')

  let c1 = document.getElementById('c1').getAttribute('jogada')
  let c2 = document.getElementById('c2').getAttribute('jogada')
  let c3 = document.getElementById('c3').getAttribute('jogada')

  let vencedor = ''

  if (
    (a1 == b1 && a1 == c1 && a1 != '') ||
    (a1 == a2 && a1 == a3 && a1 != '') ||
    (a1 == b2 && a1 == c3 && a1 != '')
  ) {
    vencedor = a1
  } else if (
    (b2 == b1 && b2 == b3 && b2 != '') ||
    (b2 == a2 && b2 == c2 && b2 != '') ||
    (b2 == a3 && b2 == c1 && b2 != '')
  ) {
    vencedor = b2
  } else if (
    (c3 == c2 && c3 == c1 && c3 != '') ||
    (c3 == a3 && c3 == b3 && c3 != '')
  ) {
    vencedor = c3
  } else if (
    (a1 != '' &&
    a2 != '' &&
    a3 != '' &&
    b1 != '' &&
    b2 != '' &&
    b3 != '' &&
    c1 != '' &&
    c2 != '' &&
    c3 != '') && vencedor == ''
  ) {
    gameOver = true

    await sleep(50)

    alert('Deu velha!')

    buttonRestartGame()
  }

  if (vencedor != '') {
    gameOver = true

    await sleep(50)

    alert('O vencedor foi: ' + vencedor + '!')

    buttonRestartGame()
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buttonRestartGame(){
  let button =  document.getElementById('restart')

  button.classList.replace("invisible", "buttonRestartVisible")

  button.addEventListener("click", () => {
    location.reload()
  })
}
