#! /usr/bin/env python3
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup, SoupStrainer
import os

os.remove("Ergebnisliste_backup.htm")
os.rename("Ergebnisliste.htm", "Ergebnisliste_backup.htm")

# alternatively: encoding='cp1252'
infile = open("Ergebnisliste_backup.htm", encoding='utf-8')
outfile = open("Ergebnisliste.htm", 'w', encoding='utf-8')

soup = BeautifulSoup(infile, "html5lib")

def add_script(link):
    script = soup.new_tag('script')
    script['src'] = link
    script['type'] = 'text/javascript'
    return script


'''
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/MrRio/jsPDF/67310a9244011256abf5edb72e8d819a5229e7b4/dist/jspdf.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/lg-regensburg/urkundengenerator/8874293128a2069b9d7b0ee03fac1bb102bf55c2/js/urkundengenerator.js" type="text/javascript"></script>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
'''

for tag in  soup.find_all('meta'):
    tag.insert_after(add_script('http://lg-telis-finanz.de/Downloads/js/urkundengenerator_nikolauslauf2015.js'))
    # include jspdf.min.js from a specific commit to avoid compatibility issues
    tag.insert_after(add_script('https://cdn.rawgit.com/MrRio/jsPDF/67310a9244011256abf5edb72e8d819a5229e7b4/dist/jspdf.min.js'))
    tag.insert_after(add_script('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'))

    script = soup.new_tag('link')
    script['rel'] = 'stylesheet'
    script['href'] = 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
    tag.insert_after(script)


outfile.write(soup.prettify())
infile.close()
outfile.close()
