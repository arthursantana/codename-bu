var game;

var run = function () {
   game = new Phaser.Game(288, 505, Phaser.AUTO, 'canvasDoJogo', 'menu');

   game.state.add('menu', MenuState);
   game.state.add('game', GameState);
};
