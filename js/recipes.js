

/*
 * Function for going back to the home view
 */

function back(){
	window.open("index.html");
	client.disconnect();
}

/**
 * Functions to send MQTT messages
 */

type = "Recipe";

function sleep(){
	var sleep = "sleep";
	sendMessage(type, sleep);
}

function wake(){
	var wake = "wake";
	sendMessage(type, wake);
}

function sooth(){
	var sooth = "sooth";
	sendMessage(type, sooth);
}

function entertain(){
	var entertain = "entertain";
	sendMessage(type, entertain);
}

function emergency(){
	var emergency = 'emergency';
	sendMessage(type, emergency);
	
}

$('#userArea').append(localStorage.getItem("user"));

