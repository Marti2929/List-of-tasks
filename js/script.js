{
    const tasks = [
        {
            content: "zadanie1",
            done: true,
        },
        {
            content: "zadanie2",
            done: false,
        },
    ];

    const render = () => {
        let HTMLString = "";

        for (const task of tasks) {
            HTMLString += `
            <li class=${task.done ? "task--done" : ""}>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = HTMLString;
    };

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
            done: false,
        });

        render();
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

        submit.addEventListener("submit", onFormSubmit)
    };

    init();
}