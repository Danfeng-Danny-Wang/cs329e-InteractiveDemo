var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add("room1", demo.room1);
game.state.add("room2", demo.room2);
game.state.add("result", demo.result);

game.state.start("room1");
game.score = 0;
