window.onload = function () {
	document.getElementById('leftPanel').style.display = "none";
}


function noScrollVideoPage() {
	if (leftPanel.style.display == 'block') {
		document.getElementById('bodyID').classList.add('stop-scrolling');
		blindAppearance();
	}
	else if (leftPanel.style.display == 'none') {
		document.getElementById('bodyID').classList.remove('stop-scrolling');
		blindDisappearance();
	}
}

document.getElementById('buttonNav').onclick = function () {
	if (leftPanel.style.display == 'none') {
		leftPanel.style.display = 'block';

	}
	else {
		leftPanel.style.display = 'none';
	}
	noScrollVideoPage();

}

const requestRecommended = new XMLHttpRequest();
requestRecommended.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/recommended.json');
requestRecommended.onload = function () {
	const recommended = JSON.parse(requestRecommended.responseText);
	let numberOfVideo = 8;
	document.getElementById('recomendedRigthPanel').innerHTML = `
		${
		recommended.videos.map(videoTemplat).splice(0, numberOfVideo).join('')
		}
			<button class="btn" id="btnElse">ЕЩЁ</button>

		`
	addVideos();
	function addVideos() {
		document.getElementById('btnElse').onclick = function () {
			numberOfVideo += 8;
			document.getElementById('recomendedRigthPanel').innerHTML = `
				${

				recommended.videos.map(videoTemplat).splice(0, numberOfVideo).join('')
				}
					<button class="btn" id="btnElse">ЕЩЁ</button>
					
				`
			addVideos();
		}
	}
};

requestRecommended.send();
function videoTemplat(video) {
	return `
		<a href="#" class="recomendedRigthPanel-video">
			<div class="recomendedRigthPanel-video__window">
				<img src="img/video.jpg" alt="video">
			</div>
			<div class="recomendedRigthPanel-video__description">
				<span class="recomendedRigthPanel-video__description__videoTitle">${
		video.name.substr(0, 23)
		}
				</span>
				<span class="recomendedRigthPanel-video__description__chennalTitle">${video.channelName}</span>
				<span class="recomendedRigthPanel-video__description__views">${video.views / 1000} тыс.просмотров</span>
			</div>
		</a>
	`
}

function getDate(publishedDate) {
	const nowDate = new Date();
	const days = Math.floor((Date.parse(nowDate) - Date.parse(publishedDate)) / 86400000);
	return days;
}

// Форма комментариев

let comments = [];
loadComments();
setNumberOfComments();

document.getElementById('commentAdd').onclick = function () {
	event.preventDefault();
	let inputName = document.getElementById('inputName');
	let inputText = document.getElementById('inputText');

	let comment = {
		name: inputName.value,
		text: inputText.value,
		time: Math.floor(Date.now() / 1000)
	}

	inputName.value = '';
	inputText.value = '';

	comments.push(comment);
	saveComments();
	showComments();
	setNumberOfComments()
}

function showComments() {
	document.getElementById('commentField').innerHTML = ``;
	comments.map(createDOMcomment);
}

function loadComments() {
	if (localStorage.getItem('comments')) {
		comments = JSON.parse(localStorage.getItem('comments'))
	}
	showComments();
}

function saveComments() {
	localStorage.setItem('comments', JSON.stringify(comments));
}

// создание DOM комментария

function createDOMcomment(comment) {
	const commentField = document.getElementById('commentField');
	const commentWrap = document.createElement('div');
	commentWrap.className = 'commentWrap';
	const userAvatar = document.createElement('i');
	userAvatar.className = 'fa fa-user-circle';
	const commentHeader = document.createElement('div');
	commentHeader.className = 'commentHeader';
	const commentName = document.createElement('div');
	commentName.className = 'commentName';
	const commentData = document.createElement('div');
	commentData.className = 'commentData';
	const commentText = document.createElement('div');
	commentText.className = 'commentText';
	const buttonCorrect = document.createElement('button');
	buttonCorrect.className = 'buttonCorrect';
	const penIcon = document.createElement('i');
	penIcon.className = 'fa fa-pencil';



	commentField.appendChild(commentWrap);
	commentWrap.appendChild(userAvatar);
	commentWrap.appendChild(commentHeader);
	commentHeader.appendChild(commentName);
	commentHeader.appendChild(commentData);
	commentWrap.appendChild(commentText);
	commentWrap.appendChild(buttonCorrect);
	buttonCorrect.appendChild(penIcon);

	commentName.innerHTML = comment.name;
	commentText.innerHTML = comment.text;
	commentData.innerHTML = timeConverter(comment.time);
}

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}

function setNumberOfComments() {
	let numberOfComments = document.getElementById('numberOfComments');
	numberOfComments.innerHTML = `${comments.length} комментария`
}

// popUp

let popUpPost = document.getElementById('popUpPost');
let popUpregect = document.getElementById('popUpregect');
let popUpNameInput = document.getElementById('popUpNameInput');
let popUpTextInput = document.getElementById('popUpTextInput');
let commentName = document.getElementsByClassName('commentName');
let commentText = document.getElementsByClassName('commentText');

let buttonCorrect = document.getElementsByClassName('buttonCorrect');
for (let i = 0; i < buttonCorrect.length; i++) {
	buttonCorrect[i].onclick = function () {
		document.getElementById('popUpWrap').style.display = 'block';
		document.getElementById('bodyID').classList.add('stop-scrolling');

		let oldName = commentName[i].innerHTML;
		let oldText = commentText[i].innerHTML;

		popUpNameInput.oninput = function() {
			commentName[i].innerHTML = popUpNameInput.value;
		}

		popUpTextInput.oninput = function() {
			commentText[i].innerHTML = popUpTextInput.value;
		}

		popUpPost.onclick = function() {
			event.preventDefault();
			document.getElementById('popUpWrap').style.display = 'none';
			document.getElementById('bodyID').classList.remove('stop-scrolling');

			comments[i].name = commentName[i].innerHTML;
			comments[i].text = commentText[i].innerHTML;
			saveComments();
		}

		popUpregect.onclick = function () {
			event.preventDefault();
			document.getElementById('popUpWrap').style.display = 'none';
			document.getElementById('bodyID').classList.remove('stop-scrolling');

			commentName[i].innerHTML = oldName;
			commentText[i].innerHTML = oldText;

			popUpNameInput.value = '';
			popUpTextInput.value = '';
		}
	}
}



