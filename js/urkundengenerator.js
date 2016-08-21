var Urkundengenerator = function() {

  var UrkundenLinksHinzufuegen = function() {
    link = '<td align="justify" style="width: 15px;"><a href=\"javascript:void(0)\" class=\"download-urkunde\"><span style="padding-left:10px; padding-top:5px;" class="glyphicon glyphicon-file" alt="Urkunde"></span></p></a></td>';
    $(".blLeistw").after(link);
    link = '<td align="justify" style="background-color: #DDD; width: 15px;"><a href=\"javascript:void(0)\" class=\"download-urkunde\"><span style="padding-left:10px; padding-top:5px;" class="glyphicon glyphicon-file" alt="Urkunde"></span></p></a></td>';
    $(".blLeistg").after(link);
    $(".KopfZ21").after('<td><a href=\"https://github.com/lg-regensburg/urkundengenerator\" target=\"_blank\">Urkundengenerator<img height=\"40px\" src=\"https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png\" width=\"40px\"/></a></td>');
  };


  var UrkundenLinksInitialisieren = function() {
    var imgData = "";

    function getDataUri(url) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        imgData = canvas.toDataURL("image/png");
        canvas = null;
      };
      img.src = url;
    }
    getDataUri("http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png");

    $('.download-urkunde').click(function() {

      //TODO, optional: get event-information from header
      var veranstaltungsbezeichnung = 'Nikolauslauf';
      var jahr = '2015';

      // Ergebnis aus der Liste auslesen
      var row = $(this).parents('td').parents('tr');
      var rang = row.children('.blRangg').html() || row.children('.blRangw').html();
      rang = rang.concat(' Platz');
      var name = row.children('.blNameg').html() || row.children('.blNamew').html();
      names = name.split(', ');
      name = names[1].concat(' ', names[0]);
      var verein = row.children('.blVereing').html() || row.children('.blVereinw').html();
      var leistung = row.children('.blLeistg').html() || row.children('.blLeistw').html();
      leistung = leistung.concat(' min');

      var beschreibung = $(this).parents('td').parents('tr').parents('tbody').parents('table').prev().prev().children('tbody').children('tr');
      var strecke = beschreibung.children('.blWettb').html();
      var altersklasse = beschreibung.children('.blAKl').html();



      var doc = new jsPDF();

      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

      doc.setFontSize(21);

      // Structure: var lines = []; lines.push(name); ... ; var x_position = 115; var y_position = 110; for (var i = 0; i< lines.length; i++){ doc.text(x_position, y_position, lines[i]; x_position = x_position - 5; y_position = y_position+10;}

      var lines = [];

      // lines.push(veranstaltungsbezeichnung.concat(' ',jahr).replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
      lines.push(name.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
      lines.push(verein.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));

      lines.push(strecke.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
      lines.push(altersklasse.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
      lines.push(rang.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
      lines.push(leistung.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));

      var x_position = 122;
      var x_step = 5.5;
      // was 6
      var y_position = 90;
      var y_step = 15;
      var max_line_length = 26;
      for (i = 0; i < lines.length; i++) {
        if (lines[i].length < max_line_length) {
          doc.text(x_position, y_position, lines[i].replace(/(?:\r\n|\r|\n)/g, ''));
          x_position -= x_step;
          y_position += y_step;
        } else {
          var line1 = '';
          var line2 = '';
          var splitted = lines[i].split(' ');
          for (j = 1; j < splitted.length; j++) {
            if (((line1.length + splitted[j].length) < max_line_length) && (splitted[j].indexOf("(") < 0) && (line2.indexOf("(") < 0)) {
              line1 = line1 + splitted[j] + ' ';
            } else {
              line2 = line2 + splitted[j] + ' ';
            }
          }

          doc.text(x_position, y_position, line1);
          x_position -= x_step;
          y_position += y_step;
          if (line2 != '') {
            doc.text(x_position, y_position, line2);
            x_position -= x_step;
            y_position += y_step;
          }
        }

      }

      doc.setFontSize(16);
      doc.text(130, 210, 'Regensburg, 6.12.2015');

      var filename = veranstaltungsbezeichnung + jahr + name + '.pdf';
      filename = filename.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' ');
      doc.save(filename);

    });
    return false;
  };


  return {
    init: function() {
      UrkundenLinksHinzufuegen();
      UrkundenLinksInitialisieren();
    },
  };
}();

$(document).ready(function() {
  Urkundengenerator.init();
});
