
// Появления и скрывание боковой панели и операции связанные с ней (изменение количества видео на странице при скрытии панели, запрет на прокручивание)
var  leftPanel = document.getElementById('leftPanel'),
contentSection = document.getElementById('contentSection'),
videoItems     = document.getElementsByClassName('video-item'),
contentBlock   = document.getElementById('contentBlock');

document.getElementById('buttonNav').onclick = function() {
	if ( leftPanel.style.display == 'none') {ы
		leftPanel.style.display = 'block';
		contentSection.classList.remove('col-lg-12');
		contentSection.classList.add('col-lg-10');
		for ( var i = 0; i < videoItems.length; i ++) {
			videoItems[i].classList.remove('col-xl-2');
			videoItems[i].classList.add('col-xl-3');
		}
		contentBlock.style.padding = '0 125px';
		contentSection.style.left = '220px';
	}

	else {
		leftPanel.style.display ='none';
		contentSection.classList.remove('col-lg-10');
		contentSection.classList.add('col-lg-12');
		for ( var i = 0; i < videoItems.length; i ++) {
			videoItems[i].classList.remove('col-xl-3');
			videoItems[i].classList.add('col-xl-2');
		}
		contentBlock.style.padding = '0 25px';
		contentSection.style.left = '0';
	}

	noScroll();
}

window.onresize = function() {
	if(leftPanel.style.display == 'block') {
		noScroll();
	}
}

function noScroll() {
	var w = window.innerWidth;
	if ( w <= 1277 && leftPanel.style.display == 'block') {
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

document.getElementById('searchButton').onclick = function() {
	var w = window.innerWidth;
	if (w <= 920 && document.getElementById('inputSearch').style.display == 'none') {
		document.getElementById('inputSearch').style.display = 'block';
	}
	else if (w <= 920) {
		document.getElementById('inputSearch').style.display = 'none';
	}
}

window.onresize = function() {
	var w = window.innerWidth;
	if (w >= 925) {
		document.getElementById('inputSearch').style.display = 'block';
	}
	else {
		document.getElementById('inputSearch').style.display = 'none';
	}
}

