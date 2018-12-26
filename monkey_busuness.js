

var game = new Phaser.Game(480, 320, Phaser.AUTO, 'Monkey_Business', { preload: preload, create: create, update: update}, Phaser.CANVAS, 'game_div');

var banana;
var monkey;
var palm;
var mask;
var count = 0;
var count_text;

function preload() {
    banana_im=game.load.image('banana', 'assets/sprites/banana.png');

    game.load.image('background','assets/sprites/bg_im_1.jpg');
    game.load.image('palm','assets/sprites/palm_im_2.png');

    game.load.spritesheet('monkey','assets/sprites/monkey.png', 64, 64, 4);
}

function create() {

    cursors = game.input.keyboard.createCursorKeys();

    game.add.sprite(0, 0, 'background');
    palm=game.add.sprite(0, 0, 'palm');
    monkey=game.add.sprite(160, 110, 'monkey')


    platforms = game.add.group();
    platforms.enableBody = true;


    var ground = platforms.create(0, game.world.height - 2, "ground");
    ground.width=game.world.width;
    ground.body.immovable = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(monkey);
    monkey.body.bounce.y = 0.2;
    monkey.body.gravity.y = 300;
    monkey.body.collideWorldBounds = true;

    monkey.body.bounce.y = 0.2;
    monkey.body.gravity.y = 300;
    monkey.body.collideWorldBounds = true;

    monkey.animations.add('left', [0, 1], 10, true);
    monkey.animations.add('right', [2,3], 10, true);

    count_text = game.add.text(16, 16, 'bananas: 0', { fontSize: '32px', fill: '#ffcb05' });

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < 6; i++)
    {
        banan= bananas.create(i * 80, -64, 'banana');
        banan.body.gravity.y =(200*(Math.random() * 0.7))-1;
        banan.body.bounce.y = 0.5 + Math.random() * 0.2;
    }
}

function update() {
    monkey.body.velocity.x = 0;
    if (cursors.left.isDown) {
        monkey.body.velocity.x = -150;
        monkey.animations.play('left');
    } else if (cursors.right.isDown) {
        monkey.body.velocity.x = 150;
        monkey.animations.play('right');
    } else {
        monkey.animations.stop();
        monkey.frame = 4;
    }
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.overlap(monkey, bananas, collectBanan, null, this);
}

function collectBanan (monkey, banan) {

    banan.kill();
    console.log("collisison");
    count+=1;
    count_text.text ='bananas:'+count;

}