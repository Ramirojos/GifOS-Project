'use strict';

//Search Box Functionality


//VARIABLES



//EVENT LISTENERS SUELTOS.

searchBtn.addEventListener('click', insertTags);
searchBtn.addEventListener('click', insertGifs);

//FUNCIONES

//cambia estilo de boton de busqeuda cuando se hace focus/blur de input + dropdown off si se hacce blur


const searchIcon = document.getElementById('lupa_img');
const searchInput = document.getElementById('search_input');
searchInput.addEventListener('focus', () =>{
        const btnSpan = document.getElementById('btn_span');
        if(mainWrapper.className === 'lightmode'){
            searchBtn.style.background=' #F7C9F3';
            searchBtn.style.border='1px solid #110038';
            searchBtn.style.boxShadow='inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF';
            searchIcon.setAttribute('src', './assets/lupa.svg' );
            btnSpan.style.color='#110038';
        }
        if(mainWrapper.className === 'darkmode'){
            searchBtn.style.background=' #EE3EFE';
            searchBtn.style.border='1px solid #110038';
            searchBtn.style.boxShadow='inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF';
            searchIcon.setAttribute('src', './assets/lupa_light.svg' );
            btnSpan.style.color='#ffffff';
        }

    });

searchInput.addEventListener('blur', () =>{

        sugContainer.style.display='none';

        const btnSpan = document.getElementById('btn_span');
        if(mainWrapper.className === 'lightmode'){
            searchBtn.style.background='#E6E6E6';
            searchBtn.style.border='1px solid #808080';
            searchBtn.style.boxShadow='inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF';
            searchIcon.setAttribute('src', './assets/lupa_inactive.svg' );
            btnSpan.style.color='#B4B4B4';

        }
        if(mainWrapper.className === 'darkmode'){
            searchBtn.style.background=' #B4B4B4';
            searchBtn.style.border='1px solid #808080';
            searchBtn.style.boxShadow='inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF';
            searchIcon.setAttribute('src', './assets/Combined shape.svg' );
            btnSpan.style.color='#8F8F8F';
        }
    });

//cambia el display de las sugerencias cuando se aprieta una tecla.

let searchText = searchInput.addEventListener('input', e=>{
sugContainer.style.display = 'flex';});

//Event Listeners
searchBtn.addEventListener('click', (e) =>{
    gifSearchWrapper.style.display='flex';
});
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

searchBtn.addEventListener('click',(e)=>{
    sugContainer.style.display= 'none';
})



//Busqueda de gifs con un query especifico
async function getGifs(e) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput.value.trim()}`)
      .then(response => response.json())
      .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    console.log(response);
    return response
}

//pone los gifs buscados por pantalla 

async function insertGifs(e) {
    searchContainer.innerHTML="";
    const gifs = await getGifs();
    gifs.forEach( gif => {
        searchContainer.innerHTML+=
        `<div class="gif_wrapper">
            <img class="gif" src="${gif.images.downsized.url}" alt="${gif.title}">
        </div>`
        //<figcaption>${gif.title}</figcaption>
   })
    searchTextBar.textContent=`Resultados de la busqueda de "${searchInput.value}"`;
    searchInput.value="";
    
}

//busca terminos relacionados con la busqueda.
async function getSuggestions(e) {    
    const response = await fetch(`https://api.giphy.com/v1/tags/related/{${searchInput.value.trim()}}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    return response
}
//relatedTags
//agrega los tags como botones
async function insertTags(e) {
    relatedTags.innerHTML="";
    const tags = await getSuggestions();
    let index = 0
    tags.forEach( tag => {
        relatedTags.innerHTML+=
        `<button id="related_btn" data-id="btn_${index}" class="related_btn"><span id="tag_value">${tag.name}</span></button>`
        index++;
})
   
    let sugBtn = document.querySelector("#related_btn");
    sugBtn.addEventListener('click',printByTag);
    sugBtn.addEventListener('click',insertTagsByTag);
    
    relatedTags.addEventListener('click', function (event) {
        if(event.target.classList.contains('related_btn')) {
            console.log(event.target.getAttribute('data-id'));
        }
    });
}

//permite hacer una busqueda cuadno se aprieta un tag, con el contenido del span del botón.
async function getGifsByTag(e) {
    let searchTag = document.getElementById('tag_value');
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTag.textContent.trim()}`)
      .then(response => response.json())
      .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    return response
}

async function printByTag(e){
    searchContainer.innerHTML="";
    const gifs = await getGifsByTag();
    gifs.forEach( gif => {
        searchContainer.innerHTML+=
        `<div class="gif_wrapper">
            <img class="gif" src="${gif.images.downsized.url}" alt="${gif.title}">
            <figcaption>${gif.title}</figcaption>
        </div>`
   })
    searchInput.value="";
    relatedTags.innerHTML="";
}

async function insertTagsByTag(e) {
    relatedTags.innerHTML="";
    const tags = await getGifsByTag();
    tags.forEach( tag => {
        relatedTags.innerHTML+=
        `<button id="related_btn" class="related_btn"><span id="tag_value">${tag.name}</span></button>`
   })
   let sugBtn = document.getElementById('related_btn');
   sugBtn.addEventListener('click',printByTag);
}


// hace una autocomplete del imput que vamos poniendo
searchInput.addEventListener('keyup',printAutocomplete);

async function getAutocomplete(){
    const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${searchInput.value.trim()}`)
    .then(response=>response.json())
    .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    return response
}

//imprime los primeros 5 resultados del autocomplete en el dropdown
async function printAutocomplete(){
    sugContainer.innerHTML="";
    const autoComplete = await getAutocomplete();
    let arr = autoComplete.slice(0,5)
    arr.forEach(suggText=>{
        sugContainer.innerHTML+=
    `
    <div id="suggested_search" class="suggested_search"><span>${suggText.name}</span></div>
    `
    })
}


