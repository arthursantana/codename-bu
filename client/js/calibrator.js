function CalibratorState () {
   var text;
   var sum;
   var n;

   this.preload = function () {
   };

   this.create = function () {
      sum = n = 0;

      text = game.add.text(game.world.centerX, game.world.centerY, "Be vewy quiet...", {
         font: "18px Orbitron",
         fill: "#ffffff",
         align: "center"
      });
      text.anchor.setTo(0.5, 0);

      game.time.events.loop(Phaser.Timer.SECOND/20, function () {
         sum += averageValue;
         n++;
         console.log(sum/n);
      }, this);

      game.time.events.add(Phaser.Timer.SECOND, function () {
         text.setText("Be vewy quiet...\n(I'm hunting wabbits)");
      }, this);
      game.time.events.add(Phaser.Timer.SECOND*3, function () {
         minValue = sum/n * 1.5;
         sum = n = 0;
         text.setText("SCREAM YOUR\nLUNGS OUT!!!");
      }, this);
      game.time.events.add(Phaser.Timer.SECOND*5, function () {
         maxValue = sum/n * 1.2;
         game.state.start('menu');
      }, this);
   };

   this.update = function () {
   };
}
