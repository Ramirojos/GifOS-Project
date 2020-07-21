'use strict';
document.addEventListener('DOMContentLoaded', addSuggestedGifs);
//get de random gifs

let gifTitulo;

async function randomGifs(){
	for (let index = 0; index < 4; index++) {
		await fetch('http://api.giphy.com/v1/gifs/random?&api_key='+apiKey)
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
            arrGifsRand[index] = data
            
		}
	)}
}
    
async function addSuggestedGifs() {
    await randomGifs()
    .then((data)=>{
    
	arrGifsRand.forEach((gif,index) => randGifsSection.innerHTML+=
    `<div class="suggested_gif_wrapper">
    <div class="suggested_header">
        <span>#${gif.data.title.substring(0, 20)}</span>
        <img class="x_img" src="./assets/close.svg" alt="">
    </div>
        <div class="gif_container">
            <img id="gif" class="gif" src="${gif.data.images && gif.data.images.downsized.url}">
            <button id="showmore_Btn${index+1}"class="showmore_btn" onclick="searchFunc${index+1}()">Ver más…</button>
        </div>
    </div>`)
})

}

//ver si podes hacer que sea buttn id showmore_btn${index+1}, y myfunction${index+1}
//asi podemos hacer 4 funciones y a a la mierda.

//D:\Usuario\Web Development Ram\MarugoRamiro-ProyectoGifOS.zip\Proyecto_Gifos\scripts\suggestions_functionality.js



//pone los gifs buscados por pantalla 

function searchFunc1(){
    
    gifTitulo= arrGifsRand[0].data.title;
    console.log(gifTitulo);
    
    if ( gifTitulo===""){
        addBAckupGifs();
        gifSearchWrapper.style.display='flex';
        relatedTags.style.display='flex';
    }else{
        insertGifs(gifTitulo);
        getSuggestions(gifTitulo);
        gifSearchWrapper.style.display='flex';
    relatedTags.style.display='flex';
    }
    
    
}
function searchFunc2(){
    
    gifTitulo= arrGifsRand[1].data.title;
    if ( gifTitulo===""){
        addBackupTags();
        addBAckupGifs();
        gifSearchWrapper.style.display='flex';
        relatedTags.style.display='flex';
    }else{
        insertGifs(gifTitulo);
        getSuggestions(gifTitulo);
        gifSearchWrapper.style.display='flex';
        relatedTags.style.display='flex';
    }
}
function searchFunc3(){

    gifTitulo= arrGifsRand[2].data.title;
    if ( gifTitulo===""){
        addBAckupGifs();
        gifSearchWrapper.style.display='flex';
    relatedTags.style.display='flex';
    }else{
        insertGifs(gifTitulo);
        getSuggestions(gifTitulo);
        gifSearchWrapper.style.display='flex';
        relatedTags.style.display='flex';
    }
}
function searchFunc4(){
    gifTitulo= arrGifsRand[3].data.title;
    if ( gifTitulo===""){
        addBAckupGifs();
        gifSearchWrapper.style.display='flex';
    relatedTags.style.display='flex';
    }else{
        insertGifs(gifTitulo);
        getSuggestions(gifTitulo);
        gifSearchWrapper.style.display='flex';
    relatedTags.style.display='flex';
    }
}

let arrGifsBackup=[];

async function getBackupGifs(){
	for (let index = 0; index < 20; index++) {
		await fetch('http://api.giphy.com/v1/gifs/random?&api_key='+apiKey)
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
            arrGifsBackup[index] = data
            
		}
	)}
}

async function addBAckupGifs() {
    searchContainer.innerHTML="";
    await getBackupGifs()
    .then((data)=>{
        arrGifsBackup.forEach((gif)=>{
        searchContainer.innerHTML+=
    `<div class="gif_wrapper">
            <img class="gif" src="${gif.data.images.downsized.url}" alt="${gif.data.title}">
        </div>`
    })
    searchTextBar.textContent=`Resultados de la busqueda de "${arrGifsBackup[0].data.title}"`;
    relatedTags.innerHTML+=
    `<button id="related_btn" class="related_btn"><span id="tag_value">deadpool</span></button>
    <button id="related_btn" class="related_btn"><span id="tag_value">minions</span></button>
    <button id="related_btn" class="related_btn"><span id="tag_value">taco</span></button>
    <button id="related_btn" class="related_btn"><span id="tag_value">sunshine</span></button>
    <button id="related_btn" class="related_btn"><span id="tag_value">rupaul</span></button>
    `
})

}

async function getGifs(title) {
    title = gifTitulo;   
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${title.trim()}`)
      .then(response => response.json())
      .then(content =>content.data)
      .catch(err => {
        console.error(err);
      });
    return response
}

async function insertGifs(title) {
    searchContainer.innerHTML="";
    const gifs = await getGifs();
    gifs.forEach( gif => {
        searchContainer.innerHTML+=
        `<div class="gif_wrapper">
            <img class="gif" src="${gif.images.downsized.url}" alt="${gif.title}">
        </div>`
        //<figcaption>${gif.title}</figcaption>
   })
    searchTextBar.textContent=`Resultados de la busqueda de "${title}"`;
    
    
}


async function getSuggestions(title) {   
    title=gifTitulo 
    const response = await fetch(`https://api.giphy.com/v1/tags/related/{${title.trim()}}?api_key=${apiKey}`)
      .then(response => response.json())
      .then((content) =>{
          let results = content.data;
          relatedTags.innerHTML="";
          results.forEach( tag => {
            relatedTags.innerHTML+=
            `<button id="related_btn" class="related_btn"><span id="tag_value">${tag.name}</span></button>`
          })
        })
      .catch(err => {
        console.error(err);
      });
    return response
}



    
