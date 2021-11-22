const appRoot = document.getElementById('app-root');
const body = document.getElementsByTagName('body')[0];

let header, h2, divNoItemsInfo, form, span1, span2, label1, label2, select, optionDefault;
let table, thead, tbody, buttonSort1, buttonSort2, radioButton1, radioButton2;
let div1, div2, div3, div4, div5, div6;
let searchMode;
let sortMode = 'country_asc';


function initHeader() {
    header = document.createElement('header');
    h2 = document.createElement('h2');
    h2.innerText = 'Countries Search'
    header.setAttribute('class', 'myHeader');
    header.appendChild(h2);
    body.appendChild(header);
}

function initTable() {
    table = document.createElement('table');
    thead = document.createElement('thead');
    tbody = document.createElement('tbody');

    buttonSort1 = document.createElement('button');
    buttonSort2 = document.createElement('button');
    setSortButtonsIcons();

    let theadRow = thead.insertRow();
    let theadRowColumn1 = document.createElement('th');
    let theadRowColumn2 = document.createElement('th');
    let theadRowColumn3 = document.createElement('th');
    let theadRowColumn4 = document.createElement('th');
    let theadRowColumn5 = document.createElement('th');
    let theadRowColumn6 = document.createElement('th');

    theadRowColumn1.innerHTML = 'Country name'
    theadRowColumn1.appendChild(buttonSort1);
    theadRowColumn2.innerHTML = 'Capital'
    theadRowColumn3.innerHTML = 'World region'
    theadRowColumn4.innerHTML = 'Languages'
    theadRowColumn5.innerHTML = 'Area'
    theadRowColumn5.appendChild(buttonSort2);
    theadRowColumn6.innerHTML = 'Flag'

    theadRow.appendChild(theadRowColumn1);
    theadRow.appendChild(theadRowColumn2);
    theadRow.appendChild(theadRowColumn3);
    theadRow.appendChild(theadRowColumn4);
    theadRow.appendChild(theadRowColumn5);
    theadRow.appendChild(theadRowColumn6);

    table.appendChild(thead);
    table.appendChild(tbody);

    hideTable();
    body.appendChild(table);
}


function initForm() {
    form = document.createElement("form");
    div1 = document.createElement('div');
    div2 = document.createElement('div');


    divNoItemsInfo = document.createElement('div');
    divNoItemsInfo.innerText = 'No items, please choose search query';

    span1 = document.createElement('span');
    span1.innerHTML = 'Please choose type of search:'

    span2 = document.createElement('span');
    span2.innerHTML = 'Please choose search query:';

    label1 = document.createElement('label');
    label1.innerHTML = 'By region';
    label1.setAttribute('for', 'rb1')

    label2 = document.createElement('label');
    label2.innerHTML = 'By language';
    label2.setAttribute('for', 'rb2')

    select = document.createElement("select");
    optionDefault = document.createElement('option');
    select.setAttribute('name', "region");
    optionDefault.value = '';
    optionDefault.innerHTML = 'Select value';
    select.setAttribute('disabled', 'disabled');
    select.appendChild(optionDefault);

    radioButton1 = document.createElement('input');
    radioButton1.setAttribute('type', 'radio');
    radioButton1.setAttribute('name', 'mode');
    radioButton1.setAttribute('id', 'rb1');
    radioButton1.setAttribute('value', 'region');

    radioButton2 = document.createElement('input');
    radioButton2.setAttribute('type', 'radio');
    radioButton2.setAttribute('name', 'mode');
    radioButton2.setAttribute('id', 'rb2');
    radioButton2.setAttribute('value', 'language');

    hideEmptyInfo();

    div3 = document.createElement('div');
    div4 = document.createElement('div');
    div5 = document.createElement('div');
    div6 = document.createElement('div');

    div1.setAttribute('class', 'flex_box');
    div4.setAttribute('class', 'flex_box-inner');
    div5.setAttribute('class', 'element_input1');

    div1.appendChild(div3);
    div3.appendChild(span1);
    div1.appendChild(div4);
    div4.appendChild(div5);
    div5.appendChild(radioButton1);
    div5.appendChild(label1);
    div4.appendChild(div6);
    div6.appendChild(radioButton2);
    div6.appendChild(label2);
    div2.appendChild(span2);
    div2.appendChild(select);
    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(divNoItemsInfo);
    body.appendChild(form);

}

