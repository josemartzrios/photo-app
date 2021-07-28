'use strict'


// 255 es el color máximo en un pixel

const canvas = document.getElementById('canvas');
// getContext es un metodo que retorna un contexto de dibujo
const ctx = canvas.getContext("2d");

// Agrego la imagen a editar
const img = new Image();




// ENTRAR A LOS ARCHIVOS DEL USUARIO PARA SACAR LA IMG (File Reader)
const reader = new FileReader()

function uploadImage (e){
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () =>{
        // SRC de la img
        img.src = reader.result;

        // Cargar la imagen
        img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        
        
        
        }

    }
}

// FUNCIÓN PARA EL COLOR GRIS
function greyscale(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){

        // MULTIPLICO PARA QUE LOS COLORES ME DEN UN GRIS EN LA IMG
        const grey = data[i] *0.21 + data[i+1] *0.71 + data[i + 2] *0.07;

        // PIXELES DE MI IMAGEN [i]
        data[i] = grey;  // red //
        data[i + 1] = grey;  // green //
        data[i + 2] = grey // blue //
    }

    ctx.putImageData(imageData, 0, 0);
}


// FUNCIÓN PARA EL SEPIA EFECTO
function sepia(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){

        // MULTIPLICO PARA QUE LOS COLORES ME DEN UN GRIS EN LA IMG
        const grey = data[i] *0.21 + data[i+1] *0.71 + data[i + 2] *0.07;

        // SOLAMENTE LE SUMO COLOR A MI CONSTANTE GREY
        data[i] = grey + 95; // red //
        data[i + 1] = grey + 58; // green //
        data[i + 2] = grey // blue //
    }

    ctx.putImageData(imageData, 0, 0);
}


function invert(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){

        // ELIMINO LA LINEA DE GRIS PORQUE NO SE NECESITA PARA LA FUNCTION INVERT
    

        data[i] = 255 - data[i]; // red //
        data[i + 1] = 255 - data[i + 1]; // green //
        data[i + 2] = 255 - data[i + 2]; // blue //
    }

    ctx.putImageData(imageData, 0, 0);
}

function rbg(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){


        const green = data[i + 1];

        data[i] = data[i];  // red //
        data[i + 1] = data[i + 2]; // blue //
        data[i + 2] = green; // green //
    }

    ctx.putImageData(imageData, 0, 0);
}


function bgr(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){


        const red = data[i];

        data[i] = data[i + 2];  // blue //
        data[i + 1] = data[i + 1];  // green //
        data[i + 2] = red; // red //
    }

    ctx.putImageData(imageData, 0, 0);
}



function gbr(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){


        const red = data[i];

        data[i] = data[i + 1];  // green //
        data[i + 1] = data[i + 2]; // blue //
        data[i + 2] = red;
    }

    ctx.putImageData(imageData, 0, 0);
}

function grb(){

    // INFO DE PIXELES
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    // QUE INCREMENTE EN CUATRO EL VALOR DEL PIXEL PARA CAMBIARLE EL COLOR
    for(let i = 0; i < data.length; i += 4){


        const red = data[i];

        data[i] = data[i + 1];  // green //
        data[i + 1] = red; // red //
        data[i + 2] = data[i + 2];   // blue //
    }

    ctx.putImageData(imageData, 0, 0);
}


// LIMPIAR IMG
function clearChanges(){
    img.src = reader.result;
}

// DESCARGAR IMAGEN
function download(){
    const image = canvas.toDataURL('')
    const link = document.createElement('a')
    link.href = image
    link.download = "image.png"
    link.click();
}


// EVENTOS EN CADA BOTÓN PARA SELECCIONAR EL EFECTO, LLAMANDO A SU FUNCIÓN
document.querySelectorAll('button')[0].addEventListener('click', greyscale);
document.querySelectorAll('button')[1].addEventListener('click', sepia);
document.querySelectorAll('button')[2].addEventListener('click', invert);
document.querySelectorAll('button')[3].addEventListener('click', rbg);
document.querySelectorAll('button')[4].addEventListener('click', bgr);
document.querySelectorAll('button')[5].addEventListener('click', gbr);
document.querySelectorAll('button')[6].addEventListener('click', grb);
document.querySelectorAll('button')[7].addEventListener('click', clearChanges);
document.querySelectorAll('button')[8].addEventListener('click', download);








// EVENTO PARA CARGAR LA IMAG DE LOS ARCHIVOS DEL USUARIO
const imageLouder = document.getElementById('uploader')
imageLouder.addEventListener('change', uploadImage);