function Util() {
    var tasksObjectName = '';
    var allTasksDOMElement = $('#tasks');

    this.clearTasksInDOM = function () {
        allTasksDOMElement.empty();
    };

    this.fillTasksInDOM = function (tasksObject){
    };
    this.appendOneTaskToDOM = function (taskObject, tasksDOMElement) {
    };
    this.setEditTaskMode = function (taskDOMElement) {

    };
    this.saveTaskEdit = function (taskDOMElement) {
    };
    this.cancelTaskEdit = function (taskDOMElement) {
    };

    this.updateTasksDOM = function () {
    };

    var renderOneTaskDOMElement = function (taskObject) {
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
    };

    this.renderTasksDOMElement = function () {
        var tasks = new Tasks();

        this.clearTasksInDOM();

        $.each(tasks.get(), function(key, value){
            allTasksDOMElement.append(renderOneTaskDOMElement(value));
        });
    };

    this.clickTag = function (tagDOMElement) {
    };
    this.clickDate = function (dateDOMElement) {
    };

}

function TagsMenu() {
    var tagsDOMel = $('#tags');
    var tags = '';

    var init = function () {
        tags = getTags();
        renderTags(tags);
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
        var tagEl = $('<li></li>');
        tagEl.addClass('tag');
        tagEl.attr('tags', tagData.name);

        var tagtitle = $('<span></span>');
        tagtitle.addClass('tag-name');
        tagtitle.html(tagData.name);

        var tagcounter = $('<span></span>');
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
        $('#tags .tag').on('click', function(e){
           clickTag($(this));
        });
    }

    init();
}

function DateMenu() {
    
}

function TasksURL() {
    var currentURL = {};

    this.set = function () { };
    this.get = function () {
        return currentURL;
    };
}

function TasksFilter() {
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

function Tasks() {
    var tasksData = [];
    var tasksFilter = new TasksFilter();

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

$(document).ready(function() {
    $(window).on('popstate', function(){
        //stub code
        console.log('popstate triggered');
    });

    var u = new Util();
    u.renderTasksDOMElement();
    var tm = new TagsMenu();
});