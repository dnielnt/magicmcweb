function showComingSoon() {
  const messages = [
    '¡Algo increíble está en camino!',
    '¡Prepárate para la próxima gran aventura!',
    '¡Estamos trabajando en algo épico!'
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  alert(randomMessage);
}

async function fetchMinecraftPlayers() {
  const statusElement = document.getElementById('minecraft-players');
  try {
    const response = await fetch('https://api.mcstatus.io/v2/status/java/play.magicmc.net:25565');
    const data = await response.json();
    if (data.online) {
      const playersOnline = data.players.online || 0;
      const playersMax = data.players.max || 0;
      statusElement.textContent = `${playersOnline}/${playersMax} jugadores en línea`;
    } else {
      statusElement.textContent = 'Servidor offline';
    }
  } catch (error) {
    statusElement.textContent = 'Error al cargar datos';
    console.error('Error fetching Minecraft server status:', error);
  }
}

function initCanvas() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('load', () => {
  fetchMinecraftPlayers();
  initCanvas();
});

window.addEventListener('resize', () => {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
