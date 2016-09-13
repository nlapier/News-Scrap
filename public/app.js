
function addArticle(insertDiv, article){
	var articleDiv = $(insertDiv);
	var articleBox = $("<div>").attr({
		"data-id": article._id
	})
	var title = $("<h5>").text(article.title);
	var link = $("<p>").text(articld.link);

	articleBox.append(title);
	articleBox.append(link);

	insertDiv.prepend(articleBox);
}


$.getJSON('/articles', function(data) {
	data.forEach(function(currentArticle){
		addArticle("#articleDiv", currentArticle);
	});
});




//Save notes
$(document).on("click", "#noteButton", function(){
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
		console.log(data);
		$("#noteDiv").empty();
	});
	$("#newTitleInput").val("");
	$("#newBodyInput").val("");
});
