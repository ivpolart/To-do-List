window.addEventListener('DOMContentLoaded', function() {
    const addNewBtn = document.querySelector('.todo__add');
    const modal = document.querySelector('.todo__modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    const applyBtn = document.querySelector('.btn-apply');
    const inputNewTask = document.querySelector('.todo__popup-input');
    const todoList = document.querySelector('.todo__list')
    const todoListItem = document.querySelectorAll('.todo__list-item');

    // todoListItem.forEach(e => {
    //     e.style.color = 'red';
    // })

    // const modalTrigger = document.querySelectorAll('[data-modal]'),
    //     modal = document.querySelector('.modal');

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

    console.log(todoListItem);

    function addNewElement() {
        todoList.insertAdjacentHTML(
            'beforeend',
            `
            <li class="todo__list-item">
                <label class="checkbox">
                    <input class="todo__checkbox" type="checkbox">
                    <span class="checkbox__custom"></span>
                    ${inputNewTask.value}
                </label>
                <span class="todo__list-edit"></span>
                <span class="todo__list-delete"></span>
            </li>
            `
        );
        
        const tasks = Array.from(document.querySelectorAll('.todo__list-item label')).map(label => label.innerText.trim());
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        inputNewTask.value = '';
        closeModal();
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            todoList.innerHTML = `
            <li class="todo__list-item">
                <label class="checkbox">
                    <input class="todo__checkbox" type="checkbox">
                    <span class="checkbox__custom"></span>
                    ${task}
                </label>
                <span class="todo__list-edit"></span>
                <span class="todo__list-delete"></span>
            </li>
            `
        });
    }
    

    applyBtn.addEventListener('click', () => {
        console.log(inputNewTask.value);
        addNewElement();
        
        // todoListItem.push(inputNewTask.value);
    })

    loadTasks();
});