const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let roses = [];
let petals = [];
let sparkles = [];
let fireworks = [];

/* Crear rosas constantes */
function createRose() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 25 + 35,
    speed: Math.random() * 1.5 + 1
  };
}

/* Pétalos */
function createPetal() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 2,
    speed: Math.random() * 1.8 + 1
  };
}

/* Brillos */
function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    alpha: Math.random()
  };
}

/* Fuegos */
function createFirework() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    r: 0,
    max: 80
  };
}

/* Inicializar animaciones siempre */
for (let i = 0; i < 20; i++) roses.push(createRose());
for (let i = 0; i < 35; i++) petals.push(createPetal());
for (let i = 0; i < 70; i++) sparkles.push(createSparkle());

setInterval(() => fireworks.push(createFirework()), 1200);

/* Password */
function checkPassword() {
  const pass = document.getElementById("password").value;
  if (pass === "190322") {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("envelope").classList.remove("hidden");
  } else {
    document.getElementById("errorMsg").textContent = "Contraseña incorrecta…";
  }
}

/* Música */
function toggleMusic() {
  const music = document.getElementById("music");
  music.paused ? music.play() : music.pause();
}

/* Animación constante */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ✨ Sparkles
  sparkles.forEach(s => {
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
    ctx.fill();
    s.alpha -= 0.01;
    if (s.alpha <= 0) Object.assign(s, createSparkle());
  });

  // 🌹 Rosas cayendo siempre
  roses.forEach(r => {
    ctx.font = `${r.size}px serif`;
    ctx.fillText("🌹", r.x, r.y);
    r.y += r.speed;
    if (r.y > canvas.height) {
      r.y = -50;
      r.x = Math.random() * canvas.width;
    }
  });

  // 🌸 Pétalos
  petals.forEach(p => {
    ctx.fillStyle = "rgba(255,120,170,0.5)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;
    if (p.y > canvas.height) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
  });

  // 🎆 Fireworks
  fireworks.forEach((f, i) => {
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.stroke();
    f.r += 3;
    if (f.r > f.max) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
