class commentsMenu {
	constructor({clickSortOnName,clickSortOnData,clickAddComment}) {
		this.chengCountOfComments();
		this.buttonAddComment()
		this.buttonSortName();
		this.buttonSortData();
		this.listeners = {
			clickSortOnName: clickSortOnName,
			clickSortOnData: clickSortOnData,
			clickAddComment: clickAddComment
		}
	}

	emit(listenerName) {
		const listener = this.listeners[listenerName]
		if (listener) {
			listener.forEach(function (fn) {
				fn();
			});
		}
	}

	buttonAddComment() {
		let $this = this
		function click() {
			event.preventDefault();
			this.emit('clickAddComment');
			this.clearInoputs();
		}
		document.getElementById('commentAdd').addEventListener('click', function (e) {
			click.call($this)
		})
	}

	buttonSortName() {
		let $this = this
		function click() {
			this.emit('clickSortOnName');
		}
		document.getElementById('sortButtName').addEventListener('click', function() {
			click.call($this)
		})
	}

	buttonSortData() {
		let $this = this
		function click() {
			this.emit('clickSortOnData');
		}
		document.getElementById('sortButtData').addEventListener('click', function () {
				click.call($this)
		})
	}

	clearInoputs() {
		document.getElementById('inputName').value = '';
		document.getElementById('inputText').value = '';
	}

	chengCountOfComments() {
		if (comments.data.length == 0) {
			document.getElementById('numberOfComments').innerHTML = `0 комментарев`
		}
		else if (comments.data.length == 1) {
			document.getElementById('numberOfComments').innerHTML = `1 комментарий`
		}
		else if (comments.data.length <= 4) {
			document.getElementById('numberOfComments').innerHTML = `${comments.data.length} комментария`
		}
		else {
			document.getElementById('numberOfComments').innerHTML = `${comments.data.length} комментариев`
		}
	}
}