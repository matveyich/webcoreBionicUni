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

function saveTasksToLocal(tasksObject){
    store.set('tasksData', tasksObject);
}

function removeTasksFromLocal(){
    store.remove('tasksData');
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
    store.set('tasksData', tasks);
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

function fillDateTagAttributes() {
    var today = Date.today();

    var thisWeekEnd = "";
    var thisWeekStart = "";
    var nextWeekEnd = "";
    var nextWeekStart = "";
    var lastWeekEnd = "";
    var lastWeekStart = "";

    if (Date.CultureInfo.firstDayOfWeek == 0) {
        if (today.is().sun()) {
            thisWeekStart = Date.today();
        } else {
            thisWeekStart = Date.today().prev().sun();
        }
    } else {
        if (today.is().mon()) {
            thisWeekStart = Date.today();
        } else {
            thisWeekStart = Date.today().prev().mon();
        }
    }

    thisWeekEnd = thisWeekStart.toDateString();
    thisWeekEnd = Date.parse(thisWeekEnd).addDays(6);

    nextWeekEnd = thisWeekEnd.toDateString();
    nextWeekEnd = Date.parse(nextWeekEnd).addDays(7);

    nextWeekStart = thisWeekStart.toDateString();
    nextWeekStart = Date.parse(nextWeekStart).addDays(7);

    lastWeekEnd = thisWeekEnd.toDateString();
    lastWeekEnd = Date.parse(lastWeekEnd).addDays(-7);

    lastWeekStart = thisWeekStart.toDateString();
    lastWeekStart = Date.parse(lastWeekStart).addDays(-7);

    $('#dates-today').attr('dueDate', getNormalDate(today));
    $('#dates-today').attr('startDate', getNormalDate(today));
    $('#dates-this-week').attr('dueDate', getNormalDate(thisWeekEnd));
    $('#dates-this-week').attr('startDate', getNormalDate(thisWeekStart));
    $('#dates-next-week').attr('dueDate', getNormalDate(nextWeekEnd));
    $('#dates-next-week').attr('startDate', getNormalDate(nextWeekStart));
    $('#dates-last-week').attr('dueDate', getNormalDate(lastWeekEnd));
    $('#dates-last-week').attr('startDate', getNormalDate(lastWeekStart));
}

function createTaskDOMElement(taskObject){

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
    editBtn.attr("Id", taskObject.Id);

    // fill elements with data

    var taskLink = taskObject.link;

    var taskTags = $("<span>");
    taskTags.addClass("task-tags");
    taskTags.html(taskObject.tags + '');

    taskElement.attr("tags", taskObject.tags + '');

    taskElement.attr("Id", 'task-' + taskObject.Id);

    taskTitle.attr("link", taskLink);

    editBtn.on("click", function(e) {
        setEditTaskMode(e);
    });

    titleText.html(taskObject.title);
    taskTitle.html(titleText);
    dueDate.html(taskObject.dueDate);

    editBtn.html("edit");

    taskBody.html(taskObject.taskBody);
    taskFullText.html(taskObject.taskFullText);

    // cunstruct structure of task element
    taskTitle.append(dueDate);
    dueDate.after(editBtn);
    taskElement.append(taskTitle);
    taskElement.append(taskBody);
    taskBody.after(taskTags);

    return taskElement;
}

function taskUrl() {
    var currentUrl = {
        tags: [],
        dates: {dueDate:'', startDate:''}
    };
    this.set = function(type, value) {
        if (type == "tags"){
            currentUrl.tags = value;
        } else if(type == "dates") {
            currentUrl.dates = value;
        }

        var url = '';
        var urlArray = []

        if (currentUrl.tags.length > 0) {
            urlArray.push('tags');
            urlArray.push(currentUrl.tags);
        }
        if (currentUrl.dates.dueDate.length > 0){
            urlArray.push('dueDate');
            urlArray.push(currentUrl.dates.dueDate);
        }
        if (currentUrl.dates.startDate.length > 0){
            urlArray.push('startDate');
            urlArray.push(currentUrl.dates.startDate);
        }

        url = '#/' + urlArray.join('/');

        if (history.pushState) {
            history.pushState(currentUrl, null, url);
        } else {
            location.href = url;
        }
    };
    this.get = function(){
        var route = location.hash;
        var segments = route.split("/");
        if(segments[0] == "#")
        {
            segments.splice(0,1);
        }

        $.each(segments, function(key, value){
            if (value == "tags") {
                currentUrl.tags.push(segments[key + 1]);
            }
            if (value == "dueDate") {
                currentUrl.dates.dueDate = segments[key + 1];
            }
            if (value == "startDate") {
                currentUrl.dates.startDate = segments[key + 1];
            }
        });
        return currentUrl;
    }
}

function activateUrl() {
    var urlFilter = tu.get();
    var filterDates = {dueDate:'', startDate:''};

    if (urlFilter.tags.length > 0) {
        taskFilter.setTags(urlFilter.tags);
    }

    if (urlFilter.dates.dueDate.length > 0) {
            filterDates.dueDate = urlFilter.dates.dueDate;
    } else {filterDates.dueDate = '01.01.9999';}

    if (urlFilter.dates.startDate.length > 0) {
        filterDates.startDate = urlFilter.dates.startDate;
    } else {filterDates.startDate = '01.01.0001';}

    taskFilter.setDates(filterDates);
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
    this.setTags = function(tags) {

        if (tags.length == 0) {
            this.applyDatesFilter = false;
        } else {
            this.applyTagsFilter = true;
            this.tags = tags;
        }
    }
    this.setDates = function(dates){
        this.dueDate = dates.dueDate;
        this.startDate = dates.startDate;
    }
}

function clickTag(tag){
    if (tag.hasClass('tag-selected')) {
        tag.removeClass('tag-selected');

        tu.set('tags', []);
        //window.taskFilter.setTags([]);
    } else {
        var tags = tag.attr('tags');
        tag.siblings().removeClass('tag-selected');
        tag.addClass('tag-selected');
        tu.set('tags', tags.split(','));
        //window.taskFilter.setTags(tags.split(','));
    }
}

function clickDateTag(dateTag){
    if (dateTag.hasClass('tag-selected')){
        dateTag.removeClass('tag-selected');
        tu.set('dates', {dueDate: '', startDate: ''});
        //window.taskFilter.setDates({dueDate: '01.01.9999', startDate: '01.01.0001'});
    } else {
        var startDate = dateTag.attr('startDate');
        var dueDate = dateTag.attr('dueDate');
        dateTag.siblings().removeClass('tag-selected');
        dateTag.addClass('tag-selected');
        tu.set('dates', {dueDate: dueDate, startDate: startDate});
        //window.taskFilter.setDates({dueDate: dueDate, startDate: startDate});
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

function renderPage() {
    activateUrl();
    clearTasksInDOM();
    fillTasksInDOM(getTasks());
}

window.onload = function() {
    setCurrentDateInDOM();
    var localTasksData = store.get('tasksData');
    if (localTasksData == undefined) {
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
        store.set('tasksData', window.tasksData);
    } else window.tasksData = localTasksData;

    fillDateTagAttributes();

    window.tu = new taskUrl();
    window.taskFilter = new filter();

    renderPage();

    $('#tags .tag').click(function(e) {
        clickTag($(this));
    });
    $('#dates .tag').click(function(e) {
        clickDateTag($(this));
    });

    window.onpopstate = function(){
        renderPage();
    };
}
