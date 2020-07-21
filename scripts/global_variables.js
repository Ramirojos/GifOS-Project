//  DE ESTILOS

const counterBar = document.getElementById('counter_bar');
const mainWrapper = document.getElementById('main_wrapper');
const arrowImage = document.getElementById('dowarrow_img');
const gifLogo = document.getElementById('logo');
const lightTheme = document.getElementById('sailor_day');
const darkTheme = document.getElementById('sailor_night');
const createGifs = document.getElementById('create_gifo');
const dropdown = document.getElementById('themes_dropdown');
const themeSwitch = document.getElementById('themes_wrapper');
const themeBtn = document.getElementById('theme_btn');
const arrowBtn = document.getElementById('downarrow_btn');
const toCreateGifs = document.getElementById('create_gifo_Mygif');
const homeArrow = document.getElementById('home_arrow');

//related_btn_wrapper
//BUSQUEDA

const suggestedWrapper=document.getElementById('suggested_gif_wrapper');
const searchBtn = document.getElementById('search_btn');
const sugContainer = document.getElementById('result_container');
const apiKey = 'FdVIK4hQcdNu3PP6JivWkSLE7Zm7PNkw';
const searchContainer = document.getElementById('gif_seach_results');
const gifSearchWrapper =document.getElementById('gif_search_wrapper');
const relatedTags = document.querySelector('#related_btn_wrapper')
let searchTextBar = document.getElementById('search_text_bar'); 


//DE SUGGESTIONS

let arrGifsRand =[];
const randGifsSection=document.getElementById('random_gif_section');


//DE TRENDING

const trendingdisplay=document.getElementById('trending_section');

//DE GIF CAPTURE

const toCapture = document.getElementById('continue');
const myGifs =document.getElementById('my_gifs_wrapper');
const captureWindow = document.getElementById('capture_window');
const createGifWindow = document.getElementById('crear_gifos_window');
const startCaptureBtn = document.getElementById('pre_capture');
const stopCaptureBtn = document.getElementById('in_capture');
const headerText = document.getElementById('window_header_text');
const timer=document.getElementById('timer_wrapper');
const endCaptureBtn =document.getElementById('in_preview');
const redo = document.getElementById('redo_btn');
const upload = document.getElementById('upload_btn');
const cancelSpace = document.getElementById('in_upload');
const uploadingScreen = document.getElementById('uploading_screen');
const videoContainer = document.getElementById('video_container');
const cancelBtn = document.getElementById('cancel_btn');
const videoWindow = document.getElementById('video_window_wrapper');
const previewGif = document.getElementById('preview_gif');
const uploadUrl = 'https://upload.giphy.com/v1/gifs?'
const postUploadWindow = document.getElementById('success_window');
const download = document.getElementById('download');
const copyLink = document.getElementById('copy');
const uploadedGif = document.getElementById('uploadedGif');
var video = document.getElementById('video_container');
const ready =document.getElementById('end_btn');
const key="gifs guardados"