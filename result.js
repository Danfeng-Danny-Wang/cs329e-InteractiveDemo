demo.result = function () {};
demo.result.prototype = {
    preload: function () {
        game.load.image("backgroundResult", "assets/sky.png");
        game.load.image("restart", "assets/restart.jpg");
    },
    create: function () {
        game.add.sprite(0, 0, "backgroundResult");

        var button = game.add.button(300, 200, "restart", function () {
            game.state.start("room1");
            game.score = 0;
        });
        button.scale.setTo(0.4, 0.4);

        button.onInputDown.add(this.tint, button);
        button.onInputUp.add(this.unTint, button);

        var restartText = game.add.text(350, 420, "Restart", {
            fontSize: "32px",
            fill: "#dde587",
        });

        scoreText = game.add.text(350, 120, "Score: " + game.score, {
            fontSize: "32px",
            fill: "#dde587",
        });
    },
    update: function () {},
    tint: function () {
        this.tint = 0xbbbbbb;
    },
    unTint: function () {
        this.tint = 0xffffff;
    },
};
