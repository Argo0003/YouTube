class DragAndDrop {
	constructor({ elem, downX, downY, blind, ghost, commentField, OnClick }) {
		this.dragComment = {
			elem: elem,
			downX: downX,
			downY: downY,
			blind: blind,
			ghost: ghost
		}
		this.commentField = commentField;
		this.indexOfGhost = this.faindNumberOfChild();
		this.listeners = {
			OnClick: OnClick
		}
		this.OnMouseOver();
		this.onMouseMove();
		this.DragStart();
		this.onMouseUp();
	}

	emit(listenerName) {
		const listener = this.listeners[listenerName]
		if (listener) {
			listener.forEach(function (fn) {
				fn();
			});
		}
	}

	DragStart() {
		this.emit('OnClick');
	}

	faindNumberOfChild() {
		for (var i = 0; i <= this.commentField.children.length; i++) {
			if (this.commentField.children[i].id == this.dragComment.ghost.id)
				return i
		}
	}

	OnMouseOver() {
		function over(e) {
			if (e.movementY > 0) {
				this.indexOfGhost++
				console.log(this.indexOfGhost)
				this.commentField.insertBefore(this.dragComment.ghost, this.commentField.children[this.indexOfGhost]);
			}
			else {

				this.indexOfGhost--
				console.log(this.indexOfGhost)
				this.commentField.insertBefore(this.dragComment.ghost, this.commentField.children[this.indexOfGhost]);
			}
		}

		var ArrBlinds = document.getElementsByClassName('commentBlind');
		for (var i = 0; i < comments.data.length; i++) {
			ArrBlinds[i].onmouseover = over.bind(this);
		}

		this.dragComment.blind.onmouseover = null;
	}

	onMouseMove() {
		function move(e) {
			if (!this.dragComment.elem) return;

			var moveX = e.pageX - this.dragComment.downX;
			var moveY = e.pageY - this.dragComment.downY;
			if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
				return;
			}

			this.dragComment.ghost.style.width = '100%';
			this.dragComment.ghost.style.height = '75px';

			document.body.appendChild(this.dragComment.elem);
			this.dragComment.elem.style.zIndex = 9999;
			this.dragComment.elem.style.position = 'absolute';
			this.dragComment.elem.style.width = '764px';
			this.dragComment.elem.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
			this.dragComment.elem.style.left = (e.pageX - 200) + 'px';
			this.dragComment.elem.style.top = (e.pageY - 80) + 'px';

			return false;
		}

		document.onmousemove = move.bind(this)
	}

	onMouseUp() {
		function up() {
			if (!this.dragComment.elem) return;
			this.dragComment.ghost.appendChild(this.dragComment.elem);
			this.dragComment.elem.style.position = 'relative';
			this.dragComment.elem.style.top = null;
			this.dragComment.elem.style.zIndex = '10';
			this.dragComment.ghost.style.width = null;
			this.dragComment.ghost.style.height = null;
			this.dragComment.elem.style.width = 'auto';
			this.dragComment.elem.style.left = null;
			this.dragComment.elem.style.boxShadow = null;
			this.dragComment = {};

			var ArrBlinds = document.getElementsByClassName('commentBlind');
			for (var i = 0; i < comments.data.length; i++) {
				ArrBlinds[i].onmouseover = null;
			}

			document.onselectstart = function () {
				return true;
			}
			return false;
		}
		document.onmouseup = up.bind(this)
	}
}
