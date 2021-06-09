/**
 * Script: verificar_fecha_hora.js
 *
 * Descripción:
 * Verifica que el campo de dia-hora no esté vacío, que cumpla el formato deseado,
 * y que la fecha exista en el calendario.
 *
 * Autor: Matías Vergara S.
 */

// Basado en el tutorial disponible en https://www.the-art-of-web.com/javascript/validate-date/,
// y en el aporte de Elian Ebbing en https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

//la verificacion se debe activar una vez que la pagina carga y cada vez que se agrega una nueva seccion avistamiento
$(document).ready(function () {
    //activar verificacion del campo que carga inicialmente
    activarVerificacionHora();
    //activar verificacion de cada campo de seccion nueva
    $('#agregar-avistamiento').click(activarVerificacionHora());
});


//activarVerificacion: itera sobre cada campo de la clase dia-hora-avistamiento setteando la hora actual como
// valor por defecto y una verificacion como reaccion al cambio
function activarVerificacionHora() {
    var campoDiaFecha = $(".dia-hora-avistamiento");
    $(campoDiaFecha).each(function () {
        var actual = new Date();
        var anoActual = actual.getFullYear();
        var mesActual = actual.getMonth() + 1;
        var diaActual = actual.getDate();
        var horaActual = actual.getHours();
        var minutoActual = actual.getMinutes();
        if (mesActual < 10) {
            mesActual = '0' + mesActual;
        }
        if (diaActual < 10) {
            diaActual = '0' + diaActual;
        }
        if (horaActual < 10) {
            horaActual = '0' + horaActual;
        }
        if (minutoActual < 10) {
            minutoActual = '0' + minutoActual;
        }
        var fechaActual = anoActual + '-' + mesActual + '-' + diaActual;
        var tiempoActual = horaActual + ':' + minutoActual;

        var fechaHoraActual = fechaActual + ' ' + tiempoActual;

        campoDiaFecha[0].value = fechaHoraActual;
        campoDiaFecha[0].setCustomValidity('');

        campoDiaFecha.on('change load', function () {
            if (campoDiaFecha[0].length > 16 || campoDiaFecha[0].length === 0) {
                campoDiaFecha[0].setCustomValidity("Campo obligatorio. Largo máximo 20");
            }
            if (!esFechaHoraValida(campoDiaFecha.val())) {
                campoDiaFecha[0].setCustomValidity("Fecha hora invalida.");
            } else {
                campoDiaFecha[0].setCustomValidity('');
            }
        });
    });
}


// Valida que un string dado tenga el formato "AAAA/MM/DD hora:minuto" y, en tal caso,
// verifica tambien que sea una fecha valida.
function esFechaHoraValida(string) {
    // Comparar con R.E. de AAAA/MM/DD hora:min
    if (!/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{2}$/.test(string)) {
        return false;
    }

    // Parsear componentes a int
    var partes = string.split(" ");
    var fecha = partes[0].split("-");
    var tiempo = partes[1].split(":");
    var ano = parseInt(fecha[0], 10);
    var mes = parseInt(fecha[1], 10);
    var dia = parseInt(fecha[2], 10);
    var hora = parseInt(tiempo[0], 10);
    var minuto = parseInt(tiempo[1], 10);

    // Revisar rangos de año, fecha, hora y minuto
    if (ano < 1000 || ano > 3000 || mes == 0 || mes > 12 || hora < 0 || hora >= 24 || minuto < 0 || minuto >= 60) {
        return false;
    }

    var diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Ajustar para años bisiestos
    if (ano % 400 == 0 || (ano % 100 != 0 && ano % 4 == 0)) {
        diasMes[1] = 29;
    }

    // Revisar rango del dia
    return dia > 0 && dia <= diasMes[mes - 1];
}