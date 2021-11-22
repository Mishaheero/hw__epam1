data = [{
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "age": 39,
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "age": 38,
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "age": 2,
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "age": 17,
        "eyeColor": "green",
        "name": "Weiss",
        "favoriteFruit": "banana"
    }
]


function reverseNumber(num) {
    let str = num.toString();
    let newNumber = '';
    let isMinus = false;
    for (let i=str.length - 1; i >= 0; i--) {
        let char = str[i];
        if (char === '-') {
            isMinus = true;
            continue;
        }
        newNumber += char;
    }
    newNumber = parseInt(newNumber);

    if (isMinus) {
        newNumber *= -1;
    }

    return newNumber;
}


function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
    return arr;
}

function map(arr, func) {
    let newArr = [];
    forEach(arr, function (el) {
        newArr.push(func(el));
    });
    return newArr;
}

function filter(arr, func) {
    let newArr = [];
    forEach(arr, function (el) {
        if (func(el)) {
            newArr.push(el)
        };
    });
    return newArr;
}

function getAdultAppleLovers(data) {
    let arrAgefavoriteFruit = filter(data, function (el) {
        if (el['age'] > 18 && el['favoriteFruit'] === 'apple') {
            return el;
        }
    });
    let arrNamefavoriteFruit = map(arrAgefavoriteFruit, function (el) {
        return el['name'];
    });

    return arrNamefavoriteFruit
}


function getKeys(obj) {
    let newArr = [];
    for (let key in obj) {
        if(key) {
            newArr.push(key);
        }
    }
    return newArr;
}

function getValues(obj) {
    let newArr = [];
    for (let value in obj) {
        if(value) {
            newArr.push(obj[value]);
        }
    }
    return newArr;
}


function showFormattedDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const d = dateObj.getDate();
    const t = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();
    const s = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
    const result = `${year}/${month}/${d} ${t}:${s}`;
    return result;
}