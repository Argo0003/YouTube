// Вывод видео на страницу с актуальной информацией

const requestRecommended = new XMLHttpRequest();
requestRecommended.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/recommended.json');
requestRecommended.onload = function () {
	const recommended = JSON.parse(requestRecommended.responseText);
	let numberOfVideo = 8;
	document.getElementById('videoBlockRecomended').innerHTML = `
		${

		recommended.videos.map(videoTemplat).splice(0, numberOfVideo).join('')
		}
			<button class="btn" id="btnElse">ЕЩЁ</button>

		`
	addVideos();
	function addVideos() {
		document.getElementById('btnElse').onclick = function () {
			numberOfVideo += 8;
			document.getElementById('videoBlockRecomended').innerHTML = `
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



const requestPopular = new XMLHttpRequest();
requestPopular.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/popular.json');
requestPopular.onload = function () {
	const popular = JSON.parse(requestPopular.responseText);
	document.getElementById('videoBlockPopular').innerHTML = `
		${
		popular.videos.map(videoTemplat).join('')
		}
		`
};
requestPopular.send();

const requestContinueVideos = new XMLHttpRequest();
requestContinueVideos.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/continueVideos.json');
requestContinueVideos.onload = function () {
	const ContinueVideos = JSON.parse(requestContinueVideos.responseText);
	document.getElementById('videoBlockContinueVideos').innerHTML = `
		${
		ContinueVideos.videos.map(videoTemplat).join('')
		}
		`

};
requestContinueVideos.send();

const requestLastPublished = new XMLHttpRequest();
requestLastPublished.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/continueVideos.json');
requestLastPublished.onload = function () {
	const LastPublished = JSON.parse(requestLastPublished.responseText);
	document.getElementById('videoBlockLastPublished').innerHTML = `
		${
		LastPublished.videos.map(videoTemplat).join('')
		}
		`
};
requestLastPublished.send();

function videoTemplat(video) {
	return `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-sm-1 video-item">
					<div id="blind"></div>
					<div class="video-item-img"></div>
					<div class="description">
						<a href="#" class="video-title">${video.name}</a>
						<a href="#" class="channel-title">${video.channelName}</a>
						<a href="#">
							<span class="views">${video.views / 1000} тыс. просмотров &bull;</span>
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