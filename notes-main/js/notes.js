function getApplications(){
	let apps = localStorage.getItem('applications');
	return JSON.parse(apps);
}

function saveApplications(arr){
	let newArr = JSON.stringify(arr);
	localStorage.setItem('applications', newArr);
}

function checkForm(){
	let form = document.querySelector('form');
	if(form[0].value != '' && form[1].value != '' && form[2].value != ''){
		return true;
	}
	return false;
}

function showApplies(){
	let profile = localStorage.getItem('profile');
	let apps = document.querySelector('.apps');
	apps.innerHTML = '';
	let appsObj = getApplications();
	for(let i = 0; i < appsObj.length;i++){
		if(appsObj[i].client == profile){
			let elem = `<div class="application">
			<p class="application__number">Идентификатор: ${appsObj[i].number}</p>
			<p class="application__date">Дата создания: ${appsObj[i].date}</p>
			<p class="application__instruments">Оборудование: ${appsObj[i].instruments}</p>
			<p class="application__type">Тип: ${appsObj[i].type}</p>
			<p class="application__description">Описание: ${appsObj[i].description}</p>
			<p class="application__client">Клиент: ${appsObj[i].client}</p>
			<p class="application__worker">Рабочий: ${appsObj[i].worker}</p>
			Статус: 
			<p class="application__status">${defineStatus(appsObj[i].status)}</p>
			</div>`
			apps.insertAdjacentHTML( 'beforeend', elem );
		}
	}
}

function defineStatus(status){
	let element;
	switch(status){
		case '0':
			element = `not started`;
			break;
		case '1':
			element = `being worked`;
			break;
		case '2':
			element = `done`;
			break;
	}
	return element;
}


document.addEventListener('DOMContentLoaded', function(){
	let exit = document.querySelector('#exit');
	let logo = document.querySelector('#logo');
	exit.addEventListener('click', function(e){
		e.preventDefault();
					
		if(confirm('Do you wanna quit?')){
			localStorage.setItem('profile', '');
			localStorage.setItem('working', false);
			window.location.href = 'index.html';
		}
	})  
	logo.addEventListener('click', function(e){
		e.preventDefault();
					
		if(confirm('Do you wanna quit?')){
			localStorage.setItem('profile', '');
			localStorage.setItem('working', false);
			window.location.href = 'index.html';
		}
	})  

	let send = document.querySelector('.apply');
	send.addEventListener('click', function(e){
		let now = new Date();
		let nowDate = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
		let form = document.querySelector('form');

		if(!checkForm()){
			return;
		}

		let appsObj = getApplications();

		let quantity = localStorage.getItem('quantity');
		
		let application = {  number: quantity,
		date: nowDate,
		instruments: form[0].value,
		type: form[1].value,
		description: form[2].value,
		client: localStorage.getItem('profile'),
		status: '0',
		worker: 'not set',
		report: {
			'asdf': 'sefsfe',
			'asdsdff': 'sefswefe',
			'asdsdff': 'sefswewefe',
		}}

		localStorage.setItem('quantity', ++quantity)

		appsObj.push(application);
		saveApplications(appsObj);

		alert('You have successfully applied your application!')
	})



	showApplies();
})