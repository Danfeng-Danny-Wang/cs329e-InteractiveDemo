var plarer;
var platforms, boxes;
var cursor;

demo.room2 = function () {};

demo.room2.prototype = {
    preload: preload,
    create: create,
    update: update,
};

function preload() {
    game.load.image("backgroundRoom2", "assets/sky.png");
    game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    game.load.image("ground", "assets/platform.png");
    game.load.image("box", "assets/box.png");
    game.load.image("portal", "assets/portal.png");
    game.load.image("diamond", "assets/diamond.png");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, "backgroundRoom2");

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, "ground");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    createLedge(400, 400);

    boxes = game.add.group();
    boxes.enableBody = true;

    createBox(10, 90);
    createBox(287, 465);
    createBox(287, 395);
    createBox(287, 325);
    createBox(700, 330);

    diamonds = game.add.group();
    diamonds.enableBody = true;

    createDiamond(100, 60);
    createDiamond(150, 110);
    createDiamond(200, 160);
    createDiamond(250, 210);
    createDiamond(300, 260);
    createDiamond(370, 340);
    createDiamond(560, 300);

    portal = game.add.sprite(710, 200, "portal");
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

    game.physics.arcade.overlap(player, portal, goToRoom1, null, this);

    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
}

function goToRoom1() {
    game.state.start("result");
}
