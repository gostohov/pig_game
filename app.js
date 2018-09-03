/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var activePlayer, roundScore, holdedScore, gameStatus;

init();

function init() {
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    activePlayer = 0;
    roundScore = [0, 0];
    holdedScore = [0, 0];
    gameStatus = true;
    document.querySelector('.dice').style.display = 'block';
}

function toglePlayer() {
    roundScore[activePlayer] = 0;    
    document.getElementById('current-' + activePlayer).textContent = roundScore[activePlayer];
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gameStatus) {
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        if (randomNumber !== 1) {
            roundScore[activePlayer] += randomNumber;
            document.getElementById('current-' + activePlayer).textContent = roundScore[activePlayer];
            document.querySelector('.dice').src = 'dice-' + randomNumber + '.png';
        } else {    
            toglePlayer();
        } 
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gameStatus) {
        holdedScore[activePlayer] += roundScore[activePlayer];
        document.getElementById('score-' + activePlayer).textContent = holdedScore[activePlayer];

        if (holdedScore[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameStatus = false;
        } else {
            toglePlayer();
        }
    }
    
});