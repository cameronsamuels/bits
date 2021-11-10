// by Cameron Samuels | MIT License

document.addEventListener("DOMContentLoaded", function() {

  function calculateBinary(x) {
    let byte = "";
    let decimal = parseInt(x);
  	while (decimal > 0) {
  		let r = decimal % 2;
  		let q = Math.floor(decimal / 2);
  		if (r == 0) {
  			byte = "0" + byte;
  		}
  		else byte = "1" + byte;
  		decimal = q;
  	}
  	while (byte.length % 4 !== 0) {
  		byte = "0" + byte;
  	}
  	return byte;
  }
  
	function calculateDecimal() {
		let decimal = 0;
		let bins = document.querySelectorAll("#js-bits div");
		for (let i = 0; i < bins.length; i++) {
			let bit = bins[bins.length - i - 1].textContent;
			if (bit === "1") decimal += Math.pow(2, i);
		}
		document.querySelector("#js-num").textContent = decimal;
	}

	let binary = "00000000";
	
	// Render bit bins
	for (let i = 0; i < binary.length; i++) {
		let bit = binary.charAt(i);
		let el = document.createElement("div");
		el.addEventListener("click", function(e) {
			this.textContent = this.textContent == "0" ? "1" : "0";
			this.setAttribute("val", this.textContent);
			calculateDecimal();
		});
		el.textContent = bit;
		el.setAttribute("val", el.textContent);
		document.querySelector("#js-bits").appendChild(el);
	}
	
	// Render nums and pows
	for (let i = 7; i >= 0; i--) {
		let num = Math.pow(2, i);
		let el = document.createElement("div");
		el.textContent = num;
		document.querySelector("#js-nums").appendChild(el);
		
		let pow = i;
		el = document.createElement("div");
		el.textContent = pow;
		document.querySelector("#js-pows").appendChild(el);
	}
	
	// Establish key press events
	let KEY_ONE = 49;
	document.addEventListener("keypress", function(e) {
	  let key = e.which | e.keyCode;
	  let num = key - 49;
	  if (num < 0 || num > 7) return;
	  let el = document.querySelectorAll("#js-bits div")[num];
	  el.textContent = el.textContent === "0" ? "1" : "0";
	  el.setAttribute("val", el.textContent);
	  calculateDecimal();
	});

});
