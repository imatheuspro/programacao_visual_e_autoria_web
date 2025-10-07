function busca() {
    let palavra = document.getElementById("palavra").value;
    let textoEl = document.getElementById("textoBase");
    let texto = textoEl.textContent;
    let palavras = texto.split(" ");
    let cont = 0;
    let novoTexto = "";

    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].includes(palavra) && palavra !== "") {
            cont++;
            novoTexto += "<span style='background: yellow;'>" + palavras[i] + "</span>";
        } else {
            novoTexto += palavras[i] + " ";
        }
    }

    textoEl.innerHTML = novoTexto;

    if (cont === 0) {
        document.getElementById("result").textContent = "Nenhum resultado encontrado.";
    } else {
        document.getElementById("result").textContent = "Encontrado(s): "+ cont;
    }
}
