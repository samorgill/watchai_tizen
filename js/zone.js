/**
 * 
 */

function zones(){
	window.open("zone.html");
}

function setUp(){
	window.open("setup.html");
}

function add(){
	window.open("add.html");
}

// Goes back a page

function back(){
	window.open("index.html");
}

function addIP(data){
	localstorage.setItem("ipAddress", data);
	$('#resultScreen').append(localstorage.getItem("ipAddress"));
}

function alertTest(){
	console.log(localStorage.getItem('ipAddress'));
	$('#resultScreen').append(localStorage.getItem('ipAddress'));
}

//Get details of zones from phone

ipAddress = localStorage.getItem('ipAddress');
ipAddTest = "192.168.0.19";
// Create a client instance

//client = new Paho.MQTT.Client("m21.cloudmqtt.com", 37781, "webgh" + parseInt(Math.random() * 100, 10));

client = new Paho.MQTT.Client("192.168.0.30", 9001, "SamsungGear"); 
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
/*useSSL: true,
userName: "xcihlzki",
password: "7wph1kJER7Xh",*/
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
	message.destinationName = localStorage.getItem("user") + "/" + dr;
	client.subscribe(localStorage.getItem("user") + "/" + dr);
	client.send(message); 
}

function webSock(){
	init();	
}


function msgTest(){
	message = new Paho.MQTT.Message("Locked");
	message.destinationName = "SamHome" + "/" + "Front";
	client.subscribe("SamHome" + "/" + "Front");
	client.send(message); 
}




/*JQuery for inserting a user into the database*/

/*function register(){
	user = $("#user2").val();
	var pass = $("#pass2").val();
	var email = $("#email").val();
	$.ajax({
		url: 'Register?user2=' + user + "&pass2=" + pass + "&email=" + email,
		type: 'POST',
		dataType: 'json',
		error: function(){
			
			onReg();
			
		}
	
	});
	zones();
};*/

/*
 * New function to simply enter user name as registration conducted on phone
 */

function register(){
	user = $("#user2").val();
	
	localStorage.setItem("user", user);
	$('#userArea').append(localStorage.getItem("user"));


	back();
			
};


/**
 * New function for the OnReg so it goes to a registration page
 */

function onReg(){
	
}

/*
function onReg(){
	
	
	user = $("#user2").val();
	
	hide();
	
	
	localStorage.setItem("user", user);
	
	
	$('#userArea').append(localStorage.getItem("user"));
	
	
	
	$.ajax({
		url: 'http://1-dot-projectbabywatch.appspot.com/GetAllThings?user3=' + user,
		type: 'GET',
		dataType: 'text',		
		
		success: function(data) {
			$('#resultScreen').empty();
			getAllThings(data)
			
		}});
}

*/

function onReg2(){
	
	user2 = localStorage.getItem("user");
	
	$('#userArea').append(user2);
	
	$.ajax({
		url: 'http://2-dot-projectbabywatch.appspot.com/GetAllThings?user3=' + user2,
		type: 'GET',
		dataType: 'text',		
		
		success: function(data) {
			$('#resultScreen').empty();
			getAllThings(data)
		}});
}


//function to build buttons per user
function getAllThings(data){
	var tr;	
	myData = $.parseJSON(data);
	
		
		for(var i = 0; i < myData.length; i++){
			tr = $('<tr/>');
			//tr.append('<input/>');
			
			if(myData[i].propertyMap.state=="Locked"){
			tr.append('<div id="togs' + i + '">' + '<label class="switch">' +
					  '<input type="checkbox" class="' + myData[i].propertyMap.thing +'" checked>' +
					  '<div class="slider round"></div>'
					+'</label>' + '</div>');
					
		tr.append("<td>" + myData[i].propertyMap.thing + 
				 " " + "</td>");
			
		$('#resultScreen').append(tr);
		
		var up = '.' + myData[i].propertyMap.thing;
		var dr = myData[i].propertyMap.thing;
		
		var st = "Unlocked";
		var sl = myData[i].propertyMap.serial;
		var ty = myData[i].propertyMap.type;
		var zo = myData[i].propertyMap.zone;
		var ro = myData[i].propertyMap.room;
		
		clickAllThings(up, dr, st, sl, ty, zo, ro);
			
		
		} else if (myData[i].propertyMap.state=="Unlocked"){
			tr.append('<label class="switch">' +
					  '<input type="checkbox" class="' + myData[i].propertyMap.thing +'" >' +
					  '<div class="slider round"></div>'
					+'</label>');
					
		tr.append("<td>" + myData[i].propertyMap.thing + 
				 " " + "</td>");
		

		$('#resultScreen').append(tr);
		
		var up = '.' + myData[i].propertyMap.thing;
		var dr = myData[i].propertyMap.thing;
		var st = "Locked";
		var sl = myData[i].propertyMap.serial;
		var ty = myData[i].propertyMap.type;
		var zo = myData[i].propertyMap.zone;
		var ro = myData[i].propertyMap.room;
		
		clickAllThings(up, dr, st, sl, ty, zo, ro);
		
		}
	}
}



//Function to update door state in the DB when toggle clicked

function clickAllThings(up, dr, st, sl, ty, zo, ro){
	
	$(up).unbind("click");
	
	$(up).on('click', function() { 
		
	
		sendnew(dr, st);
		
		
	//	user3 = localStorage.getItem("user");
		
		$.ajax({
			url: 'http://2-dot-projectbabywatch.appspot.com/UpdateThing?thing3=' + dr + "&state=" + st + "&user4=" + user + "&serial2=" + sl 
			+ "&type2=" + ty + "&zone2=" + zo + "&room2=" + ro,
			type: 'POST',
			dataType: 'text',
			success:function(data){
								
				$.ajax({
					url: 'http://2-dot-projectbabywatch.appspot.com/GetAllThings?user3=' + user2,
					type: 'GET',
					dataType: 'text',		
					
					success: function(theData) {
						$('#resultScreen').empty();
						getAllThings(theData);
					}});
			}	
		})
	});
}


function hide(){
	$('#logArea').hide();
}

function start(){
	init();
	onReg2();
	//connect();
	//fetch();
	
	
}

function getUser(){
	$('#userNa').append(localStorage.getItem("user"));
}

/*Function to add things */

function addit(){
	
	var doorName = $("#doorName").val();
	var state = $("#state").val();
	var serial = $("#serial").val();
	
	//var user = document.getElementById('userArea').textContent;
	
	
	//1-dot-projectbabywatch.appspot.com/InsertState?doorName=Back&state=Unlocked&user=CarloHome
	$.ajax({
		url: 'http://1-dot-projectbabywatch.appspot.com/InsertState?doorName=' + doorName + "&state=" + state + "&user=" +localStorage.getItem("user") + "&serial=" + serial,
		type: 'POST',
		dataType: 'text',
		error: function(data){
			$('#success').empty();
			$('#success').append("Added")
			$('#doorName').val('');
			$('#serial').val('');

		}
	})
	
};




