function MenuState () {
   var background;
   var ground;
   var dude;
   var dude2;
   var title;
   var startButton;
   var text;

   this.preload = function () {
      game.load.image('title', 'img/title.png');
      game.load.image('button', 'img/button.png');
      game.load.image('background', 'img/background.png');
      game.load.image('ground', 'img/ground.png');
      game.load.spritesheet('dude', 'img/dude.png', 32, 48);
   };


   this.create = function () {
      background = game.add.sprite(0, 0, 'background');
      ground = game.add.tileSprite(0, 400, 335, 112, 'ground');
      
      ground.autoScroll(-300, 0);

      title = game.add.sprite(144,150,'title');
      title.anchor.setTo(0.5,0.5);

      game.add.tween(title).to({y:115}, 350, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

      dude = game.add.sprite(100,352,'dude');  
      dude2 = game.add.sprite(150,354,'dude');  

      dude.animations.add('walk', [5,6,7,8], 15, true);
      dude.animations.play('walk');
      dude2.animations.add('walk', [5,6,7,8], 10, true);
      dude2.animations.play('walk');

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.y = 1200;

      game.physics.arcade.enable(dude2);
      game.physics.arcade.enable(ground);

      ground.body.allowGravity = false;
      ground.body.immovable = true;

      text = game.add.text(game.world.centerX, game.world.centerY, "", {
         font: "Arial",
         fill: "#ffffff",
         align: "center"
      });
      text.anchor.setTo(0.5, 0.5);

      startButton = game.add.button(game.width/2, 300, 'button', function () { game.state.start('game'); }, this);
      startButton.anchor.setTo(0.5,0.5);
   };

   this.update = function () {
      game.physics.arcade.collide(dude2, ground);
      text.setText("Volume: " + loudness + "\n(" + minValue + ":" + maxValue + ")");
      if (dude2.body.touching.down && loudness > 0)
         dude2.body.velocity.y = -700*Math.sqrt(loudness);
   };
}
