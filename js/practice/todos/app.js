// Globals //

const todoListElement = document.getElementById('todo-list');
const userSelectElement = document.getElementById('user-todo');
const formElement = document.querySelector('form');
const inputElement = document.getElementById('new-todo');

// Attach events //

document.addEventListener('DOMContentLoaded', initApp);
formElement.addEventListener('submit', handleSubmit);

// Render Logic //

const clearTitle = () => {
  inputElement.value = '';
};

const createTextContent = ({ userName, title }) => {
  const span = document.createElement('span');
  span.innerText = title;

  const iElement = document.createElement('i');
  iElement.innerText = ' by';

  const bElement = document.createElement('b');
  bElement.innerText = ` ${userName}`;

  span.appendChild(iElement);
  span.appendChild(bElement);

  return span;
};

const createCheckbox = (completed) => {
  const status = document.createElement('input');
  status.type = 'checkbox';
  status.checked = completed;
  status.addEventListener('change', handleTodoChange);

  return status;
};

const createCloseButton = () => {
  const close = document.createElement('button');
  close.innerHTML = '&times';
  close.className = 'close';
  close.addEventListener('click', handleDelete);

  return close;
};

const createListItem = (id) => {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = id;

  return li;
};

function printToDo({ id, userName, title, completed }) {
  const listItem = createListItem(id);
  const content = createTextContent({ userName, title });
  const checkbox = createCheckbox(completed);
  const closeButton = createCloseButton();

  listItem.appendChild(content);
  listItem.prepend(checkbox);
  listItem.append(closeButton);

  todoListElement.prepend(listItem);
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
  console.log('asd');

  const [todos, users] = await Promise.all([
    fetchInstance({ method: 'GET', url: 'todos' }),
    fetchInstance({ method: 'GET', url: 'users' }),
  ]);

  todos.forEach((todo) =>
    printToDo({
      ...todo,
      userName: users.find((user) => user.id === todo.userId).name,
    })
  );

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
    return alert('select user');
  }

  if (!newTodo.title) {
    return alert("title can't be empty");
  }

  const todo = await fetchInstance({
    method: 'GET',
    url: `todos/${newTodo.userId}?_expand=user`,
  });

  if (todo) {
    printToDo({ ...todo, userName: todo.user.name });
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

async function handleDelete() {
  const todoId = this.parentElement.dataset.id;
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
  const correctUrl = url.startsWith('/') ? url.slice(0, 1) : url;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${correctUrl}`,
      {
        method,
        data: data ? JSON.stringify(data) : undefined,
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
