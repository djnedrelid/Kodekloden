/*
	ferdig.js - Her finner du:
	JavaScript kode for vandre-funksjonalitet til Kristine-figur.
	
	Hele kodekloden er i sin helhet produsert av, og vertet hos: 
	Dag J Nedrelid <dj@thronic.com>, � 2007 - 2022 thronic.com
	
	
	Denne siden er direkte i ANSI format, slik at ��� viser greit.
	Vanligvis vil man bruke UTF-8, n�r man kan fortelle nettleser 
	at man faktisk gj�r det, via HTML meta taggen i <head>.
	
	Her finner du en blanding av det som er introdusert i oppgavene, 
	sammen med litt nytt, kommentert etterhvert som det blir brukt. 
	
	Pr�v gjerne � forst� hvordan det fungerer, husk ogs� � vise 
	kildekoden til nettsiden for � se hvordan HTML koden jobber 
	sammen med JavaScript. Hvis du ser n�ye, vil du se at denne 
	filen er inkludert i <script> taggen inne i <head> taggen. 
	Slik vet den om koden!
	
	
	Hva er HTML?
	HTML er bare formatering, en m�te � bestemme hvordan ting 
	skal vises. Men ved hjelp av <script> taggen, kan man bruke 
	JavaScript sammen med det for � gj�re nettsider "levende" :)
	
	
	JavaScript kalles for et frontend spr�k, fordi det fungerer 
	bare i nettleseren din. Hvis det skal snakke til en server, 
	m� man ha et serverside (backend) spr�k og skript eller 
	tjeneste som lytter til hva frontend spr�ket sier. Men det er 
	ikke s� viktig akkurat n�, all kode her er 100% frontend. 
	
	Hvis vi skulle lagret poeng eller noe annet, m�tte vi snakket 
	med backend til en database. Da hadde jeg brukt f.eks. PHP. :)
	
	
	Du kan gjerne kopiere hele denne og HTML koden til skrivebordet 
	ditt og gj�re endringer og leke som du vil med den. Du trenger 
	kun notepad/notisblokk for � gj�re endringer! Jeg bruker selv 
	notepad++, enkelt via https://ninite.com/notepadplusplus/ 
*/

/*
	Jeg bytter litt mellom kommentartypene // og /* som eksempler.
	S� kan du vurdere selv hvilken du liker best i din egen kode. :) 
*/



//
//	Matrise for beinmodeller som brukes under vandring og hopping.
//	Jeg bruker tegn, siden det er bare ment som en g�y illustrasjon.
//	I et virkelig spill hadde jeg nok foretrukket bilder og grafikk.
//
//	Du lurer kanskje p� hvorfor \ st�r dobbelt som \\ noen plasser.
//	Dette er fordi \ egentlig er et "escape" spesialtegn for � f� 
//	spr�ket til � ignorere/behandle f�lgende tegn som bokstavelig.
//	Siden vi faktisk vil vise \, m� vi bruke tegnet p� seg selv!
//
//	Du lurer kanskje ogs� p� \n. Det betyr bare "ny linje". :)
//	Sammen med HTML taggen <pre> blir visningen da enkel og riktig.
//
var BeinModeller = [

//
//	Beingmodeller for venstre-vandring.
//

['     /\\    \n'+
 '    /--\\   \n'+
 '  _/   _\\  \n'+
 '            ',

 '     /\\    \n'+
 '     ||     \n'+
 '   _/ _\\   \n'+
 '            ',

 '     /\\    \n'+
 '     ||     \n'+
 '    _||     \n'+
 '            '],

//
//	Beinmodeller for h�yre-vandring.
//
['     /\\    \n'+
 '    /--\\   \n'+
 '   /_   \\_ \n'+
 '            ',

 '     /\\    \n'+
 '     ||     \n'+
 '    /_ \\_  \n'+
 '            ',

 '     /\\    \n'+
 '     ||     \n'+
 '     ||_    \n'+
 '            '],
 
//
//	Beinmodell for hopping.
//
['   _/\\-/\\_  \n'+
 '            \n'+
 '            \n'+
 '            '],
 
 //
 //	Beinmodell for stillest�ende.
 //
['     /\\    \n'+
 '    /--\\   \n'+
 '  _/    \\_ \n'+
 '            ']];
 
 
 
