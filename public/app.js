


//Save notes
$(document).on("click", "#saveNotes", function(){
	var articleID = $(this).attr("data-id");
	var noteTitle = $("#newTitleInput").val();
	var noteBody = $("#newBodyInput").val();

	$.ajax({
		method: "POST",
		url: "/articles/" + articleID,
		data: {
			title: noteTitle,
			body: noteBody
		}
	}).done(function(data){
		
	})
})
