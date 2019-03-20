
// Initial array of topics
var topics = ["beyonce", "happy", "tamar", "vacation", "california", "got", "Laughing", "villain", "Will Smith", "Friday", "Kevin Hart", "Mariah Carey", "diva", "black girl magic", "natural hair", "hoagie", "love"];

// Function for displaying GIF Topics data
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});
renderButtons();

// Adding click event listen listener to all buttons
$(document).on("click", '.topic', function () {
    // Grabbing and storing the data-topicBtn property value from the button
    $("#Gifs-Ratings-Here").empty();
    var topicBtn = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6VrTKicvhVk4stMkuXuKuZ8cs5N5K0kK&q=" + topicBtn + "&limit=10&offset=0&rating=G&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        var results = response.data;
        console.log(results);

        // Looping through each result/ i.e topic item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var topicBtnDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var topicBtnImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            topicBtnImage.attr("src", results[i].images.fixed_height.url);

////////////////// GIF Animate / Still --- Is Not Working, 
            var dataStill = results[i].images.fixed_height_still.url;
            var dataAnimate = results[i].images.fixed_height.url;

            console.log(dataAnimate);
            console.log(dataStill);
////////////////// GIF Animate / Still --- Is Not Working, 

            
            // Appending the paragraph and image tag to the topicBtnDiv
            topicBtnDiv.append(p);
            topicBtnDiv.append(topicBtnImage);
            // Prependng the topicBtnDiv to the HTML page in the "#Gifs-Ratings-Here" div
            $("#Gifs-Ratings-Here").prepend(topicBtnDiv);
        }
    });

    ////////////////// GIF Animate / Still --- Is Not Working, 
    $(document).on("click", function () {
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("dataAnimate"));
            $(this).attr("dataStill", "animate");
        } else {
            $(this).attr("src", $(this).attr("dataStill"));
            $(this).attr("dataStill", "still");
        }
    });
    ////////////////// GIF Animate / Still --- Is Not Working, 

});
