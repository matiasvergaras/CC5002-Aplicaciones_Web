#!/usr/bin/python3
# -*- coding: utf-8 -*-

print('Content-type: text/html\r\n\r\n')

utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

with open('../Tarea2/html/estadisticas.html', 'r', encoding='utf-8') as file:
    s = file.read()
    print(s, file=utf8stdout)
