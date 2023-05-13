{
    let tasks = [];
    let hideDoneTasks = false;
    
    const markAllTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true,
        }));
        
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask.value.trim(), done: false },
        ];

        render();
    };

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks = [
                    ...tasks.slice(0, index),
                    ...tasks.slice(index + 1),
                ];
                
                render();
            })
        });
    };

    const toggleTaskDone = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDoneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                tasks = [
                    ...tasks.slice(0, index),
                    {...tasks[index], done: !tasks[index].done},
                    ...tasks.slice(index + 1),
                ];
                render();
            })
        })
    };

    const renderTasks = () => {
        let HTMLString = "";

        for (const task of tasks) {
            HTMLString += `
            <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""} js-task">
                <button class="js-toggleDoneButton list__button--done">
                    ${task.done ? "✔" : ""}
                </button>
                <div class="list__content ${task.done ? "list__content--done" : ""}">
                    ${task.content}
                </div>
                <button class="js-removeButton list__button--remove">
                    🗑
                </button>
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = HTMLString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="js-buttonHideTasksDone title__button ${ tasks.every(( {done} ) => done === false ) ? "title__button--disabled" : ""}"
        ${ tasks.every(( {done} ) => done === false ) ? "disabled" : ""}>
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button
            class="js-buttonCompleteAllTasks title__button ${ tasks.every(( {done} ) => done ) ? "title__button--disabled" : ""}"
            ${ tasks.every(( {done} ) => done ) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>`;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-buttonCompleteAllTasks");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone)
        };

        const toggleHideDoneButton = document.querySelector(".js-buttonHideTasksDone");

        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks)
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        removeTask();
        toggleTaskDone();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");

        if (newTask.value.trim() === "") {
            return
        };

        addNewTask(newTask);

        newTask.focus();
        newTask.value = "";
    };

    const init = () => {
        render();

        const submit = document.querySelector(".js-submit");

        submit.addEventListener("submit", onFormSubmit);
    };

    init();
}