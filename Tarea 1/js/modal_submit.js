/**
 * Script: modal_submit.js
 *
 * Descripción:
 * Modifica los botones del formulario para tener un falso submit - que activa la validación -
 * y que, en caso de cumplirse, detona un modal con el submit real.
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    $('#enviar-formulario').click(function () {
        var formulario = $('#informar')[0];
        if (formulario.checkValidity()) {
            $("#submitModal").modal();
        } else {
            formulario.classList.add('was-validated');
        }
    });
    $('#submit-real').click(function () {
        $("#submitModal").modal("hide");
    });
});