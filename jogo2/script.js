document.addEventListener('DOMContentLoaded', () => {
  const arena = document.getElementById('arena');
  const timeEl = document.getElementById('time');
  const scoreEl = document.getElementById('score');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const message = document.getElementById('message');

  // initial state
  resetBtn.disabled = true;

  let score = 0;
  let timeLeft = 30;
  let spawnInterval = null;
  let countdown = null;
  let running = false;

  function random(min, max){ return Math.floor(Math.random()*(max-min+1))+min }

  function spawnTarget(){
    // remove old
    const old = arena.querySelector('.target');
    if(old) old.remove();

    const t = document.createElement('button');
    t.className = 'target';
    t.type = 'button';
    t.setAttribute('aria-label','Alvo');

    // append first so offsets/width are measurable reliably
    arena.appendChild(t);

    // ensure styles applied and arena has size
    const rect = arena.getBoundingClientRect();
    const computed = getComputedStyle(t);
    const size = t.offsetWidth || parseInt(computed.width) || 64;
    const maxX = Math.max(8, Math.floor(rect.width - size - 8));
    const maxY = Math.max(8, Math.floor(rect.height - size - 8));
    const x = random(8, maxX);
    const y = random(8, maxY);
    t.style.left = x + 'px';
    t.style.top = y + 'px';

    t.addEventListener('click', () => {
      if(!running) return;
      score += 1;
      scoreEl.textContent = score;
      // small pop effect
      t.style.transform = 'scale(0.85)';
      setTimeout(()=>{
        if(t.parentNode) t.remove();
        spawnTarget();
      }, 120);
    });
  }

  function startGame(){
    if(running) return;
    running = true;
    startBtn.disabled = true;
    resetBtn.disabled = false;
    score = 0; timeLeft = 30;
    scoreEl.textContent = score; timeEl.textContent = timeLeft;
    message.textContent = 'Jogo iniciado!';

    spawnTarget();
    // spawn faster as score increases
    spawnInterval = setInterval(()=>{ spawnTarget(); }, 900);

    countdown = setInterval(()=>{
      timeLeft -= 1; timeEl.textContent = timeLeft;
      if(timeLeft <= 0){ endGame(); }
    },1000);
  }

  function endGame(){
    running = false;
    clearInterval(spawnInterval); spawnInterval = null;
    clearInterval(countdown); countdown = null;
    const t = arena.querySelector('.target'); if(t) t.remove();
    message.textContent = `Tempo esgotado! Sua pontuação: ${score}`;
    startBtn.disabled = false;
  }

  function resetGame(){
    running = false; clearInterval(spawnInterval); clearInterval(countdown);
    spawnInterval = countdown = null; score = 0; timeLeft = 30;
    scoreEl.textContent = score; timeEl.textContent = timeLeft; message.textContent = '';
    const t = arena.querySelector('.target'); if(t) t.remove();
    startBtn.disabled = false;
  }

  // attach listeners
  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  // keyboard accessibility: space starts game
  window.addEventListener('keydown', e=>{
    if(e.key === ' ' || e.code === 'Space'){ e.preventDefault(); if(!running) startGame(); }
  });

  // ensure arena resize removes target
  window.addEventListener('resize', ()=>{ const t = arena.querySelector('.target'); if(t) t.remove(); });

});
