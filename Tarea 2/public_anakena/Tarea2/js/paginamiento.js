/**
 * Script: paginamiento.js
 *
 * Descripción:
 * Toma las filas agregadas por CGI en el script avistamientos.py y las muestra mediante
 * paginamiento con un máximo de 5 filas por página.
 *
 * Autor: Matías Vergara S.
 */

$(document).ready(function () {
    let filas = [].slice.call(document.getElementsByClassName('fila-avistamiento'))
    let fsliced = filas.slice(5, );
    for (const obj of fsliced){
        obj.style = 'display: none';
    }

    if (filas.length > 5){
        let pagination = document.createElement('ul');
        pagination.className = 'pagination text-center';
        let n_pags = Math.ceil(filas.length / 5);
        let i;
        for (i =0; i < n_pags; i++) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.innerHTML = i+1;
            a.href = "#";
            $(a).click( function(){
              let lim_inf = 5 * (a.innerHTML - 1);
              let lim_sup = 5 * a.innerHTML;
              let fsliced_inf = filas.slice(0, lim_inf);
              let fsliced_sup = filas.slice(lim_sup, );
              let fsliced_act = filas.slice(lim_inf, lim_sup);
              for(const obj of fsliced_inf){
                  obj.style = 'display: none';
              }
              for(const obj of fsliced_sup){
                  obj.style = 'display: none';
              }
              for(const obj of fsliced_act){
                  obj.style = 'display: auto';
              }
            })
            li.appendChild(a);
            pagination.appendChild(li);
        }
        document.getElementById('tabla-avistamientos').after(pagination);
    }
});