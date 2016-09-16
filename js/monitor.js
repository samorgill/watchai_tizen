/**
 * Starts the MQTT broker on load
 */

function startIt(){
	startMon();
	//listArray();
}

//Sends MQTT message to monitor light levels

type = "";
message = "";
msgOn = "On";
msgOff = "Off";

/**
 * Function to send MQTT message based on toggle switches state
 * @param type
 */

function onClick(type){
		var ty = type;
		console.log(ty);
		if(document.getElementById(ty).checked){
			sendMessage(ty, msgOn);
		}else{
			sendMessage(ty, msgOff);
		}
}

/**
 * Function to go back
 */

function back(){
	window.open('index.html');
	client.disconnect();
}



/*
*//**
 * Array of monitoring functions
 * To be used in future dynamic loading
 * 
 *//*

var arrayOfFunctions = [
        function(){
        	type = "Luminosity";
        	return type;
        },
        function(){
        	type = "Vibration";
        	return type;
        },
        function(){
        	type = "Temperature";
        	return type;
        }                        
    ]

*//**
 * A function to load in monitoring functions dynamically.
 * To be expanded in future work, at present the functions are fixed.
 *//*

function listArray(){
	
	if($('.switch').checked){
		
	for(var i = 0; i < arrayOfFunctions.length; i++){
	
	var list = $('<ul>');
	list.append('<label class="switch">' + '<input type="checkbox" class="' + arrayOfFunctions[i]() + 
			'" checked>' + '<div class="slider round"></div></label> ' + arrayOfFunctions[i]());
	//list.append('<td>' + arrayOfFunctions[i]() + '</td>');		
	$('#resultScreen').append(list);
	
	var cl = '.' + arrayOfFunctions[i]();
	var ty = arrayOfFunctions[i]();
	
	
	onClick(cl, ty, msgOff);
	
}
	} else{
		for(var i = 0; i < arrayOfFunctions.length; i++){
			
			var list = $('<ul>');
			list.append('<label class="switch">' + '<input type="checkbox" class="' + arrayOfFunctions[i]() + 
					'" >' + '<div class="slider round"></div></label> ' + arrayOfFunctions[i]());
			//list.append('<td>' + arrayOfFunctions[i]() + '</td>');		
			$('#resultScreen').append(list);
			
			var cl = '.' + arrayOfFunctions[i]();
			var ty = arrayOfFunctions[i]();
			
			
			onClick(cl, ty, msgOn);
			
		}
	}
}

function listArray(msg){
	
	if(msg == "On"){
		
	for(var i = 0; i < arrayOfFunctions.length; i++){
	
	var list = $('<ul>');
	list.append('<label class="switch">' + '<input type="checkbox" class="' + arrayOfFunctions[i]() + 
			'" checked>' + '<div class="slider round"></div></label> ' + arrayOfFunctions[i]());
	//list.append('<td>' + arrayOfFunctions[i]() + '</td>');		
	$('#resultScreen').append(list);
	
	var cl = '.' + arrayOfFunctions[i]();
	var ty = arrayOfFunctions[i]();
	
	
	onClick(cl, ty, msgOff);
	
}
	} else{
		for(var i = 0; i < arrayOfFunctions.length; i++){
			
			var list = $('<ul>');
			list.append('<label class="switch">' + '<input type="checkbox" class="' + arrayOfFunctions[i]() + 
					'" >' + '<div class="slider round"></div></label> ' + arrayOfFunctions[i]());
			//list.append('<td>' + arrayOfFunctions[i]() + '</td>');		
			$('#resultScreen').append(list);
			
			var cl = '.' + arrayOfFunctions[i]();
			var ty = arrayOfFunctions[i]();
			
			
			onClick(cl, ty, msgOn);
			
		}
	}
}

function onClick(cl, ty, msg){
	console.log(cl, ty, msg);
	
	var cl = cl;
	var ty = ty;
	
$(cl).unbind("click");
	
	$(cl).on('click', function() { 
		
			sendMessage(ty, msg);
		
		$('#resultScreen').empty();
		listArray(msg);
	});
	
}

//Test the output
function test(){
	console.log(arrayOfFunctions[1]());
	}




*/