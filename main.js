// main.js

document.addEventListener('DOMContentLoaded', function() {
    const jsonForm = document.querySelector('#jsonform');
    const csvForm = document.querySelector('#csvform');
    const bConvert = document.querySelector('#bConvert');
    const bClearJSON = document.querySelector('#bClearJSON');
    const bClearCSV = document.querySelector('#bClearCSV');

    // Función para convertir JSON a CSV
    bConvert.addEventListener('click', function() {
        let json;
        let keys = [];
        let values = [];

        try {
            json = JSON.parse(jsonForm.value);
        } catch (error) {
            console.log('Formato incorrecto JSON', error);
            alert('Formato incorrecto JSON');
            return;
        }

        if (Array.isArray(json)) {
            // Algoritmo para convertir JSON a CSV
            json.forEach((item) => {
                const nkeys = Object.keys(item);

                if (keys.length === 0) {
                    keys = [...nkeys];
                } else {
                    if (nkeys.length !== keys.length) {
                        throw new Error('Número de claves es diferente');
                    }
                }

                const row = keys.map(k => {
                    return item[k];
                });
                values.push([...row]);
            });

            values.unshift(keys);
            const text = values.map((v) => v.join(',')).join('\n');
            csvForm.value = text;
        } else {
            alert('No es un arreglo de objetos');
        }
    });

    // Función para limpiar el textarea JSON
    bClearJSON.addEventListener('click', function() {
        jsonForm.value = '';
    });

    // Función para limpiar el textarea CSV
    bClearCSV.addEventListener('click', function() {
        csvForm.value = '';
    });
});
