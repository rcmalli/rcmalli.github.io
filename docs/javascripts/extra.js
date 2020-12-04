var algos = document.querySelectorAll('[id^="algo-"]');

var i;
for (i = 0; i < algos.length; i++) {
	pseudocode.renderElement(algos[i]);
}
