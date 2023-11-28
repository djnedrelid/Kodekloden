/*
	ferdig.js - Her finner du:
	JavaScript kode for vandre-funksjonalitet til Kristine-figur.
	
	Hele kodekloden er i sin helhet produsert av, og vertet hos: 
	Dag J Nedrelid <dj@thronic.com>, © 2007 - 2022 thronic.com
	
	
	Denne siden er direkte i ANSI format, slik at ÆØÅ viser greit.
	Vanligvis vil man bruke UTF-8, når man kan fortelle nettleser 
	at man faktisk gjør det, via HTML meta taggen i <head>.
	
	Her finner du en blanding av det som er introdusert i oppgavene, 
	sammen med litt nytt, kommentert etterhvert som det blir brukt. 
	
	Prøv gjerne å forstå hvordan det fungerer, husk også å vise 
	kildekoden til nettsiden for å se hvordan HTML koden jobber 
	sammen med JavaScript. Hvis du ser nøye, vil du se at denne 
	filen er inkludert i <script> taggen inne i <head> taggen. 
	Slik vet den om koden!
	
	
	Hva er HTML?
	HTML er bare formatering, en måte å bestemme hvordan ting 
	skal vises. Men ved hjelp av <script> taggen, kan man bruke 
	JavaScript sammen med det for å gjøre nettsider "levende" :)
	
	
	JavaScript kalles for et frontend språk, fordi det fungerer 
	bare i nettleseren din. Hvis det skal snakke til en server, 
	må man ha et serverside (backend) språk og skript eller 
	tjeneste som lytter til hva frontend språket sier. Men det er 
	ikke så viktig akkurat nå, all kode her er 100% frontend. 
	
	Hvis vi skulle lagret poeng eller noe annet, måtte vi snakket 
	med backend til en database. Da hadde jeg brukt f.eks. PHP. :)
	
	
	Du kan gjerne kopiere hele denne og HTML koden til skrivebordet 
	ditt og gjøre endringer og leke som du vil med den. Du trenger 
	kun notepad/notisblokk for å gjøre endringer! Jeg bruker selv 
	notepad++, enkelt via https://ninite.com/notepadplusplus/ 
*/

/*
	Jeg bytter litt mellom kommentartypene // og /* som eksempler.
	Så kan du vurdere selv hvilken du liker best i din egen kode. :) 
*/



//
//	Matrise for beinmodeller som brukes under vandring og hopping.
//	Jeg bruker tegn, siden det er bare ment som en gøy illustrasjon.
//	I et virkelig spill hadde jeg nok foretrukket bilder og grafikk.
//
//	Du lurer kanskje på hvorfor \ står dobbelt som \\ noen plasser.
//	Dette er fordi \ egentlig er et "escape" spesialtegn for å få 
//	språket til å ignorere/behandle følgende tegn som bokstavelig.
//	Siden vi faktisk vil vise \, må vi bruke tegnet på seg selv!
//
//	Du lurer kanskje også på \n. Det betyr bare "ny linje". :)
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
//	Beinmodeller for høyre-vandring.
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
 //	Beinmodell for stillestående.
 //
['     /\\    \n'+
 '    /--\\   \n'+
 '  _/    \\_ \n'+
 '            ']];
 
 
 
//
//	Trykkeregister. Brukt av StartVandrer().
//	Det er VandreCMD() sin jobb å holde styr på statusene.
//
//	Dette er en slags variabel, kalt for array på engelsk.
//	Det er en rekke av verdier, i dette tilfellet en matrise 
//	som betyr rekke av rekker (multidimensjonell). 
//
//	Disse brukes litt forskjellig, men finnes i nesten alle språk!
//	Det finnes også mer avanserte versjoner. Lister er nyttige verktøy!
//
var TrykkeRegister = [
	// Navn på taster.
	['KeyW','KeyA','KeyS','KeyD',
	'ArrowUp','ArrowLeft','ArrowDown','ArrowRight'],
	
	// trykkestatus 0=opp, 1=ned.
	[ 0    , 0    , 0    , 0    ]	
];
 
 
 
// Diverse variabler.
var KristineHoppeAksjon = false;	// Gir beskjed til StartVandrer om nye hopp.
var KristineHarLandet = true;		// Gir beskjed til StartVandrer om aktivt hopp.
var KristineBildeRetning = 1;		// 0 = bilde mot venstre, 1 = bilde mot høyre.
var Gravitasjon = 1;			// Brukes i KristineHopp() funksjonen.



