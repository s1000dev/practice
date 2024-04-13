function getApplications(){
	let apps = localStorage.getItem('applications');
	return JSON.parse(apps);
}

function saveApplications(arr){
	let newArr = JSON.stringify(arr);
	localStorage.setItem('applications', newArr);
}

function createStatus(status){
	let element;
	switch(status){
		case '0':
			element = `<option selected value="0">not started</option>
			<option value="1">being worked</option>
			<option value="2">done</option>`;
			break;
		case '1':
			element = `<option value="0">not started</option>
	<option selected value="1">being worked</option>
	<option value="2">done</option>`;
			break;
		case '2':
			element = `<option value="0">not started</option>
	<option value="1">being worked</option>
	<option selected value="2">done</option>`;
			break;
	}
	return element;
}

function getData(){
	let appsObj = getApplications();
	let doneQuantity = 0;
	let types = [];
	for(let i = 0; i < appsObj.length; i++){
		if(appsObj[i].status == '2'){
			doneQuantity++;
		}
		types.push(appsObj[i].type);
	}
	console.log(doneQuantity, types)
}

function showApplies(){
	let apps = document.querySelector('.apps');
	apps.innerHTML = '';
	let appsObj = getApplications();
	for(let i = 0; i < appsObj.length;i++){
		let elem = `<div class="application">
		<p class="application__number">Идентификатор: ${appsObj[i].number}</p>
		<p class="application__date">Дата создания: ${appsObj[i].date}</p>
		<p class="application__instruments">Оборудование: ${appsObj[i].instruments}</p>
		<p class="application__type">Тип: ${appsObj[i].type}</p>
		<p class="application__description">Описание: ${appsObj[i].description}</p>
		<p class="application__client">Клиент: ${appsObj[i].client}</p>
		<p class="application__worker">Рабочий: ${appsObj[i].worker}</p>
		Статус: 
		<select class="application__status">${createStatus(appsObj[i].status)}</select>
		</div>`
		apps.insertAdjacentHTML( 'beforeend', elem );
	}
}

function reviveHeader(){
	let exit = document.querySelector('#exit');
	let logo = document.querySelector('#logo');
	exit.addEventListener('click', quit)  
	logo.addEventListener('click', quit) 
}

function quit(e){
	e.preventDefault();
					
		if(confirm('Do you wanna quit?')){
			localStorage.setItem('profile', '');
			localStorage.setItem('working', false);
			window.location.href = 'index.html';
		}
}

function changeWorker(){
	let applications__workers = document.querySelectorAll('.application__worker');
	for(let i = 0; i < applications__workers.length;i++){
		applications__workers[i].addEventListener('click', function(e){
			e.preventDefault();

			let thing = prompt('Type in the name');
			let appsObj = getApplications();
			appsObj[i].worker = thing;
			applications__workers[i].innerHTML = 'Рабочий: ' + thing;
			saveApplications(appsObj);
		})
	}
}

function changeDescription(){
	let applications__descriptions = document.querySelectorAll('.application__description');
	for(let i = 0; i < applications__descriptions.length;i++){
		applications__descriptions[i].addEventListener('click', function(e){
			e.preventDefault();

			let thing = prompt('Type in the name');
			let appsObj = getApplications();
			appsObj[i].description = thing;
			applications__descriptions[i].innerHTML = 'Описание: ' + thing;
			saveApplications(appsObj);
		})
	}
}

function changeStatus(){
	let application__statuses = document.querySelectorAll('.application__status');
	for(let i = 0; i < application__statuses.length;i++){
		application__statuses[i].addEventListener('change', function(){
			let appsObj = getApplications();
			let num = application__statuses[i].parentElement.firstElementChild.innerHTML;
			for(let j = 0; j < appsObj.length; j++){
				if(appsObj[j].number == num){
					appsObj[j].status = String(application__statuses[i].value);
				}
			}
			saveApplications(appsObj);
		})
	}
}

document.addEventListener('DOMContentLoaded', function(){
	reviveHeader();

	showApplies();
	changeStatus();
	changeWorker();
	changeDescription();
})