const products = [
  {
    id: 1,
    title: "Lenovo Yoga",
    price: 3000,
  },
  {
    id: 2,
    title: "Acer Aspire",
    price: 1800,
  },
  {
    id: 3,
    title: "Dell Vostro",
    price: 3400,
  },
];

let order = [];

function addToBasket(productId) {
  let prop = products.find((product) => product.id === productId);

  if (order.find((product) => product.id === productId)) {
    return alert("Товар уже в корзине");
  }

  order = [...order, prop];

  renderCart();
  rerenderTotalPrice();
}

function removeFromBasket(productId) {
  order = order.filter((product) => product.id !== productId);
  renderCart();
  rerenderTotalPrice();
}

function rerenderTotalPrice() {
  const totalPrice = order.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  document.getElementById("total").innerText = totalPrice;
}

function renderCart() {
  const cart = document.getElementById("basket-items");

  cart.innerHTML = "";
  order.forEach((item) => {
    const el = document.createElement("li");
    el.innerText = item.title;
    el.onclick = () => removeFromBasket(item.id);
    cart.appendChild(el);
  });
}
