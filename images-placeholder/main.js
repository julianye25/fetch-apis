document.addEventListener('DOMContentLoaded', () => {
  getImages();
});

async function getImages() {
  try {
    const div = document.querySelector('.container');
    if (!div) {
      console.error("No se encontró el contenedor '.container'");
      return;
    }

    const url = 'https://picsum.photos/v2/list';
    const response = await fetch(url);
    const info = await response.json();

    console.log(info);

    let htmlContent = '';

    info.slice(0, 20).forEach((element) => {
      console.log(element);

      htmlContent += `
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="${element.download_url}" alt="${element.title}" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">${element.author}</div>
            </div>
          </div>
        `;
    });

    div.innerHTML = htmlContent;
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
  }
}
