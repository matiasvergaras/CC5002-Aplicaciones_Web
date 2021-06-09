<%@ page import="com.cc5002.ejercicio6.Doctor" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8" /> <!-- Declaring enconding as UTF 8-->
    <title>Auxiliar 8</title> <!-- Title in pestaña -->
    <link rel="stylesheet" type="text/css" media="screen"  href="css/index.css" />    <!-- CSS: -->

</head>
<body>


<ul class="topnav">
    <li><a class="active" href="index.html">Inicio</a></li>
    <li><a href="add_new_doctor.html">Agregar Datos de Médico</a></li>
    <li><a href="list.jsp">Ver Médicos</a></li>
</ul>
<div>
    <!-- Body of page -->
    <h1> Ver Médicos </h1>

    <table >
        <tr>
            <th>Nombre Médico</th>
            <th>Especialidad</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Datos Contacto</th>
        </tr>
        <!-- First row -->
        <tr>
            <% Doctor doctor = (Doctor) request.getAttribute("doctor"); %>
            <td><% out.println(doctor.getNombre()); %></td>
            <td><% out.println(doctor.getEspecialidad()); %></td>
            <td><% out.println(doctor.getRegion()); %></td>
            <td><% out.println(doctor.getComuna()); %></td>
            <td><% out.println(doctor.getTwitter()); %><br>
                <% out.println(doctor.getEmail()); %><br>
                <% out.println(doctor.getCelular()); %>
            </td>
        </tr>
    </table>
</div>

</body>
</html>
