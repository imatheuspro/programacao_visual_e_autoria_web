async function renderCart() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const cart = getCart();

  const title = document.createElement('h2');
  title.textContent = 'Seu Carrinho';
  title.classList.add('text-center', 'my-4');
  root.appendChild(title);

  if (cart.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Seu carrinho está vazio';
    emptyMsg.classList.add('text-center');
    root.appendChild(emptyMsg);
    return;
  }

  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-5'); 
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'flex-wrap'
    );

    const info = document.createElement('div');
    info.innerHTML = `
      <strong>${item.title}</strong><br>
      <small>R$ ${item.price.toFixed(2)}</small><br>
      <small>Qtd: ${item.qtd}</small>
    `;

    const controls = document.createElement('div');

    const btnMais = document.createElement('button');
    btnMais.textContent = '+';
    btnMais.classList.add('btn', 'btn-success', 'btn-sm', 'mx-1');

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';
    btnMenos.classList.add('btn', 'btn-warning', 'btn-sm', 'mx-1');

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-1');

    btnMais.addEventListener('click', () => {
      updateQuantity(item.id, item.qtd + 1);
      renderCart();
    });

    btnMenos.addEventListener('click', () => {
      if (item.qtd > 1) updateQuantity(item.id, item.qtd - 1);
      else removeFromCart(item.id);
      renderCart();
    });

    btnRemover.addEventListener('click', () => {
      removeFromCart(item.id);
      renderCart();
    });

    controls.append(btnMenos, btnMais, btnRemover);
    listItem.append(info, controls);
    list.appendChild(listItem);
  });

  root.appendChild(list);

  const footer = document.createElement('div');
  footer.classList.add('cart-footer');

  const total = cart.reduce((acc, item) => acc + item.price * item.qtd, 0);
  const totalElement = document.createElement('h4');
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

  const finishBtn = document.createElement('button');
  finishBtn.textContent = 'Finalizar Compra';
  finishBtn.classList.add('btn', 'btn-success', 'mt-2', 'w-100');
  finishBtn.addEventListener('click', () => {
    window.location.href = 'finalizar.html';
  });

  footer.append(totalElement, finishBtn);
  root.appendChild(footer);
}

renderCart();





