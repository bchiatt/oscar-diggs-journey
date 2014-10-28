(function(){
  game.state.add('level1', {create:create, update:update});

  var map, layer, cursors, player, mask;

  function create(){
    map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('tiles');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(54, 83);
    layer.debug = true;

    player = game.add.sprite(320, 300, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

    mask = game.add.graphics(0, 0);
    mask.beginFill(0xffffff);
    mask.drawCircle(100, 100, 100);
    player.mask = mask;
    game.input.addMoveCallback(move, this);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    var help = game.add.text(16, 16, 'Arrows to move', {font: '14px Arial', fill: '#ffffff'});
    help.fixedToCamera = true;
}

  function update(){
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);

    if(cursors.left.isDown){
      player.body.velocity.x = -100;
      player.play('left');
    }
    else if (cursors.right.isDown)
      {
          player.body.velocity.x = 100;
          player.play('right');
      }
    else if (cursors.up.isDown)
      {
          player.body.velocity.y = -100;
          player.play('up');
      }
    else if (cursors.down.isDown)
      {
          player.body.velocity.y = 100;
          player.play('down');
      }
    else
      {
          player.animations.stop();
      }

  }
})();