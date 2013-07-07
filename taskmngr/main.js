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
    var tasksData = window.tasksData;
	return tasksData;
}

function jqFillTasksInDOM(tasksData) {
	var allTasksElement = $("#tasks");
	for (var i = 0; i < tasksData.length; i++) {
		jqPushOneTaskToDOM(tasksData[i], allTasksElement);
	};
}

function editTaskMode(clickedevent){
    var target = clickedevent.target;
    if ($(target).hasClass("edit-task-button")){
        var taskid = target.id;
        var editableTask = $("#task-"+taskid);
        var taskData = getTaskObjectById(taskid, getTasks());
        var title = editableTask.children('.task-title').find('.title-text');
        var body = editableTask.children('.task-body');

        title.html('<input type="text" value="' + taskData.title + '" name="task-title" class="title-text">');
        body.html('<textarea name="task-body" class="task-body">' + taskData.taskBody + '</textarea>');
        editableTask.find('.edit-task-button').hide();

        var saveBtn = $("<div>");
        saveBtn.html('Save');
        saveBtn.addClass("save-task-button");
        saveBtn.attr("Id", taskid);

        var cancelBtn = $("<div>");
        cancelBtn.html('Cancel');
        cancelBtn.addClass("cancel-task-button");
        cancelBtn.attr("Id", taskid);

        editableTask.find('.due-date').append(cancelBtn);
        editableTask.find('.due-date').append(saveBtn);

        saveBtn.click(function(saveEvent){
            saveTask(saveEvent);
        });
        cancelBtn.click(function(cancelEvent){
            cancelTaskEdit(cancelEvent);
        });

    } else  console.log(target);
}

function saveTask(saveEvent){
    var el = saveEvent.target;

}

function cancelTaskEdit(cancelEvent){
    var el = cancelEvent.target;

}

function getTaskObjectById(id, tasks) {
    var obj = {};
    var id = id;
    $.each(tasks, function(key, data){
        if (data.Id == id){
            obj = data;
        }
    });
    return obj;
}

function jqPushOneTaskToDOM(taskElementData, allTasksElement) {
	// template generation

	var taskElement = $("<li>");
	taskElement.addClass("task row");

	var taskTitle = $("<span>") ;
	taskTitle.addClass("task-title");

    var titleText = $('<span></span>');
    titleText.addClass("title-text");


	var dueDate = $("<span>") ;
	dueDate.addClass("due-date");

	var taskBody = $("<span>");
	taskBody.addClass("task-body");

	var taskFullText = $("<span>");
	taskFullText.addClass("task-fulltext");

    var editBtn = $("<div>");
    editBtn.addClass("edit-task-button");
    editBtn.attr("Id", taskElementData.Id);

	// fill elements with data

	var taskLink = taskElementData.link;
	
	taskElement.attr("tags", taskElementData.tags + '');

	taskElement.attr("Id", 'task-' + taskElementData.Id);
	
	taskTitle.attr("link", taskLink);

    editBtn.on("click", function(e) {
        editTaskMode(e);
    });

    titleText.html(taskElementData.title);
    taskTitle.html(titleText);
	dueDate.html(taskElementData.dueDate);

    editBtn.html("edit");
    dueDate.append(editBtn);

    taskBody.html(taskElementData.taskBody);
	taskFullText.html(taskElementData.taskFullText);

	// cunstruct structure of task element
	taskTitle.append(dueDate);
	taskElement.append(taskTitle);
	taskElement.append(taskBody);
	taskElement.append(taskFullText);

	// push task element to parent
	allTasksElement.append(taskElement);

}


window.onload = function() {

    window.tasksData = [
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


	setCurrentDateInDOM();
	clearTasksInDOM(); // чистим все записи в элементе tasks
	jqFillTasksInDOM(getTasks());
}
