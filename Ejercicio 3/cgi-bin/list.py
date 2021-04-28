#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import cgitb;
from db import Doctor

cgitb.enable()

print("Content-type:text/html\r\n\r\n")

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

docdb = Doctor(host="localhost", user="root", password="", database="ejercicio3")
data = docdb.get_doctors()

html_open = """
<!-- HTML5 -->
<!DOCTYPE html>
<html lang="es">
"""

head = """
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8" /> <!-- Declaring enconding as UTF 8-->
    <title>Listado</title> <!-- Title in pestaÃ±a -->
    <link rel="stylesheet" type="text/css" media="screen"  href="../style.css" />    <!-- CSS: -->
</head>
"""

body_open = """
<ul class="topnav">
  <li><a class="active" href="../index.html">Inicio</a></li>
  <li><a href="../add_doctor.html">Agregar Datos de Médico</a></li>
  <li><a href="list.py">Ver Médicos</a></li>
</ul>
"""

body_table_1 = """
<div style="padding:0 16px;">
  <h2>Listado de médicos registrados</h2>
  <table>
  <tr>
  <th>Nombre</th>
  <th>Experiencia</th>
  <th>Especialidad</th>
  <th>Email</th>
  <th>Celular</th>
  </tr>
"""

body_close_table = """
</table>
"""

body_close = """
</div>
</body>
"""


html_close = """
</html>
"""

form = cgi.FieldStorage()
print(html_open, file=utf8stdout)
print(head, file=utf8stdout)
print(body_open, file=utf8stdout)
if len(data) > 0:
    print(body_table_1, file=utf8stdout)
    for d in data:
        row = f'''
        <tr>
            <th>{str(d[1])}</th>
            <th>{str(d[2])}</th>
            <th>{str(d[3])}</th>
            <th>{str(d[5])}</th>
            <th>{str(d[6])}</th>
        </tr>
            '''
        print(row, file=utf8stdout)
    print(body_close_table, file=utf8stdout)
else:
    print("<h2>Aún no hay médicos registrados</h2>", file=utf8stdout)

print(body_close, file=utf8stdout)
print(html_close, file=utf8stdout)
