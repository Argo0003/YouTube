class Comments {
	constructor({ url, onPush}) {
		this.data = [];
		this.url = url;
		this.listeners = {
			onPush: onPush,
		};
		this.allHistoryComments = 0;
	}

	push(comment) {
		this.data.push(comment)
		this.emit('onPush')
	}

	// subscribe(listenerName, fn) {
	// 	if (!this.listeners[listenerName]) {
	// 		this.listeners[listenerName] = [];
	// 	}
	// 	this.listeners[listenerName].push(fn);
	// }

	emit(listenerName) {
		const listener = this.listeners[listenerName]
		if (listener) {
			listener.forEach(function (fn) {
				fn();
			});
		}
	}

	sortedCommentsDataByName() {
		function sortNameAlg(nameA, nameB) {
			return nameA.name > nameB.name
		}
		this.data.sort(sortNameAlg);
	}

	sortedCommentsDataByTime() {
		function sortDataAlg(dataA, dataB) {
			return dataA.time > dataB.time
		}
		this.data.sort(sortDataAlg);
	}

	getIndexById(id) {
		for (let i = 0; i < this.data.length; i++) {
			if (comments.data[i].id == id)
				return i
		}
	}

	deletCommentFromData(index) {
		if (index > 0) {
			this.data.splice(index, 1);
		}
		else {
			this.data.shift()
		}
	}

	renderAllCommentsAgain() {
		document.getElementById('commentField').innerHTML = '';
		for (let i = 0; i < this.data.length; i++) {
			this.data[i].renderComment();
		}
	}
}
