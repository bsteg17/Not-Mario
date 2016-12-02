const WIDTH = 1024;
const HEIGHT = 786;

var images = [
  new Image(),
  new Image(),
  new Image()
];

images[0].src = 'backgrounds/background-layer.png'; // Background
images[1].src = 'backgrounds/foreground-layer.png'; // Foreground
images[2].src = 'fumiko2.png';  // Player


// Start the game after all files have loaded
window.onload = function() {
  // Global variables
  var canvas = document.getElementById('screen');
  var message = document.getElementById('message');
  var ctx = canvas.getContext('2d');
  var socket = io();

  //handle draw background inputs from the server
  socket.on('draw', function() {
    renderBackground(ctx);
  });

  // Handle movement updates from the server
  socket.on('move', function(players){
    renderPlayers(players, ctx);
  });

  // Handle game on events
  socket.on('game on', function() {
    message.style.display = 'none';
  });

  // Handle disconnected event
  socket.on('player left', function() {
    message.innerHTML = 'Player Left...';
    message.style.display = 'block';
  });

  // Handle victory
  socket.on('victory', function() {
    message.innerHTML = 'You win!';
    message.style.display = 'block';
  });

  // Handle loss
  socket.on('defeat', function() {
    message.innerHTML = 'You lose!';
    message.style.display = 'block';
  });

  // Handle key presses by sending a message to the
  // server with our new direction
  window.onkeydown = function(event) {
    event.preventDefault();
    switch(event.keyCode) {
      // UP
      case 38:
      case 87:
        socket.emit('steer', 'up');
        break;
      // LEFT
      case 37:
      case 65:
        socket.emit('steer', 'left');
        break;
      // RIGHT
      case 39:
      case 68:
        socket.emit('steer', 'right');
        break;
      // DOWN
      case 40:
      case 83:
        socket.emit('steer', 'down');
        break;
    }
  }

  window.onkeyup = function(event) {
    event.preventDefault();
    switch(event.keyCode) {
      case 38:
      case 87:
      case 37:
      case 65:
      case 39:
      case 68:
      case 40:
      case 83:
        socket.emit('steer', 'stop');
        break;
    }
  }
}

function renderBackground(ctx) {

  // Render the background
  ctx.save();
  //ctx.translate(-camera.position.x, 0);
  ctx.drawImage(images[0], 0, 0, images[0].width, HEIGHT);
  ctx.restore();

  ctx.save();
  //ctx.translate(-camera.position.x, 0);
  ctx.drawImage(images[1], 0, 0, images[1].width, HEIGHT);
  ctx.restore();
}

function renderPlayers(players, ctx) {
  // Draw the canvas backgrounds
  if(players.player.direction != 'none' || players.enemy.direction != 'none') {
    renderBackground(ctx);
  }
  console.log(players.player);
  ctx.fillStyle = 'red';
  //ctx.fillRect(players.player.x, players.player.y, 5, 5);
  ctx.drawImage( images[2],players.player.sx ,
   players.player.sy, players.player.swidth, players.player.sheight,
   players.player.x, players.player.y, players.player.width, players.player.height);

  ctx.fillStyle = 'blue';
  ctx.fillRect(players.enemy.x, players.enemy.y, 5, 5);
}
