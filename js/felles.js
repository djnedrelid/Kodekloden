// Animer header for å gjøre det tydlig at man har ankommet ny/fersk side.
var VelkommenHeaderOrigFontSize = 0;
function Velkommen(opp, first) {
	var VelkommenHeader = document.getElementById('velkommen');
	var timer = 15;
	var tekst_storrelse = parseFloat(window.getComputedStyle(VelkommenHeader, null).getPropertyValue('font-size'));
	var tekst_maks_storrelse = 42;
	
	// Registrer orginal størrelse ved første kall.
	if (first)
		VelkommenHeaderOrigFontSize = tekst_storrelse;
	
	// Avbryt når tekst er orginal størrelse igjen.
	if (tekst_storrelse == VelkommenHeaderOrigFontSize && !first)
		return;
	
	if (opp) {
		VelkommenHeader.style.fontSize = (tekst_storrelse+1) +'px';
		if (tekst_storrelse < tekst_maks_storrelse)
			setTimeout(function(){ Velkommen(true, false); }, timer);
		else
			setTimeout(function(){ Velkommen(false, false); }, timer);
		
	} else {
		VelkommenHeader.style.fontSize = (tekst_storrelse-1) +'px';
		setTimeout(function(){ Velkommen(false, false); }, timer);
	}
}