var inquirer = require("inquirer");

// Terminal
inquirer
  .prompt([
    {
      name: "palabra",
      message: "Indica la palabra que quieres obtener el puntaje?",
      type: "input",
      validate: (answer) =>
        answer.length > 0 ? true : "Al menos 1 carácter por palabra",
    },
  ])
  .then(({ palabra }) => {
    console.log(`${palabra}: `, maximoPuntajeDePalabra(palabra));
  })
  .catch((error) => {
    console.log(error);
  });

// Funcion
function maximoPuntajeDePalabra(palabra) {
  const palabraSplit = palabra.trim().split("");
  const puntajeMasAlto = 26;
  const conteoDeLetras = palabraSplit.reduce((acc, letra) => {
    if (acc.has(letra)) {
      acc.set(letra, acc.get(letra) + 1);
    } else {
      acc.set(letra, 1);
    }
    return acc;
  }, new Map());

  const conteoDeLetrasOrdenadasDeMayorAMenor = [...conteoDeLetras].sort(
    ([, conteoA], [, conteoB]) => conteoB - conteoA
  );

  const darPuntajeACadaLetra = conteoDeLetrasOrdenadasDeMayorAMenor.map(
    ([letra, total], index) => {
      if (index === 0) {
        return [letra, total * puntajeMasAlto];
      } else {
        return [letra, total * (puntajeMasAlto - index)];
      }
    }
  );
  return darPuntajeACadaLetra.reduce((acc, [_, puntajeLetra]) => {
    return acc + puntajeLetra;
  }, 0);
}

// console.log("A: ", maximoPuntajeDePalabra("A"));
// console.log("AB: ", maximoPuntajeDePalabra("AB"));
// console.log("YZ: ", maximoPuntajeDePalabra("YZ"));
// console.log("EEOOO: ", maximoPuntajeDePalabra("EEOOO"));
// console.log("AGENDAPRO: ", maximoPuntajeDePalabra("AGENDAPRO"));
// console.log("FERROCARRIL: ", maximoPuntajeDePalabra("FERROCARRIL"));
