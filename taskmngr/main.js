function setCurrentDateInDOM() {
	var dateContainer = window.document.getElementById("date");
	var curDate = new Date();
	dateContainer.innerHTML = curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear();
}

function clearTasksInDOM() {
	var tasks = $('#tasks');
	tasks.empty();
}

function getTasks() {
	var tasksData = [
	{
		Id: 1,
		title: "Строка управления",
		dueDate: "24.06.2013",
		tags: ["Important"],
		taskBody: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
		taskFullText: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
		link: "http://google.com/?q=typeahead"
	},
	{
		Id: 2,
		title: "CTI-панель",
		dueDate: "24.06.2013",
		tags: ["In-progress"],
		taskBody: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
		taskFullText: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
		link: "http://google.com/?q=cti integration with avaya aura"
	},
	{
		Id: 3,
		title: "Интеграция с Google analytics",
		dueDate: "24.06.2013",
		tags: ["Finished"],
		taskBody: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api",
		taskFullText: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api",
		link: "http://google.com/?q=google analytics api"
	},
	{
		Id: 4,
		title: "Facebook integration",
		dueDate: "24.06.2013",
		tags: ["Important"],
		taskBody: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook",
		taskFullText: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook",
		link: "http://google.com/?q=facebook integration"
	},
	{
		Id: 5,
		title: "Подготовить отчет",
		dueDate: "24.06.2013",
		tags: ["Not-started"],
		taskBody: "Отчет по продажам за последний месяц<br>Сводные таблицы",
		taskFullText: "Отчет по продажам за последний месяц<br>Сводные таблицы",
		link: "http://google.com/?q=how to make up for report"
	}			
	];

	return tasksData;
}

function jqFillTasksInDOM(tasksData) {
	var allTasksElement = $("#tasks");
	for (var i = 0; i < tasksData.length; i++) {
		jqPushOneTaskToDOM(tasksData[i], allTasksElement);
	};
}

function jqPushOneTaskToDOM(taskElementData, allTasksElement) {
	// template generation

	var taskElement = $("<li>");
	taskElement.addClass("task row");

	var taskTitle = $("<span>") ;
	taskTitle.addClass("task-title");

	var dueDate = $("<span>") ;
	dueDate.addClass("due-date");

	var taskBody = $("<span>");
	taskBody.addClass("task-body");

	var taskFullText = $("<span>");
	taskFullText.addClass("task-fulltext");

	// fill elements with data

	var taskLink = taskElementData.link;
	
	taskElement.attr("tags", taskElementData.tags + '');

	taskElement.attr("Id", taskElementData.Id);
	
	taskTitle.attr("link", taskLink);
	
	taskTitle.html(taskElementData.title);
	dueDate.html(taskElementData.dueDate);
	
	taskBody.html(taskElementData.taskBody);
	taskFullText.html(taskElementData.taskFullText);

	// cunstruct structure of task element
	taskTitle.append(dueDate);
	taskElement.append(taskTitle);
	taskElement.append(taskBody);
	taskElement.append(taskFullText);

	// push task element to parent
	allTasksElement.append(taskElement);

	addTaskTitleClickHandler(taskElement);
}


function enableTaskEdit(task) {
	var okbtn = $('<input type=button value=ok>');
	var cancelbtn = new taskCancelBtn();
	$(task).append(okbtn);
	$(task).append(cancelbtn);
}

function addTaskTitleClickHandler(task){
	
	$(task).find('.task-title').click(function(){
		
		enableTaskEdit(this.parent());
		
	});
}

window.onload = function() {
	setCurrentDateInDOM();
	clearTasksInDOM(); // чистим все записи в элементе tasks
	jqFillTasksInDOM(getTasks());
}
