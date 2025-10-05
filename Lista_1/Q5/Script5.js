const Campos= document.querySelectorAll(".requirido");
const Form=document.getElementById("form");
const Spans=document.querySelectorAll(".span-requirido");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

Form.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    
    let emailValido = ValidarEmail();
    if(!emailValido){
        alert("Email vazio")
    }
    let senhaValida = ValidarSenha();
    if(!senhaValida && Campos[1].value.length==0){
        alert("senha vazia")
    }else{
        if(!senhaValida){
            alert("Senha invalida")
        }
    }
    let senhasIguais = compararSenha();
    if(Campos[2].value.length==0){
            alert("Confirmar Senha está vazio")
        
    }else{
        if(senhaValida!=senhasIguais|| Campos[1].value!=Campos[2].value){
         alert("senha não compativel")
        }
    }
    
    
    // Só permite o envio se tudo estiver correto
    if (emailValido && senhaValida && senhasIguais) {
        alert("Formulário enviado com sucesso!");
        Form.submit(); // agora o formulário pode ser enviado
    }

    
})

function Erro(index){
    Campos[index].className="erro";
    Spans[index].style.display="block";
}

function RemoverErro(index){
    Campos[index].className=" ";
    Spans[index].style.display="none";
}

function ValidarEmail(){
    if(emailRegex.test(Campos[0].value)){
        RemoverErro(0);
        console.log("validado");
        return true;
    }else{
        Erro(0);
        //alert("Email invalido");
        console.log("nao validado")
        return false;
    }
}

function ValidarSenha(){
    if(Campos[1].value.length<6||Campos[1].value.length>10){
        Erro(1)
        //alert("Senha Invalida");
        return false;
    }else{
        RemoverErro(1)
        compararSenha();
         return true;
    }
}

function compararSenha(){
    if(Campos[1].value == Campos[2].value&&Campos[2].value.length>1){
        RemoverErro(2);
         return true;
    }else{
        Erro(2);
        //alert("Senhas não Compativeis");
        return false;
    }
}