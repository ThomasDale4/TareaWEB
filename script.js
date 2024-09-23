const pokemonForm = document.getElementById('pokemonForm');
const pokemonInfo = document.getElementById('pokemonInfo');

pokemonForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            pokemonInfo.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p><strong>Número:</strong> ${data.id}</p>
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p><strong>Tipo:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            `;
        })
        .catch(error => {
            pokemonInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});