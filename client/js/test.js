function TestState () {
   var map;
   var background;
   var dude;
   var platforms;

   this.preload = function () {
      game.load.image('background', 'img/background.png');
      game.load.spritesheet('dude', 'img/dude.png', 32, 48);
      game.load.tilemap('testMap', 'maps/test.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('gameTiles', 'img/tilesets/simples_pimples.png');
   };

   this.create = function () {
      background = game.add.tileSprite(0, 0, 505, 288, 'background');
      map = game.add.tilemap('testMap');
      map.addTilesetImage('Simplespimples', 'gameTiles');

      platforms = map.createLayer('Platforms');
      platforms.resizeWorld();
      map.setCollisionBetween(1, 2000, true, 'Platforms');

      dude = game.add.sprite(30,2900,'dude');  
      dude.anchor.setTo(0.5, 48);

      dude.animations.add('right', [5,6,7,8], 10, true);
      dude.animations.add('left', [0,1,2,3], 10, true);
      dude.animations.play('right');

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.enable([dude, platforms], Phaser.Physics.ARCADE);

      dude.body.velocity.x = 150;
      //dude.body.bounce.y = 0.2;
      dude.body.bounce.x = 1;

      game.camera.follow(dude);

      game.physics.arcade.gravity.y = 1200;
   };

   this.update = function () {
      game.physics.arcade.collide(dude, platforms);
      if (dude.body.blocked.down && loudness > 0)
         dude.body.velocity.y = -700*Math.sqrt(loudness);
      /*
      if (dude.body.blocked.right)
         dude.body.velocity.x *= -1;
        */
   };

   this.render = function () {
      game.debug.bodyInfo(dude, -200, 200);
   };
}
