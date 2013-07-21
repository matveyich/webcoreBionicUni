function setCurrentDateInDOM() {
	var dateContainer = window.document.getElementById("date");
	var curDate = new Date();
    var curMonth = curDate.getMonth() + 1;
	dateContainer.innerHTML = curDate.getDate() + "/" + curMonth + "/" + curDate.getFullYear();
}

function clearTasksInDOM() {
	var tasks = $('#tasks');
	tasks.empty();
}

function getTasks() {
    var tasksData = [];
    var taskFilter = window.taskFilter;

    if (taskFilter.applyDatesFilter) {

        var startDate = Date.parse(taskFilter.startDate);
        var dueDate = Date.parse(taskFilter.dueDate);

        $.each(window.tasksData, function(key, value){

            if (Date.parse(value.dueDate).between(startDate, dueDate) == true) {

                if (taskFilter.applyTagsFilter) {

                    if ($.inArray(taskFilter.tags[0], value.tags) >= 0) {
                        tasksData.push(value);
                    }
                } else tasksData.push(value);

            }
        });
    } else tasksData = window.tasksData;

    return tasksData;
}

function fillTasksInDOM(tasksData) {
	var allTasksElement = $("#tasks");
	for (var i = 0; i < tasksData.length; i++) {
        appendOneTaskToDOM(allTasksElement, createTaskDOMElement(tasksData[i]));
	};
}

function appendOneTaskToDOM(allTasksElementDOM, taskDOMElement) {
    // push task element to parent
    allTasksElementDOM.append(taskDOMElement);
}

function setReadTaskMode(clickedevent){
    var target = clickedevent.target;
}

function setEditTaskMode(clickedevent){
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

        editableTask.find('.due-date').after(cancelBtn);
        editableTask.find('.due-date').after(saveBtn);

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
    var taskToBeSaved = $('#task-' + el.id);
    var newTaskTitle = taskToBeSaved.find('[name="task-title"]')[0].value;
    var newTaskBody = taskToBeSaved.find('[name="task-body"]')[0].value;
    var newTaskLink = taskToBeSaved.find('.task-title').attr('link');
    var newTaskDueDate = taskToBeSaved.find('.due-date')[0].innerText;
    var newTaskTags = taskToBeSaved.attr('tags').split(',');

    var taskObj = {
            Id: el.id,
            title: newTaskTitle,
            dueDate: newTaskDueDate,
            tags: newTaskTags,
            taskBody: newTaskBody,
            link: newTaskLink
    }
    updateAllTasksDataObject(taskObj);
}

function updateAllTasksDataObject(taskObj) {
    var tasks = window.tasksData;
    $.each(tasks, function(key, value){
        if (value.Id == taskObj.Id) {
            tasks[key] = taskObj;
            return false;
        }
    });
    window.tasksData = tasks;
    updateTasksDOM();
}

function cancelTaskEdit(cancelEvent){
    updateTasksDOM();
}

