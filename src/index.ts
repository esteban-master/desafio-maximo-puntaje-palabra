import inquirer from "inquirer";

type ConteoLetras = Map<string, number>;
type PuntajesLetra = [string, number][];

// Terminal
inquirer
  .prompt([
    {
      name: "palabra",
      message: "Indica la palabra que quieres obtener el puntaje?",
      type: "input",
      validate: (answer: string) =>
        answer.length > 0 ? true : "Al menos 1 carácter por palabra",
    },
  ])
  .then(({ palabra }) => {
    console.log(
      `Resultado palabra "${palabra}": `,
      maximoPuntajeDePalabra(palabra)
    );
  })
  .catch((error) => {
    console.log(error);
  });

function maximoPuntajeDePalabra(palabra: string): number {
  const puntajeMasAlto = 26;

  const conteoDeLetras = contarLetrasPalabra(palabra);

  const conteoDeLetrasOrdenadasDeMayorAMenor: [string, number][] = [
    ...conteoDeLetras,
  ].sort(([, conteoA], [, conteoB]) => conteoB - conteoA);

  const puntajesPorLetra = darPuntajeACadaLetra(
    conteoDeLetrasOrdenadasDeMayorAMenor,
    puntajeMasAlto
  );

  const sumaTotal = sumarPuntajesLetras(puntajesPorLetra);

  imprimirPasos({
    conteoLetras: conteoDeLetras,
    conteoOrdenado: conteoDeLetrasOrdenadasDeMayorAMenor,
    puntajesPorLetra,
    sumaTotal,
  });

  return sumaTotal;
}

function darPuntajeACadaLetra(
  letras: [string, number][],
  puntajeMasAlto: number
): [string, number][] {
  return letras.map(([letra, total], index): [string, number] => {
    if (index === 0) {
      return [letra, total * puntajeMasAlto];
    } else {
      return [letra, total * (puntajeMasAlto - index)];
    }
  });
}

function contarLetrasPalabra(palabra: string): ConteoLetras {
  const palabraSplit = palabra.trim().split("");
  return palabraSplit.reduce<ConteoLetras>((acc, letra) => {
    if (acc.has(letra)) {
      acc.set(letra, acc.get(letra)! + 1);
    } else {
      acc.set(letra, 1);
    }
    return acc;
  }, new Map());
}

function sumarPuntajesLetras(puntajes: PuntajesLetra): number {
  return puntajes.reduce((acc, [_, puntajeLetra]) => {
    return acc + puntajeLetra;
  }, 0);
}

function imprimirPasos({
  conteoLetras,
  conteoOrdenado,
  puntajesPorLetra,
  sumaTotal,
}: {
  conteoLetras: ConteoLetras;
  conteoOrdenado: [string, number][];
  puntajesPorLetra: PuntajesLetra;
  sumaTotal: number;
}) {
  console.group("Pasos app:");
  console.log("1. Conteo letras mas repetidas de palabra: ", conteoLetras);
  console.log("2. Ordenar conteo DESC: ", conteoOrdenado);
  console.log("3. Agregar puntaje por letra: ", puntajesPorLetra);
  console.log("4. Sumar puntaje de letras: ", sumaTotal);
  console.groupEnd();
}
