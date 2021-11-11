"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// Terminal
inquirer_1.default
    .prompt([
    {
        name: "palabra",
        message: "Indica la palabra que quieres obtener el puntaje?",
        type: "input",
        validate: (answer) => answer.length > 0 ? true : "Al menos 1 carácter por palabra",
    },
])
    .then(({ palabra }) => {
    console.log(`Resultado palabra "${palabra}": `, maximoPuntajeDePalabra(palabra));
})
    .catch((error) => {
    console.log(error);
});
function maximoPuntajeDePalabra(palabra) {
    const puntajeMasAlto = 26;
    const conteoDeLetras = contarLetrasPalabra(palabra);
    const conteoDeLetrasOrdenadasDeMayorAMenor = [
        ...conteoDeLetras,
    ].sort(([, conteoA], [, conteoB]) => conteoB - conteoA);
    const puntajesPorLetra = darPuntajeACadaLetra(conteoDeLetrasOrdenadasDeMayorAMenor, puntajeMasAlto);
    const sumaTotal = sumarPuntajesLetras(puntajesPorLetra);
    imprimirPasos({
        conteoLetras: conteoDeLetras,
        conteoOrdenado: conteoDeLetrasOrdenadasDeMayorAMenor,
        puntajesPorLetra,
        sumaTotal,
    });
    return sumaTotal;
}
function darPuntajeACadaLetra(letras, puntajeMasAlto) {
    return letras.map(([letra, total], index) => {
        if (index === 0) {
            return [letra, total * puntajeMasAlto];
        }
        else {
            return [letra, total * (puntajeMasAlto - index)];
        }
    });
}
function contarLetrasPalabra(palabra) {
    const palabraSplit = palabra.trim().split("");
    return palabraSplit.reduce((acc, letra) => {
        if (acc.has(letra)) {
            acc.set(letra, acc.get(letra) + 1);
        }
        else {
            acc.set(letra, 1);
        }
        return acc;
    }, new Map());
}
function sumarPuntajesLetras(puntajes) {
    return puntajes.reduce((acc, [_, puntajeLetra]) => {
        return acc + puntajeLetra;
    }, 0);
}
function imprimirPasos({ conteoLetras, conteoOrdenado, puntajesPorLetra, sumaTotal, }) {
    console.group("Pasos app:");
    console.log("1. Conteo letras mas repetidas de palabra: ", conteoLetras);
    console.log("2. Ordenar conteo DESC: ", conteoOrdenado);
    console.log("3. Agregar puntaje por letra: ", puntajesPorLetra);
    console.log("4. Sumar puntaje de letras: ", sumaTotal);
    console.groupEnd();
}
