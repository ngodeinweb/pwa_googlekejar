// fungsi program kalkulator

// fungsi penjumlahan
function jmlh(){
	// variable penampung inputan user
	var angka = document.querySelectorAll('input'); //menyeleksi semua tag input
	var i1 = parseInt( angka[0].value ) ; //angka pertama
	var i2 = parseInt( angka[1].value ) ; //angka kedua
	angka[2].value = i1 + i2; //penjumlahan
}
	
// event handler saat button diklik
var tombol1 = document.getElementById('jmlh');
tombol1.addEventListener('click', jmlh);