/*
	Hovedfunksjon. Denne lytter etter hva vandreren skal gjøre.
	I et vanlig spill hadde man gjerne brukt en WHILE sløyfe for å holde den gående, 
	men på en nettside passer det litt bedre å få den til å kalle seg selv igjen.
	Jeg gjør dette ved å bruke JavaScript sin egen funksjon: setTimeout().
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
	'TrykkeRegister = [Opp, Venstre, Ned, Høyre]\n'+ 
	'                 ['+ 
	TrykkeRegister[1][0] +', '+ TrykkeRegister[1][1] +', '+ 
	TrykkeRegister[1][2] +', '+ TrykkeRegister[1][3] +']';

	// Ikke gå videre hvis Kristine er midt i et hopp eller en vandring.
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
	
	// Vis stillestående beinmodell hvis ingen vandring utføres.
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
//	Hjelpefunksjon for å kontinuerlig kalle StartVandrer().
//	Ved å ha denne er det kun 1 plass jeg trenger å justere timeout.
//
function FortsettVandrer() {
	/* 
		Vanligvis bruker man en WHILE loop i spill, men siden 
		dette er javascript og en internettside, passer det 
		greiere å kalle funksjonen uendelig for å hindre låsing.
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
	var BeinModell = 0; // Brukes til å sette retningstypen av beinmodeller.
	
	
	BeinModell = (KristineBildeRetning == 1 ? 1 : 0);
	/*
		Oi... Denne var ny antar jeg? :? kalles for en ternær operator.
		Det er i dette tilfellet akkurat det samme som å skrive koden:
		
		if (KristineBildeRetning == 1)
			BeinModell = 1;
		else 
			BeinModell = 0;
			
		Jeg kommer til å bruke denne tilfeldig som eksempel, 
		den er veldig nyttig for å spare plass ved mye IF/ELSE.
	*/
	
	//
	// Bytter mellom 3 beintyper med jevne mellomrom, 
	// for å skape en enkel animasjon under vandring.
	// Timeren fungerer ganske enkelt ved å benytte 
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
			// Flytt Kristine til høyre.
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
	
	// Nullstill beintype til første igjen når alle er brukt.
	if (VandreBeinTypeTimer >= 15)
		VandreBeinTypeTimer = 0;
	else
		VandreBeinTypeTimer += 1;
}
 
 
 
//
//	Hjelpefunksjon for å passe på at lytteboksen for tastetrykk er aktiv.
//	I HTML koden får jeg nettsiden til å kjøre denne hver gang det klikkes.
//
function VandreCMDFokus() {
	document.getElementById('VandreCMD').focus();

	// Pass på at boksen har fokus selv om man klikker et sted på siden.
	document.onclick = function (){document.getElementById('VandreCMD').focus(); };
}



//
//	Denne funksjonen tilkalles når det skjer et tastetrykk i VandreCMD input boksen.
//
function VandreCMD(e, tasteretning) {	

	// Ble en tast sluppet?
	if (tasteretning == 'opp') {
		
		// Vask/vedlikehold av input boksen.
		document.getElementById('VandreCMD').value = '';
		
		// Husker du FOR sløyfen? :) Her bruker jeg den 
		// for å avregistrere knapp som har vært trykket.
		for (var a = 0; a < 8; a++) {
			if (TrykkeRegister[0][a] == e.code) {
				
				// Ta høyde for at vi har 8 taster men kun 4 av/på moduser,
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
	   Når vi skal se etter hvilken tast som trykkes, er den veldig nyttig.
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
	
	Denne kan se litt vanskelig ut ved første øyekast på grunn av en gravitasjonseffekt 
	jeg valgte å lage, slik at hoppet ser litt mer naturlig ut. Variabelen Gravitasjon 
	ser hvor høyt hun er i luften, og HoppFaktor bruker dette for å bestemme hvor mange 
	piksler om gangen det skal brukes i bevegelse.
	
	Jeg har også benyttet avrunding og begrensning av desimaler.
	En relativt grei introduksjon til grunnleggende håndtering av tall, håper jeg. :)
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
	Gravitasjon = (100 - hoyde) / 100;			// Går fra 1 - 0 ved oppover-hopp.
	Gravitasjon = (Gravitasjon < 0.1 ? 0.1 : Gravitasjon);	// Begrens minimum gravitasjon.
	HoppFaktor *= Gravitasjon.toFixed(1);			// Ta i bruk gravitasjon.
	
	// Sjekk om det vandres til venstre eller høyde. 
	// Få evt. hoppet til å bevege seg i samme retning.
	if (TrykkeRegister[1][1] == 1)
		Vandre('venstre');
	else if (TrykkeRegister[1][3] == 1) 
		Vandre('hoyre');
	else
		KristineVandrerBein.innerHTML = BeinModeller[2][0];
	
	
	// På vei opp i luften.
	if (hoyde < 100 && !faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top - HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde + HoppFaktor, false); }, HoppeHastighet);
		
	// Truffet maks høyde og på tide å begynne fall!
	} else if (hoyde >= 100 && !faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top + HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde - HoppFaktor, true); }, HoppeHastighet);
	
	// På vei nedover i luften.
	} else if (hoyde < 100 && hoyde > 0 && faller) {
		KristineHarLandet = false;
		KristineVandrerBoks.style.top = (Posisjon.top + HoppFaktor) +'px';
		setTimeout(function(){ KristineHopp(hoyde - HoppFaktor, true); }, HoppeHastighet);
		
	// Endelig på bakken igjen!
	} else if (hoyde <= 0 && faller) {
		KristineHarLandet = true;
		KristineHoppeAksjon = false;
		KristineVandrerBein.innerHTML = BeinModeller[3][0];
		Gravitasjon = 1;
		KristineVandrerBoks.style.top = Math.round(Posisjon.top) +'px';
	}
}