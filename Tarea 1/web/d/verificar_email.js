/**
 * Script: verificar_email.js
 *
 * Descripción:
 * Verifica que el campo de email no esté vacío, que tenga largo mínimo 4 (a@b.c)
 * y que cumpla el formato string@string.string
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    var email = $('#email');
    email.on('change load', function () {
        if (!validateEmail(email[0].value) || email[0].value.length < 4) {
            email[0].setCustomValidity('No cumple formato mínimo');
        } else {
            email[0].setCustomValidity('');
        }
    });
});

//validacion simple del correo estilo string@string.string, sin repetición de '@'.
//Extraido de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript,
//autoria de C. Lee & Jaymon

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


