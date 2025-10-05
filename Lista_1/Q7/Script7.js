const Form=document.getElementById("Form");

function Inverte(){
    let Nomes=[
        document.getElementById("Nome1").value,
        document.getElementById("Nome2").value,
        document.getElementById("Nome3").value,
        document.getElementById("Nome4").value,
        document.getElementById("Nome5").value
    ];
    document.getElementById("Nome1").value=Nomes[4];
    document.getElementById("Nome2").value=Nomes[3];
    document.getElementById("Nome3").value=Nomes[2];
    document.getElementById("Nome4").value=Nomes[1];
    document.getElementById("Nome5").value=Nomes[0];
    console.log(Nomes);
}
