const playerScoreSpan = document.querySelector('#player-score');
const cpuScoreSpan = document.querySelector('#cpu-score');
const buttons = document.querySelectorAll('.btn-rounded');
const buttonContainer = document.querySelector('#button-container');
const main = document.querySelector('#main');
let gameContainer;
let playAgainButton;
const possibleSelections = ['rock', 'paper', 'scissors'];
let userPick;
let cpuPick;
let playerScore = 0;
let computerScore = 0;
const numberOfRounds = 1;

function getRandomPick() {
  return possibleSelections[Math.floor(Math.random() * 3)];
}
function updateScore(whoWon = 'tie') {
  const result = document.querySelector('.result-component > p');

  if (whoWon === 'user') {
    playerScore++;
    result.textContent = 'you won';
    playerScoreSpan.textContent = playerScore;
  } else if (whoWon === 'cpu') {
    computerScore++;
    result.textContent = 'you lose';
    cpuScoreSpan.textContent = computerScore;
  } else {
    result.textContent = 'tie';
  }
}
function checkWinner(playerPick, computerPick) {
  if (playerPick === computerPick) {
    updateScore();
  } else if (
    (playerPick === 'rock' && computerPick === 'scissors')
      || (playerPick === 'paper' && computerPick === 'rock')
      || (playerPick === 'scissors' && computerPick === 'paper')
  ) { // user won
    updateScore('user');
  } else {
    updateScore('cpu');
  }
}
function createLoaderComponent() {
  const span = document.createElement('span');
  const title = document.createElement('h3');
  const button = document.createElement('button');
  const pickComponent = document.createElement('div');

  span.classList.add('loader-wrapper');
  span.setAttribute('id', 'loader');
  title.textContent = 'cpu picked';
  button.className = 'btn-loader';
  button.append(span);
  pickComponent.append(title, button);
  pickComponent.classList.add('pick-component');

  return pickComponent;
}
function createPlayComponent(type, player = 'You') {
  const img = document.createElement('img');
  const span = document.createElement('span');
  const title = document.createElement('h3');
  const button = document.createElement('button');
  const pickComponent = document.createElement('div');

  img.setAttribute('src', `./images/icon-${type}.svg`);
  span.append(img);
  span.classList.add('result-wrapper');
  title.textContent = `${player} picked`;
  button.className = `btn-result btn-${type}`;
  button.append(span);
  pickComponent.append(title, button);
  pickComponent.classList.add('pick-component');

  return pickComponent;
}
function createResultComponent() {
  const getResult = document.createElement('p');
  const playAgain = document.createElement('button');
  const resultComponent = document.createElement('div');

  playAgain.setAttribute('id', 'play-again');
  resultComponent.classList.add('result-component');
  getResult.textContent = '';
  playAgain.textContent = 'play again';
  resultComponent.append(getResult, playAgain);

  return resultComponent;
}
function isGameOver(rounds) {
  if (playerScore === rounds || computerScore === rounds) {
    alert('game over');
  }
}
function showResult() {
  setTimeout(() => {
    gameContainer.firstElementChild.after(createResultComponent());
    checkWinner(userPick, cpuPick);
    playAgainButton = document.querySelector('#play-again');
    playAgainButton.addEventListener('click', () => { // play next round
      gameContainer.remove();
      main.append(buttonContainer);
    });
  }, 250);
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    gameContainer = document.createElement('div');
    gameContainer.setAttribute('id', 'game-container');
    userPick = e.currentTarget.getAttribute('data-choice'); // playerPick
    cpuPick = getRandomPick();
    buttonContainer.remove();
    gameContainer.append(createPlayComponent(userPick), createLoaderComponent());
    main.append(gameContainer);
    document.getElementById('loader').addEventListener('animationend', () => { // removing loader and adding cpu pick component
      gameContainer.childNodes[1].remove(); // removes loader
      gameContainer.append(createPlayComponent(cpuPick, 'cpu'));
      showResult();
    });
  });
});
