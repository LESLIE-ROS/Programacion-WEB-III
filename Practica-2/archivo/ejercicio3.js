function miFuncion(arreglo) {
    let resultado = {
        pares: [],
        impares: []
    };

    for (let i = 0; i < arreglo.length; i++) {
        let num = arreglo[i];

        if (num % 2 === 0) {
            resultado.pares.push(num);
        } else {
            resultado.impares.push(num);
        }
    }

    return resultado;
}

let obj = miFuncion([1,2,3,4,5]);
console.log(obj);