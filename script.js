const taskInput = document.getElementById("taskInput");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Toggle theme
themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
});

// Add task
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "" || !startDate.value || !endDate.value) return;

    const task = {
        text: taskInput.value,
        start: startDate.value,
        end: endDate.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    startDate.value = "";
    endDate.value = "";
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "bg-white dark:bg-gray-800 p-3 rounded shadow mb-2 flex justify-between items-center";

        li.innerHTML = `
            <div>
                <p class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</p>
                <small class="text-gray-500 dark:text-gray-400">${task.start} → ${task.end}</small>
            </div>
            <div class="flex gap-2">
                <button class="bg-blue-500 text-white px-2 py-1 rounded" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                <button class="bg-yellow-500 text-white px-2 py-1 rounded" onclick="editTask(${index})">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

// Initial render
renderTasks();
