const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoInput.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        addTodo
    }
})

todoButton.addEventListener("click", addTodo)
document.addEventListener("DOMContentLoaded", getTodos)
todoList.addEventListener("click", deleteCheck)

function addTodo(event) {
    event.preventDefault()
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    saveLocalTodos(todoInput.value)
    const completedButton = document.createElement("button")
    completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`
    deleteButton.classList.add("delete-btn")
    todoDiv.appendChild(deleteButton)
    todoList.appendChild(todoDiv)
    todoInput.value = ""
}

function deleteCheck(event) {
    const item = event.target
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function(){
            todo.remove()
        })
    } if (item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

function saveLocalTodos(todo) {
    let todos
    if (localStorage.getItem("todos") === null) {
    todos = []
    } else {
    todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        const newTodo = document.createElement("li")
        newTodo.innerText = todo
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        todoInput.value = ""
        const completedButton = document.createElement("button")
        completedButton.innerHTML = `<i class="fas  fa-check-circle"></i>`
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton)
        const trashButton = document.createElement  ("button")
        trashButton.innerHTML = `<i class="fas  fa-trash"></i>`
        trashButton.classList.add("delete-btn")
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
    });
}
