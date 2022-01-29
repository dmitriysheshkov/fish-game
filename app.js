(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  init();

  window.addEventListener('resize', init);

  let score = 0;
  let gameFrame = 0;
  ctx.font = '40px Roboto Slab';

  const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
  }

  canvas.addEventListener('mousedown', function(event) {
    mouse.click = true;
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x, mouse.y);
  });

  canvas.addEventListener('mouseup', function(event) {
    // mouse.click = false;
  });

  class Player {
    constructor() {
      this.x = canvas.width;  // start player position for x
      this.y = canvas.height / 2; // start player position for y
      this.angle = 0; // start angle for player
      this.radius = 50;
      this.spriteWidth = 498; // png-sprite size
      this.spriteHeight = 327;
    }

    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      
      if (mouse.x != this.x) {
        this.x -= dx / 15;
      }
      if (mouse.y != this.y) {
        this.y -= dy / 15;
      }
    }

    draw() {
      if (mouse.click) {
        ctx.linewidth = 0.2;
        ctx.beginPath;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouse.z, mouse.y);
        ctx.stroke();
      }
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  const player = new Player();
  
  // Animation loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();

    requestAnimationFrame(loop);
  }
  loop();









  

})();