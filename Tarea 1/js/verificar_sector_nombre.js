/**
 * Script: agregar_fotos.js
 *
 * Descripción:
 * Verifica que el valor ingresado en el campo Sector no exceda el largo máximo
 * permitido (100).
 * Verifica que el valor ingresado en el campo Nombre no sea vacío y que no exceda
 * el largo permitido (200).
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    var sector = $('#sector');
    sector[0].value = titleCase(sector[0].value);
    sector[0].value = quitarCaracteresEspeciales(sector[0].value);
    if (sector[0].value.length > 100) {
        sector[0].setCustomValidity('Excede largo maximo 100');
    }

    sector.on('change', function () {
        sector[0].value = titleCase(sector[0].value);
        sector[0].value = quitarCaracteresEspeciales(sector[0].value);
        if (sector[0].value.length > 100) {
            sector[0].setCustomValidity('Excede largo maximo 100');
        } else {
            sector[0].setCustomValidity('');
        }
    });

    var nombre = $('#nombre');
    nombre[0].value = titleCase(nombre[0].value);
    nombre[0].value = quitarCaracteresEspeciales(nombre[0].value);
    if (nombre[0].value.length > 200 || nombre[0].value.length === 0) {
        nombre[0].setCustomValidity('Excede largo maximo 200');
    }

    nombre.on('change', function () {
        nombre[0].value = titleCase(nombre[0].value);
        nombre[0].value = quitarCaracteresEspeciales(nombre[0].value);
        if (nombre[0].value.length > 200 || nombre[0].value.length === 0) {
            nombre[0].setCustomValidity('Campo vacío/Excede largo maximo 200');
        } else {
            nombre[0].setCustomValidity('');
        }
    });
});

/**
 * Remueve los caracteres &, <, >, ".
 * @param s el string a limpiar
 * @returns {string}
 */
function quitarCaracteresEspeciales(s) {
    return s.replace(/&/g, '').replace(/</g, '').replace(/>/g, '').replace(/"/g, '');
}

/**
 * Fuente: https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
 * Autor: Patrick Michaelsen, Nov 8 2018
 * @param s: El string para el cual se capitalizarán las primeras letras de cada palabra
 * @returns {string}
 */
function titleCase(s) {
    var splitStr = s.toLowerCase().split(" ");

    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    s = splitStr.join(" ");
    return s;
}
