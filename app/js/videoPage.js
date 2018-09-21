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


// Comments

let comments = new Comments({
	url: 'localhost:3000/data/comments.json',
	onPush: [
		function () {
			commentsMenuItem.chengCountOfComments();
		}
	]
})

let commentsMenuItem = new commentsMenu({
	clickSortOnName: [
		function () {
			comments.sortedCommentsDataByName();
		},
		function () {
			comments.renderAllCommentsAgain();
		}
	],
	clickSortOnData: [
		function () {
			comments.sortedCommentsDataByTime();
		},
		function () {
			comments.renderAllCommentsAgain();
		}
	],
	clickAddComment: [
		function () {
			comments.push(new Comment(comments.allHistoryComments));
		}
	]
})


for (let i = 0; i < comments.data.length; i++) {
	
}

// comments.subscribe('onPush', chengCountOfComments);
// comments.subscribe('onLoad', function () {
// 	window.addEventListener('load', chengCountOfComments)
// })
// comments.subscribe('onLoad', function () {
// 	document.getElementById('sortButtName').addEventListener('click', function () {
// 		comments.sortedCommentsDataByName();
// 		comments.renderAllCommentsAgain();
// 	})
// })
// comments.subscribe('onLoad', function () {
// 	document.getElementById('sortButtData').addEventListener('click', function () {
// 		comments.sortedCommentsDataByTime();
// 		comments.renderAllCommentsAgain();
// 	})
// })



// var DragManager = new function () {
		// 	var commentField = document.getElementById('commentField');

		// 	var dragComment = {};
		// 	function onMouseDown(e) {

		// 		if (e.which != 1) return;
		// 		var elem = e.target.closest('.commentWrap');
		// 		if (!elem) return;

		// 		var ghost = e.target.closest('.commentGhost');
		// 		var blind = e.target;

		// 		dragComment.elem = elem;
		// 		dragComment.downX = e.pageX;
		// 		dragComment.downY = e.pageY;
		// 		dragComment.blind = blind;
		// 		dragComment.ghost = ghost;

		// 		function faindNumberOfChild() {
		// 			for (var i = 0; i <= commentField.children.length; i++) {
		// 				if (commentField.children[i].id == dragComment.ghost.id)
		// 					return i
		// 			}
		// 		}

		// 		var indexOfGhost = faindNumberOfChild();
		// 		dragComment.indexOfGhost = indexOfGhost;

		// 		var ArrBlinds = document.getElementsByClassName('commentBlind');
		// 		for (var i = 0; i < comments.data.length; i++) {
		// 			ArrBlinds[i].onmouseover = onMouseOver;
		// 		}
		// 		dragComment.blind.onmouseover = null;

		// 		function onMouseOver(e) {

		// 			if (e.movementY > 0) {
		// 				dragComment.indexOfGhost++
		// 				commentField.insertBefore(dragComment.ghost, commentField.children[dragComment.indexOfGhost]);
		// 			}
		// 			else {
		// 				dragComment.indexOfGhost--
		// 				commentField.insertBefore(dragComment.ghost, commentField.children[dragComment.indexOfGhost]);
		// 			}
		// 		}

		// 		document.onselectstart = function () {
		// 			return false;
		// 		}

		// 		return false;
		// 	}

		// 	function onMouseMove(e) {

		// 		if (!dragComment.elem) return;

		// 		var moveX = e.pageX - dragComment.downX;
		// 		var moveY = e.pageY - dragComment.downY;
		// 		if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
		// 			return;
		// 		}

		// 		dragComment.ghost.style.width = '100%';
		// 		dragComment.ghost.style.height = '75px';

		// 		document.body.appendChild(dragComment.elem);
		// 		dragComment.elem.style.zIndex = 9999;
		// 		dragComment.elem.style.position = 'absolute';
		// 		dragComment.elem.style.width = '764px';
		// 		dragComment.elem.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
		// 		dragComment.elem.style.left = (e.pageX - 200) + 'px';
		// 		dragComment.elem.style.top = (e.pageY - 80) + 'px';

		// 		return false;
		// 	}

		// 	function onMouseUp() {
		// 		if (!dragComment.elem) return;
		// 		dragComment.ghost.appendChild(dragComment.elem);
		// 		dragComment.elem.style.position = 'relative';
		// 		dragComment.elem.style.top = null;
		// 		dragComment.elem.style.zIndex = '10';
		// 		dragComment.ghost.style.width = null;
		// 		dragComment.ghost.style.height = null;
		// 		dragComment.elem.style.width = 'auto';
		// 		dragComment.elem.style.left = null;
		// 		dragComment.elem.style.boxShadow = null;
		// 		dragComment = {};

		// 		var ArrBlinds = document.getElementsByClassName('commentBlind');
		// 		for (var i = 0; i < comments.data.length; i++) {
		// 			ArrBlinds[i].onmouseover = null;
		// 		}

		// 		document.onselectstart = function () {
		// 			return true;
		// 		}
		// 		return false;
		// 	}

		// 	blind.addEventListener('mousedown', onMouseDown);
		// 	document.addEventListener('mousemove', onMouseMove);
		// 	document.addEventListener('mouseup', onMouseUp);
		// }
