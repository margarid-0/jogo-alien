
// definição das dimensões do jogo
const larguraJogo = 700;
const alturaJogo = 850;

// configuração inicial do jogo, incluindo tipo de renderização, tamanho, física e as cenas do jogo
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// criação da instância do jogo com a configuração definida
const game = new Phaser.Game(config);

// declaração de variáveis para os objetos do jogo
var alien
var teclado
var fogo
var plataforma1
var plataforma2
var moeda
var pontuacao = 0
var placar
var sol
var moedasColetadas = []

// função preload: Carrega os recursos (imagens) usados no jogo
function preload() {
    this.load.image('alien', 'assets/alienigena.png')
    this.load.image('background', 'assets/bg.png')
    this.load.image('fogo', '/assets/turbo.png')
    this.load.image('plataforma', '/assets/tijolos.png')
    this.load.image('moeda', '/assets/moeda.png')
    this.load.image('sol', '/assets/sun.png')
}

function create() {
    // adiciona a imagem de fundo ao cenário
    this.add.image(larguraJogo/2, alturaJogo/2, 'background');

    // configuração inicial do personagem, fogo (turbo) e plataformas
    fogo = this.add.sprite(larguraJogo/2, 0, 'fogo')
    alien = this.physics.add.sprite(larguraJogo/2, 0, 'alien')
    alien.setCollideWorldBounds(true)
    teclado = this.input.keyboard.createCursorKeys()
    fogo.setVisible(true)
    plataforma1 = this.physics.add.staticImage(larguraJogo/3, alturaJogo/3, 'plataforma')
    plataforma2 = this.physics.add.staticImage(2* larguraJogo/3, 2* alturaJogo/3, 'plataforma')
    this.physics.add.collider(alien, plataforma1)
    this.physics.add.collider(alien, plataforma2)

     // configuração da moeda, incluindo física e comportamento ao ser coletada
    moeda = this.physics.add.sprite(larguraJogo/2, Phaser.Math.RND.between(50, 650), 'moeda')
    moeda.setCollideWorldBounds(true)
    moeda.setBounce(0.7)
    this.physics.add.collider(moeda, plataforma1)
    this.physics.add.collider(moeda, plataforma2)
    placar = this.add.text(50, 50, 'Moedas:' + pontuacao, {fontSize:'45px', fill:'#495613'});
    
    // configuração da moeda, incluindo física e comportamento ao ser coletada
    this.physics.add.overlap(alien, moeda, function(){
        moeda.setVisible(false)
        var posicaoMoedaY = Phaser.Math.RND.between(50, 650)
        moeda.setPosition(posicaoMoedaY, 100)
        pontuacao += 1
        placar.setText('Moedas: ' + pontuacao)
        moeda.setVisible(true)
        moedasColetadas.push(1)
        console.log(moedasColetadas.length)
    })

}

function update() {

    // controle do personagem com o teclado
    if (teclado.left.isDown) {
        alien.setVelocityX(-150)
    } else if (teclado.right.isDown) {
        alien.setVelocityX(150)
    } else {
        alien.setVelocityX(0)
    }

    // ativa o turbo quando a tecla para cima é pressionada
    if (teclado.up.isDown) {
        alien.setVelocityY(-150)
        ativarTurbo()
    } else {
        semTurbo()
    }

    // posiciona o fogo atrás do alien
    fogo.setPosition(alien.x, alien.y + alien.height/2)
}


// funções para controlar a visibilidade do fogo
function ativarTurbo() {
    fogo.setVisible(true)
}

function semTurbo() {
    fogo.setVisible(false)
}


