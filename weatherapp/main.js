const apiKey = '50c1c7c78df01f55bc9e75b25eb6b148';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&q=';

const button = document.getElementById('search');
const input = document.getElementById('city');

button.addEventListener('click', () => {
  getData();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    getData();
  }
});

async function getData() {
  const city = input.value.trim();
  if (city === '') {
    alert('Por favor, ingresa una ciudad');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod !== 200) {
      alert('Ciudad no encontrada');
      return;
    }

    document.getElementById(
      'location',
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById(
      'temperature',
    ).textContent = `🌡️ ${data.main.temp}°C`;
    document.getElementById(
      'condition',
    ).textContent = `🌤️ ${data.weather[0].description}`;
    document.getElementById(
      'weather-icon',
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-info').classList.remove('hidden');
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    alert('Hubo un problema al obtener el clima');
  }
}
