#!/usr/bin/python3
# -*- coding: utf-8 -*-
from model import Avistamiento

print('Content-type: text/html\r\n\r\n')

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)


db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")

with open('../Tarea2/html/avistamientos.html', 'r', encoding='utf-8') as file:
    s = file.read()
    listado = db.get_list()
    listado.reverse() # para mostrar los avistamientos en orden de mas actual a mas antiguo
    if len(listado) == 0:
        print(s.format("<div class='text-center'>Aún no hay avistamientos registrados</div>"), file=utf8stdout)
    else:
        tabla = """
         <div class="row justify-content-center">
                <div class="col-auto">
                    <table class="table table-image table-hover table-bordered table-responsive mx-auto w-auto"
                     id="tabla-avistamientos">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">Fecha-hora</th>
                            <th scope="col">Comuna</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Nombre contacto</th>
                            <th scope="col">Total avistamientos</th>
                            <th scope="col">Total fotos</th>
                        </tr>
                        </thead>
                        <tbody>
        """
        for avistamiento in listado:
            hora_dia = str(avistamiento[1])[0:-3]
            total_avistamientos = db.get_total_avs(avistamiento[0])[0][0]
            total_fotos = db.get_total_photos_av(avistamiento[0])[0][0]
            ref = 'detalle.py?av_id='+str(avistamiento[0])
            tabla += "<tr class='fila-clickeable fila-avistamiento' data-href='" + ref + "'>"
            tabla += "<th>" + str(hora_dia) + "</th>"
            tabla += "<td>" + str(avistamiento[2]) + "</td>"
            tabla += "<td>" + str(avistamiento[3]) + "</td>"
            tabla += "<td>" + str(avistamiento[4]) + "</td>"
            tabla += "<td>" + str(total_avistamientos) + "</td>"
            tabla += "<td>" + str(total_fotos) + "</td>"
        tabla += """
                    </tbody>
                </table>
            </div>
        </div>
        """
        print(s.format(tabla), file=utf8stdout)
