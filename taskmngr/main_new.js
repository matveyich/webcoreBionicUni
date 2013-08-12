﻿var tm = {};

tm.init = function(){

    tm.curTasksObject = new tm.Tasks();

    tm.Util.renderTasksDOMElement(tm.curTasksObject);
    tm.Util.subscribeToEvents();

    tm.tagsMenu = new tm.TagsMenu();
    tm.datesMenu = new tm.DatesMenu();

    $('#add-task-btn').append(tm.Util.renderTaskForm());
}

tm.Util = {
    tasksObjectName: '',
    allTasksDOMElement: function() {
        return $('#tasks');
    },

    clearTasksInDOM: function () {
        tm.Util.allTasksDOMElement().empty();
    },

    editBtnClick: function(editBtn){
        var taskDOMel = editBtn.parents('.task');
        tm.Util.setEditTaskMode($(taskDOMel));
    },

    cancelBtnClick: function(cancelBtn){
        var taskDOMel = cancelBtn.parents('.task');
        tm.Util.cancelTaskEdit(taskDOMel);
    },

    saveBtnClick: function(saveBtn){
        var taskDOMel = saveBtn.parents('.task');
        tm.Util.saveTaskEdit($(taskDOMel));
    },

    addTaskBtnClick: function(addBtn){
        $('#add-task-btn .task-form').toggleClass('hidden');
    },

    saveNewTaskBtnClick: function(saveBtn) {
        var newTaskForm = saveBtn.parents('.task-form');
        console.log(newTaskForm);
    },


    renderTaskForm: function(){
        var formBlock = $('<div></div>');
        formBlock.addClass('hidden');
        formBlock.addClass('task-form');

        var title = $('<input>');
        title.addClass('task-title');
        title.attr('name', 'task-title');
        title.attr('type', 'text');

        var dueDate = $('<input>');
        dueDate.addClass('task-due-date');
        dueDate.attr('name', 'task-due-date');
        dueDate.attr('type', 'text');

        var body = $('<textarea></textarea>');
        body.addClass('task-body');
        body.attr('name' ,'task-body');

        var tags = $('<input>');
        tags.addClass('task-tags');
        tags.attr('name', 'task-tags');
        tags.attr('type', 'text');

        var saveBtn = $("<div>save</div>");
        saveBtn.addClass("save-new-task-button");

        var cancelBtn = $("<div>cancel</div>");
        cancelBtn.addClass("cancel-new-task-button");

        formBlock.append($('<div class="new-task-title row">Title: </div>').append(title));
        formBlock.append($('<div class="new-task-due-date row">Due date: </div>').append(dueDate));
        formBlock.append($('<div class="new-task-body row">Task: </div>').append(body));
        formBlock.append($('<div class="new-task-tags row">Tags: </div>').append(tags));
        formBlock.append($($('<div class="new-task-buttons row"></div>').append(saveBtn)).append(cancelBtn));

        return formBlock;
    },

    setEditTaskMode: function (taskDOMElement) {
        $.each($('.editing'), function(key, value){
            tm.Util.cancelTaskEdit($(value));
        });

        var task = taskDOMElement;
        task.addClass('editing');

        var taskTitle = task.find('.task-title .title-text');
        var taskBody = task.find('.task-body');
        var taskTags = task.find('.task-tags');
        var taskDueDate = task.find('.task-title .due-date');

        taskTitle.html('<input type="text" value="' + taskTitle.html() + '" name="task-title" class="title-text">');
        taskDueDate.html('<input type="text" value="' + taskDueDate.html() + '" name="task-due-date" class="title-text">');
        taskTags.html('<input type="text" value="' + taskTags.html() + '" name="task-tags" class="title-text">');
        taskBody.html('<textarea name="task-body" class="task-body">' + taskBody.html() + '</textarea>');

        task.find('.edit-task-button').addClass('hidden');
        task.find('.save-task-button').removeClass('hidden');
        task.find('.cancel-task-button').removeClass('hidden');
    },

    saveTaskEdit: function (taskDOMElement) {
        var task = taskDOMElement;
        task.removeClass('editing');

        var taskTitle = task.find('[name="task-title"]')[0].value;
        var taskBody = task.find('[name="task-body"]')[0].value;
        var taskLink = task.find('.task-title').attr('link');
        var taskDueDate = task.find('[name=task-due-date]')[0].value;
        var taskTags = task.find('[name=task-tags]')[0].value.split(',');

        var taskObject = tm.curTasksObject.newTaskObject(
            task.attr('id'),
            taskTitle,
            taskDueDate,
            taskTags,
            taskBody,
            taskLink
        );

        tm.curTasksObject.updateTasksObject(taskObject);
        tm.Util.unsetTaskEditMode(taskDOMElement);
    },

    cancelTaskEdit: function (taskDOMElement) {
        tm.Util.unsetTaskEditMode(taskDOMElement);
    },

    unsetTaskEditMode: function (taskDOMElement) {

        taskDOMElement.removeClass('editing');
        var taskId = taskDOMElement.attr('id');
        var taskObj = tm.curTasksObject.getTaskObjById(taskId);
        var taskDOMel = tm.Util.renderOneTaskDOMElement(taskObj);

        taskDOMElement.find('.edit-task-button').removeClass('hidden');
        taskDOMElement.find('.save-task-button').addClass('hidden');
        taskDOMElement.find('.cancel-task-button').addClass('hidden');

        taskDOMElement.find('.task-title .title-text').replaceWith($(taskDOMel).find('.task-title .title-text'));
        taskDOMElement.find('.task-body').replaceWith($(taskDOMel).find('.task-body'));
        taskDOMElement.find('.task-tags').replaceWith($(taskDOMel).find('.task-tags'));
        taskDOMElement.find('.task-title .due-date').replaceWith($(taskDOMel).find('.task-title .due-date'));
    },

    updateTasksDOM: function () {

    },

    renderOneTaskDOMElement: function (taskObject) {
        // template generation

        var taskElement = $("<div>");
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
        editBtn.attr("taskId", taskObject.Id);

        var saveBtn = $("<div></div>");
        saveBtn.addClass("save-task-button");
        saveBtn.addClass("hidden");
        saveBtn.attr("taskId", taskObject.Id);

        var cancelBtn = $("<div></div>");
        cancelBtn.addClass("cancel-task-button");
        cancelBtn.addClass("hidden");
        cancelBtn.attr("taskId", taskObject.Id);

        var editTaskBlock = $("<div></div>");
        editTaskBlock.addClass("edit-task-block");

        // fill elements with data

        var taskLink = taskObject.link;

        var taskTags = $("<span>");
        taskTags.addClass("task-tags");
        taskTags.html(taskObject.tags + '');

        taskElement.attr("tags", taskObject.tags + '');

        taskElement.attr("Id", taskObject.Id);

        taskTitle.attr("link", taskLink);

        titleText.html(taskObject.title);
        taskTitle.html(titleText);
        dueDate.html(taskObject.dueDate);

        editBtn.html("edit");
        saveBtn.html("save");
        cancelBtn.html("cancel");

        taskBody.html(taskObject.taskBody);
        taskFullText.html(taskObject.taskFullText);

        // construct structure of task element

        taskTitle.append(dueDate);
        editTaskBlock.append(editBtn);
        editTaskBlock.append(saveBtn);
        editTaskBlock.append(cancelBtn);
        dueDate.after(editTaskBlock);
        taskElement.append(taskTitle);
        taskElement.append(taskBody);
        taskBody.after(taskTags);

        return taskElement;
    },

    renderTasksDOMElement: function (tasksObj) {
        var tasks = tasksObj;

        this.clearTasksInDOM();

        $.each(tasks.get(), function(key, value){
            tm.Util.allTasksDOMElement().append(tm.Util.renderOneTaskDOMElement(value));
        });
    },

    getNormalDate: function(date){
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    },

    subscribeToEvents: function(){
    $('.edit-task-button').on('click', function(e){
        tm.Util.editBtnClick($(this));
    });
    $('.cancel-task-button').on('click', function(e){
        tm.Util.cancelBtnClick($(this));
    });
    $('.save-task-button').on('click', function(e){
        tm.Util.saveBtnClick($(this));
    });
    $('#add-task-btn .task-title').on('click', function(e){
        tm.Util.addTaskBtnClick($(this));
    });
    $('#add-task-btn').find('.save-new-task-button').on('click', function(e){
        tm.Util.saveNewTaskBtnClick($(this));
    });

}

}

