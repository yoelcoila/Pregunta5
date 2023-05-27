const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = 'imgs/lago.jpg';
image.onload = ImagenCargada;

function ImagenCargada() {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    crearFranjasInclinadas(canvas);
}

function crearFranjasInclinadas(canvas) {
    const franjas = 6;  // Número de franjas
    const angulo = 60;  // Ángulo de inclinación de las franjas en grados
    const anchoEntreFranjas = 107   ;  // Ancho adicional entre cada franja en píxeles

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixeles = imgData.data;
    const numPixeles = pixeles.length;

    const anchoFranja = Math.floor((canvas.width + (franjas - 1) * anchoEntreFranjas) / franjas); // Ancho de cada franja, teniendo en cuenta el espacio adicional
    const inclinacionRadianes = angulo * (Math.PI / 180);

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const indicePixel = (y * canvas.width + x) * 4;

            const franja = Math.floor((x * Math.tan(inclinacionRadianes) + y) / (anchoFranja + anchoEntreFranjas)) % franjas;

            switch (franja) {
                case 0: // Resaltar color original
                    break;
                    case 1: // Resaltar color rojo
                    pixeles[indicePixel] = Math.floor(pixeles[indicePixel] * 1.5);  // Componente rojo
                    pixeles[indicePixel + 1] = Math.floor(pixeles[indicePixel + 1] * 0.3);  // Componente verde
                    pixeles[indicePixel + 2] = Math.floor(pixeles[indicePixel + 2] * 0.3);  // Componente azul
                    break;
                  case 2: // Resaltar color verde
                    pixeles[indicePixel] = Math.floor(pixeles[indicePixel] * 0.3);  // Componente rojo
                    pixeles[indicePixel + 1] = Math.floor(pixeles[indicePixel + 1] * 1.5);  // Componente verde
                    pixeles[indicePixel + 2] = Math.floor(pixeles[indicePixel + 2] * 0.3);  // Componente azul
                    break;
                  case 3: // Resaltar color azul
                    pixeles[indicePixel] = Math.floor(pixeles[indicePixel] * 0.3);  // Componente rojo
                    pixeles[indicePixel + 1] = Math.floor(pixeles[indicePixel + 1] * 0.3);  // Componente verde
                    pixeles[indicePixel + 2] = Math.floor(pixeles[indicePixel + 2] * 1.5);  // Componente azul
                    break;
                case 4: // Resaltar color gris
                    const promedio = (pixeles[indicePixel] + pixeles[indicePixel + 1] + pixeles[indicePixel + 2]) / 3;
                    pixeles[indicePixel] = promedio;
                    pixeles[indicePixel + 1] = promedio;
                    pixeles[indicePixel + 2] = promedio;
                    break;
                case 5: // Resaltar color blanco y negro
                    const promedioBN = (pixeles[indicePixel] + pixeles[indicePixel + 1] + pixeles[indicePixel + 2]) / 3;
                    const bn = promedioBN > 127 ? 255 : 0;
                    pixeles[indicePixel] = bn;
                    pixeles[indicePixel + 1] = bn;
                    pixeles[indicePixel + 2] = bn;
                    break;
            }
        }
    }

    ctx.putImageData(imgData, 0, 0);
}
