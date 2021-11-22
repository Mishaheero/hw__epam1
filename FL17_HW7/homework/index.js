function getAge(birthDate) {
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || month === 0 && today.getDate() < birthDate.getDate()) {
        age--;
    }
    return age;
}


const today = new Date('2021-10-11');

function getWeekDay(day) {
    const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayNumber = day.getDay();
    return dayWeek[dayNumber]
}


function getAmountDaysToNewYear() {
    const today = new Date();
    const newYear = new Date(today.getFullYear() + 1, 0, 1);
    const diffinMs = newYear - today;
    const diffInDays = Math.ceil(diffinMs / (1000 * 60 * 60 * 24));
    return diffInDays
}

function getProgrammersDay(year) {
    const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = new Date(year, 0, 0);
    date.setDate(date.getDate() + 256);
    let str = `${date.getDay()} ${nameMonth[date.getMonth()]}, ${date.getFullYear()} (${getWeekDay(date)})`;

    return str;
}


function howFarIs(dayName) {
    const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let todayIndexDay = today.getDay();
    let todayDayName = dayWeek[todayIndexDay];
    let dayIndex = 0;
    let resultDay = 0;
    if (todayDayName === dayName) {
        return `Hey, today is ${dayName} =)`;
    } else {
        for (let i = 0; i < dayWeek.length; i++) {
            if (dayWeek[i].toUpperCase() === dayName.toUpperCase()) {
                dayIndex = i;
                break;
            }
        }
        resultDay = dayIndex - todayIndexDay;
    }
    return `It's ${resultDay} day(s) left till ${dayName}`;
}

function isValidIdentifier(variable) {
    let pattern = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/;
    return pattern.test(variable);

}

function capitalize(str) {
    let reg = /(\b[a-z](?!\s))/g;
    return str.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

function isValidAudioFile(file) {
    let pattern = /^[a-zA-Z]*.(?:mp3|flac|alac|aac)$/;
    return pattern.test(file);
}



function getHexadecimalColors(str) {
    let pattern = /\w*(#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b)/g;
    let array = str.match(pattern);
    if (!array) {
        return []
    } else {
        return array;
    }
}

function isValidPassword(str) {
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return pattern.test(str);
}



function addThousandsSeparators(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




function getAllUrlsFromText(text) {
    if (text) {
        let regExp = /(https?:\/\/[^\s]+)/g;
        let matchesArr = text.match(regExp);
        if (!matchesArr) {
            return []
        } else {
            return matchesArr;
        }
    }else {
        return 'error';
    }
}
