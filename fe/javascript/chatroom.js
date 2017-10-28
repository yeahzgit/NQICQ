var systemMessage = document.getElementsByClassName('system-message')[0];
var closeBtn = document.getElementsByClassName('message-close')[0];

function closeMessage() {
	systemMessage.style.visibility = 'hidden';
}

function showMessage() {
	systemMessage.style.visibility = 'visible';
}

closeBtn.addEventListener('click', function(e) {
	closeMessage();
})