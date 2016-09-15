
function addArticle(insertDiv, article){
	console.log("addArticle()");
	// var articleDiv = $(insertDiv);
	var articleBox = $("<div>").attr({
		"data-id": article._id
	})
	var title = $("<h5>").text(article.title);
	var link = $("<p>").text(articld.link);

	articleBox.append(title);
	articleBox.append(link);

	$(insertDiv).prepend(articleBox);
}

$(document).ready(function(){

	//Scrape the targeted site into the DB
	$.get("/scrape", function(data){
		console.log("get /scrape data: ", data);
	})

	//Once that's done, load the scraped articles to the screen
	.done(function(){
		$.getJSON('/articles', function(data) {
			console.log(data);
			data.forEach(function(currentArticle){
				addArticle("#articlesDiv", currentArticle);
			});
		});
	})
})







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
