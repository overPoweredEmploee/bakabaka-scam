// Globals //

const todoListElement = document.getElementById('todo-list');
const userSelectElement = document.getElementById('user-todo');
const form = document.querySelector('form');
let todos = [];
let users = [];

// Attach events //

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);

// Basic Logic //

function getUserName(userId) {
  const user = users.find((u) => u.id === userId);
  return user?.name ?? 'Unknown user';
}

function printToDo({ id, userId, title, completed }) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = id;
  li.innerText = `${title} by ${getUserName(userId)}`;

  const status = document.createElement('input');
  status.type = 'checkbox';
  status.checked = completed;
  status.addEventListener('change', handleTodoChange);

  const close = document.createElement('span');
  close.innerHTML = '&times';
  close.className = 'close';
  close.addEventListener('click', handleClose);

  todoListElement.prepend(li);
  li.prepend(status);
  li.append(close);
}

function createUserOption(user) {
  const option = document.createElement('option');
  option.value = user.id;
  option.innerText = user.name;

  userSelectElement.append(option);
}

function removeTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);

  const todo = todoListElement.querySelector(`[data-id='${todoId}']`);
  todo.querySelector('input').removeEventListener('change', handleTodoChange);
  todo.querySelector('.close').removeEventListener('click', handleClose);

  todo.remove();
}

function alertError(error) {
  alert(error.message);
}

// Event Logic //

async function initApp() {
  try {
    [todos, users] = await Promise.all([getAllTodos(), getAllUsers()]);

    todos.forEach((todo) => printToDo(todo));
    users.forEach((user) => createUserOption(user));
  } catch (error) {
    console.log(error);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const newTodo = {
    userId: Number(form.user.value),
    title: form.todo.value,
    completed: false,
  };

  createTodo(newTodo);

  todos = [...todos, newTodo];
}

function handleTodoChange(event) {
  const todoId = event.target.parentElement.dataset.id;
  const completed = this.checked;

  toggleTodo(todoId, completed);
}

function handleClose(event) {
  const todoId = event.target.parentElement.dataset.id;
  deleteTodo(todoId);
}

// Async Logic //

async function getAllTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alertError(error);
  }
}

async function getAllUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alertError(error);
  }
}

async function createTodo(todo) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const todoItem = await response.json();

    printToDo(todoItem);
  } catch (error) {
    alertError(error);
  }
}

async function toggleTodo(todoId, completed) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ completed }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed connection');
    }
  } catch (error) {
    alertError(error);
  }
}

async function deleteTodo(todoId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      removeTodo(todoId);
    } else {
      throw new Error('Failed connection');
    }
  } catch (error) {
    alertError(error);
    console.log(error);
  }
}
