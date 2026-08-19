const roastButton = document.getElementById("roastButton");
roastButton.addEventListener("click", function() {
    fetch("https://v2.jokeapi.dev/joke/Any?safe-mode&type=single")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.getElementById("roastBox").textContent = data.joke;
        })
        .catch(function(error) {
            console.log("Something went wrong!", error);
        });
});
