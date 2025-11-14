async function renderCafes() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const header = document.createElement('header');
  header.classList.add('navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-coffee', 'shadow-sm', 'px-3', 'mb-4');

  const container = document.createElement('div');
  container.classList.add('container-fluid', 'justify-content-between');

  const brand = document.createElement('a');
  brand.textContent = 'Bora de Café';
  brand.classList.add('navbar-brand', 'fw-bold', 'fs-4');
  brand.href = 'index.html';

  const buttonGroup = document.createElement('div');

  const btnCart = document.createElement('button');
  btnCart.textContent = '🛒 Carrinho';
  btnCart.classList.add('btn', 'btn-outline-light', 'me-2');
  btnCart.addEventListener('click', () => {
    window.location.href = 'carrinho.html';
  });

  buttonGroup.append(btnCart);
  container.append(brand, buttonGroup);
  header.appendChild(container);
  root.appendChild(header);

  const cafes = await fetchCafes();

  const section = document.createElement('div');
  section.classList.add('d-flex', 'flex-wrap', 'justify-content-center');

  cafes.forEach(cafe => {
    const card = document.createElement('div');
    card.classList.add('card', 'shadow', 'm-3', 'p-3');
    card.style.width = '16rem';

    const img = document.createElement('img');
    img.src = cafe.image;
    img.classList.add('card-img-top');

    const body = document.createElement('div');
    body.classList.add('card-body');

    const title = document.createElement('h5');
    title.textContent = cafe.title;

    const desc = document.createElement('p');
    desc.textContent = cafe.description;

    const price = document.createElement('p');
    price.textContent = `R$ ${cafe.price.toFixed(2)}`;

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Adicionar ao Carrinho';
    btnAdd.classList.add('btn', 'btn-primary');
    btnAdd.addEventListener('click', () => {
      addToCart(cafe);
    });

    body.append(title, desc, price, btnAdd);
    card.append(img, body);
    section.appendChild(card);
  });

  root.appendChild(section);
}

renderCafes();

