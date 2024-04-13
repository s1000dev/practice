document.addEventListener('DOMContentLoaded', function () {

	let clear = document.getElementById('clear');
	clear.addEventListener('click', () => {localStorage.clear();localStorage.setItem('quantity', 0);localStorage.setItem('working', false);localStorage.setItem('profiles', JSON.stringify({'s': '1', 'a': 'a'}));localStorage.setItem('applications', JSON.stringify([]));});

	let login = document.getElementById('login');
	let register = document.getElementById('register');
	
	let nameLogin = document.getElementById('nameLogin');
	let pass = document.getElementById('pass');
	let passConfirm = document.getElementById('passConfirm');

	let loginName = document.getElementById('loginName');
	let loginPass = document.getElementById('loginPass');

	//!registration

	if(localStorage.getItem('quantity') == null){
		localStorage.setItem('quantity', 0);
	}
	localStorage.setItem('working', false);
	if(localStorage.getItem('profiles') == null){
		localStorage.setItem('profiles', JSON.stringify({}));
	}

	register.addEventListener('click', function(e){
		e.preventDefault();

		let nameLog = nameLogin.value;
		let password = pass.value;

		if(checkPasswords() && checkRegistered(nameLogin.value)){
			let profs = localStorage.getItem('profiles');
			let profsObj = JSON.parse(profs);
			profsObj[nameLog] = password;
			localStorage.setItem('profiles', JSON.stringify(profsObj));
			alert('You successfully registered!');
			nameLogin.value = '';
			pass.value = '';
			passConfirm.value = '';
		} else{
			alert('Theres already user with that username');
		}

	})

	function checkRegistered(name){
		let profs = localStorage.getItem('profiles');
		let profsObj = JSON.parse(profs);
		for(let key in profsObj){
			if(key == name){
				return false;
			}
		}
		return true;
	}

	function checkPasswords(){
		if(pass.value === passConfirm.value){
			return true;
		} else{
			alert('Passwords aren`t the same');
		}
	}

	//! login

	login.addEventListener('click', function(e){
		e.preventDefault();

		let profs = localStorage.getItem('profiles');
		let profsObj = JSON.parse(profs);

		if(loginName.value == 'a' && loginPass.value == 'a'){
			localStorage.setItem('profile', loginName.value);
			localStorage.setItem('working', true);
			window.location.href = 'admin.html';
			return;
		}

		for(let key in profsObj){
			if(key == loginName.value && profsObj[key] == loginPass.value){
				localStorage.setItem('profile', loginName.value);
				localStorage.setItem('working', true);
				window.location.href = 'notes.html';
				return;
			}
		}
		alert('There`s no such person or your password is incorrect!');
	})
})
