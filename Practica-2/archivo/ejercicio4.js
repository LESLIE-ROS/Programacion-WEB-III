function miFuncion(arreglo) {
    let mayor = arreglo[0];
    let menor = arreglo[0];

    for (let i = 1; i < arreglo.length; i++) {
        let num = arreglo[i];

        if (num > mayor) {
            mayor = num;
        }

        if (num < menor) {
            menor = num;
        }
    }

    return { mayor: mayor, menor: menor };
}

let obj = miFuncion([3,1,5,4,2]);
console.log(obj);