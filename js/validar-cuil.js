export default function esUnCuil(campo) {
  const cuil = campo.value.replace(/[-\/]/g, "");
  
  if (tieneNumerosRepetidos(cuil)) {
    console.log("Valores repetidos");
    campo.setCustomValidity("Valores repetidos");
  }else{
    if (validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)){
        console.log("Cuil válido");
    }else{
        console.log("Cuil no existe");
        campo.setCustomValidity("Cuil no existe");
    }
  }
}


function tieneNumerosRepetidos(cuil) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  return numerosRepetidos.includes(cuil);
}

function validarPrimerosDigitos(cuil) {
  let primerosDigitos = cuil.substr(0, 2); //Este metodo extrae los primeros números del cuil
  //Validar que los 2 primeros números coincidan con los permitidos
  let digitosValidos = ["20", "23", "24", "27", "30", "33", "34"];
  return digitosValidos.includes(primerosDigitos);
}

function validarDigitoVerificador(cuil) {
  let acumulado = 0;
  const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 10; i++) {
    acumulado += parseInt(cuil[i], 10) * factores[i];
  }
  let verificadorTeorico = 11 - (acumulado % 11);

  if (verificadorTeorico === 11) {
    verificadorTeorico = 0;
  } else if (verificadorTeorico === 10) {
    verificadorTeorico = 9;
  }
  const digitoVerificador = parseInt(cuil[10], 10);
  return digitoVerificador === verificadorTeorico;
}
