function visitLink(path) {
	let storage = parseInt(localStorage.getItem(path));
	if (storage) {
		localStorage.setItem(path, storage + 1);
	} else {
		localStorage.setItem(path, 1);
	}
}

function viewResults() {
	let check = document.querySelector('#content ul:last-child');
	if (check) { 
		check.remove();
	}
	let result = 0;
	let listUl = document.createElement('ul');

	for (let i = 1; i <= 3; i++) {
		result = localStorage.getItem('Page' + i);
		let listLi = document.createElement('li');
		listUl.appendChild(listLi);
		if (!result) {
			listLi.innerHTML = `You visited Page${i} 0  time(s)`;
		} else {
			listLi.innerHTML = `You visited Page${i} ${result} time(s)`;
		}
		localStorage.removeItem('Page' + i);
	}

	let div = document.getElementById('content');
	div.appendChild(listUl);
}