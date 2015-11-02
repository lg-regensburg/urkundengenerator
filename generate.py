#! /usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup, SoupStrainer
import os

os.remove("Ergebnisliste_backup.htm")
os.rename("Ergebnisliste.htm", "Ergebnisliste_backup.htm")

infile = open("Ergebnisliste_backup.htm", encoding='utf-8')
outfile = open("Ergebnisliste.htm", 'w', encoding='utf-8')

soup = BeautifulSoup(infile, "html5lib")

for tag in soup.find_all('td', { "class" : "blLeistw" }):
    urkunde_td = soup.new_tag("td")
    link = soup.new_tag('a')
    link['class'] = 'download-urkunde'
    link['href'] = 'javascript:void(0)'
    link.string = 'Urkunde'
    urkunde_td.append(link)
    tag.insert_after(urkunde_td)

for tag in soup.find_all('td', { "class" : "blLeistg" }):
    urkunde_td = soup.new_tag("td")
    link = soup.new_tag('a')
    link['class'] = 'download-urkunde'
    link['href'] = 'javascript:void(0)'
    link.string = 'Urkunde'
    urkunde_td.append(link)
    tag.insert_after(urkunde_td)

#TODO: do not append multiple times
for tag in  soup.find_all('meta'):
    script = soup.new_tag('script')
    script['src'] = 'js/init.download.buttons.js'
    script['type'] = 'text/javascript'
    tag.insert_after(script)

    script = soup.new_tag('script')
    script['src'] = 'js/jspdf.min.js'
    script['type'] = 'text/javascript'
    tag.insert_after(script)

    script = soup.new_tag('script')
    script['src'] = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'
    tag.insert_after(script)

    script = soup.new_tag('script')
    script['src'] = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'
    tag.insert_after(script)

gh_link = soup.new_tag("td")
link = soup.new_tag('a')
link['href'] = 'https://github.com/lg-regensburg/urkundengenerator'
link['target'] = '_blank'
link.string = 'Urkundengenerator'
image = soup.new_tag('img')
image['src'] = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
image['height'] = '40px'
image['width'] = '40px'
link.append(image)
gh_link.append(link)

for tag in soup.find_all('td', { "class" : "KopfZ21" }):
    tag.insert_after(gh_link)

outfile.write(soup.prettify())
infile.close()
outfile.close()
