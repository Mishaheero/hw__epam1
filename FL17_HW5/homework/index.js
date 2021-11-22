function isEquals(num1, num2) {
    return num1 === num2;
}

function isBigger(num1, num2) {
    return num1 > num2;
}

function storeNames(...arg) {
    let arr = [];
    for (let i = 0; i < arg.length; i++) {
        arr.push(arg[i] + '');
    }
    return arr;
}

function getDifference(num1, num2) {
    if (num1 > num2) {
        return num1 - num2;
    } else {
        return num2 - num1;
    }
}


function negativeCount(arr) {
    let count = 0
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] < 0) {
            count++
        }
    }
    return count;
}


function letterCount(word, letter) {
    let count = 0;
    for (let i = 0; i <= word.length; i++) {
        if (letter === word[i]) {
            count++
        }
    }
    return count;
}


function countPoints(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      let scores = arr[i].split(':');
      let scores1 = parseInt(scores[0]);
      let scores2 = parseInt(scores[1]);
      if (scores1 > scores2) {
          count += 3;
      }else if(scores1 === scores2) {
          count++;
      }
    }
    return count;
}
