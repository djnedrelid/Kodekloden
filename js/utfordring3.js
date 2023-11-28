var KodeKjorer = false;

// Utfordring 3
var DeigTypeFikset = false;
var SteketiderFikset = false;
var StekevarmeFikset = false;
var InnenforFiksAlt = false;
var AntallKall = [0,0,0];
function FiksDeigtype() { AntallKall[0] += 1; if (InnenforFiksAlt) { DeigTypeFikset = true; } }
function FiksSteketid() { AntallKall[1] += 1; if (InnenforFiksAlt) { SteketiderFikset = true; } }
function FiksStekevarme() { AntallKall[2] += 1; if (InnenforFiksAlt) { StekevarmeFikset = true; } }

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
		AntallKall = [0,0,0];
		DeigTypeFikset = false;
		SteketiderFikset = false;
		StekevarmeFikset = false;
		InnenforFiksAlt = false;
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
		smak = 'Tester ...';
		
	} else if (runde == 2) {
		smak = 'Kode ...';
		
	} else if (runde == 3) {
		if (!DeigTypeFikset || !SteketiderFikset || !StekevarmeFikset) {
			
			smak = 'Hmm... 🤔';
			testcanvas_ctx.font = '62px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'red';
			setTimeout(DetteSmakte, 2000, 5);
			
		} else if (
			(DeigTypeFikset && SteketiderFikset && StekevarmeFikset) && 
			(AntallKall[0] == 1 && AntallKall[1] == 1 && AntallKall[2] == 1)
		) {
			
			smak = 'Flott!! 😎';
			testcanvas_ctx.font = '72px Comic Sans MS';
			testcanvas_ctx.fillStyle = 'green';
			document.getElementById('kristinekode').readOnly = true;
			setTimeout(DetteSmakte, 2000, 7);
			
		} else {
			
			smak = 'Er noe feil?.. 🤔';
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
		
		smak = 'Se om du klarer å FLYTTE alle funksjonene Kristine har laget, inn i den nye.';
		testcanvas_ctx.font = '16px Comic Sans MS';
		testcanvas_ctx.fillStyle = '#000';
		
		// Sett flagg for å kunne utføre ny testrunde.
		KodeKjorer = false;
	
	} else if (runde == 6) {
		
		var img = document.getElementById('NydeligPizza');
		testcanvas_ctx.clearRect(0, 0, testcanvas.width, testcanvas.height);
		testcanvas_ctx.drawImage(img, (testcanvas.width/2)-(img.width/2), 0);
		setTimeout(DetteSmakte, 2000, 7);
		return;
	
	} else if (runde == 7) {
		location.href = 'utfordring4.htm';
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
	'Trykk <a href="javascript:location.href=\'utfordring3.htm\'" style="font-size:13px">HER</a> for å starte på nytt hvis det tar lang tid. Kanskje du har feil i koden!';
		
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
