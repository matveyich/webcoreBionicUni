var tm = {};

tm.init = function(){

    tm.Util.renderTasksDOMElement();

    var tagsMenu = new tm.TagsMenu();
    var datesMenu = new tm.DatesMenu();

}

tm.Util = {
    tasksObjectName: '',
    allTasksDOMElement: function() {
        return $('#tasks');
    },

    clearTasksInDOM: function () {
        tm.Util.allTasksDOMElement().empty();
    },

    fillTasksInDOM: function (tasksObject){

    },
    appendOneTaskToDOM: function (taskObject, tasksDOMElement) {

    },
    setEditTaskMode: function (taskDOMElement) {

    },

    saveTaskEdit: function (taskDOMElement) {

    },
    cancelTaskEdit: function (taskDOMElement) {

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
        editBtn.attr("Id", taskObject.Id);

        // fill elements with data

        var taskLink = taskObject.link;

        var taskTags = $("<span>");
        taskTags.addClass("task-tags");
        taskTags.html(taskObject.tags + '');

        taskElement.attr("tags", taskObject.tags + '');

        taskElement.attr("Id", 'task-' + taskObject.Id);

        taskTitle.attr("link", taskLink);

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
    },

    renderTasksDOMElement: function () {
        var tasks = new tm.Tasks();

        this.clearTasksInDOM();

        $.each(tasks.get(), function(key, value){
            tm.Util.allTasksDOMElement().append(tm.Util.renderOneTaskDOMElement(value));
        });
    },

    getNormalDate: function(date){
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
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

    this.applyTasksFilter = function (filterObject) {

    }

    this.get = function () {
        return tasksData;
    }

    this.addTask = function (taskObject) {

    };

    this.deleteTask = function (taskObjectId) {

    };

    this.updateTaskObject = function (taskObject) {
    };

    this.saveTasksToLocalStorage = function (tasksObject, tasksObjectName) {
        store.set(tasksObjectName, tasksObject);
    };

    this.removeTasksFromLocalStorage = function(tasksObjectName) {
        store.remove(tasksObjectName);
    }
}