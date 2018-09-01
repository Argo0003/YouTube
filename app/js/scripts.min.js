
// Появления и скрывание боковой панели и операции связанные с ней (изменение количества видео на странице при скрытии панели, запрет на прокручивание)
var leftPanel = document.getElementById('leftPanel'),
	contentSection = document.getElementById('contentSection'),
	videoItems = document.getElementsByClassName('video-item'),
	contentBlock = document.getElementById('contentBlock');

document.getElementById('buttonNav').onclick = function () {
	if (leftPanel.style.display == 'none') {
		leftPanel.style.display = 'block';
		contentSection.classList.remove('col-lg-12');
		contentSection.classList.add('col-lg-10');
		for (var i = 0; i < videoItems.length; i++) {
			videoItems[i].classList.remove('col-xl-2');
			videoItems[i].classList.add('col-xl-3');
		}
		contentBlock.style.padding = '0 125px';
		contentSection.style.left = '220px';
	}

	else {
		leftPanel.style.display = 'none';
		contentSection.classList.remove('col-lg-10');
		contentSection.classList.add('col-lg-12');
		for (var i = 0; i < videoItems.length; i++) {
			videoItems[i].classList.remove('col-xl-3');
			videoItems[i].classList.add('col-xl-2');
		}
		contentBlock.style.padding = '0 25px';
		contentSection.style.left = '0';
	}

	noScroll();
}

window.onresize = function () {
	if (leftPanel.style.display == 'block') {
		noScroll();
	}
}

function noScroll() {
	var w = window.innerWidth;
	if (w <= 1277 && leftPanel.style.display == 'block') {
		document.getElementById('bodyID').classList.add('stop-scrolling');
		blindAppearance();
	}
	else if (leftPanel.style.display == 'none') {
		document.getElementById('bodyID').classList.remove('stop-scrolling');
		blindDisappearance();
	}
}

function blindAppearance() {
	document.getElementById('blind').style.display = 'block';
}

function blindDisappearance() {
	document.getElementById('blind').style.display = 'none';
}


// Появление панели поиска

document.getElementById('searchButton').onclick = function () {
	var w = window.innerWidth;
	if (w <= 920 && document.getElementById('inputSearch').style.display == 'none') {
		document.getElementById('inputSearch').style.display = 'block';
	}
	else if (w <= 920) {
		document.getElementById('inputSearch').style.display = 'none';
	}
}

window.onresize = function () {
	var w = window.innerWidth;
	if (w >= 925) {
		document.getElementById('inputSearch').style.display = 'block';
	}
	else {
		document.getElementById('inputSearch').style.display = 'none';
	}
}


// Вывод видео на страницу с актуальной информацией

window.onload = function () {

	const requestRecommended = new XMLHttpRequest();
	requestRecommended.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/recommended.json');
	requestRecommended.onload = function () {
		const recommended = JSON.parse(requestRecommended.responseText);
		document.getElementById('videoBlockRecomended').innerHTML = `
		${
			recommended.videos.map(videoTemplat).join('')
			}
			<button class="btn">ЕЩЁ</button>
		`
	};
	requestRecommended.send();

	const requestPopular = new XMLHttpRequest();
	requestPopular.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/popular.json');
	requestPopular.onload = function () {
		const popular = JSON.parse(requestPopular.responseText);
		document.getElementById('videoBlockPopular').innerHTML = `
		${
			popular.videos.map(videoTemplat).join('')
			}
			<button class="btn">ЕЩЁ</button>
		`
	};
	requestPopular.send();


	function videoTemplat(video) {
		return `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-sm-1 video-item">
					<div id="blind"></div>
					<div class="video-item-img"></div>
					<div class="description">
						<a href="#" class="video-title">${video.name}</a>
						<a href="#" class="channel-title">${video.channelName}</a>
						<a href="#">
							<span class="views">${video.views / 1000 } тыс. просмотров &bull;</span>
							<span class="date">${getDate(video.publishedDate)} дня назад</span>
						</a>
					</div>
				</div>
				`
	}

	function getDate(publishedDate) {
		const nowDate = new Date();
		const days = Math.floor((Date.parse(nowDate) - Date.parse(publishedDate)) / 86400000);
		return days;
	}

}







