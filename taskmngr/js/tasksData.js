var tasksDataStub = [
    {
        id: 1,
        title: "Строка управления",
        dueDate: "08.24.2013",
        tags: ["Important"],
        taskBody: "Рассмотреть use cases работы элемента в контексте бизнес процессов.",
        link: "http://google.com/?q=typeahead"
    },
    {
        id: 2,
        title: "CTI-панель",
        dueDate: "08.4.2013",
        tags: ["In-progress"],
        taskBody: "Выслать участникам на проработку и на проработку дизайна отдельных элементов (статусы, клавиатура)",
        link: "http://google.com/?q=cti integration with avaya aura",
        position: {lat: 50, long: 30}
    },
    {
        id: 3,
        title: "Интеграция с Google analytics",
        dueDate: "08.14.2013",
        tags: ["Finished"],
        taskBody: "Проработать концепцию генерации лидов с внешних источников, анализ возможностей api",
        link: "http://google.com/?q=google analytics api",
        position: { lat: 51, long: 31 }
    },
    {
        id: 4,
        title: "Facebook integration",
        dueDate: "08.21.2013",
        tags: ["Important"],
        taskBody: "Проработать архитектуру ESB<br>Подготовить интерфейсы и API интеграции с Facebook",
        link: "http://google.com/?q=facebook integration"
    },
    {
        id: 5,
        title: "Подготовить отчет",
        dueDate: "08.13.2013",
        tags: ["Not-started"],
        taskBody: "Отчет по продажам за последний месяц<br>Сводные таблицы",
        link: "http://google.com/?q=how to make up for report"
    }
];

if (store.get('tm.tasks') == undefined) {
    store.set('tm.tasks', tasksDataStub);
}