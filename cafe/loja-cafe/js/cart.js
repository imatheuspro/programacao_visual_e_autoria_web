function getCart() {
  const cart = JSON.parse(localStorage.getItem("carrinho"));
  return cart || [];
}

function saveCart(cart) {
  localStorage.setItem("carrinho", JSON.stringify(cart));
}

function addToCart(cafe) {
  const cart = getCart();

  const existingItem = cart.find(item => item.id === cafe.id);

  if (existingItem) {
    existingItem.qtd += 1;
  } else {
    cart.push({
      id: cafe.id,
      title: cafe.title,
      price: cafe.price,
      qtd: 1
    });
  }

  saveCart(cart);
  showPopup(`${cafe.title} adicionado ao carrinho!`);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

function updateQuantity(id, qtd) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qtd = qtd;
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem("carrinho");
}

function showPopup(message) {
  const popup = document.createElement('div');
  popup.textContent = message;
  popup.classList.add('popup-toast');
  document.body.appendChild(popup);

  setTimeout(() => popup.classList.add('show'), 10);
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  }, 2000);
}

