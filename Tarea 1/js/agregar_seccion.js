/**
 * Script: agregar_seccion.js
 *
 * Descripción:
 * Permite agregar una nueva seccion de avistamiento al formulario.
 * Para cada nueva sección, agrega también un título y un botón 'descartar'.
 *
 * Autor: Matías Vergara S.
 */


let ultimaId = 1;
let eliminados = 0;

$(document).ready(function () {

    //cada vez que se presione el boton, se debe agregar una nueva seccion avistamiento.

    let botonAgregar = $('#agregar-avistamiento');
    botonAgregar.click(function () {
        agregarAvistamiento();
    });

    function agregarAvistamiento() {
        let actualId = ultimaId + 1;

        let copiaSeccion = $('#container-avistamiento').clone(true, true);
        copiaSeccion[0].id = "container-avistamiento-" + actualId;

        let diaHora = copiaSeccion[0].querySelector('.dia-hora-avistamiento');
        diaHora.name = 'dia-hora-avistamiento-' + actualId;

        let tipoAnimal = copiaSeccion[0].querySelector( '.tipo-avistamiento');
        tipoAnimal.name = 'tipo-avistamiento-' + actualId;

        let estadoAnimal = copiaSeccion[0].querySelector('.estado-avistamiento');
        estadoAnimal.name = 'estado-avistamiento-' + actualId;

        let agregarFotos = copiaSeccion[0].querySelector('.agregar-otra-foto');
        agregarFotos.id = 'agregar-' + actualId;
        agregarFotos.innerText = "Agregar otra foto";
        agregarFotos.style = "color:dodgerblue";

        let fotos = copiaSeccion[0].querySelectorAll('.foto-avistamiento');
        let contador = fotos.length;
        while (contador > 1) {
            fotos[contador - 1].remove();
            contador = contador - 1;
        }

        fotos[0].value = null;
        fotos[0].name = 'foto-avistamiento-' + actualId + '-1';

        let tituloAvistamiento = copiaSeccion.find('.titulo-avistamiento');
        tituloAvistamiento[0].innerHTML += " " + actualId;

        let botonEliminar = $(`<br><button type="button" id="eliminar-avistamiento-${actualId}" \
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
