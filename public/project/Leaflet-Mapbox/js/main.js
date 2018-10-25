	// variable penampung tempat
	var cities = L.layerGroup();

	// koordinat
	L.marker([-7.796647, 110.352319]).bindPopup('<p><img src="img/gmf.jpg" style="width: 60px; padding-right:6px;">Gameloft Indonesia</p>').addTo(cities),
	L.marker([-7.803779, 110.362305]).bindPopup('<p><img src="img/gd.jpg" style="width: 60px; padding-right:6px;">Masjid Gedhe Kauman</p>').addTo(cities),
	L.marker([-7.768399, 110.377228]).bindPopup('<p><img src="img/ugm.jpg" style="width: 60px; padding-right:6px;">Universitas Gajah Mada</p>').addTo(cities),
	L.marker([-7.759736, 110.408785]).bindPopup('<p><img src="img/amikom.jpg" style="width: 60px; padding-right:6px;">Universitas AMIKOM Yogyakarta</p>').addTo(cities),
	L.marker([-7.786234, 110.431902]).bindPopup('<p><img src="img/ad.jpg" style="width: 60px; padding-right:6px;">Adisucipto International Airport</p>').addTo(cities);
	
	// koneksi ke mapbox openstreet
	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

	// taampilan map
	var map = L.map('mapid', {
			center: [-7.795254, 110.371411],
			zoom: 12,
			layers: [streets, cities]
	});


	// event handler untuk menampilkan latitude & longtitude
	var popup = L.popup();
	function onMapClick() {
		popup
			.setLatLng(e.latlng)
			.setContent("Lokasi yang dipilih: " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
