function renderCheckout() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const cart = getCart();
  if (cart.length === 0) {
    root.textContent = 'Carrinho vazio.';
    return;
  }

  const title = document.createElement('h2');
  title.textContent = 'Resumo do Pedido';
  title.classList.add('mb-4', 'text-center');

  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-4');

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const text = document.createElement('span');
    text.textContent = `${item.title} (x${item.qtd})`;

    const price = document.createElement('span');
    price.textContent = `R$ ${(item.price * item.qtd).toFixed(2)}`;

    li.append(text, price);
    list.appendChild(li);

    total += item.price * item.qtd;
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('fw-bold', 'mb-4', 'text-end');
  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;

  const inputEndereco = document.createElement('input');
  inputEndereco.type = 'text';
  inputEndereco.placeholder = 'Endereço de entrega';
  inputEndereco.classList.add('form-control', 'mb-3');

  const selectPagamento = document.createElement('select');
  selectPagamento.classList.add('form-select', 'mb-3');

  const metodos = ['PIX', 'Cartão de Crédito', 'Boleto'];
  metodos.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    selectPagamento.appendChild(opt);
  });

  const btnFinalizar = document.createElement('button');
  btnFinalizar.textContent = 'Finalizar Compra';
  btnFinalizar.classList.add('btn', 'btn-success', 'w-100');

  btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault();

    if (!inputEndereco.value.trim()) {
      showPopup('Por favor, preencha o endereço de entrega.');
      return;
    }

    if (!selectPagamento.value) {
      showPopup('Por favor, selecione um método de pagamento.');
      return;
    }

    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho');
    root.innerHTML = '<h2 class="text-center mt-5">Compra finalizada com sucesso!</h2>';
  });

  root.append(title, list, totalDiv, inputEndereco, selectPagamento, btnFinalizar);
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

renderCheckout();



