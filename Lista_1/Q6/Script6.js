function TestePalindromo(){
    let Form=document.getElementById("form");
    let Palavra=document.getElementById("Palavra").value;
    let palavraInvertida = Palavra.split('').reverse().join('');
    Form.addEventListener("submit",(evento)=>{
        evento.preventDefault();
    })
    if (Palavra==""){
            alert("Espaço de Palvra vazio");
            document.getElementById("Result").innerHTML="";
            document.getElementById("Reverso").innerHTML="";
    }else{
            if(palavraInvertida==Palavra){
            document.getElementById("Result").innerHTML="É um palíndromo";
            document.getElementById("Reverso").innerHTML=palavraInvertida;
        }else{
            document.getElementById("Result").innerHTML="Não é um palíndromo";
            document.getElementById("Reverso").innerHTML=palavraInvertida;
        }
    }
    
}

