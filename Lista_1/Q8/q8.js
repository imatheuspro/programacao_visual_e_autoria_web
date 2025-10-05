function verificarCpf() {
    let cpf = document.getElementById("cpf");
    let resp = document.getElementById("resp");

    if (cpf.value.length == 14) {
        resp.innerHTML = "CPF Válido";
        resp.style.color = "green";
    } else {
        resp.innerHTML = "CPF Inválido";
        resp.style.color = "red";
    }
}
