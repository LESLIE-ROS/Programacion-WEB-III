function miFuncion(texto) {
    let resultado = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    texto = texto.toLowerCase();

    for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];

        if (letra === "a") resultado.a++;
        if (letra === "e") resultado.e++;
        if (letra === "i") resultado.i++;
        if (letra === "o") resultado.o++;
        if (letra === "u") resultado.u++;
    }

    return resultado;
}

console.log(miFuncion("euforia"));