let playing = false;
let scrollSpeed = 1;
let teleprompter = document.getElementById('teleprompter');
let editor = document.getElementById('editor');
let controls = document.getElementById('controls');

function updateText() {
  teleprompter.innerText = editor.value;
}

function toggleEdit() {
  const isHidden = teleprompter.classList.contains('hidden');
  teleprompter.classList.toggle('hidden', !isHidden);
  editor.classList.toggle('hidden', isHidden);
  if (isHidden) updateText();
}

function togglePlay() {
  playing = !playing;
  document.getElementById('playPause').innerText = playing ? 'PAUSE' : 'PLAY';
}

function loop() {
  if (playing) {
    teleprompter.scrollTop += scrollSpeed;
  }
  requestAnimationFrame(loop);
}

document.getElementById('speed').oninput = (e) => scrollSpeed = parseFloat(e.target.value);
document.getElementById('fontSize').oninput = (e) => teleprompter.style.fontSize = e.target.value + 'px';
document.getElementById('toggleEdit').onclick = toggleEdit;
document.getElementById('playPause').onclick = togglePlay;
editor.oninput = updateText;

document.body.onclick = () => controls.classList.toggle('hidden');

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }
  if (e.code === 'ArrowUp') scrollSpeed += 0.2;
  if (e.code === 'ArrowDown') teleprompter.scrollTop -= 50;
});

window.addEventListener("gamepadconnected", () => {
  console.log("Gamepad connected");
  function gamepadLoop() {
    let gp = navigator.getGamepads()[0];
    if (gp) {
      if (gp.buttons[0].pressed) togglePlay(); // A button
      if (gp.buttons[4].pressed) scrollSpeed += 0.1; // L1
      if (gp.buttons[5].pressed) teleprompter.scrollTop -= 5; // R1
    }
    requestAnimationFrame(gamepadLoop);
  }
  gamepadLoop();
});

loop();
