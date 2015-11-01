# Urkundengenerator

## Anleitung

Das skript ```generate.py```  fügt in eine Cosawin-Ergebnisdatei ```Ergebnisliste.htm``` Downloadlinks ein - die Urkunden werden clientseitig  auf Grundlage der Ergebnisliste generiert.


## Anpassen des Urkundenformats

Die  Einstellungen für die Urkunden können im Javascript ```init.download.buttons.js``` vorgenommen werden, das Bild (variable ```imgData```) muss vorher in eine Dataurl umgewandelt werden (z.B. [hier](http://dataurl.net/#dataurlmaker)).

## Credits

Der Urkundengenerator verwendet
- [jsPDF (MIT-License)](https://github.com/MrRio/jsPDF)
- [BeautifulSoup (MIT-License)](http://www.crummy.com/software/BeautifulSoup/)

## License

GPL 2.
