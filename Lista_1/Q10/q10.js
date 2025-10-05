function calcular() {
    let n1 = parseFloat(document.getElementById("n1").value);
    let n2 = parseFloat(document.getElementById("n2").value);
    let n3 = parseFloat(document.getElementById("n3").value);

    let soma = n1 + n2 + n3;
    let media = soma / 3;
    let produto = n1 * n2 * n3;
    let maior = Math.max(n1, n2, n3);
    let menor = Math.min(n1, n2, n3);

    document.getElementById("soma").innerText = soma;
    document.getElementById("media").innerText = media;
    document.getElementById("produto").innerText = produto;
    document.getElementById("maior").innerText = maior;
    document.getElementById("menor").innerText = menor;  
}
