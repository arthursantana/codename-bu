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
      map.setCollisionBetween(1, 100000, true, 'Platforms');

      platforms.resizeWorld();

      dude = game.add.sprite(300,2350,'dude');  
      dude.anchor.setTo(0.5, 48);

      dude.animations.add('walk', [5,6,7,8], 10, true);
      dude.animations.play('walk');

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.enable(dude);

      dude.body.collideWorldBounds = true;

      game.camera.follow(dude);

      game.physics.arcade.gravity.y = 1200;
   };

   this.update = function () {
      if (/*dude.body.touching.down && */loudness > 0)
         dude.body.velocity.y = -700*Math.sqrt(loudness);
   };

   this.render = function () {
      //game.debug.cameraInfo(game.camera, 32, 32);
      //game.debug.spriteCoords(dude, 32, 200);
   };
}