function initEvents() {
    radioButton1.addEventListener('click', changeSearchMode);
    radioButton2.addEventListener('click', changeSearchMode);
    select.addEventListener('change', getData);
    buttonSort1.addEventListener('click', sortByCountry)
    buttonSort2.addEventListener('click', sortByArea)
}

function changeSearchMode() {
    let data;
    searchMode = document.querySelector('input[type="radio"]:checked').value;
    select.removeAttribute('disabled');

    hideTable();
    showEmptyInfo();

    if (searchMode === 'language') {
        data = externalService.getLanguagesList();
    } else {
        data = externalService.getRegionsList();
    }


    refreshSelectOptions(data);
}

function getData() {
    showTable();
    hideEmptyInfo();

    let countries = []
    let searchValue = select.value;

    if (searchMode === 'language') {
        countries = externalService.getCountryListByLanguage(searchValue);
    } else {
        countries = externalService.getCountryListByRegion(searchValue);
    }

    countries = sortData(countries);
    addTableRows(countries);
}

function showTable() {
    table.classList.remove('d-none');
}

function hideTable() {
    table.classList.add('d-none');
}

function showEmptyInfo() {
    divNoItemsInfo.classList.remove('d-none');
}

function hideEmptyInfo() {
    divNoItemsInfo.classList.add('d-none');
}

function clearTableRows() {
    tbody.innerHTML = '';
}

function sortByCountry() {
    if (sortMode === 'country_asc') {
        sortMode = 'country_desc';
    } else {
        sortMode = 'country_asc';
    }

    setSortButtonsIcons();
    getData();
}

function sortByArea() {
    if (sortMode === 'area_asc') {
        sortMode = 'area_desc';
    } else {
        sortMode = 'area_asc';
    }

    setSortButtonsIcons();
    getData();
}

function setSortButtonsIcons() {
    if (sortMode === 'area_asc') {
        buttonSort1.innerText = '↕';
        buttonSort2.innerText = '↑';
    } else if (sortMode === 'area_desc') {
        buttonSort1.innerText = '↕';
        buttonSort2.innerText = '↓';
    } else if (sortMode === 'country_asc') {
        buttonSort1.innerText = '↑';
        buttonSort2.innerText = '↕';
    } else {
        buttonSort1.innerText = '↓';
        buttonSort2.innerText = '↕';
    }
}

function addTableRows(data) {
    clearTableRows();

    for (let i = 0; i < data.length; i++) {
        let country = data[i];
        let tr = document.createElement('tr');
        let td1 = tr.insertCell();
        let td2 = tr.insertCell();
        let td3 = tr.insertCell();
        let td4 = tr.insertCell();
        let td5 = tr.insertCell();
        let td6 = tr.insertCell();
        let img = document.createElement('img');
        let lang = '';

        img.setAttribute('src', country.flagURL);

        for (key in country.languages) {
            language = country.languages[key]
            if (language) {
                lang += language + ', ';
            }
        }
        lang = lang.substring(0, lang.length - 2);

        td1.innerText = country.name;
        td2.innerText = country.capital;
        td3.innerText = country.region;
        td4.innerText = lang;
        td5.innerText = country.area;
        td6.appendChild(img);
        tbody.appendChild(tr);
    }
}


function refreshSelectOptions(data) {
    let selectOptionsCount = select.options.length;
    for (let i = selectOptionsCount - 1; i > 0; i--) {
        select.removeChild(select.options[i]);
    }

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.value = data[i];
        option.innerHTML = data[i];
        select.appendChild(option);
    }
}

function sortData(data) {
    if (sortMode === 'country_asc') {
        data = data.sort(function (a, b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            if (textA < textB) {
                return -1;
            } else if (textA > textB) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortMode === 'country_desc') {
        data = data.sort(function (a, b) {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            if (textA > textB) {
                return -1;
            } else if (textA < textB) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortMode === 'area_asc') {
        data = data.sort(function (a, b) {
            let areaA = a.area;
            let areaB = b.area;
            if (areaA < areaB) {
                return -1;
            } else if (areaA > areaB) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortMode === 'area_desc') {
        data = data.sort(function (a, b) {
            let areaA = a.area;
            let areaB = b.area;
            if (areaA > areaB) {
                return -1;
            } else if (areaA < areaB) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    return data;
}

function initialize() {
    initHeader();
    initForm();
    initTable();
    initEvents();
}

initialize();