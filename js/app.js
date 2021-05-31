const formulario = document.getElementById('formulario');
const enterThetTask = document.getElementById('enterTheTask');
const tasksList = document.getElementById('tasksList');
const templateTasks = document.getElementById('templateTasks').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    showTasks();
});

let tasks = {};


formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    setTask(e);

});

tasksList.addEventListener('click', (e) => {
    btnAction(e);
});


const setTask = (e) => {

    if (enterThetTask.value.trim() == '') {

        console.log('esta vacio...');

        return

    };

    const task = {
        id: Date.now(),
        text: enterThetTask.value,
        condition: false
    }

    tasks[task.id] = task;


    console.log(tasks);

    formulario.reset();

    enterThetTask.focus();

    showTasks();
};

const showTasks = () => {

    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (Object.values(tasks).length === 0) {
        tasksList.innerHTML = `
        <div class="alert alert-secondary m-0">
            <p class="text-dark text-center fs-3 m-0">You have no pending tasks. 😎</p>
        </div>`;
        return
    }

    Object.values(tasks).forEach(task => {
        tasksList.innerHTML = '';
        const clone = templateTasks.cloneNode(true);
        clone.querySelector('p').textContent = task.text;

        if (task.condition) {

            const taskCompleted = clone.querySelector('.alert');
            taskCompleted.classList.remove('alert-light');
            taskCompleted.classList.add('alert-success');

            const checkTask = clone.querySelectorAll('.fas')[0];
            checkTask.classList.remove('fa-check-circle');
            checkTask.classList.add('fa-undo-alt');

            clone.querySelector('p').classList.add('text-decoration-line-through');

        }

        clone.querySelectorAll('.fas')[0].dataset.id = task.id;
        clone.querySelectorAll('.fas')[1].dataset.id = task.id;
        fragment.appendChild(clone);
    })
    tasksList.appendChild(fragment);
};

const btnAction = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        tasks[e.target.dataset.id].condition = true;
        showTasks();
        // console.log(tasks);
    } else if (e.target.classList.contains('fa-undo-alt')) {
        tasks[e.target.dataset.id].condition = false;
        showTasks();
        // console.log(tasks);
    }
    if (e.target.classList.contains('fa-minus-circle')) {
        delete tasks[e.target.dataset.id];
        showTasks();
        // console.log(tasks);
    }
    e.stopPropagation();
}