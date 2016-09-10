/**
 * 
 */

// details of registered things from phone

function things(){
	window.open("things.html");
		}



function onLoad(){
	$.ajax({
		url: 'http://1-dot-projectbabywatch.appspot.com/GetAllDoors',
		type: 'GET',
		dataType: 'text',		
		
		success: function(data) {
			$('#resultScreen').empty();
			getAllDyn(data)
		}});
}

//function to build buttons
function getAllDyn(data){
	var tr;	
	myData = $.parseJSON(data);
	
		
		for(var i = 0; i < myData.length; i++){
			tr = $('<tr/>');
			
			if(myData[i].propertyMap.state=="Locked"){
			tr.append('<div id="togs' + i + '">' + '<label class="switch">' +
					  '<input type="checkbox" class="' + myData[i].propertyMap.doorName +'" checked>' +
					  '<div class="slider round"></div>'
					+'</label>' + '</div>');
					
		tr.append("<td>" + myData[i].propertyMap.doorName + 
				 " " + "</td>");
			
		$('#resultScreen').append(tr);
		
		var up = '.' + myData[i].propertyMap.doorName;
		var dr = myData[i].propertyMap.doorName;
		
		var st = "Unlocked";
		
			upTog(up, dr, st);
			
		
		} else if (myData[i].propertyMap.state=="Unlocked"){
			tr.append('<label class="switch">' +
					  '<input type="checkbox" class="' + myData[i].propertyMap.doorName +'" >' +
					  '<div class="slider round"></div>'
					+'</label>');
					
		tr.append("<td>" + myData[i].propertyMap.doorName + 
				 " " + "</td>");
		

		$('#resultScreen').append(tr);
		
		var up = '.' + myData[i].propertyMap.doorName;
		var dr = myData[i].propertyMap.doorName;
		var st = "Locked";
		
		upTog(up, dr, st);
		
		}
	}
}

// Function to update door state in the DB when toggle clicked

function upTog(up, dr, st){
	
	$(up).unbind("click");
	
	$(up).on('click', function() { 
		
		$.ajax({
			url: 'http://1-dot-projectbabywatch.appspot.com/UpdateDoor?doorName3=' + dr + "&state=" + st,
			type: 'POST',
			dataType: 'text',
			success:function(data){
								
				$.ajax({
					url: 'http://1-dot-projectbabywatch.appspot.com/GetAllDoors',
					type: 'GET',
					dataType: 'text',		
					
					success: function(theData) {
						$('#resultScreen').empty();
						getAllDyn(theData);
					}});
			}	
		})
	});
}

function showThings(){
	onLoad();
}

