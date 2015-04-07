function MenuState () {
   var background;
   var ground;
   var dude;
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
      game.physics.startSystem(Phaser.Physics.ARCADE);
      background = game.add.sprite(0, 0, 'background');
      ground = game.add.tileSprite(0, 250, 550, 112, 'ground');
      
      ground.autoScroll(-300, 0);

      title = game.add.sprite(144,150,'title');
      title.anchor.setTo(0.5,0.5);

      game.add.tween(title).to({y:115}, 350, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

      dude = game.add.sprite(250,200,'dude');  
      dude.anchor.setTo(0.5, 48);

      dude.animations.add('walk', [5,6,7,8], 10, true);
      dude.animations.play('walk');

      game.physics.arcade.gravity.y = 1200;

      game.physics.arcade.enable([dude, ground]);

      ground.body.allowGravity = false;
      ground.body.immovable = true;

      text = game.add.text(400, 100, "", {
         font: "12px Orbitron",
         fill: "#ffffff",
         align: "center"
      });
      text.anchor.setTo(0.5, 0.5);

      startButton = game.add.button(400, 200, 'button', function () { game.state.start('calibrator'); }, this);
      startButton.anchor.setTo(0.5,0.5);
   };

   this.update = function () {
      game.physics.arcade.collide(dude, ground);
      text.setText("Volume: " + loudness + "\n(" + minValue.toFixed(2) + ":" + maxValue.toFixed(2) + ")");
      if (dude.body.touching.down && loudness > 0)
         dude.body.velocity.y = -700*Math.sqrt(loudness);
   };
}
