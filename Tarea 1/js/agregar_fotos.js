/**
 * Script: agregar_fotos.js
 *
 * Descripción:
 * Permite agregar más de un archivo para un avistamiento, con un maximo de 5.
 * Verifica que se suba al menos un archivo.
 *
 * Autor: Matías Vergara S.
 */

var diccionarioFotos = {"1": 1};

$(document).ready(function () {
    //para el primer campo
    setearFuncionAgregar();
    setearCampoObligatorio();
    //para cuando se agreguen nuevas visualizaciones
    var botonAgregar = $('#agregar-avistamiento');
    botonAgregar.click(function () {
        sleep(100);
        setearFuncionAgregar();
    });

});

function setearFuncionAgregar() {
    var campos = document.querySelectorAll('.agregar-otra-foto');
    var actualId = campos[campos.length - 1].id.split('-')[1];
    diccionarioFotos[actualId] = 1;
    var texto = $(campos[campos.length - 1]);
    texto.unbind();
    texto.click(function () {
        if (diccionarioFotos[actualId] < 5) {
            var otroArchivo = '<input type="file" class="form-control foto-avistamiento" name="foto-avistamiento">';

            texto.before(otroArchivo);
            diccionarioFotos[actualId] += 1;
        } else {
            texto[0].innerHTML = "La cantidad máxima de archivos permitida por avistamiento es de 5 archivos.";
            texto[0].style.color = "red";
            texto[0].style.textDecoration ="none";
        }
    });
}

function setearCampoObligatorio() {
    var campo = document.querySelector('.foto-avistamiento');
    campo.setCustomValidity('Campo inicialmente vacío');
    $(campo).on('change', function(){
        if( campo.value ){
            campo.setCustomValidity('');
        }
        else{
            campo.setCustomValidity('Se debe ingresar al menos una foto por avistamiento');
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}