/**
 * Script: detalle.js
 *
 * Descripción:
 * Asigna una reacción al click sobre las filas de la tabla en el archivo avistamientos.html
 * Dicha reacción es ir a detalle.html
 * Para cada foto en detalle.html, asigna una reacción al click (activar modal con foto aumentada).
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function ($) {
    $(".fila-clickeable").click(function () {
        window.location = $(this).data("href");
    });

    // Basado en la respuesta de martinezjc, grep en
    // https://stackoverflow.com/questions/25023199/in-bootstrap-open-enlarge-image-in-modal
    $('.foto-preview').click( function() {
        $('#foto-grande').attr('src', this.src);
        $('#modalfoto').modal('show');
    });
});