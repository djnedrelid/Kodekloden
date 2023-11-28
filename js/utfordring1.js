var KodeKjorer = false;

// Utfordring 1
var Deigtype1 = 'Bolledeig';
var Deigtype2 = 'Pizzadeig';
var Deigvalg = Deigtype1;

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
		kodetest();
	} catch(err) {
		Deigvalg = '';
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
		if (Deigvalg == 'Bolledeig') {
			
			smak = 'BOLLEDEIG!! 🤮';
			testcanvas_ctx.font = '72px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'red';
			setTimeout(DetteSmakte, 2000, 4);
			
		} else if (Deigvalg == 'Pizzadeig') {
			
			smak = 'PIZZADEIG!! 😃';
			testcanvas_ctx.font = '72px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'green';
			document.getElementById('kristinekode').readOnly = true;
			setTimeout(DetteSmakte, 2000, 6);
			
		} else {
			
			smak = 'Hæ? 🤔🤮';
			testcanvas_ctx.font = '42px Comic Sans MS';
			testcanvas_ctx.fillStyle = '#000';
			setTimeout(DetteSmakte, 2000, 5);
		}
		
	} else if (runde == 4) {
		
		smak = '(😃 Pappa ...)';
		testcanvas_ctx.font = '72px Comic Sans MS';
		testcanvas_ctx.fillStyle = 'green';
		setTimeout(DetteSmakte, 2000, 5);
	
	} else if (runde == 5) {
		
		smak = 'Se om du klarer å fikse koden til å bruke Pizzadeig.';
		testcanvas_ctx.font = '22px Comic Sans MS';
		testcanvas_ctx.fillStyle = '#000';
		
		// Sett flagg for å kunne utføre ny testrunde.
		KodeKjorer = false;
	
	} else if (runde == 6) {
		location.href = 'utfordring2.htm';
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
	var LastSidePaaNytt = document.getElementById('LastSidePaaNytt');
	
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
	'Trykk <a href="javascript:location.href=\'utfordring1.htm\'" style="font-size:13px">HER</a> for å starte på nytt hvis det tar lang tid. Kanskje du har feil i koden!';
		
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
