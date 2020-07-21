
homeArrow.addEventListener('click',(e)=>{
    window.location.href="../index.html";});

const myGifsDisplay = document.getElementById('my_gifs_section');


document.addEventListener('DOMContentLoaded', insertMyGifs);


function insertMyGifs(){
    const data = JSON.parse(localStorage.getItem(key));
    console.log(data);
    console.log(typeof(data));
    data.forEach(gif => {
        console.log(gif);
        myGifsDisplay.innerHTML+=
    `<div class="gif_wrapper">
        <img id="my_gifs" class="gif" src="${gif.data.images.original.url}" alt="My gif">
    </div>`
    });
}

    