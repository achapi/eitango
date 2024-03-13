var number;
var english;
var japanese;
var count = 0;
var correct = 0;

function start() {
	count = 0;
	correct = 0;
	var per = document.getElementById("percent");
	per.innerText = "";
	make();
}

const OPTION_SIZE = 4;
var quiz_list = [];

function make() {
	count++;
	var jp = document.getElementById("jp");
	var l = Number(document.getElementById("l").value);
	var r = Number(document.getElementById("r").value);
	var f = 0;
	if (document.getElementsByName("yaku")[1].checked){
		f++;
	}
	if (l < 1 || r > tango.length || l > r) {
		document.getElementById("l").value = 1;
		document.getElementById("r").value = tango.length;
		l = 1;
		r = tango.length;
	}
	if (quiz_list.length == 0){
		for (var i = l; i <= r; i++){
			quiz_list.push(i - 1);
		}
	}
	for (var i = quiz_list.length; 1 < i; i--) {
		k = Math.floor(Math.random() * i);
		[quiz_list[k], quiz_list[i - 1]] = [quiz_list[i - 1], quiz_list[k]];
	}
	var ans_n = quiz_list.pop();
	var quiz = tango[ans_n];
	var c = [];
	c.push(ans_n);
	while (c.length < OPTION_SIZE){
		var k = Math.floor(Math.random() * (r - l + 1)) + l - 1;
		if (c.indexOf(k) === -1){
			c.push(k);
		}
	}
	for (var i = OPTION_SIZE; 1 < i; i--) {
		k = Math.floor(Math.random() * i);
		[c[k], c[i - 1]] = [c[i - 1], c[k]];
	}
	for (var i = 1; i <= OPTION_SIZE; i++){
		document.getElementById("ans" + i).innerText = tango[c[i - 1]][1 + f];
	}
	number = quiz[0];
	english = quiz[1];
	japanese = quiz[2];
	if (f == 1){
		[english, japanese] = [japanese, english];
	}
	jp.innerText = "No." + number + '\n' + japanese;
}

function checkAnswer(btn) {
	if (count == 0){
		make();
		return;
	}
	if (btn.textContent === english){
		alert("◯正解\n" + "No." + number + ' ' + japanese + "\n" + english);
		correct++;
	} else {
		alert("✕不正解\n" + "No." + number + ' ' + japanese + "\n" + english);
	}
	var per = document.getElementById("percent");
	per.innerText = "正答率: " + correct + "/" + count + " (" + Math.round(correct / count * 100 * 100) / 100 + "%)";
	document.getElementById("startbutton").value = "リセット";
	make();
}

function unknownAnswer() {
	if (count == 0){
		make();
		return;
	}
	alert("No." + number + ' ' + japanese + "\n" + english);
	var per = document.getElementById("percent");
	per.innerText = "正答率: " + correct + "/" + count + " (" + Math.round(correct / count * 100 * 100) / 100 + "%)";
	document.getElementById("startbutton").value = "リセット";
	make();
}