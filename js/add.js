

//Get user

user = localStorage.getItem("user");

/*Function to add things to the database*/

function addit(){
	
	var thing = $("#doorName").val();
	var state = $("#state").val();
	var serial = $("#serial").val();
	
	//var user = document.getElementById('userArea').textContent;
	
	
	//1-dot-projectbabywatch.appspot.com/InsertState?doorName=Back&state=Unlocked&user=CarloHome
	$.ajax({
		url: 'http://3-dot-projectbabywatch.appspot.com/AddThing?thing=' + thing + "&state=" + state + "&user=" +localStorage.getItem("user") + "&serial=" + serial,
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

function back(){
	window.open('things.html');
}


$('#userArea').append(localStorage.getItem("user"));
