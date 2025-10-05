function misturar() {
    let p1 = document.getElementById("p1").value;
    let p2 = document.getElementById("p2").value;
    let resp = document.getElementById("resp");
    let resultado = "";

    for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
            if (i === j) {  
            resultado += p1[i] + p2[j];
          }
        }
      }
    resp.value = resultado;
  }
