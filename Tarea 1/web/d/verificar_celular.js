/*
 * Script: verificar_celular.js
 *
 * Descripción:
 * Verifica que el campo de Celular no esté vacío, cumpla el formato indicado con o sin
 * espacios o simbolos '+'.
 * Verifica que exista un numero entero extraible del campo y que sea de largo 11 (XXXYYYYZZZZ),
 * Formatea el input para que el usuario vea cómo se interpreta lo que ingresó.
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    var campoCelular = $('#celular');
    campoCelular.on('change', function () {
        if (campoCelular[0].length > 15) {
            campoCelular[0].setCustomValidity("Número celular invalido: muy largo");
        }
        var sinEspacios = campoCelular.val().replace(/\s/g, '');
        var sinEspacios = sinEspacios.replace('+', '');
        if (!esEntero(sinEspacios) || sinEspacios.length != 11) {
            campoCelular[0].setCustomValidity("Número celular invalido: muy corto");
            formatearCampo(campoCelular[0], sinEspacios);
        } else {
            campoCelular[0].setCustomValidity('');
            formatearCampo(campoCelular[0], sinEspacios);
        }
    });
});


function esEntero(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str)) && (parseInt(str).toString().length == str.length) &&
        (!isNaN(parseInt(str).toString()));
}

function formatearCampo(dom, str) {
    var str = parseInt(str).toString();
    var strFormateado = ""
    strFormateado = strFormateado + str.slice(0, 2) + " " + str.slice(2, 3) + " ";
    strFormateado = strFormateado + str.slice(3, 7) + " ";
    strFormateado = strFormateado + str.slice(7, 11);
    dom.value = strFormateado;
}