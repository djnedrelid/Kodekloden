var info_om_klasser_top = 0;

function vis_info_om_klasser(vis) {
	var info = document.getElementById('info_om_klasser');
	
	if (vis) {
		info.style.display = 'block';
		info.style.height = '180px';
		
		if (info_om_klasser_top == 0)
			info_om_klasser_top = info.offsetTop;
			
		info.style.top = (info_om_klasser_top - 250) +'px';
	} else {
		info.style.display = 'none';
	}
}