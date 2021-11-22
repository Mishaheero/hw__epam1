const playCasino = confirm('Do you want to play a game?');
if (playCasino) {
  funLoop();
} else {
  alert('You did not become a billionaire, but can should be shown');
}
let startNumber = 8;
let randomNumber = Math.floor(Math.random() * startNumber);
let firstPrize = 100;
let totalPrize = 0;
let possiblePrize = 100;
let roundTwoFirstPrize = 100;
function funLoop() {
  for (let i = 3; i >= 1; i--) {
    let userNumber = parseFloat(prompt(`Choose a roulette pocket number from 0 to ${startNumber}
        Attempts left: ${i}
        Total prize: ${totalPrize}$
        Possible prize on current attempt: ${possiblePrize}$`, ''));
    if (userNumber === randomNumber) {
      totalPrize += firstPrize;
      let assk = confirm(`‘Congratulation, you won! \n Your prize is: ${totalPrize}$.\nDo you want to continue?’.`)
      if (assk) {
        startNumber += 4;
        roundTwoFirstPrize += 100;
        firstPrize = roundTwoFirstPrize;
        possiblePrize += roundTwoFirstPrize;
        funLoop()
        break;
      } else {
        alert('You did not become a billionaire, but can should be shown');
        break;
      }
    } else if (i === 1) {
      let assk2 = confirm(`Thank you for your participation. Your prize is: ${totalPrize} $’
      \n and ask if he wants to play again`);
      if (assk2) {
        possiblePrize = 100;
        firstPrize = 100;
        funLoop();
      } else {
        alert('You did not become a billionaire, but can should be shown');
      }
    }
    possiblePrize = possiblePrize / 2;
    firstPrize = firstPrize / 2;
  }
}