//
//	Trykkeregister. Brukt av StartVandrer().
//	Det er VandreCMD() sin jobb � holde styr p� statusene.
//
//	Dette er en slags variabel, kalt for array p� engelsk.
//	Det er en rekke av verdier, i dette tilfellet en matrise 
//	som betyr rekke av rekker (multidimensjonell). 
//
//	Disse brukes litt forskjellig, men finnes i nesten alle spr�k!
//	Det finnes ogs� mer avanserte versjoner. Lister er nyttige verkt�y!
//
var TrykkeRegister = [
	// Navn p� taster.
	['KeyW','KeyA','KeyS','KeyD',
	'ArrowUp','ArrowLeft','ArrowDown','ArrowRight'],
	
	// trykkestatus 0=opp, 1=ned.
	[ 0    , 0    , 0    , 0    ]	
];
 
 
 
// Diverse variabler.
var KristineHoppeAksjon = false;	// Gir beskjed til StartVandrer om nye hopp.
var KristineHarLandet = true;		// Gir beskjed til StartVandrer om aktivt hopp.
var KristineBildeRetning = 1;		// 0 = bilde mot venstre, 1 = bilde mot h�yre.
var Gravitasjon = 1;			// Brukes i KristineHopp() funksjonen.



/*
	Hovedfunksjon. Denne lytter etter hva vandreren skal gj�re.
	I et vanlig spill hadde man gjerne brukt en WHILE sl�yfe for � holde den g�ende, 
	men p� en nettside passer det litt bedre � f� den til � kalle seg selv igjen.
	Jeg gj�r dette ved � bruke JavaScript sin egen funksjon: setTimeout().
*/
function StartVandrer() {
 
	// VandrerReferanser.
	var KristineVandrerBoks = document.getElementById('KristineVandrerBoks');
	var KristineVandrerBein = document.getElementById('KristineVandrerBein');
	var kristinekode = document.getElementById('kristinekode');

	// Oppdater kodevindu med Kristine sine vandredata.
	var Posisjon = KristineVandrerBoks.getBoundingClientRect();
	kristinekode.innerHTML = ''+
	'Her kan du se hva som skjer med variablene hennes mens hun vandrer!\n'+
	'-----------------------\n\n'+
	'Kristine_X = '+ Posisjon.left +'\n'+
	'Kristine_Y = '+ Posisjon.top +'\n'+
	'Gravitasjon = '+ Gravitasjon +'\n'+
	'KristineBildeRetning = '+ KristineBildeRetning +'\n'+
	'KristineHoppeAksjon = '+ KristineHoppeAksjon +'\n'+
	'KristineHarLandet = '+ KristineHarLandet +'\n'+
	'TrykkeRegister = [Opp, Venstre, Ned, H�yre]\n'+ 
	'                 ['+ 
	TrykkeRegister[1][0] +', '+ TrykkeRegister[1][1] +', '+ 
	TrykkeRegister[1][2] +', '+ TrykkeRegister[1][3] +']';

	// Ikke g� videre hvis Kristine er midt i et hopp eller en vandring.
	if (!KristineHarLandet) {
		FortsettVandrer();
		return;
	}

	// Skal det hoppes?
	if (KristineHoppeAksjon) {
		KristineHopp(0, false);
		FortsettVandrer();
		return;
	}

	// Sjekk vandremodus via trykkeregisteret.
	for (var a = 0; a < 4; a++) {
		if (TrykkeRegister[1][a] == 0)
			continue;
		
		switch (a) {
			case 0:
				Vandre('opp');
				break;
				
			case 1:
				Vandre('venstre');
				break;
				
			case 2:
				Vandre('ned');
				break;
				
			case 3:
				Vandre('hoyre');
				break;
			
			default:
		}
	}
	
	// Vis stillest�ende beinmodell hvis ingen vandring utf�res.
	if (
		TrykkeRegister[1][0] == 0 && 
		TrykkeRegister[1][1] == 0 && 
		TrykkeRegister[1][2] == 0 && 
		TrykkeRegister[1][3] == 0
	)
		KristineVandrerBein.innerHTML = BeinModeller[3][0];

	// Hold vandreren i live.
	// Se funksjonen for forklaring.
	FortsettVandrer();
}



