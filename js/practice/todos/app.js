// Globals //

const todoListElement = document.getElementById('todo-list');
const userSelectElement = document.getElementById('user-todo');
const formElement = document.querySelector('form');
const inputElement = document.getElementById('new-todo');

// Attach events //

document.addEventListener('DOMContentLoaded', initApp);
formElement.addEventListener('submit', handleSubmit);

// Basic Logic //

function clearTitle() {
  inputElement.value = '';
}

function createListElement(className, id) {
  const li = document.createElement('li');
  li.className = className; //'todo-item'
  li.dataset.id = id;

  return li;
}

function createTextContent({ title, userName }) {
  const spanElement = document.createElement('span');
  spanElement.innerText = title;

  const italicElement = document.createElement('i');
  italicElement.innerText = ' by ';

  const boldElement = document.createElement('b');
  boldElement.innerText = `${userName}`;

  spanElement.appendChild(italicElement);
  spanElement.appendChild(boldElement);

  return spanElement;
}

function createCloseButton() {
  const close = document.createElement('button');
  close.innerHTML = '&times';
  close.className = 'close';
  close.addEventListener('click', handleDelete);

  return close;
}

function createCheckbox(completed) {
  const status = document.createElement('input');
  status.type = 'checkbox';
  status.checked = completed;
  status.addEventListener('change', handleTodoChange);

  return status;
}

function printToDo({ id, userName, title, completed }) {
  const listElement = createListElement('todo-item', id);
  const textContent = createTextContent({ title, userName });
  const closeButton = createCloseButton();
  const checkbox = createCheckbox(completed);

  todoListElement.prepend(listElement);

  listElement.appendChild(textContent);
  listElement.prepend(checkbox);
  listElement.append(closeButton);
}

function createUserOption(user) {
  const option = document.createElement('option');
  option.value = user.id;
  option.innerText = user.name;

  userSelectElement.append(option);
}

function removeTodo(todoId) {
  const todo = todoListElement.querySelector(`[data-id='${todoId}']`);
  todo.querySelector('input').removeEventListener('change', handleTodoChange);
  todo.querySelector('.close').removeEventListener('click', handleDelete);

  todo.remove();
}

function alertError(error) {
  alert(error.message);
}

// Event Logic //

async function initApp() {
  const [todos, users] = await Promise.all([
    fetchInstance({ method: 'GET', url: 'todos' }),
    fetchInstance({ method: 'GET', url: 'users' }),
  ]);

  todos.forEach((todo) => {
    const user = users.find((user) => user.id === todo.userId);

    printToDo({
      ...todo,
      userName: user?.name,
    });
  });
  users.forEach((user) => createUserOption(user));
}

async function handleSubmit(event) {
  event.preventDefault();

  const newTodo = {
    userId: Number(formElement.user.value),
    title: formElement.todo.value,
    completed: false,
  };

  if (!newTodo.userId) {
    return alert('Select user');
  }

  if (!newTodo.title) {
    return alert('Enter the title');
  }

  const todo = await fetchInstance({
    method: 'POST',
    url: 'todos',
    data: newTodo,
  });

  if (todo) {
    printToDo({
      ...todo,
      userName: formElement.user.options[formElement.user.selectedIndex].text,
    });
    clearTitle();
  }
}

async function handleTodoChange(event) {
  const target = event.target;
  const todoId = target.parentElement.dataset.id;
  const completed = target.checked;

  const newTodo = await fetchInstance({
    method: 'PATCH',
    url: `todos/${todoId}`,
    data: { completed },
  });

  if (!newTodo) {
    target.checked = !completed;
  }
}

async function handleDelete(event) {
  const todoId = event.target.parentElement.dataset.id;
  const deletedTodoId = await fetchInstance({
    method: 'DELETE',
    url: `todos/${todoId}`,
  });

  if (deletedTodoId) {
    removeTodo(todoId);
  }
}

// Async Logic //

async function fetchInstance({ url, method, data }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${url}`,
      {
        method,
        body: data ? JSON.stringify(data) : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed connection');
    }
  } catch (error) {
    alertError(error);
  }
}
