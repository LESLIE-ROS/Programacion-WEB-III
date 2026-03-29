function miFuncion(texto) {
    let invertido = "";

    for (let i = texto.length - 1; i >= 0; i--) {
        invertido += texto[i];
    }

    return invertido;
}

let cad = miFuncion("abcd");
console.log(cad);