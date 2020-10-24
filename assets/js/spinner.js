var options = ["Pho Pasteur", "Amateras", "Taiwan Cafe", "Five Spices", "Penang", "HK Eatery", "China Pearl", "Hei La Moon"];
var optionsInfo = ["http://phopasteurboston.net/",
		   "https://www.amateras-ramen.com/menu",
		   "https://taiwancafeboston.com/",
		   "https://www.5spiceshouse.com/",
		   "685 Washington St, Boston, MA 02116",
		   "http://www.hongkongeatery.com/",
		   "https://chinapearlboston.net/",
		   "88 Beach St, Boston, MA 02111"]
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
	var insideRadius = 125;

	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,500,500);

	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;

	ctx.font = 'bold 12px Helvetica, Arial';

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
	    ctx.shadowColor   = "rgb(220,220,220)";
	    ctx.fillStyle = "black";
	    ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
			  250 + Math.sin(angle + arc / 2) * textRadius);
	    ctx.rotate(angle + arc / 2 + Math.PI / 2);
	    var text = options[i];
	    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
	    ctx.restore();
	}

	//Arrow
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
	ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
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
    spinTimeout = setTimeout('rotateWheel()', 40); //30
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial'; //centered results text
    var choice = options[index];
    var choiceInfo = optionsInfo[index];
    ctx.fillText(choice, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();

    modal.style.display = "block";
    modalResult.innerHTML = "Let's eat at " + choice + "!";
    modalInfo.innerHTML = choiceInfo;
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
