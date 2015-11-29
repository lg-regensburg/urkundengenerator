#! /usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup, SoupStrainer
import os

os.remove("Ergebnisliste_backup.htm")
os.rename("Ergebnisliste.htm", "Ergebnisliste_backup.htm")

infile = open("Ergebnisliste_backup.htm", encoding='utf-8')
outfile = open("Ergebnisliste.htm", 'w', encoding='utf-8')

soup = BeautifulSoup(infile, "html5lib")

def add_script(link):
    script = soup.new_tag('script')
    script['src'] = link
    script['type'] = 'text/javascript'
    return script

for tag in  soup.find_all('meta'):
    tag.insert_after(add_script('js/urkundengenerator.js'))
    # include jspdf.min.js from a specific commit to avoid compatibility issues
    tag.insert_after(add_script('https://raw.githubusercontent.com/MrRio/jsPDF/67310a9244011256abf5edb72e8d819a5229e7b4/dist/jspdf.min.js'))
    tag.insert_after(add_script('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'))

outfile.write(soup.prettify())
infile.close()
outfile.close()
