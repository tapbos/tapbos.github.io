var options = ["Pho Pasteur", "Amateras", "Taiwan Cafe", "Five Spices", "Penang", "HK Eatery", "China Pearl", "Hei La Moon"];
var optionsLinks = ["http://phopasteurboston.net/",
		   "https://www.amateras-ramen.com/menu",
		   "https://taiwancafeboston.com/",
		   "https://www.5spiceshouse.com/",
		   "https://www.yelp.com/biz/penang-boston",
		   "http://www.hongkongeatery.com/",
		   "https://chinapearlboston.net/",
		   "https://www.yelp.com/biz/hei-la-moon-boston"]
var optionsInfo = [" ",
		   " ",
		   " ",
		   " ",
		   " ",
		   " ",
		   " ",
		   " "]

var optionsImage = ["https://tap-boston.org/assets/images/resources-images/spinner-images/pho-pasteur.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/amateras.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/taiwan-cafe.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/five-spices.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/penang.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/hong-kong-eatery.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/china-pearl.jpg",
		    "https://tap-boston.org/assets/images/resources-images/spinner-images/hei-la-moon.jpg"]
var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var modal = document.getElementById("myModal");
var modalResult = document.getElementById("myModalResult");
var modalInfo = document.getElementById("myModalInfo");
var modalImage = document.getElementById("myModalImage");
var span = document.getElementsByClassName("close")[0];

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;

    red   = Math.sin(frequency*item+2+phase) * width + center;
    green = Math.sin(frequency*item+0+phase) * width + center;
    blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    // return RGB2Color(red,green,blue);
    //replacing it with my alternating 2 colors
    if(item % 2 == 0){
	return RGB2Color(255, 255, 150);
    }
    else{
	return RGB2Color(220, 255, 150);
    }
}

function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
	var outsideRadius = 200;
	var textRadius = 160;
	var insideRadius = 55; /*55 - 125*/

	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,500,500);

	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 10;

	ctx.font = '15px Helvetica, Arial';

	for(var i = 0; i < options.length; i++) {
	    var angle = startAngle + i * arc;

	    //rainbow
	    var myColor = getColor(i, options.length);
	    ctx.fillStyle = myColor;

	    ctx.beginPath();
	    ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
	    ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
	    ctx.stroke();
	    ctx.fill();

	    ctx.save();
	    ctx.shadowOffsetX = -1;
	    ctx.shadowOffsetY = -1;
	    ctx.shadowBlur    = 0;
	    ctx.shadowColor   = "(220,220,220)";
	    ctx.fillStyle = "#3f3f3f";
	    ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
			  250 + Math.sin(angle + arc / 2) * textRadius);
	    ctx.rotate(angle + arc / 2 + Math.PI / 2);
	    var text = options[i];
	    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
	    ctx.restore();
	}

	//Arrow
	
	/*ctx.fillStyle = "orange";
	ctx.beginPath();
	ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
	ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.fill(); */

	ctx.fillStyle = "#ffca61";
	ctx.beginPath();
	ctx.moveTo(250 - 8, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 8, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
	ctx.lineTo(250 - 8, 250 - (outsideRadius + 5));
	ctx.fill(); 
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
	stopRotateWheel();
	return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 5); //original 30, 50 ideal, 5 test
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial'; //centered results text
    var text = options[index]; /*options index*/
    var textInfo = optionsInfo[index]
    var textImage = optionsImage[index]
    //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10); //text behind spin button
    ctx.restore();

    modal.style.display = "block";
    //console.log(optionsLinks[index]);
    modalResult.innerHTML = "Let's eat at <b><a href=" + optionsLinks[index] + " target=\"_blank\">" + text + "</a></b>!";
    //console.log("<img id=myModalImage src=" + optionsImage[index] + ">");
    modalImage.innerHTML = "<img id=myModalImage src=" + optionsImage[index] + ">";
    modalInfo.innerHTML = textInfo;
}

span.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
	modal.style.display = "none";
    }
}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();
