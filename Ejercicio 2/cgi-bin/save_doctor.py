#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import cgitb

cgitb.enable()

print("Content-type:text/html\r\n\r\n")

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

html_open = """
<!-- HTML5 -->
<!DOCTYPE html>
<html lang="es">
"""

head = """
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8" /> <!-- Declaring enconding as UTF 8-->
    <title> Ejercicio 3</title> <!-- Title in pestaña -->
    <link rel="stylesheet" type="text/css" media="screen"  href="../style.css" />    <!-- CSS: -->
</head>
"""

body_open = """
<ul class="topnav">
  <li><a class="active" href="../index.html">Inicio</a></li>
  <li><a href="../add_doctor.html">Agregar Datos de Médico</a></li>
</ul>

<div style="padding:0 16px;">
  <h2>Datos recibidos con éxito</h2>

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

renamed_keys = {"nombre-medico": "Nombre del médico", "celular-medico": "Número celular", "experiencia-medico": "Experiencia",
                "especialidad-medico": "Especialidad", "email-medico": "Dirección de correo electrónico"}
for key in form.keys():
    print("<p>" + renamed_keys[key] + ": " + form[key].value + "</p>", file=utf8stdout)
print(body_close, file=utf8stdout)
print(html_close, file=utf8stdout)

