'use strict';

/*CAMBIO ESTILOS*/
/*VARIABLES*/



//Event Listeners

themeSwitch.addEventListener('click',themeDropdown);
themeSwitch.addEventListener('mouseenter',borderOn);
themeSwitch.addEventListener('mouseleave',borderOff);
themeSwitch.addEventListener('mouseleave', closeDropdown);
darkTheme.addEventListener('click', changeThemeDark);
lightTheme.addEventListener('click', changeThemeLight);

if(typeof(createGifs) != 'undefined' && createGifs != null){  
createGifs.addEventListener('click',(e)=>{
    window.location.href='./HTML_files/guifos_captura.html';
    themeSwitch.removeEventListener('click', themeDropdown);
});}

if(typeof(toCreateGifs) != 'undefined' && toCreateGifs != null){  
    toCreateGifs.addEventListener('click',(e)=>{
        window.location.href='./guifos_captura.html';
        themeSwitch.removeEventListener('click', themeDropdown);
});}
//creategifs cambio fondo on hover
createGifs.addEventListener('mouseenter',hoverOn);
function hoverOn(){
    if(mainWrapper.className === 'lightmode'){
        createGifs.style.background = '#E6BBE2';
        createGifs.removeEventListener('click', hoverOn);
    }
    else{
        createGifs.style.background = '#CE36DB';
        createGifs.removeEventListener('click', hoverOn);
    }
    
}
createGifs.addEventListener('mouseleave',hoverOff)
function hoverOff(){
    if(mainWrapper.className === 'lightmode'){
        createGifs.style.background = '#F7C9F3';
        createGifs.removeEventListener('click', hoverOff);
    }
    else{
        createGifs.style.background = '#EE3EFE';
        createGifs.removeEventListener('click', hoverOff);
    }
}


// (themes wrapper) si mouseleave then background y borde segun estilo global 
function borderOn(){
    themeBtn.style.outline ='1px dotted #110038';
    themeBtn.style.outlineOffset='-4px';
    arrowBtn.style.outline ='1px dotted #110038';
    arrowBtn.style.outlineOffset='-4px';
    if(mainWrapper.className === 'lightmode'){
        themeBtn.style.background = '#E6BBE2';
        arrowBtn.style.background = '#E6BBE2';
    }
    if(mainWrapper.className === 'darkmode'){
        themeBtn.style.background = '#CE36DB';
        arrowBtn.style.background = '#CE36DB';
    }
}

// (themes wrapper) si mouseleave then background y borde segun estilo global
function borderOff(){
    themeBtn.style.outline ='0';
    themeBtn.style.outlineOffset='0';
    arrowBtn.style.outline ='0';
    arrowBtn.style.outlineOffset='0';
    if(mainWrapper.className === 'lightmode'){
        themeBtn.style.background = '#F7C9F3';
        arrowBtn.style.background = '#F7C9F3';
    }
    if(mainWrapper.className === 'darkmode'){
        themeBtn.style.background = '#EE3EFE';
        arrowBtn.style.background = '#EE3EFE';
    }
}

//tooglea entre displays del dropdown (themes).
function themeDropdown() {
    if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
    
}

// si click != dropdown, entonces display = none.
function closeDropdown(){
    dropdown.style.display='none';
}

//cambia a Sailor Night
function changeThemeDark() {

        var x = document.getElementsByTagName("HTML")[0];
        x.style.background='#110038';
        mainWrapper.setAttribute('class', 'darkmode');
        
        function counterBarChange(){
        counterBar.style.backgroundImage='linear-gradient(270deg, #EE3EFE 0%, #2E32FB 100%)';
        counterBar.style.boxShadow=' 0 1px 0 0 #110038';
        counterBar.style.color='#FFFFFF';
        }

        counterBarChange();

        createGifs.style.background='#EE3EFE'
        themeBtn.style.background='#EE3EFE'
        arrowBtn.style.background='#EE3EFE'

        function arrowChange(){
          arrowImage.setAttribute('src', './assets/forward.svg' )
          arrowImage.style.transform='rotate(90deg)';
          arrowImage.style.padding='0 3px 1px';  
        }
        arrowChange();

        function logoChange(){
            gifLogo.setAttribute('src', './assets/gifOF_logo_dark.png' )
        }
        logoChange();
        if(typeof(searchIcon) != 'undefined' && searchIcon != null){searchChange()}
            
           function searchChange(){
        searchIcon.setAttribute('src', './assets/Combined Shape.svg' )}     
        
        
}

//cambia a Sailor Day
function changeThemeLight() {
        
        var x = document.getElementsByTagName("HTML")[0];
        x.style.background='#FFF4FD';
        mainWrapper.setAttribute('class', 'lightmode');     
       
        function counterBarChange(){
            counterBar.style.backgroundImage='linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%)';
            counterBar.style.boxShadow=' 0 1px 0 0 #110038';
            counterBar.style.color='#FFFFFF';
            }
            counterBarChange();

            createGifs.style.background='#F7C9F3'
            themeBtn.style.background='#F7C9F3'
            arrowBtn.style.background='#F7C9F3'
        
        function arrowChange(){
            arrowImage.setAttribute('src', './assets/dropdown.svg' );
            arrowImage.style.transform='rotate(360deg)';
            arrowImage.style.padding='0';        
        }
        
        arrowChange();
        
        function logoChange(){
            gifLogo.setAttribute('src', './assets/gifOF_logo.png' )
        }
        logoChange();


        if(typeof(searchIcon) != 'undefined' && searchIcon != null){searchChange()}
        function searchChange(){
            searchIcon.setAttribute('src', './assets/lupa_inactive.svg' )
        }
       
}



