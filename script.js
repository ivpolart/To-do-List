window.addEventListener('DOMContentLoaded', function() {
    const addNewBtn = document.querySelector('.todo__add');
    const modal = document.querySelector('.todo__modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    const applyBtn = document.querySelector('.btn-apply');
    const inputNewTask = document.querySelector('.todo__popup-input');
    const todoList = document.querySelector('.todo__list')
    const todoListItem = document.querySelectorAll('.todo__list-item');

    // Modal
    addNewBtn.addEventListener('click', openModal);

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });
    
    cancelBtn.addEventListener('click', (e) => {
        closeModal();
    })

    // Create New Task
    let tasks = [];

    function addNewElement() {
        const newTask = {
            "id": Date.now(),
            "text": inputNewTask.value, 
            "done": false
        }
        
        if(inputNewTask.value != '') {
            tasks.push(newTask)

            todoList.insertAdjacentHTML(
                'beforeend',
                `
                <li class="todo__list-item" data-id="${newTask.id}">
                    <label class="checkbox">
                        <input class="todo__checkbox" type="checkbox">
                        <span class="checkbox__custom ${newTask.done ? 'checked' : ''}"></span>
                        ${newTask.text}
                    </label>
                    <span class="todo__list-edit"></span>
                    <span class="todo__list-delete"></span>
                </li>
                `
            );
        }
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        inputNewTask.value = '';

        closeModal();
    }

    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // console.log(tasks);
        
        tasks.forEach(task => {
            todoList.insertAdjacentHTML(
            'beforeend',
            `
            <li class="todo__list-item" data-id="${task.id}">
                <label class="checkbox">
                    <input class="todo__checkbox" type="checkbox">
                    <span class="checkbox__custom ${task.done ? 'checked' : ''}"></span>
                    ${task.text}
                </label>
                <span class="todo__list-edit"></span>
                <span class="todo__list-delete"></span>
            </li>
            `
            )
        });
    }

    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('.todo__list-item');
        if (!li) return;
        
        li.classList.toggle('checked', e.target.checked);

        const id = li.dataset.id;
        const task = tasks.find(t => t.id == id);
        if (!task) return;

        if (e.target.classList.contains('todo__checkbox')) {
            task.done = e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
    
    applyBtn.addEventListener('click', () => {
        console.log(inputNewTask.value);
        addNewElement();
    })

    // Search
    const searchInput = document.querySelector('.todo__search-input');
    const searchBtn = document.querySelector('.todo__search-btn');

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filterTasks = tasks.filter(e => {
            return e.text.toLowerCase().includes(searchInput.value.toLowerCase());
        });

        todoList.innerHTML = '';

        const showTasks = value ? filterTasks : tasks;
        
        filterTasks.forEach(task => {
            todoList.insertAdjacentHTML(
                'beforeend',
                `
                <li class="todo__list-item" data-id="${task.id}">
                    <label class="checkbox">
                        <input class="todo__checkbox" type="checkbox">
                        <span class="checkbox__custom ${task.done ? 'checked' : ''}"></span>
                        ${task.text}
                    </label>
                    <span class="todo__list-edit"></span>
                    <span class="todo__list-delete"></span>
                </li>
                `
            );
        })
    })

    loadTasks();
});