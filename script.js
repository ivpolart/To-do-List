window.addEventListener('DOMContentLoaded', function() {
    const addNewBtn = document.querySelector('.todo__add');
    const modal = document.querySelector('.todo__modal');
    const cancelBtn = document.querySelector('.todo__modal-btns .btn-cancel');
    const applyBtn = document.querySelector('.todo__modal-btns .btn-apply');
    const inputNewTask = document.querySelector('.todo__modal-input');
    const todoList = document.querySelector('.todo__list')

    const changeModal = document.querySelector('.todo__change-modal');
    const changeModalInput = document.querySelector('.todo__change-modal-input');
    const changeModalCancelBtn = document.querySelector('.todo__change-modal-btns .btn-cancel');
    const changeModalApplyBtn = document.querySelector('.todo__change-modal-btns .btn-apply');

    let tasks = [];
    let editingTaskId = null;

    // Modal
    addNewBtn.addEventListener('click', openModal);

    function openModal(modalEl) {
        modalEl.classList.add('show');
        modalEl.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalEl) {
        modalEl.classList.remove('show');
        document.body.style.overflow = '';
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

    
    function renderTasks(list = tasks) {
        todoList.innerHTML = '';
        
        if (tasks.length > 0) {
            list.forEach(task => {
            todoList.insertAdjacentHTML('beforeend', `
                <li class="todo__list-item" data-id="${task.id}">
                    <label class="checkbox">
                        <input class="todo__checkbox" type="checkbox" ${task.done ? 'checked' : ''}>
                        <span class="checkbox__custom ${task.done ? 'checked' : ''}"></span>
                        ${task.text}
                    </label>
                    <div class="todo__item-btns">
                        <button class="todo__list-edit"><i class="ico-edit"></i></button>
                        <button class="todo__list-delete"><i class="ico-delete"></i></button>
                    </div>
                </li>
                `);
            });
        }
        else {
            list.forEach(task => {
                todoList.insertAdjacentHTML('beforeend', `
                    <li class="todo__list-item">
                        <img src="img/img-01.svg" alt="">
                        <p>Empty...</p>
                    </li>
                    `);
                });
            }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create New Task
    function addNewElement() {
        const newTask = {
            "id": Date.now(),
            "text": inputNewTask.value, 
            "done": false
        }
    
        if(inputNewTask.value != '') {
            tasks.push(newTask)
            saveTasks();
            renderTasks();
        }
        
        inputNewTask.value = '';
        closeModal(modal)
    }

    function startEditing(task) {
        editingTaskId = task.id;
        changeModalInput.value = task.text;
        openModal(changeModal);
    }

    function applyEdit() {
        if (!editingTaskId) return;
        const task = tasks.find(t => t.id == editingTaskId);
        if (task) {
            task.text = changeModalInput.value.trim();
            saveTasks();
            renderTasks();
        }
        editingTaskId = null;
        closeModal(changeModal);
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id != id);
        saveTasks();
        renderTasks();
    }

    addNewBtn.addEventListener('click', () => openModal(modal));
    cancelBtn.addEventListener('click', () => closeModal(modal));
    applyBtn.addEventListener('click', addNewElement);

    changeModalCancelBtn.addEventListener('click', () => closeModal(changeModal));
    changeModalApplyBtn.addEventListener('click', applyEdit);


    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('.todo__list-item');
        if (!li) return;

        li.classList.toggle('checked', e.target.checked);
        
        const id = li.dataset.id;
        const task = tasks.find(t => t.id == id);

        if (e.target.classList.contains('todo__checkbox')) {
            task.done = e.target.checked;
            saveTasks();
        }

        if (e.target.closest('.todo__list-delete')) {
            deleteTask(id);
        }

        if (e.target.closest('.todo__list-edit')) {
            startEditing(task);
        }
    });


    const searchInput = document.querySelector('.todo__search-input');
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filtered = tasks.filter(t => t.text.toLowerCase().includes(value));
        renderTasks(value ? filtered : tasks);
    });

    if(tasks.length === 0) {
        // tasks.forEach(task => {
        //     todoList.insertAdjacentHTML('beforeend', `
        //     <li class="todo__list-item">
        //         <img src="img/img-01.svg" alt="">
        //         <p>Empty...</p>
        //     </li>
        //     `);
        // });
        console.log(111111111);
        
    }

    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
});