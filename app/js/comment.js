class Comment {
	constructor(id) {
		this.name = document.getElementById('inputName').value;
		this.text = document.getElementById('inputText').value;
		this.time = Math.floor(Date.now() / 100);
		this.id = id;
		this.countAdd = this.addallHistoryCommentsCount();
		// this.uploadComment = this.uploadComment();
		this.timeConverter = function (UNIX_timestamp) {
			let a = new Date(UNIX_timestamp * 100);
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
		this.render = this.renderComment();
	}

	set setName(newName) {
		this.name = newName;
	}

	set setText(newText) {
		this.text = newText;
	}

	renderComment() {
		const commentField = document.getElementById('commentField');
		const commentGhost = document.createElement('div')
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
		const blind = document.createElement('div');
		blind.className = 'commentBlind';
		penIcon.className = 'fa fa-pencil';


		commentField.appendChild(commentGhost);
		commentGhost.appendChild(commentWrap);
		commentWrap.appendChild(userAvatar);
		commentWrap.appendChild(commentHeader);
		commentHeader.appendChild(commentName);
		commentHeader.appendChild(commentData);
		commentWrap.appendChild(commentText);
		commentWrap.appendChild(buttonCorrect);
		commentWrap.appendChild(blind);
		buttonCorrect.appendChild(penIcon);
		penIcon.id = this.id;
		commentWrap.id = `commentWrap-${this.id}`;
		penIcon.setAttribute('data', this.id);
		commentGhost.id = `${this.id}-commentGhost`;
		commentGhost.className = 'commentGhost';

		commentName.innerHTML = this.name;
		commentText.innerHTML = this.text;
		commentData.innerHTML = this.timeConverter(this.time);

		blind.onmousedown = function (e) {
			if (e.which != 1) return;

			new DragAndDrop({
				elem: e.target.closest('.commentWrap'),
				downX: e.pageX,
				downY: e.pageY,
				ghost: e.target.closest('.commentGhost'),
				blind: e.target,
				commentField: commentField,
				OnClick: [
					function () {
						document.onselectstart = function () {
							return false;
						}
					}
				]
			})

		}

		var $this = this
		//Вызов кнопки редактировать комментарий
		buttonCorrect.onclick = function (e) {
			new popUp(
				{
					index: comments.getIndexById(e.target.id),
					clickRedact: [
						function (name, text) {
							$this.setName = name;
							$this.setText = text;
						}
					],
					clickCansel: [
						function () {
							commentName.innerHTML = $this.name;
							commentText.innerHTML = $this.text;
						}
					],
					clickDelet: [
						function () {
							$this.commentDelet();
							comments.deletCommentFromData(comments.getIndexById(e.target.id));
						},
						function () {
							commentsMenuItem.chengCountOfComments()
						}
					]
				}
			);

			document.getElementById('popUpnameInput').oninput = function () {
				commentName.innerHTML = document.getElementById('popUpnameInput').value;
			}
			document.getElementById('popUptextInput').oninput = function () {
				commentText.innerHTML = document.getElementById('popUptextInput').value;
			}
		}
		return commentField;
	}
	commentDelet() {
		document.getElementById('commentField').removeChild(document.getElementById(`${this.id}-commentGhost`));
	}

	// uploadComment() {
	// 	var s = this;
	// 	axios.post('http://localhost:3000/data/comments.json', s)
	// 		.then(response => {
	// 			console.log(response)
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response)
	// 		})
	// }


	addallHistoryCommentsCount() {
		comments.allHistoryComments++;
	}

}
