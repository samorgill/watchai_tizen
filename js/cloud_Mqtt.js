/**
 * @author Samuel Orgill 15118305
 */

function start(){
	init();
}

function addIP(data){
	localstorage.setItem("ipAddress", data);
	$('#resultScreen').append(localstorage.getItem("ipAddress"));
}

function alertTest(){
	console.log(localStorage.getItem('ipAddress'));
	$('#resultScreen').append(localStorage.getItem('ipAddress'));
}

//Get users username
user = localStorage.getItem("user");

//Get details of zones from phone

ipAddress = localStorage.getItem('ipAddress');
ipAddTest = "192.168.0.19";


// Create a client instance

client = new Paho.MQTT.Client("m21.cloudmqtt.com", 37781, "webgh" + parseInt(Math.random() * 100, 10));

//client = new Paho.MQTT.Client("192.168.0.30", 1883, "SamsungGear"); 
/*
if(!ipAddress == null){
	client = new Paho.MQTT.Client(ipAddTest, 9001, "SamsungGear"); 
}else{
	client = new Paho.MQTT.Client("m21.cloudmqtt.com", 37781, "web_" + parseInt(Math.random() * 100, 10));
	}
*/


// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
useSSL: true,
userName: "xcihlzki",
password: "7wph1kJER7Xh",
onSuccess:onConnect,
onFailure:doFail
}

function init() {
  client.connect(options);
}

// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message.
console.log("onConnect");
client.subscribe("#");
/*message = new Paho.MQTT.Message("Hello from the Watch");
message.destinationName = "/test";
client.send(message); */
}

function doFail(e){
console.log("fail");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
  console.log("onConnectionLost:"+responseObject.errorMessage);
}
}

// called when a message arrives
function onMessageArrived(message) {
console.log("onMessageArrived:"+message.payloadString);
var str = message.payloadString;
window.alert(str);

}

function sendnew(dr, st){
	message = new Paho.MQTT.Message(st);
	message.destinationName = user + "/" + dr;
	client.subscribe(user + "/" + dr);
	client.send(message); 
}

function singleMessage(msg){
	message = new Paho.MQTT.Message(msg);
	message.destinationName = user + "/";
	//message.destinationName = localStorage.getItem("user") + "/";
	//client.subscribe(localStorage.getItem("user") + "/");
	console.log(message);
	client.send(message); 
}

function webSock(){
	init();	
}

