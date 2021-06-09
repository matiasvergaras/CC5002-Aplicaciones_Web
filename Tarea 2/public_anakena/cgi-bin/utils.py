#!/usr/bin/python3.8
# -*- coding: utf-8 -*-

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)


def raise_error(errores, descr=""):
    switcher = {
        # errores de form
        0: "Error 0 FORM ERROR: - No se recibieron datos obligatorios.",
        1: "Error 1 FORM ERROR: - Comuna seleccionada no se reconoce como una comuna de la región indicada",
        2: "Error 2 FORM ERROR: - Largo campo sector excede máximo permitido (100 caracteres).",
        3: "Error 3 FORM ERROR: - Largo campo nombre excede máximo permitido (200 caracteres).",
        4: "Error 4 FORM ERROR: - Campo email no cumple formato de correo electrónico.",
        5: "Error 5 FORM ERROR: - Campo celular no cumple con formato de 11 dígitos.",
        6: "Error 6 FORM ERROR: - No se recibió ninguna foto para el avistamiento " + str(descr),
        10: "Error 10: FILE ERROR: - Archivo no encontrado",
        11: "Error 11: FILE ERROR: - Archivo excede tamaño máximo permitido de 10 MB",
        12: "Error 12: FILE ERROR: - Tipo de archivo incompatible",
        20: "Error 20: FORMAT ERROR - Información de " + str(descr) + " no es de tipo texto",
    }
    string_errores = ""
    for error in errores:
        string_error = r"{0} - {1} \r\n".format(switcher[error[0]], error[1])
        string_errores += string_error
        with open('../Tarea2/html/resultado.html', 'r', encoding='utf-8') as file:
            s = file.read()
            titulo = "Oops. Algo salió mal."
            resultado = r"Se encontraron los siguientes errores en la información ingresada: \r\n\n"
            resultado += string_error
            resultado += r"\r\n Por favor, corrígalos y vuelva a enviar la información."
            script = "<script>alert('" + resultado + "'); window.location.href = 'informar.py';</script>"
            print(s.format(script, titulo, resultado), file=utf8stdout)


def raise_success():
    with open('../Tarea2/html/resultado.html', 'r', encoding='utf-8') as file:
        s = file.read()
        titulo = "Información recibida"
        resultado = "Datos recibidos con éxito. Redireccionando a la portada..."
        script = """
        <script>
        var delay = 3000;
        setTimeout(function(){
            window.location.href = 'index.py';
            }, delay);
        </script>  
        """
        print(s.format(script, titulo, resultado), file=utf8stdout)
