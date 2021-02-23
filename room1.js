var demo = {};
var player, portal;
var platforms, boxes, diamonds;
var cursors;
var score = 0;
var scoreText;

demo.room1 = function () {};
demo.room1.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("backgroundRoom1", "assets/sky.png");
    game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    game.load.image("ground", "assets/platform.png");
    game.load.image("box", "assets/box.png");
    game.load.image("portal", "assets/portal.png");
    game.load.image("diamond", "assets/diamond.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, "backgroundRoom1");

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, "ground");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    createLedge(400, 400);
    createLedge(-105, 255);

    boxes = game.add.group();
    boxes.enableBody = true;

    createBox(420, 200);
    createBox(580, 140);
    createBox(220, 362);
    createBox(400, 330);
    createBox(100, 465);
    createBox(60, 394);

    diamonds = game.add.group();
    diamonds.enableBody = true;

    createDiamond(100, 150);
    createDiamond(26, 300);
    createDiamond(750, 500);
    createDiamond(700, 360);
    createDiamond(520, 70);

    portal = game.add.sprite(720, 30, "portal");
    portal.scale.setTo(0.1, 0.1);
    game.physics.arcade.enable(portal);

    player = game.add.sprite(32, 32, "dude");
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add("left", [0, 1, 2, 3], 10, true);
    player.animations.add("right", [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(350, 16, "Score: " + game.score, {
        fontSize: "32px",
        fill: "#dde587",
    });
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hitBox = game.physics.arcade.collide(player, boxes);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play("left");
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play("right");
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (
        cursors.up.isDown &&
        player.body.touching.down &&
        (hitPlatform || hitBox)
    ) {
        player.body.velocity.y = -220;
    }

    game.physics.arcade.overlap(player, portal, goToRoom2, null, this);

    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
}

function createBox(x, y) {
    var box = boxes.create(x, y, "box");
    box.scale.setTo(0.7, 0.7);
    box.body.immovable = true;
}

function createLedge(x, y) {
    var ledge = platforms.create(x, y, "ground");
    ledge.body.immovable = true;
}

function createDiamond(x, y) {
    var diamond = diamonds.create(x, y, "diamond");
    diamond.body.immovable = true;
}

function goToRoom2(player, portal) {
    portal.kill();
    game.state.start("room2");
}

function collectDiamond(player, diamond) {
    diamond.kill();
    // score += 1;
    game.score += 1;
    scoreText.text = "Score: " + game.score;
}