//
//	Hjelpefunksjon for � kontinuerlig kalle StartVandrer().
//	Ved � ha denne er det kun 1 plass jeg trenger � justere timeout.
//
function FortsettVandrer() {
	/* 
		Vanligvis bruker man en WHILE loop i spill, men siden 
		dette er javascript og en internettside, passer det 
		greiere � kalle funksjonen uendelig for � hindre l�sing.
	*/
	setTimeout(StartVandrer, 20);
}



//
//	Funksjonen som tar seg av selve vandringen, i angitt retning.
//	Brukes av StartVandrer() som sjekker TrykkeRegisteret. 
//
var VandreBeinTypeTimer = 0;
function Vandre(retning) {
	
	// VandrerReferanser.
	var KristineVandrerBoks = document.getElementById('KristineVandrerBoks');
	var KristineVandrerBein = document.getElementById('KristineVandrerBein');
	var kristinekode = document.getElementById('kristinekode');
	var Posisjon = KristineVandrerBoks.getBoundingClientRect();
	var KristineVandreBilde = document.getElementById('KristineVandreBilde');
	var BeinModell = 0; // Brukes til � sette retningstypen av beinmodeller.
	
	
	BeinModell = (KristineBildeRetning == 1 ? 1 : 0);
	/*
		Oi... Denne var ny antar jeg? :? kalles for en tern�r operator.
		Det er i dette tilfellet akkurat det samme som � skrive koden:
		
		if (KristineBildeRetning == 1)
			BeinModell = 1;
		else 
			BeinModell = 0;
			
		Jeg kommer til � bruke denne tilfeldig som eksempel, 
		den er veldig nyttig for � spare plass ved mye IF/ELSE.
	*/
	
	//
	// Bytter mellom 3 beintyper med jevne mellomrom, 
	// for � skape en enkel animasjon under vandring.
	// Timeren fungerer ganske enkelt ved � benytte 
	// samme beintype et visst antall ganger.
	//
	switch(retning) {
		case 'opp':
			// Flytt Kristine oppover.
			KristineVandrerBoks.style.top = (Posisjon.top - 5) +'px';
			break;
			
		case 'venstre':
			// Flytt Kristine til venstre.
			KristineVandrerBoks.style.left = (Posisjon.left - 5) +'px';
			KristineVandreBilde.src = 'grafikk/kristine-kokk-2.png';
			KristineBildeRetning = 0;
			break;
			
		case 'ned':
			// Flytt Kristine nedover.
			KristineVandrerBoks.style.top = (Posisjon.top + 5) +'px';
			break;
			
		case 'hoyre':
			// Flytt Kristine til h�yre.
			KristineVandrerBoks.style.left = (Posisjon.left + 5) +'px';
			KristineVandreBilde.src = 'grafikk/kristine-kokk-1.png';
			KristineBildeRetning = 1;
			break;
			
		default:
	}
	
	// Animer beina til neste beintype etter timer.
	if (VandreBeinTypeTimer <= 5)
		KristineVandrerBein.innerHTML = BeinModeller[BeinModell][0];
	else if (VandreBeinTypeTimer <= 10)
		KristineVandrerBein.innerHTML = BeinModeller[BeinModell][1];
	else if (VandreBeinTypeTimer <= 15)
		KristineVandrerBein.innerHTML = BeinModeller[BeinModell][2];
	
	// Nullstill beintype til f�rste igjen n�r alle er brukt.
	if (VandreBeinTypeTimer >= 15)
		VandreBeinTypeTimer = 0;
	else
		VandreBeinTypeTimer += 1;
}
 
 
 
//
//	Hjelpefunksjon for � passe p� at lytteboksen for tastetrykk er aktiv.
//	I HTML koden f�r jeg nettsiden til � kj�re denne hver gang det klikkes.
//
function VandreCMDFokus() {
	document.getElementById('VandreCMD').focus();

	// Pass p� at boksen har fokus selv om man klikker et sted p� siden.
	document.onclick = function (){document.getElementById('VandreCMD').focus(); };
}



