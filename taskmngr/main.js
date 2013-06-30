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
}

function pushOneTaskToDOM(taskElementData, allTasksElement) {
/*						<li class="task" class="row" tags="Important">
						<span class="task-title">
							Строка управления
							<span class="due-date">24.06.2013</span>
						</span>
						<span class="task-body">
							Рассмотреть use-cases работы элемента в контексте бизнес процессов<br>
							Для команды "Действия" - указывать названия действий<br>
							Проработать UX работы с элементом при вводе и подсказках команд
						</span>
						<span class="task-fulltext">
							Рассмотреть use-cases работы элемента в контексте бизнес процессов<br>
							Для команды "Действия" - указывать названия действий<br>
							Проработать UX работы с элементом при вводе и подсказках команд
						</span>
					</li>*/
	var taskElement = document.createElement("li");
	taskElement.className="task";
	taskElement.className="row";
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
	clearTasksInDOM();
	fillTasksInDOM(getTasks());
}
