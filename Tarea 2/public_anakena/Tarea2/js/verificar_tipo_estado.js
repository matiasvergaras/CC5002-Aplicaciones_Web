/**
 * Script: agregar_fotos.js
 * Descripción:
 * Verifica que se ingrese algún valor en los campos Tipo y Estado,
 * y que dichos valores correspondan con los definidos por el enunciado,
 * es decir, con alguna de las opciones originales.
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    //activar verificacion del campo que carga inicialmente
    activarVerificacionTipoEstado();
    //activar verificacion de cada campo de seccion nueva
    $('#agregar-avistamiento').click(activarVerificacionTipoEstado());
});

function activarVerificacionTipoEstado() {
    var tipo = $('.tipo-avistamiento');
    $(tipo).each(function (index, obj) {
        //la unica forma de llegar a validar estos campos será escogiendo una opción
        obj.setCustomValidity('Vacío o modificado');
        $(obj).on('change', function () {
            obj.setCustomValidity('Vacío o modificado');
            var tipoSeleccionado = obj[obj.selectedIndex].text;
            var posibilidades = ["Insecto", "Arácnido", "Miriápodo", "No sé"]
            for (var i = 0; i < posibilidades.length; i++) {
                if (tipoSeleccionado === posibilidades[i]) {
                    obj.setCustomValidity('');
                }
            }
        });
    });

    var estado = $('.estado-avistamiento');
    $(estado).each(function (index, obj) {
        //la unica forma de llegar a validar estos campos será escogiendo una opción
        obj.setCustomValidity('Vacío o modificado');
        $(obj).on('change', function () {
            obj.setCustomValidity('Vacío o modificado');
            var estadoSeleccionado = obj[obj.selectedIndex].text;
            var posibilidades = ["Vivo", "Muerto", "No sé"];
            for (var i = 0; i < posibilidades.length; i++) {
                if (estadoSeleccionado === posibilidades[i]) {
                    obj.setCustomValidity('');
                }
            }
        });
    });

}