tm.TagsMenu = function() {
    var tagsDOMel = $('#tags');
    var tagDOMel = '';

    var tags = '';

    var init = function () {
        tags = getTags();
        renderTags(tags);
        tagDOMel = $('#tags .tag');
        clickTagSubscribe();
    };

    var getTags = function(){
        //stub
        var tagsData = [
            {
                name: "Important",
                counter: 0
            },
            {
                name: "Finished",
                counter: 0
            },
            {
                name: "In-progress",
                counter: 0
            },
            {
                name: "Not-started",
                counter: 0
            }
        ];
        return tagsData;
    }

    var renderOneTagDOMel = function(tagData){
        var tagEl = $('<div>');
        tagEl.addClass('tag');
        tagEl.attr('tags', tagData.name);

        var tagtitle = $('<span>');
        tagtitle.addClass('tag-name');
        tagtitle.html(tagData.name);

        var tagcounter = $('<span>');
        tagcounter.addClass('tag-counter');

        tagEl.append(tagtitle);
        tagEl.append(tagcounter);

        return tagEl;
    }

    var renderTags = function (tags) {
        tagsDOMel.empty();
        $.each(tags, function(key, value){
            tagsDOMel.append(renderOneTagDOMel(value));
        });
    };

    var clickTag = function(tag){
        var tags = tag.attr('tags');
        if (tag.hasClass('tag-selected')) {
            tag.removeClass('tag-selected');

         //history.pushState(null, null, '#/');
            location.href = '#/';
        } else {
            var tags = tag.attr('tags');
            tag.siblings().removeClass('tag-selected');
            tag.addClass('tag-selected');

            //history.pushState(null, null, '#/' + tags.split(','))
            location.href = '#/' + tags.split(',');
        }
    };

    var clickTagSubscribe = function(){
        tagDOMel.on('click', function(e){
           clickTag($(this));
        });
    }

    init();
}

