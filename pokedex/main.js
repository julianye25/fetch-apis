async function fetchPokemon() {
  const search = document.getElementById('search').value.toLowerCase();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

  if (!response.ok) {
    alert('Pokémon no encontrado');
    return;
  }

  const data = await response.json();
  document.getElementById('pokemonImage').src = data.sprites.front_default;
  document.getElementById('pokemonName').textContent = data.name.toUpperCase();
  document.getElementById('pokemonType').textContent =
    'Tipo: ' + data.types.map((t) => t.type.name).join(', ');
  document.getElementById('pokemonInfo').classList.remove('d-none');
}

async function fetchRandomPokemon() {
  const pokemonGrid = document.getElementById('pokemonGrid');
  pokemonGrid.innerHTML = '';

  let randomIds = Array.from(
    { length: 8 },
    () => Math.floor(Math.random() * 150) + 1,
  );

  for (let id of randomIds) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
                    <div class="card text-center p-2">
                        <img src="${
                          data.sprites.front_default
                        }" class="card-img-top mx-auto" style="width: 80px;">
                        <div class="card-body">
                            <h5 class="card-title">${data.name.toUpperCase()}</h5>
                        </div>
                    </div>
                `;
    pokemonGrid.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', fetchRandomPokemon);
