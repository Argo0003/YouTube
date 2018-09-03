window.onload = function() {
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