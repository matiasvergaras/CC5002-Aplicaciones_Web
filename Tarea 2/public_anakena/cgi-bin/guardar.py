#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb
from model import Avistamiento
from datetime import datetime
from utils import raise_success
from utils import raise_error

cgitb.enable()

print('Content-type: text/html\r\n\r\n')

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

form = cgi.FieldStorage()
db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")

# obtener datetime actual en formato deseado
timestamp = datetime.now()
dia_hora_info = timestamp.strftime("%Y-%m-%d %H:%M")
# chequear que los campos obligatorios vengan
obligatorios_gral = ['comuna', 'region', 'nombre', 'email']
for obligatorio in obligatorios_gral:
    if obligatorio not in form:
        raise_error((False, [0]))
        exit()
avist_list = [form['comuna'].value, form['region'].value, dia_hora_info, form['sector'].value,
              form['nombre'].value, form['email'].value, form['celular'].value]
i = 1
detalles_list = []
#lo mismo para los campos obligatorios de un detalle avistamiento
while 'dia-hora-avistamiento-' + str(i) in form:
    obligatorios_detalle = ['dia-hora-avistamiento-' + str(i),
                            'tipo-avistamiento-' + str(i),
                            'estado-avistamiento-' + str(i),
                            'foto-avistamiento-' + str(i) + '-1']
    for obligatorio in obligatorios_detalle:
        if obligatorio not in form:
            raise_error((False, [0]))
            exit()
    detalle_list = [form['dia-hora-avistamiento-' + str(i)].value,
                    form['tipo-avistamiento-' + str(i)].value,
                    form['estado-avistamiento-' + str(i)].value]
    foto_list = []
    j = 1
    foto_encontrada = False
    while 'foto-avistamiento-' + str(i) + '-' + str(j) in form and j < 5:
        foto = form['foto-avistamiento-' + str(i) + '-' + str(j)]
        if foto is not None:
            fileobj = foto
            foto_list.append(fileobj)
            foto_encontrada = True
            j += 1
    # si algun avistamiento no tiene ninguna foto
    if not foto_encontrada:
        raise_error((False, [6]), i)
        exit()
    detalle_list.append(foto_list)
    detalles_list.append(detalle_list)
    i += 1
avist_list.append(detalles_list)
res = db.save_data(avist_list)
if res[0]:
    raise_success()
else:
    raise_error(res[1])

# data debe cumplir la forma:
# [comuna, region, dia_hora_informacion, sector, nombre, email, celular,
#   [
#       [dia_hora_avistamiento, tipo, estado,
#               [foto1, foto2, foto3, foto4, foto5]
#       ]
#       [dia_hora_avistamiento, tipo, estado,
#               [foto1, foto2, foto3, foto4, foto5]
#       ]
# ]
