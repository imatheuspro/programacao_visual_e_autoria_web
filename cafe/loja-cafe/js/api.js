const API_URL = 'http://localhost:3000/cafes';

async function fetchCafes() {
  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    console.log(dados);
    return dados;
  } catch (erro) {
    console.error("Erro ao buscar cafés:", erro);
  }
}