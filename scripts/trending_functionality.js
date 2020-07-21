'use strict';




async function getTrendingGifs(e) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit:24`)
      .then(response => response.json())
      .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    return response
}

//pone los gifs buscados por pantalla 


async function insertTrendingGifs(e) {
    const gifs = await getTrendingGifs();
    let index =0;
    gifs.forEach( gif => {
        trendingdisplay.innerHTML+=
        `<div class="gif_wrapper">
            <img id="trending_gifs" data-gif-number="${index}" class="trend_gif" src="${gif.images.downsized.url}" alt="${gif.title}">
            <figcaption id="trending_caption">#${gif.title.replace(" ", " #").substring(0, 30)}</figcaption>
        </div>`
    });
    index++;
}
document.addEventListener('DOMContentLoaded', insertTrendingGifs);
 

  
