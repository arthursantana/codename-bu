var game;

var run = function () {
   game = new Phaser.Game(505, 288, Phaser.AUTO, 'canvasDoJogo', 'menu');

   game.state.add('menu', MenuState);
   game.state.add('test', TestState);
   //game.state.add('calibrator', CalibratorState);
};
