#! /usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup, SoupStrainer
import os

os.remove("Ergebnisliste_backup.htm")
os.rename("Ergebnisliste.htm", "Ergebnisliste_backup.htm")

infile = open("Ergebnisliste_backup.htm", encoding='utf-8')
outfile = open("Ergebnisliste.htm", 'w', encoding='utf-8')

soup = BeautifulSoup(infile, "html5lib")

#TODO: do not append multiple times
for tag in  soup.find_all('meta'):

    script = soup.new_tag('script')
    script['src'] = 'js/urkundengenerator.js'
    script['type'] = 'text/javascript'
    tag.insert_after(script)

    # include jspdf.min.js from a specific commit to avoid compatibility issues
    script = soup.new_tag('script')
    script['src'] = 'https://raw.githubusercontent.com/MrRio/jsPDF/67310a9244011256abf5edb72e8d819a5229e7b4/dist/jspdf.min.js'
    script['type'] = 'text/javascript'
    tag.insert_after(script)

    script = soup.new_tag('script')
    script['src'] = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'
    tag.insert_after(script)

outfile.write(soup.prettify())
infile.close()
outfile.close()