tm.DatesMenu = function() {
    var datesDOMel = $('#dates');
    var datesTodayDOMel = $('#dates-today');
    var datesThisWeekDOMel = $('#dates-this-week');
    var datesNextWeekDOMel = $('#dates-next-week');
    var datesLastWeekDOMel = $('#dates-last-week');

    var init = function(){
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

        datesTodayDOMel.attr('dueDate', tm.Util.getNormalDate(today));
        datesTodayDOMel.attr('startDate', tm.Util.getNormalDate(today));
        datesThisWeekDOMel.attr('dueDate', tm.Util.getNormalDate(thisWeekEnd));
        datesThisWeekDOMel.attr('startDate', tm.Util.getNormalDate(thisWeekStart));
        datesNextWeekDOMel.attr('dueDate', tm.Util.getNormalDate(nextWeekEnd));
        datesNextWeekDOMel.attr('startDate', tm.Util.getNormalDate(nextWeekStart));
        datesLastWeekDOMel.attr('dueDate', tm.Util.getNormalDate(lastWeekEnd));
        datesLastWeekDOMel.attr('startDate', tm.Util.getNormalDate(lastWeekStart));
    };

    init();

}

tm.TasksURL = function() {
    var currentURL = {};

    this.set = function () { };
    this.get = function () {
        return currentURL;
    };
}

tm.TasksFilter = function() {
    var filter = {
        tags: [],
        startDate: '',
        dueDate: ''
    };

    this.init = function () {

    }

    this.setTagsFilter = function (tags) {
    };
    this.setDatesFilter = function (startDate, dueDate) {
    }
    this.getCurrentFilter = function () {
        return filter;
    }
}

tm.Tasks = function() {
    var tasksData = [];
    var tasksFilter = new tm.TasksFilter();

    var loadTasks = function() {
        // getting tasks from stub
        tasksData = window.tasksDataStub;
    }

    loadTasks();

    this.getTaskObjById = function(taskId){
        var obj = {};

        $.each(tasksData, function(key, data){
            if (data.Id == taskId){
                obj = data;
            }
        });
        return obj;
    }

    this.newTaskObject = function(
        id, title, dueDate, tags, body, link
        ){
        var taskObject = {
            Id: id,
            title: title,
            dueDate: dueDate,
            tags: tags,
            taskBody: body,
            link: link
        };

        return taskObject;
    }

    this.applyTasksFilter = function (filterObject) {

    }

    this.get = function () {
        return tasksData;
    }

    this.addTask = function (taskObject) {
        tasksData.push(taskObject);
    };

    this.deleteTask = function (taskObjectId) {

    };

    this.updateTasksObject = function (taskObject) {
        $.each(tasksData, function(key, value){
            if (value.Id == taskObject.Id) {
                tasksData[key] = taskObject;
                return false;
            }
        });
    };

    this.saveTasksToLocalStorage = function (tasksObject, tasksObjectName) {
        store.set(tasksObjectName, tasksObject);
    };

    this.removeTasksFromLocalStorage = function(tasksObjectName) {
        store.remove(tasksObjectName);
    };


}