#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
from model import Avistamiento
cgitb.enable()
from datetime import datetime
from utils import raise_error

print("Content-type:text/html\r\n\r\n")

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

form = cgi.FieldStorage()
db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")
region = form['select-region'].value
comuna = form['select-comuna'].value

#traer id de region y comuna
comreg = db.get_comuna_region(comuna)
id_comuna = comreg[0][0]
nombre_region = comreg[0][2]

#verificar consistencia form - bd (region/comuna)
#if nombre_region != region:
#    print(nombre_region, region)
#    raise_error(5, """Comuna seleccionada no se reconoce como una comuna de la región indicada. Por favor,
#                    actualice el sitio e intente nuevamente.""")

#obtener datetime actual en formato deseado
timestamp = datetime.now()
dia_hora_info = timestamp.strftime("%Y-%m-%d %H:%M")

print(id_comuna, dia_hora_info)

avist_list = [id_comuna, dia_hora_info, form['sector'], form['nombre'], form['email'], form['celular']]
i = 0
while 'dia-hora-avistamiento-'+str(i) in form:
    detalle_list = [form['dia-hora-avistamiento-' + str(i)], form['tipo-avistamiento-' + str(i)],
                    form['estado-avistamiento-' + str(i)]]
    foto_list = []
    j = 0
    while 'foto-avistamiento-'+str(i)+'-'+str(j) in form and j<5:
        foto_list.append(form['foto-avistamiento-'+str(i)+'-'+str(j)])
    detalle_list.append(foto_list)
    avist_list.append(detalle_list)

db.insert_AV(avist_list)


# data debe cumplir la forma:
# [comuna_id, dia_hora_informacion, sector, nombre, email, celular,
#   [dia_hora_avistamiento, tipo, estado,
#            [foto1, foto2, foto3, foto4, foto5]
#   ]
#   [dia_ora_avistamiento, tipo, estado,
#            [foto1, foto2, foto3, foto4, foto5]
#   ]
# ]