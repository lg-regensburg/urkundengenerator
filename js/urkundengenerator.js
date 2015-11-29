var jsPDFEditor = function() {
	 
	var initDownloadPDF = function() {
		$('.download-urkunde').click(function(){
			
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

			doc.setFontSize(25);
			// doc.text(115, 90, veranstaltungsbezeichnung.concat(' ',jahr).replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			doc.text(115, 110, name.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			doc.text(105, 130, verein.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' ').replace(' (LG Telis Finanz)',''));
			// doc.text(100, 150, leistung.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			doc.text(100, 150, strecke.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			doc.text(95, 170, rang.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			// doc.text(90, 190, altersklasse.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' '));
			
			var filename = veranstaltungsbezeichnung + jahr + name + '.pdf';
			filename = filename.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s\s+/g, ' ');
			doc.save(filename);

		});
		return false;
	};

	return {
		init: function() {
			link = '<td><a href=\"javascript:void(0)\" class=\"download-urkunde\">Urkunde</a></td>';
			$(".blLeistw").after(link);
			$(".blLeistg").after(link);
			$(".KopfZ21").after('<td><a href=\"https://github.com/lg-regensburg/urkundengenerator\" target=\"_blank\">Urkundengenerator<img height=\"40px\" src=\"https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png\" width=\"40px\"/></a></td>');
			initDownloadPDF();
			
		},
	};
}();

$(document).ready(function() {
	jsPDFEditor.init();
});