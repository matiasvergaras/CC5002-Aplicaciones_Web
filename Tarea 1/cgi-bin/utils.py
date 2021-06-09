from model import Avistamiento

rollback_db = Avistamiento(host="localhost", user="cc500253_u", password="urmiSiorci")

def raise_error(errores, id_av):
    #rollback  db changes
    #se modifico tarea2.sql para incluir on delete cascade.
    sql = """
    DELETE *
    FROM avistamiento
    WHERE id = %s
    """
    rollback_db.cursor.execute(sql, id_av)
    rollback_db.db.commit()

    switcher = {
        # errores de form
        10: "Error 10: Form-error - Archivo no encontrado",
        11: "Error 11: Form-error - Archivo excede tamaño máximo permitido de 10 MB",
        12: "Error 12: Form-error - Tipo de archivo incompatible"
    }
    string_errores = ""

    for error in errores:
        string_error = """
        <p>
            {0} : {1}
        </p>
        """.format(switcher[error[0]], error[1])
        string_errores += string_error
        print("""
        <script>
        $("#errorModal").modal();
        let divError = $('#modal-error-body');
        divError[0].innerHTML = {0}
        </script>
          """.format(string_errores))


def raise_success():
        print("""
        <script> window.location.replace("index.py"); </script>
        <script>
        let divSuccess = $('#exito-guardar');
        divSuccess[0].innerHTML = 'Información guardada con éxito. ¡Gracias!'
        </script>
          """)