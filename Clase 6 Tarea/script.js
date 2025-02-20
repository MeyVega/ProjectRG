document.getElementById("searchButton").addEventListener("click", async function () {
    const movieName = document.getElementById("movieInput").value.trim();
    const apiKey = "d8e9505"; 
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
    const movieCard = document.getElementById("movieCard");

    if (!movieName) {
        alert("Por favor, ingrese el nombre de la película.");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Respuesta de la API:", data); // Depuración

        if (data.Response === "False") {
            alert("Película no encontrada.");
            movieCard.style.display = "none";
            return;
        }

        document.getElementById("movieTitle").textContent = data.Title;
        document.getElementById("moviePoster").src = data.Poster !== "N/A" ? data.Poster : "placeholder.jpg";
        document.getElementById("movieYear").textContent = data.Year;
        document.getElementById("movieGenre").textContent = data.Genre;
        document.getElementById("movieDirector").textContent = data.Director;
        document.getElementById("moviePlot").textContent = data.Plot;

        // Mostrar la card solo si hay datos
        movieCard.style.display = "block";
    } catch (error) {
        console.error("Error al obtener datos:", error);
        alert(`Error: ${error.message}`);
        movieCard.style.display = "none";
    }
});
