package com.cc5002.ejercicio6;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;



public class SaveDoctor extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nombre = request.getParameter("nombre-medico");
        String region = request.getParameter("region-medico");
        String comuna = request.getParameter("comuna-medico");
        String experiencia = request.getParameter("experiencia-medico");
        String especialidad = request.getParameter("especialidades-medico");
        String twitter = request.getParameter("twitter-medico");
        String email = request.getParameter("email-medico");
        String celular = request.getParameter("celular-medico");

        Doctor doctor = new Doctor(nombre, experiencia, region, comuna, especialidad, twitter, email, celular);

        request.setAttribute("doctor", doctor);
        request.getRequestDispatcher("list.jsp").forward(request, response);

    }

}