const products = [
  {
    id: 1,
    title: 'Lenovo Yoga',
    price: 3000,
  },
  {
    id: 2,
    title: 'Acer Aspire',
    price: 1800,
  },
  {
    id: 3,
    title: 'Dell Vostro',
    price: 3400,
  },
];

const totalPrice = document.getElementById('total');
const cart = document.getElementById('basket-items');

let basketItems = [];

function addToBasket(productId) {
  let prop = products.find((product) => product.id === productId);

  if (basketItems.find((product) => product.id === productId)) {
    return alert('Товар уже в корзине');
  }

  basketItems = [...basketItems, prop];

  renderBasket(basketItems);
}

function removeFromBasket(productId) {
  basketItems = basketItems.filter((product) => product.id !== productId);
  renderBasket(basketItems);
}

function rerenderTotalPrice(items) {
  const price = items.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  totalPrice.innerText = price;
}

function renderCart(items) {
  cart.innerHTML = '';
  items.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item.title;
    el.onclick = () => removeFromBasket(item.id);
    cart.appendChild(el);
  });
}

function renderBasket(items) {
  renderCart(items);
  rerenderTotalPrice(items);
}
