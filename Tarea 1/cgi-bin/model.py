#!/usr/bin/python3
# -*- coding: utf-8 -*-


import mysql.connector
import hashlib
from utils import raise_error
import os
import filetype

MAX_FILE_SIZE = 10000 * 1000  # 10 MB

class Avistamiento:

    def __init__(self, host, user, password):
        self.db = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database='tarea2'
        )
        self.cursor = self.db.cursor()

    #data debe cumplir la forma:
    #[comuna_id, dia_hora_informacion, sector, nombre, email, celular,
    #   [dia_hora_avistamiento, tipo, estado,
    #            [foto1, foto2, foto3, foto4, foto5]
    #   ]
    #   [dia_ora_avistamiento, tipo, estado,
    #            [foto1, foto2, foto3, foto4, foto5]
    #   ]
    #]
    def insert_AV(self, data):
        detalles = data[6]
        sql = f"""
             INSERT INTO avistamiento (comuna_id, dia_hora, sector, nombre, email, celular) 
             VALUES (%s, %s, %s, %s, %s, %s)
             """
        self.cursor.execute(sql, (data[0], data[1], data[2], data[3], data[4], data[5]))
        self.db.commit()
        av_new_id = self.cursor.getlastrowid()
        for detalle in detalles:
            sql = f"""
            INSERT INTO detalle_avistamiento (dia_hora, tipo, estado, avistamiento_id) 
            VALUES (%s, %s, %s, %s)
            """
            self.cursor.execute(sql, detalle[0], detalle[1], detalle[2], av_new_id)
            self.db.commit()
            da_new_id = self.cursor.getlastrowid()
            for fileobj in detalle[3]: #detalle[3] es una lista de fileobjs
                filename = fileobj.filename
                #verificamos que el archivo se haya subido
                if not filename:
                    raise_error(2, "Archivo no subido", av_new_id, da_new_id)
                size = os.fstat(fileobj.file.fileno()).st_size
                #verificamos que el archivo cumpla el tamaño solicitado
                if size > MAX_FILE_SIZE:
                    raise_error(3, "Archivo excede tamaño máximo permitido: {10MB}", av_new_id, da_new_id)
                #contamos la cantidad de fotos actuales para crear un hash
                sql = """
                SELECT COUNT(id)
                FROM foto
                """
                self.cursor.execute(sql)
                total = self.cursor.fetchall()[0][0] +1
                hash_foto = str(total) + hashlib.sha256(filename.encode()).hexdigest()[0:30]
                file_path = 'db_media/' + hash_foto
                #guardamos la foto en el servidor para revisar su tipo
                open(file_path, 'wb').write(fileobj.file.read())
                tipo = filetype.guess(file_path)
                if tipo.mime != 'image/jpg' and tipo.mime !='image/png' and tipo.mime !='image/jpeg':
                    os.remove(file_path)
                    raise_error(4, "Error: Tipo de archivo incompatible", av_new_id, da_new_id)
                sql = f"""
                INSERT INTO foto (ruta_archivo, nombre_archivo, detalle_avistamiento_id) 
                VALUES (%s, %s, %s)
                """
                self.cursor.execute(sql, file_path, filename, da_new_id)
                self.db.commit()


    def get_5AV_photo(self):
        sql = f"""
            SELECT DA.id, DA.dia_hora, CO.nombre, AV.sector, DA.tipo 
            FROM avistamiento AV, detalle_avistamiento DA, comuna CO 
            WHERE DA.avistamiento_id = AV.id 
            AND AV.comuna_id=CO.id 
            ORDER BY DA.dia_hora 
            DESC LIMIT 5
        """
        self.cursor.execute(sql)
        avistamientos = self.cursor.fetchall()
        respuesta = []
        for avistamiento in avistamientos:
            sql = f"""
            SELECT ruta_archivo, nombre_archivo 
            FROM foto 
            WHERE detalle_avistamiento_id={avistamiento[0]}
            """
            self.cursor.execute(sql)
            fetch = self.cursor.fetchall()
            respuesta.append([avistamiento[1:], fetch[0][0] +fetch[0][1]])
        return respuesta

    def get_comuna_region(self, nombre_comuna):
        sql = f"""
        SELECT  comuna.id, comuna.nombre. region.id, region.nombre
        FROM comuna, region
        WHERE comuna.nombre = %s 
        AND comuna.region_id = region.id
        """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_count_AV(self):
        sql = f"""
        SELECT COUNT(*) FROM avistamiento 
        """
        self.cursor.execute(sql)
        return self.cursor.fetchall()
