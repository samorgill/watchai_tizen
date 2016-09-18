/**
 * Javascript Functions for the Music page
 */

user = localStorage.getItem("user");

$('#userArea').append(user);


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

type = "Music";

function genius(){
	var genius = "genius";
	sendMessage(type, genius);
}

function sleep(){
	var sleep = "sleep";
	sendMessage(type, sleep);
}

function party(){
	var party = "party";
	sendMessage(type, party);
}

function rhyme(){
	var rhyme = "rhyme";
	sendMessage(type, rhyme);
}

function stop(){
	var stop = 'stop';
	sendMessage(type, stop);
	
}
