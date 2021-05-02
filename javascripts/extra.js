var algos = document.querySelectorAll('[id^="algo-"]');

var i;
for (i = 0; i < algos.length; i++) {
	pseudocode.renderElement(algos[i]);
}

var buttons = document.querySelectorAll("button[data-md-color-scheme]");
var light_button = buttons[0];
var dark_button = buttons[1];
light_button.addEventListener("click", function () {
	var attr = this.getAttribute("data-md-color-scheme");
	localStorage.setItem("theme", attr);
	document.body.setAttribute("data-md-color-scheme", attr);
	// var name = document.querySelector("#__code_0 code span:nth-child(7)");
	// name.textContent = attr;
	this.style.display = "none";
	dark_button.style.display = "block";
});
dark_button.addEventListener("click", function () {
	var attr = this.getAttribute("data-md-color-scheme");
	document.body.setAttribute("data-md-color-scheme", attr);
	localStorage.setItem("theme", attr);
	// var name = document.querySelector("#__code_0 code span:nth-child(7)");
	// name.textContent = attr;
	this.style.display = "none";
	light_button.style.display = "block";
});
