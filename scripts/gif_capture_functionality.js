   



homeArrow.addEventListener('click',(e)=>{
    window.location.href="../index.html";});

//funcionalidad de boton cancelar

cancel.addEventListener('click',(e)=>{
    window.location.href="../index.html";
});

toCapture.addEventListener('click', (e)=>{
    createGifWindow.style.display="none";
    myGifs.style.display="none";
    captureWindow.style.display="flex";
});

// funcionaliad de botones en pantalla de preview de gif

//apretar imagen de "X" cierra captura y vuelve a mis gifs
document.getElementById('x_btn').addEventListener('click',(e)=>{
    window.location.href="./myGifs.html"
})

//boton de capturar o camara cambia texto de span, display de botones a none y muestra boton de cvaptura en proceso


startCaptureBtn.addEventListener('click', (e)=>{
    startCaptureBtn.style.display= 'none';
    stopCaptureBtn.style.display='flex';
    timer.style.display='inline';
    headerText.textContent='Capturando Tu Guifo';
});

//boton de frenar captura, cambia txt del span y display de botones.

stopCaptureBtn.addEventListener('click', (e) =>{
    stopCaptureBtn.style.display='none';
    endCaptureBtn.style.display='flex';
    headerText.textContent='Vista Previa';
});

// click btn "repetir captura" vuelve a inicio de captura
//click btn "subir guifo" continua a subir el gif.



redo.addEventListener('click', (e)=>{
    endCaptureBtn.style.display='none';
    headerText.textContent='Un Chequeo Antes de Empezar';
    startCaptureBtn.style.display= 'flex';
    timer.style.display='none';
    previewGif.style.display="none";
    videoContainer.style.display ='flex';

    getMedia();
});



upload.addEventListener('click',(e)=>{
    endCaptureBtn.style.display='none';
    cancelSpace.style.display= 'flex';
    timer.style.display='none';
    videoContainer.style.display ='none';
    uploadingScreen.style.display="flex";
})

// btn cancel vuelve a pagina principal;



cancelBtn.addEventListener('click',(e)=>{
    window.location.href="../index.html";

});


//  FUNCIONALIDAD DE CAPTURA/GRABADO.


let url;
var gifsSrc  = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []

localStorage.setItem(key, JSON.stringify(gifsSrc))
const data = JSON.parse(localStorage.getItem(key))

toCapture.addEventListener('click', getMedia);

 function getMedia(constraints) {
    var constraints = {audio: false, 
        video: { 
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
            console.log('started')
            },
        });
        
        startCaptureBtn.addEventListener('click', (e)=>{
            recorder.startRecording();
        }) ;

        stopCaptureBtn.addEventListener('click', (e)=>{
            recorder.stopRecording(function() {
            let blob = recorder.getBlob();
            url = URL.createObjectURL(blob);
            console.log(url);
            video.style.display='none';
            previewGif.style.display="inline";
            previewGif.src=url;
            uploadedGif.src=url;

            download.onclick=function(){
                invokeSaveAsDialog(blob);
            }
           return blob;
        });})
    
    upload.addEventListener('click', uploadGif)
        
    async function uploadGif(){
        previewGif.style.display="none";
        let form = new FormData();
        form.append('file',recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
        fetch('https://upload.giphy.com/v1/gifs?api_key=FdVIK4hQcdNu3PP6JivWkSLE7Zm7PNkw',{
            method: 'POST',
            headers:{
                'Access-Control-Allow-Origin':'*'
                    },
            body: form
                    })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                console.log(result.data.id);
                fetch(`https://api.giphy.com/v1/gifs/${result.data.id}?api_key=FdVIK4hQcdNu3PP6JivWkSLE7Zm7PNkw`)    
                    .then((response) => response.json())
                    .then((url)=>{
                        gifsSrc.push(url)
                        localStorage.setItem(key, JSON.stringify(gifsSrc))
                        captureWindow.style.display='none';
                        postUploadWindow.style.display='flex';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };})
    .catch(function(err) { 
        console.log(err);
        alert(err.name + ": " + err.message); }); 
}
    ready.addEventListener('click',(e)=>{
    window.location.href="./myGifs.html";
});

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



