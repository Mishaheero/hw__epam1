const money = +prompt('Enter pls money');
const years = +prompt('Enter pls years');
const percentage = +prompt('Enter pls percentage');

if (isNaN(money) || isNaN(years) || isNaN(percentage)) {
    alert('pls take ONLY numbers');
}

if (money >= 1000) {
    console.log('You have entered moneys');
} else if (years >= 1 && years <= 110) {
    console.log('You have entered years');
} else if (percentage >= 0 && percentage <= 100) {
    console.log('You have entered percentages');
} else {
    alert('Invalid input data');
}

let percentageProfit = (money) => {
    return money / 100 * percentage;
}
let sum1 = 0;
let sum2 = money;
for (let i = 1; i <= years; i++) {
    sum2 += percentageProfit(sum2);
}

sum1 = sum2 - money;

alert(`Initial amount: ${money}\n Number of years: ${years}\n Percentage of year: ${percentage}\n 

Total profit: ${sum1}\nTotal amount: ${sum2}`);