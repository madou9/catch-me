const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
 let timeUp = false;
 let score = 0;


function randomTime (min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
  // nous avons besoin d'un nombr aléatoire entre 0 et 6
  const idx = Math.floor(Math.random() * holes.length);
  //  aleatoir holes[0 à 6]
  const hole = holes[idx];
  if (hole === lastHole){
    console.log('ah na na na')
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
  // console.log(holes.length);
}

// fonction pour un coup d'œil 
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  // supprimer apres apparition
  setTimeout(() => {
    hole.classList.remove('up');
    // rappeler la function pour que ça continu d'apparaitre il time is not up
    if (!timeUp) peep();
    
    // peep();
  
  }, time);
}

// fonction de tableau de bord
function startGame(){
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