//
//	Denne funksjonen tilkalles n�r det skjer et tastetrykk i VandreCMD input boksen.
//
function VandreCMD(e, tasteretning) {	

	// Ble en tast sluppet?
	if (tasteretning == 'opp') {
		
		// Vask/vedlikehold av input boksen.
		document.getElementById('VandreCMD').value = '';
		
		// Husker du FOR sl�yfen? :) Her bruker jeg den 
		// for � avregistrere knapp som har v�rt trykket.
		for (var a = 0; a < 8; a++) {
			if (TrykkeRegister[0][a] == e.code) {
				
				// Ta h�yde for at vi har 8 taster men kun 4 av/p� moduser,
				// siden de 8 tastene deler funksjon (WASD og piltaster).
				if (a > 3)
					TrykkeRegister[1][a-4] = 0;
				else
					TrykkeRegister[1][a] = 0;
			}
		}
		return;
	}
	
	/*
	   Husker du kontrollstrukturen SWITCH? :)
	   N�r vi skal se etter hvilken tast som trykkes, er den veldig nyttig.
	*/
	switch(e.code) {
		case 'KeyW':
		case 'ArrowUp':
			TrykkeRegister[1][0] = 1;
			break;
			
		case 'KeyA':
		case 'ArrowLeft':
			TrykkeRegister[1][1] = 1;
			break;
			
		case 'KeyS':
		case 'ArrowDown':
			TrykkeRegister[1][2] = 1;
			break;
			
		case 'KeyD':
		case 'ArrowRight':
			TrykkeRegister[1][3] = 1;
			break;
			
		case 'Space':
			KristineHoppeAksjon = true;
			break;
			
		default:
	}
}



/*
	Hoppefunksjon.
	
	Denne kan se litt vanskelig ut ved f�rste �yekast p� grunn av en gravitasjonseffekt 
	jeg valgte � lage, slik at hoppet ser litt mer naturlig ut. Variabelen Gravitasjon 
	ser hvor h�yt hun er i luften, og HoppFaktor bruker dette for � bestemme hvor mange 
	piksler om gangen det skal brukes i bevegelse.
	
	Jeg har ogs� benyttet avrunding og begrensning av desimaler.
	En relativt grei introduksjon til grunnleggende h�ndtering av tall, h�per jeg. :)
*/
function KristineHopp(hoyde, faller) {
	
	// VandrerReferanser.
	var KristineVandrerBoks = document.getElementById('KristineVandrerBoks');
	var KristineVandrerBein = document.getElementById('KristineVandrerBein');
	var kristinekode = document.getElementById('kristinekode');
	var Posisjon = KristineVandrerBoks.getBoundingClientRect();
	
	// Diverse variabler.
	var HoppeHastighet = 20;
	var HoppFaktor = 4;
	Gravitasjon = (100 - hoyde) / 100;			// G�r fra 1 - 0 ved oppover-hopp.
	Gravitasjon = (Gravitasjon < 0.1 ? 0.1 : Gravitasjon);	// Begrens minimum gravitasjon.
	HoppFaktor *= Gravitasjon.toFixed(1);			// Ta i bruk gravitasjon.
	
	// Sjekk om det vandres til venstre eller h�yde. 
	// F� evt. hoppet til � bevege seg i samme retning.
	if (TrykkeRegister[1][1] == 1)
		Vandre('venstre');
	else if (TrykkeRegister[1][3] == 1) 
		Vandre('hoyre');
	else
		KristineVandrerBein.innerHTML = BeinModeller[2][0];
	
	
	// P� vei opp i luften.
	if (hoyde < 100 && !faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top - HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde + HoppFaktor, false); }, HoppeHastighet);
		
	// Truffet maks h�yde og p� tide � begynne fall!
	} else if (hoyde >= 100 && !faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top + HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde - HoppFaktor, true); }, HoppeHastighet);
	
	// P� vei nedover i luften.
	} else if (hoyde < 100 && hoyde > 0 && faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top + HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde - HoppFaktor, true); }, HoppeHastighet);
		
	// Endelig p� bakken igjen!
	} else if (hoyde <= 0 && faller) {
		KristineHarLandet = true;
		KristineHoppeAksjon = false;
		KristineVandrerBein.innerHTML = BeinModeller[3][0];
		Gravitasjon = 1;
		KristineVandrerBoks.style.top = Math.round(Posisjon.top) +'px';
	}
}