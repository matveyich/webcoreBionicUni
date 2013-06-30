function setCurrentDateInDOM() {
	var dateContainer = window.document.getElementById("date");
	var curDate = new Date();
	dateContainer.innerHTML = curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear();
}

function clearTasksInDOM() {
	var tasks = window.document.getElementById("tasks");
	while (tasks.childElementCount > 0){
		tasks.removeChild(tasks.childNodes.item());
	}
}

function fillTasksInDOM(tasksData) {
	var allTasksElement = document.getElementById("tasks");
	for (var i = 0; i < tasksData.length; i++) {
		pushOneTaskToDOM(tasksData[i], allTasksElement);
	};
}

function pushOneTaskToDOM(taskElementData, allTasksElement) {
	// template generation

	var taskElement = document.createElement("li");
	taskElement.className="task row";

	var taskTitle = document.createElement("span") ;
	taskTitle.className = "task-title";

	var dueDate = document.createElement("span") ;
	dueDate.className = "due-date";

	var taskBody = document.createElement("span");
	taskBody.className="task-body";

	var taskFullText = document.createElement("span");
	taskFullText.className="task-fulltext";	

	// fill elements with data

	for (var i = 0; i < taskElementData.tags.length; i++){
		taskElement.setAttribute("tags", taskElementData.tags[i]);
	}
	
	taskTitle.innerHTML = taskElementData.title;
	dueDate.innerHTML = taskElementData.dueDate;
	
	taskBody.innerHTML = taskElementData.taskBody;
	taskFullText.innerHTML = taskElementData.taskFullText;

	// cunstruct structure of task element
	taskTitle.appendChild(dueDate);
	taskElement.appendChild(taskTitle);
	taskElement.appendChild(taskBody);
	taskElement.appendChild(taskFullText);

	// push task element to parent
	allTasksElement.appendChild(taskElement);
}

function getTasks() {
	var tasksData = [
	{
		title: "Строка управления",
		dueDate: "24.06.2013",
		tags: ["Important"],
		taskBody: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
		taskFullText: "Рассмотреть use cases работы элемента в контексте бизнес процессов."
	},
	{
		title: "CTI-панель",
		dueDate: "24.06.2013",
		tags: ["In-progress"],
		taskBody: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
		taskFullText: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)"
	},
	{
		title: "Интеграция с Google analytics",
		dueDate: "24.06.2013",
		tags: ["Finished"],
		taskBody: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api",
		taskFullText: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api"
	},
	{
		title: "Facebook integration",
		dueDate: "24.06.2013",
		tags: ["Important"],
		taskBody: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook",
		taskFullText: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook"
	},
	{
		title: "Подготовить отчет",
		dueDate: "24.06.2013",
		tags: ["Not-started"],
		taskBody: "Отчет по продажам за последний месяц<br>Сводные таблицы",
		taskFullText: "Отчет по продажам за последний месяц<br>Сводные таблицы"
	}			
	];

	return tasksData;
}

window.onload = function() {
	setCurrentDateInDOM();
	clearTasksInDOM(); // чистим все записи в элементе tasks
	fillTasksInDOM(getTasks());
}
