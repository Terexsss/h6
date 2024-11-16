const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const showAllButton = document.getElementById('showAll');
    const showCompletedButton = document.getElementById('showCompleted');
    const showIncompleteButton = document.getElementById('showIncomplete');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            
            }

            li.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
            });

            li.addEventListener('dblclick', () => {
                const newText = prompt('Редактируйте задачу:', task.text);
                if (newText) {
                    task.text = newText;
                    renderTasks();
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    showAllButton.addEventListener('click', () => {
        renderTasks();
    });


function renderFilteredTasks(completedStatus) {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter(
      task => task.completed === completedStatus
    );
  
    filteredTasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.classList.add("completed");
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", () => {
        tasks.splice(tasks.indexOf(task), 1);
        renderTasks();
      });
  
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
  
  showCompletedButton.addEventListener("click", () => renderFilteredTasks(true));
  showIncompleteButton.addEventListener("click", () =>
    renderFilteredTasks(false)
  );