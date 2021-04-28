#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector
from mysql.connector import errorcode

cnx = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="ejercicio3"
)

cursor = cnx.cursor()

file = open('../ejercicio3.sql', 'r')
sql = file.read()

try:
    print("Creando tabla medico: ", end='')
    cursor.execute(sql, multi=True)
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
        print("Tabla ya existe.")
    else:
        print(err.msg)
else:
    print("OK")

cnx.commit()
cursor.close()
cnx.close()
