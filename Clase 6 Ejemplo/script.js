 document.getElementById("searchButton").addEventListener("click", async function () {
    const pokemonName = document.getElementById("pokemonInput").value.trim().toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const pokemonCard = document.getElementById("pokemonCard");

    if (!pokemonName) {
      alert("Please enter a Pokémon name.");
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      document.getElementById("pokemonName").textContent = data.name.toUpperCase();
      document.getElementById("pokemonImage").src = data.sprites.front_default;
      document.getElementById("pokemonType").textContent = data.types.map(t => t.type.name).join(", ");

      // Mostrar la card solo si hay datos
      pokemonCard.style.display = "block";
    } catch (error) {
      alert(`Error: ${error.message}`);
      // Ocultar la card si hay un error
      pokemonCard.style.display = "none";
    }
  });
