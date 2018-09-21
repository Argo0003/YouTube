class popUp {
	constructor({ index, clickRedact, clickCansel, clickDelet}) {
		this.index = index;
		this.renderCommentPopUp();
		this.buttonRedact();
		this.buttonCanselRedact();
		this.buttonDeletComment();
		this.listeners = {
			clickRedact: clickRedact,
			clickCansel: clickCansel,
			clickDelet: clickDelet,
		}
	}

	appearance() {
		document.getElementById('popUpWrap').style.display = 'block';
		document.getElementById('bodyID').classList.add('stop-scrolling');
	}

	emit(listenerName, data1, data2) {
		const listener = this.listeners[listenerName]
		if (listener) {
			listener.forEach(function (fn) {
				fn(data1, data2);
			});
		}
	}

	buttonRedact() {
		var $this = this
		function clickRedact() {
			this.emit('clickRedact', document.getElementById('popUpnameInput').value, document.getElementById('popUptextInput').value);
			this.escapePopUp()
		}
		document.getElementById('popUpPost').addEventListener('click', function () {
			clickRedact.call($this)
		})
	}

	buttonCanselRedact() {
		var $this = this
		function clickCansel() {
			this.escapePopUp()
			this.emit('clickCansel')
		}
		document.getElementById('popUpreject').addEventListener('click', function () {
			clickCansel.call($this)
		})
	}

	buttonDeletComment() {
		var $this = this
		function DeletComment() {
			this.escapePopUp()
			this.emit('clickDelet')
		}
		document.getElementById('popUpDelete').addEventListener('click', function () {
			DeletComment.call($this)
		})
	}

	escapePopUp() {
		event.preventDefault();
		document.getElementById('popUpWrap').style.display = 'none';
		document.getElementById('bodyID').classList.remove('stop-scrolling');
		document.getElementById('popUpWrap').removeChild(document.querySelector('.popUp'))
	}

	renderCommentPopUp() {
		const popUpWrap = document.getElementById('popUpWrap');
		const popUp = document.createElement('div');
		popUp.className = 'popUp';
		const popUpform = document.createElement('form');
		const popUpNameInput = document.createElement('input');
		popUpNameInput.className = 'popUpNameInput';
		popUpNameInput.placeholder = 'Имя';
		popUpNameInput.autocomplete = 'off';
		const popUpTextInput = document.createElement('input');
		popUpTextInput.className = 'popUpTextInput';
		popUpTextInput.placeholder = 'Комментарий';
		popUpTextInput.autocomplete = 'off';
		const popUpPost = document.createElement('button');
		popUpPost.className = 'btnComment';
		popUpPost.innerHTML = 'Отредактировать';
		popUpPost.type = 'submit';
		const popUpreject = document.createElement('button');
		popUpreject.className = 'btnComment btnComment-regect';
		popUpreject.innerHTML = 'Отмена';
		popUpreject.type = 'submit';
		const popUpDelete = document.createElement('button');
		popUpDelete.className = 'btnComment btnComment-regect';
		popUpDelete.innerHTML = 'Удалить';
		popUpDelete.type = 'submit';

		popUpWrap.appendChild(popUp);
		popUp.appendChild(popUpform);
		popUpform.appendChild(popUpNameInput);
		popUpform.appendChild(popUpTextInput);
		popUpform.appendChild(popUpPost);
		popUpform.appendChild(popUpDelete);
		popUpform.appendChild(popUpreject);

		popUpNameInput.id = 'popUpnameInput';
		popUpTextInput.id = 'popUptextInput';
		popUpPost.id = 'popUpPost';
		popUpreject.id = 'popUpreject';
		popUpDelete.id = 'popUpDelete';

		popUpNameInput.value = comments.data[this.index].name;
		popUpTextInput.value = comments.data[this.index].text;

		this.appearance();
		return popUpWrap;
	}
}


