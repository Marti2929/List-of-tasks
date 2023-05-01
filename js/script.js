{
    const tasks = [];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
            done: false,
        });

        render();
    };

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
        });
    }

    const toggleTaskDone = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDoneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            })
        })
    }

    const render = () => {
        let HTMLString = "";

        for (const task of tasks) {
            HTMLString += `
            <li class="list__item">
                <button class="js-toggleDoneButton list__button--done"></button>
                <div class="list__content ${task.done ? "list__content--done" : ""}">${task.content}</div>
                <button class="js-removeButton list__button--remove"></button>
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = HTMLString;

        removeTask();
        toggleTaskDone();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask").value.trim();

        if (newTask === "") {
            return
        };

        addNewTask(newTask);
    }

    const init = () => {
        render();

        const submit = document.querySelector(".js-submit");

        submit.addEventListener("submit", onFormSubmit);
    };

    init();
}