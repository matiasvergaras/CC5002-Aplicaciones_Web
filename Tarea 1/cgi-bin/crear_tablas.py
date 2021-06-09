#!/usr/bin/python3
# -*- coding: utf-8 -*-
import mysql.connector

cnx = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""
)

cursor = cnx.cursor()

tarea2 = open("../sql/tarea2.sql", "r")

cursor.execute(tarea2.read(), multi=True).send(None)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database='tarea2'
)
cursor = db.cursor()

region_comuna = open("../sql/region-comuna.sql", "r")

cursor.execute(region_comuna.read(), multi=True).send(None)
