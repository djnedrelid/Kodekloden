var KodeKjorer = false;

// Utfordring 2
var StekeMinutterTid_1 = 30;
var StekeMinutterTid_2 = 60;
var StekeMinutterVarme = 500;
var TotalSteketidBrukt = 0;
var StoppeKlokke = 0;

// Hovedfunksjon for testknapp.
function PizzaDeigKode() {

	// Sørg for at kun 1 test kjører om gangen.
	if (KodeKjorer) {
		return;
	} else {
		KodeKjorer = true;
		TestKnappKjorer(0);
	}

	// Oppdater variabler med brukerens kode.
	var kode = document.getElementById('kristinekode').value;
	var kodetest = new Function(kode);
	
	try {
		TotalSteketidBrukt = 0;
		StoppeKlokke = 0;
		kodetest();
	} catch(err) {
		DetteSmakte(3);
		return;
	}
	
	// Gi et resultat.
	DetteSmakte(1);
}

// Kjedefunksjon for resultat, brukt av PizzaDeigKode().
function DetteSmakte(runde) {
	var smak = '';
	var testcanvas = document.getElementById('testcanvas');
	var testcanvas_ctx = testcanvas.getContext('2d');
	
	// Vis canvas.
	testcanvas.style.display = 'block';
	
	//
	// Fiks canvas strekk av piksler.
	// Trengs kun hvis kun CSS er satt, eller forskjellig fra tag.
	//
	//testcanvas.width = testcanvas.clientWidth;
	//testcanvas.height = testcanvas.clientHeight;
	
	// Sett startfont.
	testcanvas_ctx.font = '42px Comic Sans MS';
	testcanvas_ctx.fillStyle = '#000';
	testcanvas_ctx.textAlign = 'center';
	
	// Handling.
	if (runde == 1) {
		smak = 'Dette ...';
		
	} else if (runde == 2) {
		smak = 'Smaker ...';
		
	} else if (runde == 3) {
		if (TotalSteketidBrukt > 20 || StekeMinutterVarme > 200) {
			
			smak = 'BRENT PIZZA!! 🤮';
			testcanvas_ctx.font = '62px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'red';
			document.getElementById('TidViser').innerHTML = 'Pizza ble stekt i '+ TotalSteketidBrukt +' minutter på '+ StekeMinutterVarme +' grader.';
			setTimeout(DetteSmakte, 2000, 4);
			
		} else if (TotalSteketidBrukt == 20 && StekeMinutterVarme == 200) {
			
			smak = 'NYDELIG!! 🤤';
			testcanvas_ctx.font = '72px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'green';
			document.getElementById('kristinekode').readOnly = true;
			document.getElementById('TidViser').innerHTML = 'Pizza ble stekt i '+ TotalSteketidBrukt +' minutter på '+ StekeMinutterVarme +' grader.';
			setTimeout(DetteSmakte, 2000, 6);
			
		} else {
			
			smak = 'Uferdig?.. 🤔🤮';
			testcanvas_ctx.font = '42px Comic Sans MS';
			testcanvas_ctx.fillStyle = '#000';
			setTimeout(DetteSmakte, 2000, 5);
		}
		
	} else if (runde == 4) {
		
		var img = document.getElementById('OverstektPizza');
		testcanvas_ctx.clearRect(0, 0, testcanvas.width, testcanvas.height);
		testcanvas_ctx.drawImage(img, (testcanvas.width/2)-(img.width/2), 0);
		setTimeout(DetteSmakte, 2000, 5);
		return;
	
	} else if (runde == 5) {
		
		smak = 'Se om du klarer å fikse koden for 200 grader og 20 minutter.';
		testcanvas_ctx.font = '16px Comic Sans MS';
		testcanvas_ctx.fillStyle = '#000';
		document.getElementById('TidViser').innerHTML = '';
		
		// Sett flagg for å kunne utføre ny testrunde.
		KodeKjorer = false;
	
	} else if (runde == 6) {
		
		var img = document.getElementById('NydeligPizza');
		testcanvas_ctx.clearRect(0, 0, testcanvas.width, testcanvas.height);
		testcanvas_ctx.drawImage(img, (testcanvas.width/2)-(img.width/2), 0);
		setTimeout(DetteSmakte, 2000, 7);
		return;
	
	} else if (runde == 7) {
		location.href = 'utfordring3.htm';
	}
	
	testcanvas_ctx.clearRect(0, 0, testcanvas.width, testcanvas.height);
	testcanvas_ctx.fillText(smak, testcanvas.width/2, testcanvas.height/2);
	
	if (runde == 1)
		setTimeout(DetteSmakte, 2000, 2);
	else if (runde == 2)
		setTimeout(DetteSmakte, 2000, 3);
}

// Funksjon for å animere kjøreknapp mens test kjører.
function TestKnappKjorer(aniprikk) {
	var TestKnappTekst = document.getElementById('kjorkodeknapp');
	var KristineKode = document.getElementById('kristinekode');
	
	if (!KodeKjorer) {
		TestKnappTekst.value = 'Test Kode';
		KristineKode.readOnly = false;
		KristineKode.style.backgroundColor = '#fff';
		LastSidePaaNytt.innerHTML = '';
		return;
	}
	
	// Deaktiver kodevinduet mens testing foregår.
	KristineKode.readOnly = true;
	KristineKode.style.backgroundColor = '#b3ffe0';
	
	// Vis mulighet for å laste side på nytt hvis kode gir syntaksfeil i nettleser.
	LastSidePaaNytt.innerHTML = ''+
	'Trykk <a href="javascript:location.href=\'utfordring2.htm\'" style="font-size:13px">HER</a> for å starte på nytt hvis det tar lang tid. Kanskje du har feil i koden!';
		
	switch (aniprikk) {
		case 0:
			TestKnappTekst.value = 'Kjører .  ';
			break;
		case 1:
			TestKnappTekst.value = 'Kjører .. ';
			break;
		case 2:
			TestKnappTekst.value = 'Kjører ...';
			break;
		case 3:
			TestKnappTekst.value = 'Kjører  ..';
			break;
		case 4:
			TestKnappTekst.value = 'Kjører   .';
			aniprikk = -1;
			break;
	}
	
	setTimeout(TestKnappKjorer, 200, aniprikk + 1);
}
