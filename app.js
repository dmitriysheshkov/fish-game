(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const bubblePop = document.createElement('audio');

  function init() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  init();

  window.addEventListener('resize', init);

  let score = 0;
  let failed = 0;
  let gameFrame = 0;
  let playerSpeed = 10; // чем больше это значение, тем медлее скорость

  const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
  }

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Player
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
        this.x -= dx / playerSpeed;
      }
      if (mouse.y != this.y) {
        this.y -= dy / playerSpeed;
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

  // Bubbles
  const bubbles = [];

  class Bubble {
    constructor() {
      this.radius = 50;
      this.x = Math.random() * canvas.width;
      // this.y = Math.random() * canvas.height;
      this.y = this.radius * 2 + canvas.height;
      this.speed = Math.random() * 5 + 1;
      this.distance;
      this.counted = false;
      this.soundNumber = getRandomInRange(1, 3);
    }

    update() {
      this.y -= this.speed;

      const dx = this.x - player.x;
      const dy = this.y - player.y;
      this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw() {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
  }

  function handleBubbles() {
    if (gameFrame % 50 == 0) { // every 50 frame
      bubbles.push(new Bubble());
    }

    bubbles.forEach((element, i) => {
      element.update();
      element.draw();
    });

    bubbles.forEach((element, i) => { //repeated to remove flickering bubbles
      if (element.y < 0 - element.radius / 2) {
        bubbles.splice(i, 1);

        bubblePop.src = `./sources/fail-bubble-${Math.random() <= 0.5 ? 1 : 2}.mp3`; 
        bubblePop.play();

        failed += 1;
      }

      if (element.distance < element.radius + player.radius) {
        if (!element.counted) {
          
          bubblePop.src = `./sources/bubble-${element.soundNumber}.mp3`; 
          bubblePop.play();
          console.log(element.soundNumber);

          score++;
          element.counted = false;
          bubbles.splice(i, 1);
        }
      }
    });
  }

  // Animation loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleBubbles();
    player.update();
    player.draw();

    ctx.font = '100 30px Roboto Slab';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`score: ${score}`, 20, 50);
    ctx.fillText(`failed: ${failed}`, 20, 100);

    ctx.font = '100 16px Roboto Slab';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Developed by Dmitry Sheshkov', 20, canvas.height - 30);

    gameFrame++;

    requestAnimationFrame(loop);
  }
  loop();

})();