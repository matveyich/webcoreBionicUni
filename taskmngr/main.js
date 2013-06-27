function setCurrentDate() {
	var dateContainer = window.document.getElementById("date");
	var curDate = new Date();
	dateContainer.innerHTML = curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear();

}

function clearTasks() {
	var tasks = window.document.getElementById("tasks");
	tasks.innerHTML("");
}

function fillTasks(tasks) {

}

function pushTask(task) {

}

var tasks = [
	{
		title: "Строка управления",
		dueDate: "24.06.2013",
		taskBody: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
		taskFullText: "Рассмотреть use cases работы элемента в контексте бизнес процессов."
	},
	{
		title: "CTI-панель",
		dueDate: "24.06.2013",
		taskBody: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
		taskFullText: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)"
	}		
	];

window.onload = function() {
	setCurrentDate();
	clearTasks();
}
