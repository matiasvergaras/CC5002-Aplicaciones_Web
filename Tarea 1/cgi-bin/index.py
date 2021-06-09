#!C:/Users/m_jvs/AppData/Local/Programs/Python/Python39/python
# -*- coding: utf-8 -*-

print('Content-type: text/html\r\n\r\n')


utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

with open('html/index.html', 'r', encoding='utf-8') as file:
    s = file.read()
    print(s, file=utf8stdout)