function Extenso(){
    let Datas=document.getElementById("Data").value;
    console.log(Datas);
    let data=Datas.split("-");
    console.log(Data);
    NumMes=parseInt(data[1]);
    console.log(NumMes);
    let mes=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
    document.getElementById("Result").innerHTML= data[2]+" de "+mes[NumMes-1]+" de "+data[0];
}
