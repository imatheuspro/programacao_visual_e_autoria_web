function OcultarExibir(){
    let Botao = document.getElementById("p");
    if (Botao.className=="Exiba"|| Botao.className==""){
        Botao.className="Oculta"
    }else{
        Botao.className="Exiba"
    }
}