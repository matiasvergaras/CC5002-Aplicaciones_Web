#!/usr/bin/python3
# -*- coding: utf-8 -*-
print('Content-type: text/html\r\n\r\n')

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)


from model import Avistamiento
db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")


with open('../Tarea2/html/index.html', 'r', encoding='utf-8') as file:
    s = file.read()
    ult5_data = db.get_5_index()
    if len(ult5_data) == 0:
        print(s.format("<div class='text-center'>Aún no hay avistamientos</div>"), file=utf8stdout)
    else:
        tabla = """
        <div class="row justify-content-center">
                <div class="col-auto">
                    <table class="table table-image table-hover table-bordered table-responsive mx-auto w-auto">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">Fecha-hora</th>
                            <th scope="col">Comuna</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Foto</th>
                        </tr>
                        </thead>
                        <tbody>
        """
        for avistamiento in ult5_data:
            #esto trae todas las fotos para evitar tener dos metodos casi identicos, pero nos quedamos
            #con la primera.
            foto_data = db.get_photos_by_daid(avistamiento[0])
            src = foto_data[0][0]+foto_data[0][1]
            hora_dia = str(avistamiento[1])[0:-3]
            tabla += """
            <tr>
            <th scope="row">{0}</th>
            <td>{1}</td>
            <td>{2}</td>
            <td>{3}</td>
            <td class='w-25'>
                <img alt='avistapp_previsualize' class='img-fluid img-thumbnail' src={4}>
            </td>
            </tr>
            """.format(hora_dia, avistamiento[2], avistamiento[3], avistamiento[4], src)
            #error: esta trayendo la primera foto de cada avistamiento, pero hay avistamientos con mas de un dtalle
            #y debe traerse la foto de cada detalle.
        tabla += """
                    </tbody>
                </table>
            </div>
        </div>
        """
        print(s.format(tabla), file=utf8stdout)
