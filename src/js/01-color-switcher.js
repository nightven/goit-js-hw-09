const body = document.querySelector('body');
let intervalId;


body.addEventListener('click', onClick);

function onClick(e) {

  if (e.target.hasAttribute('data-start')) {
    e.target.setAttribute('disabled', '');
    intervalId = setInterval(setColorToBody, 1000);
  }

  if (e.target.hasAttribute('data-stop')) { 
      body.children[1].removeAttribute('disabled')
    clearInterval(intervalId);
  }
  
}

function setColorToBody() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
