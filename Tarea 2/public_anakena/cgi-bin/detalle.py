#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;

cgitb.enable()
from model import Avistamiento

print('Content-type: text/html\r\n\r\n')

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")

with open('../Tarea2/html/detalle.html', 'r', encoding='utf-8') as file:
    s = file.read()
    form = cgi.FieldStorage()
    if 'av_id' not in form:
        print(s.format("<div class='text-center'><b>Error 404: Detalle no encontrado.</b></div>"), file=utf8stdout)
        exit(1)
    av_id = form['av_id'].value
    detalles_av = db.get_detalles_av(av_id)
    if len(detalles_av) == 0:
        print(s.format("<div class='text-center'><b>Error 404: Detalle no encontrado.</b></div>"), file=utf8stdout)
        exit(1)
    info_av = db.get_av(av_id)[0]
    info_regcom = db.get_names_by_comuna_id(info_av[0])

    contenido = """
        <div class="container lugar">
        <h5 class="text-center titulo-lugar"> Avistamiento en {0}, {1} </h5>
        <h4 class="text-center subtitulo-lugar">Sector: {2} </h4>
        </div>
        <br>
        <div class="container informador">
            <h5 class="text-center titulo-informador"> Datos del informante</h5>
            <p class="text-center nombre-informador"> <strong>Nombre: </strong> {3} </p>
            <p class="text-center email-informador"> <strong>Email: </strong>{4}</p>
            <p class="text-center celular-informador"> <strong>Celular: </strong>{5}</p>
        </div>
        <br>
    """.format(info_regcom[0][0], info_regcom[0][1], info_av[2], info_av[3], info_av[4], info_av[5])
    i = 1
    for detalle in detalles_av:
        fecha = str(detalle[1]).split(' ')[0]
        hora = str(detalle[1]).split(' ')[1]
        fotos = db.get_photos_by_daid(detalle[0])
        contenido += """
            <div class="container avistamiento">
            <h5 class="text-center titulo-avistamiento">Avistamiento {0}:  </h5>
            <p class="text-center fecha-avistamiento"><strong>Fecha: </strong> {1} </p>
            <p class="text-center hora-avistamiento"><strong>Hora: </strong> {2} </p>
            <p class="text-center tipo-avistamiento"><strong>Tipo:</strong> {3} </p>
            <p class="text-center estado-avistamiento"><strong>Estado:</strong> {4} </p>
            <p class="text-center fotos-avistamiento"><strong>Fotos:</strong></p>
        </div>
        """.format(i, fecha, hora, detalle[2], detalle[3])
        contenido += """<div class="row justify-content-center">"""
        for foto in fotos:
            path = foto[0] + foto[1]
            contenido += """
            <img class="foto-preview" src="{0}" alt="{1}">
            """.format(path, detalle[2])
        contenido += """</div>"""
        i += 1
    contenido += """
        <div class="modal fade" id="modalfoto" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span></button>
                    </div>
                    <div class="modal-body">
                        <img id="foto-grande" src="../images/ladybug.png" alt="foto de un avistamiento en tamaño aumentado">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    """
    print(s.format(contenido), file=utf8stdout)
