
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


// VideoItem 

window.onload = function () {

	const request = new XMLHttpRequest();
	request.open('get', 'https://raw.githubusercontent.com/Argo0003/YouTube/master/app/data/recommended.json');
	request.onload = function () {
		const recommended = JSON.parse(request.responseText);
		console.log(recommended.videos);
		document.getElementById('videoBlock').innerHTML = `
		${
			recommended.videos.map(vieoTemplat).join('')
			}
		`
	};
	request.send();

	function vieoTemplat(video) {
		return `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-sm-1 video-item">
					<div id="blind"></div>
					<div class="video-item-img"></div>
					<div class="description">
						<a href="#" class="video-title">${video.name}</a>
						<a href="#" class="channel-title">${video.channelName}</a>
						<a href="#">
							<span class="views">${video.views}</span>
							<span class="date">${video.publishedDate}</span>
						</a>
					</div>
				</div>
				`
	}
}




	// ${ 
	// 	recommended.videos.map(vieoTemplat).join('')
	// }
	// <button class="btn">ЕЩЁ</button>


// var   videoItem = document.createElement('div'),
// 	 videoItemImg = document.createElement('div'),
// 		description = document.createElement('div'),
// 		 videoTitle = document.createElement('a'),
//    chennelTitle = document.createElement('a'),
// 		  videoLink = document.createElement('a'),
// 				  views = document.createElement('span'),
// 		puplishDate = document.createElement('span');


// videoItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-sm-1 video-item";
// videoItemImg.className = "video-item-img";
// description.className = "description";
// videoTitle.className = "video-title";
// chennelTitle.className = "channel-title";

// videoTitle.href = "#";
// chennelTitle.href = "#";
// videoLink.href = "#";

// views.innerHTML = "dsada";
// videoTitle.innerHTML = "dsada";
// chennelTitle.innerHTML = "adsad";

// document.getElementById('videoBlock').insertBefore(videoItem, document.getElementById('btnElse'));
// videoItem.appendChild(videoItemImg);
// videoItem.appendChild(description);
// description.appendChild(videoTitle);
// description.appendChild(chennelTitle);
// description.appendChild(videoLink);
// videoLink.appendChild(views);
// videoLink.appendChild(puplishDate);




