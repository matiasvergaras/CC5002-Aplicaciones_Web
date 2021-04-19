/**
 * Script: validacion_main.js
 *
 * Descripción:
 * Cambia el estilo de validación por defecto (bubbles) por la validación
 * que ofrece BS4
 *
 * Autor: Matías Vergara S.
 */

//Modificaciones a la validación por defecto
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
