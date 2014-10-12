function MenuState () {
   this.preload = function () {
      game.load.image('title', 'img/title.png');
      game.load.image('button', 'img/button.png');
      game.load.image('background', 'img/background.png');
      game.load.image('ground', 'img/ground.png');
      game.load.spritesheet('dude', 'img/dude.png', 32, 48);
   };


   this.create = function () {
      var background = game.add.sprite(0, 0, 'background');
      var ground = game.add.tileSprite(0, 400, 335, 112, 'ground');
      
      ground.autoScroll(-300, 0);

      var title = game.add.sprite(144,150,'title');
      title.anchor.setTo(0.5,0.5);

      game.add.tween(title).to({y:115}, 350, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

      var dude = game.add.sprite(100,354,'dude');  
      var dude2 = game.add.sprite(150,354,'dude');  

      dude.animations.add('walk', [5,6,7,8], 15, true);
      dude.animations.play('walk');
      dude2.animations.add('walk', [5,6,7,8], 10, true);
      dude2.animations.play('walk');

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.y = 500;

      game.physics.arcade.enable(dude2);
      game.physics.arcade.enable(ground);

      var startButton = game.add.button(game.width/2, 300, 'button', function () { game.state.start('game'); }, this);
      startButton.anchor.setTo(0.5,0.5);
   };
}
