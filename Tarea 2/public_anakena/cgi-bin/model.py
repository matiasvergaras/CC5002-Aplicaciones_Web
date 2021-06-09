#!/usr/bin/python3
# -*- coding: utf-8 -*-

import mysql.connector
import hashlib
import os
import filetype
import re
import html

MAX_FILE_SIZE = 10000 * 1000  # 10 MB
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)


class Avistamiento:

    def __init__(self, host, user, password):
        self.db = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database="cc500253_db"
        )
        self.cursor = self.db.cursor()

    def save_data(self, data):
        errores = []
        comuna = data[0]
        region = data[1]
        if not isinstance(comuna, str):
            errores.append((20, "comuna"))
        if not isinstance(region, str):
            errores.append((20, "region"))
        # traer id de region y comuna
        comreg = self.get_comuna_region(comuna)
        nombre_comuna = comreg[0][1]
        nombre_region = comreg[0][2]
        # verificar consistencia form - bd (region/comuna)
        if nombre_region != region or nombre_comuna != comuna:
            errores.append((1, ''))
        # validar sector
        if not isinstance(data[3], str):
            errores.append((20, "sector"))
        if len(data[3]) > 100:
            errores.append((2, str(len(data[3]))))
        # validar nombre
        if not isinstance(data[4], str):
            errores.append((20, "nombre"))
        if len(data[4]) > 200:
            errores.append((3, str(len(data[4]))))
        # validar email
        regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
        if not isinstance(data[5], str):
            errores.append((20, "email"))
        if not (re.search(regex, data[5])):
            errores.append((4, data[5]))
        # validar telefono (usuario ingresa 11, server recibe 14)
        if not isinstance(data[6], str):
            errores.append((20, "telefono"))
        if len(data[6]) != 14:
            errores.append((5, len(str(data[4]))))
        comreg = self.get_comuna_region(data[0])
        com_id = comreg[0][0]
        sql = f"""
             INSERT INTO avistamiento (comuna_id, dia_hora, sector, nombre, email, celular) 
             VALUES (%s, %s, %s, %s, %s, %s)
             """
        self.cursor.execute(sql, (com_id, html.escape(data[2]), html.escape(data[3]), html.escape(data[4]),
                                  html.escape(data[5]), html.escape(data[6])))
        av_new_id = self.cursor.getlastrowid()
        for detalle in data[7]:
            sql = f"""
                INSERT INTO detalle_avistamiento (dia_hora, tipo, estado, avistamiento_id) 
                VALUES (%s, %s, %s, %s)
                """
            self.cursor.execute(sql,
                                (html.escape(detalle[0]), html.escape(detalle[1]), html.escape(detalle[2]), av_new_id))
            da_new_id = self.cursor.getlastrowid()
            for fileobj in detalle[3]:  # detalle[3] es una lista de fileobjs
                filename = fileobj.filename
                if not filename:
                    errores.append((10, ''))
                size = os.fstat(fileobj.file.fileno()).st_size
                # verificamos que el archivo cumpla el tamaño solicitado
                if size > MAX_FILE_SIZE:
                    errores.append((11, filename))
                # calculamos cuantos elementos existen y actualizamos el hash
                sql = "SELECT COUNT(id) FROM foto"
                self.cursor.execute(sql)
                total = self.cursor.fetchall()[0][0] + 1
                hash_foto = str(total) + hashlib.sha256(filename.encode()).hexdigest()[0:10]
                # hash_foto = filename
                # guardar el archivo
                dir_path = '../Tarea2/db_media/'
                file_path = dir_path + hash_foto
                # guardamos la foto
                open(file_path, 'wb').write(fileobj.file.read())
                tipo = filetype.guess(file_path)
                if tipo.mime != 'image/jpg' and tipo.mime != 'image/png' and tipo.mime != 'image/jpeg':
                    errores.append((12, filename))
                    os.remove(file_path)
                sql = f"""
                        INSERT INTO foto (ruta_archivo, nombre_archivo, detalle_avistamiento_id) 
                        VALUES (%s, %s, %s)
                        """
                self.cursor.execute(sql, (dir_path, hash_foto, da_new_id))
                if len(errores) == 0:
                    self.db.commit()
                else:
                    self.db.rollback()
            return len(errores) == 0, errores

    def get_5_index(self):
        sql = f"""
                SELECT DA.id, DA.dia_hora, CO.nombre, AV.sector, DA.tipo 
                FROM avistamiento AV, detalle_avistamiento DA, comuna CO 
                WHERE DA.avistamiento_id = AV.id 
                AND AV.comuna_id=CO.id 
                ORDER BY DA.dia_hora 
                DESC LIMIT 5;
            """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_list(self):
        sql = f"""
              SELECT AV.id, AV.dia_hora, CO.nombre AS comuna, AV.sector, AV.nombre as nombre_contacto
              FROM avistamiento AV, comuna CO  
              WHERE AV.comuna_id = CO.id 
              ORDER BY AV.dia_hora ASC;
              """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_detalles_av(self, av_id):
        sql = f"""
            SELECT id, dia_hora, tipo, estado, avistamiento_id
            FROM detalle_avistamiento DA
            WHERE DA.avistamiento_id = '{av_id}';
            """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_total_avs(self, av_id):
        sql = f"""
                SELECT COUNT(*)
                FROM detalle_avistamiento DA
                WHERE DA.avistamiento_id = '{av_id}';
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_total_photos_av(self, av_id):
        sql = f"""
                SELECT COUNT(*)
                FROM detalle_avistamiento DA, foto F
                WHERE DA.avistamiento_id = '{av_id}'
                AND F.detalle_avistamiento_id = DA.id;
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_photos_by_daid(self, da_id):
        sql = f"""
                 SELECT F.ruta_archivo, F.nombre_archivo 
                 FROM foto F 
                 WHERE F.detalle_avistamiento_id = '{da_id}'
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_comuna_region(self, nombre_comuna):
        sql = f"""
                SELECT  comuna.id, comuna.nombre, region.nombre
                FROM comuna, region
                WHERE comuna.nombre = '{nombre_comuna}'
                AND comuna.region_id = region.id;
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_av(self, av_id):
        sql = f"""
                SELECT comuna_id, dia_hora, sector, nombre, email, celular
                FROM avistamiento
                WHERE id = '{av_id}'
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_names_by_comuna_id(self, com_id):
        sql = f"""
                SELECT comuna.nombre, region.nombre
                FROM comuna, region
                WHERE comuna.id = '{com_id}'
                AND comuna.region_id = region.id;
                """
        self.cursor.execute(sql)
        return self.cursor.fetchall()