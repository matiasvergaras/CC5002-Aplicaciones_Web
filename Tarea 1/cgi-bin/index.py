#!/usr/bin/python3
# -*- coding: utf-8 -*-


print('Content-type: text/html\r\n\r\n')

with open('../html/index.html', 'r') as file:
    s = file.read()
    print(s.format("""
    
    
    
    
    
    
    
    """
    ))