function updateTasksDOM() {
    clearTasksInDOM();
    fillTasksInDOM(getTasks());
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

function fillDaeTagDates() {
    $('#dates-today').attr('dueDate', getNormalDate(Date.today()));
    $('#dates-today').attr('startDate', getNormalDate(Date.today()));
    $('#dates-this-week').attr('dueDate', getNormalDate(Date.today().addWeeks(0).sun()));
    $('#dates-this-week').attr('startDate', getNormalDate(Date.today().addWeeks(-1).mon()));
    $('#dates-next-week').attr('dueDate', getNormalDate(Date.today().addWeeks(1).sun()));
    $('#dates-next-week').attr('startDate', getNormalDate(Date.today().addWeeks(0).mon()));
    $('#dates-last-week').attr('dueDate', getNormalDate(Date.today().addWeeks(-1).sun()));
    $('#dates-last-week').attr('startDate', getNormalDate(Date.today().addWeeks(-2).mon()));
}

function createTaskDOMElement(taskElementData){

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

    var taskTags = $("<span>");
    taskTags.addClass("task-tags");
    taskTags.html(taskElementData.tags + '');

    taskElement.attr("tags", taskElementData.tags + '');

    taskElement.attr("Id", 'task-' + taskElementData.Id);

    taskTitle.attr("link", taskLink);

    editBtn.on("click", function(e) {
        setEditTaskMode(e);
    });

    titleText.html(taskElementData.title);
    taskTitle.html(titleText);
    dueDate.html(taskElementData.dueDate);

    editBtn.html("edit");

    taskBody.html(taskElementData.taskBody);
    taskFullText.html(taskElementData.taskFullText);

    // cunstruct structure of task element
    taskTitle.append(dueDate);
    dueDate.after(editBtn);
    taskElement.append(taskTitle);
    taskElement.append(taskBody);
    taskBody.after(taskTags);

    return taskElement;
}

function filter(){
    this.tags = [];
    this.startDate = '01.01.0001';
    this.dueDate = '01.01.9999';
    this.applyDatesFilter = true;
    this.applyTagsFilter = false;

    this.cleanFilter = function(){
        this.tags = [];
        this.startDate = '01.01.0001';
        this.dueDate = '01.01.9999';
        this.applyDatesFilter = true;
        this.applyTagsFilter = false;
    }
}

function clickTag(tag){
    if (tag.hasClass('tag-selected')) {
        tag.removeClass('tag-selected');
        window.taskFilter.applyTagsFilter = false;
        window.taskFilter.tags = [];
    } else {
        var tags = tag.attr('tags');
        window.taskFilter.tags = tags.split(',');
        window.taskFilter.applyTagsFilter = true;
        tag.siblings().removeClass('tag-selected');
        tag.addClass('tag-selected');
    }
}

function clickDateTag(dateTag){
    if (dateTag.hasClass('tag-selected')){
        dateTag.removeClass('tag-selected');
        window.taskFilter.startDate = '01.01.0001';
        window.taskFilter.dueDate = '01.01.9999';
    } else {
        var startDate = dateTag.attr('startDate');
        var dueDate = dateTag.attr('dueDate');
        window.taskFilter.startDate = startDate;
        window.taskFilter.dueDate = dueDate;
        dateTag.siblings().removeClass('tag-selected');
        dateTag.addClass('tag-selected');
    }
}


function setTaskDateDummyData(daysOffSet){
    var today = Date.today();
    var today = today.addDays(daysOffSet);
    return getNormalDate(today);
}

function getNormalDate(date){
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
}

function setDummyDates() {
    $.each(window.tasksData, function(key, data) {
        window.tasksData[key].dueDate = setTaskDateDummyData(Math.floor((Math.random()*10)-5));
    });
}

window.onload = function() {

    window.tasksData = [
        {
            Id: 1,
            title: "Строка управления",
            dueDate: "24.06.2013",
            tags: ["Important", "Finished"],
            taskBody: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
            link: "http://google.com/?q=typeahead"
        },
        {
            Id: 2,
            title: "CTI-панель",
            dueDate: "24.06.2013",
            tags: ["In-progress"],
            taskBody: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
            link: "http://google.com/?q=cti integration with avaya aura"
        },
        {
            Id: 3,
            title: "Интеграция с Google analytics",
            dueDate: "24.06.2013",
            tags: ["Finished"],
            taskBody: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api",
            link: "http://google.com/?q=google analytics api"
        },
        {
            Id: 4,
            title: "Facebook integration",
            dueDate: "24.06.2013",
            tags: ["Important"],
            taskBody: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook",
            link: "http://google.com/?q=facebook integration"
        },
        {
            Id: 5,
            title: "Подготовить отчет",
            dueDate: "24.06.2013",
            tags: ["Not-started"],
            taskBody: "Отчет по продажам за последний месяц<br>Сводные таблицы",
            link: "http://google.com/?q=how to make up for report"
        }
    ];
    setDummyDates();
    fillDaeTagDates();

    window.taskFilter = new filter();

    $('#tags .tag').click(function(e) {
        clickTag($(this));
        clearTasksInDOM();
        fillTasksInDOM(getTasks());
    });
    $('#dates .tag').click(function(e) {
        clickDateTag($(this));
        clearTasksInDOM();
        fillTasksInDOM(getTasks());
    });

	setCurrentDateInDOM();
	clearTasksInDOM();
	fillTasksInDOM(getTasks());
}
