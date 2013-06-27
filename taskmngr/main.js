function setCurrentDate() {
	var dateContainer = window.document.getElementById("date");
	var curDate = new Date();
	dateContainer.innerHTML = curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear();

}
window.onload = function() {
	setCurrentDate();
}
