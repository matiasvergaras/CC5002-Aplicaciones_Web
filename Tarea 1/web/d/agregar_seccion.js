/**
 * Script: agregar_seccion.js
 *
 * Descripción:
 * Permite agregar una nueva seccion de avistamiento al formulario.
 * Para cada nueva sección, agrega también un título y un botón 'descartar'.
 *
 * Autor: Matías Vergara S.
 */


var ultimaId = 1;
var eliminados = 0;

$(document).ready(function () {

    //cada vez que se presione el boton, se debe agregar una nueva seccion avistamiento.

    var botonAgregar = $('#agregar-avistamiento');
    botonAgregar.click(function () {
        agregarAvistamiento();
    });

    function agregarAvistamiento() {
        var actualId = ultimaId + 1;

        var copiaSeccion = $('#container-avistamiento').clone(true, true);
        copiaSeccion[0].id = "container-avistamiento-" + actualId;


        var agregarFotos = copiaSeccion[0].querySelector('.agregar-otra-foto');
        agregarFotos.id = 'agregar-' + actualId;
        agregarFotos.innerText = "Agregar otra foto";
        agregarFotos.style = "color:dodgerblue";

        var fotos = copiaSeccion[0].querySelectorAll('.foto-avistamiento');
        var contador = fotos.length;
        while (contador > 1) {
            fotos[contador - 1].remove();
            contador = contador - 1;
        }
        fotos[0].value = null;

        tituloAvistamiento = copiaSeccion.find('.titulo-avistamiento');
        tituloAvistamiento[0].innerHTML += " " + actualId;

        var botonEliminar = $(`<br><button type="button" id="eliminar-avistamiento-${actualId}" \
                class="eliminar-avistamiento btn btn-warning text-center">Descartar avistamiento</button>`);

        copiaSeccion.append(botonEliminar);
        copiaSeccion.append($('<br><br/>'));

        $('#container-agregar').before(copiaSeccion);

        botonEliminar.click(function () {
            copiaSeccion.remove();
            eliminados = eliminados + 1;
            if (eliminados + 1 === ultimaId) {
                ultimaId = 1;
                eliminados = 0;
            }
        })
        ultimaId = ultimaId + 1;
    }
});
