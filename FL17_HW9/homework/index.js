/* START TASK 1: Your code goes here */
const table = document.querySelector('#task1 table');
const td = table.querySelectorAll('td');

function getCellIndex(cell) {
    return cell.cellIndex;
}

function getCellRowIndex(cell) {
    return cell.parentNode.rowIndex;
}

function standardCell(td) {
    let className = td.className;
    if (className === '') {
        td.classList.add('yellow');
    }
}


function specialCell() {
    for (let i=0; i < td.length; i++) {
        console.log('test');
        if (td[i].className === '') {
            td[i].classList.add('green');
        }
    }
}

function firstCellOfRow(selectedTd) {
    const currentRow = getCellRowIndex(selectedTd);
    for (let i=0; i < td.length; i++) {
        let row = getCellRowIndex(td[i]);
        if (row === currentRow) {
            if(td[i].className !== '') {
                return;
            }
        }
    }
    for (let i=0; i < td.length; i++) {
        let row = getCellRowIndex(td[i]);
        if (row === currentRow) {
            td[i].classList.add('blue');
        }
    } 
}

for(let i=0; i < td.length; i++ ) {
    if (getCellIndex(td[i]) === 0) {
        td[i].addEventListener('click', function() {
            firstCellOfRow(td[i]);
        });
    }else if (getCellIndex(td[i]) === 2 && getCellRowIndex(td[i]) === 1) {
        td[i].addEventListener('click', specialCell);
    } else {
        td[i].addEventListener('click', function() {
            standardCell(td[i]);
        });
    }
}





/* END TASK 1 */

/* START TASK 2: Your code goes here */

const divError = document.getElementById('divError');
const divSuccess = document.getElementById('divSuccess');
const inputText = document.querySelector('input');
const buttonSend = document.querySelector('button');

inputText.addEventListener('input', validInput);
buttonSend.addEventListener('click', sendData)

function validInput() {
   if(isPhoneNumberValid(inputText.value)) {
         hideError();
         enableButton();
   }else {
         showError();
         hideSuccess();
         disableButton();   
   }
}

function hideError () {
    divError.classList.add('d-none');
}
function showError () {
    divError.classList.remove('d-none');
    inputText.style.border = '0.5px solid red';
}

function hideSuccess () {
    divSuccess.classList.add('d-none');
}

function showSuccess () {
    divSuccess.classList.remove('d-none');
    inputText.style.border = '0.5px solid black';
}

function disableButton () {
    buttonSend.setAttribute("disabled", true);
}

function enableButton () {
    buttonSend.removeAttribute("disabled");
}

function isPhoneNumberValid (str) {
    const pattern = /^\+380\d{9}$/;
    return pattern.test(str);
}

function sendData () {
    showSuccess();
}


/* END TASK 2 */

/* START TASK 3: Your code goes here */

const court = document.getElementById('court');
const ball = document.getElementById('ball');
const notification = document.getElementById('notification');
let mouseX;
let mouseY;
let resultTeamA = 0;
let resultTeamB = 0;
let countTeamA = document.getElementsByClassName('teamA')[0]
let countTeamB = document.getElementsByClassName('teamB')[0];


court.addEventListener('mousemove', getMousePosition);
court.addEventListener('click', moveBall);
notification.addEventListener('getscore', showNotification);

function getMousePosition (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}

function showNotification(e) {
    const team = e.detail.player.toUpperCase();
    notification.classList.remove('hide-notification');
    notification.innerText = `Team ${team} score!`
    if (team === 'A') {
        notification.style.color = 'blue';
    } else {
        notification.style.color = 'red';
    }
}

function hideNotification() {
    notification.classList.add('hide-notification');
}

function moveBall () {
    hideNotification();
    let ballPositionY = mouseY - court.offsetTop - 20;
    let ballPositionX = mouseX - court.offsetLeft - 20;
    ball.style.top = ballPositionY + 'px';
    ball.style.left = ballPositionX + 'px';
    checkForPoint(ballPositionX,ballPositionY);
    showUpdatedScores();
}

function showUpdatedScores() {
    countTeamA.innerText =`Team A:${resultTeamA}`;
    countTeamB.innerText = `Team B:${resultTeamB}`;
}

function checkForPoint(x, y) {
    if(x >= 12 && x <= 28 && y >= 133 && y <= 157) {
        resultTeamB++;
        let getscoreEvent = new CustomEvent("getscore", {detail: {player: 'b'}});
        notification.dispatchEvent(getscoreEvent);
    }

    if(x >= 544 && x <= 559 && y >= 133 && y <= 157) {
        resultTeamA++;
        let getscoreEvent = new CustomEvent("getscore", {detail: {player: 'a'}});
        notification.dispatchEvent(getscoreEvent);
    }

}

function centerBall () {
    let ballPositionY = court.offsetHeight / 2 - 20;
    let ballPositionX = court.offsetWidth / 2 - 15;
    ball.style.top = ballPositionY + 'px';
    ball.style.left = ballPositionX + 'px';
}

centerBall();

/* END TASK 3 */
