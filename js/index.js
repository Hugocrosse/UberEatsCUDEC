let contenido ='';                   
document.addEventListener('DOMContentLoaded', function() {

  const menus = document.querySelectorAll ('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  const forms = document.querySelectorAll ('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
});


function mostrarPlatillo(platillo, id) {
  contenido += `
  <div class="card-panel recipe white row"
  id="${id}">
    <div class="recipe-details">
      <div class="recipe-title">
          ${platillo.nombre}
      </div>
      <div class="recipe-ingredients">
          ${platillo.ingredientes}
      </div>
      <div class="recipe-price">
        Precio: $${platillo.Precio}
      </div>
    </div>
    <div class="recipe-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
  </div>`;
  document.querySelector('.recipes').innerHTML = contenido
 
}

function actualizarPlatillo(platillo, id) {
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
  tarjeta.querySelector(".recipe-price").innerHTML = `Precio: $${platillo.Precio}`;
};

let streaming = false;
const width = 320;
let height = 0;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const foto = document.getElementById('foto');
const btnFoto = document.getElementById('btnFoto');
const btnTomarFoto = document.getElementById('tomarFoto');

btnFoto.addEventListener("click", function() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment"
        }
      },
      audio: false
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log(error);
    });
})

video.addEventListener("canplay", () => {
  if(!streaming) {
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    streaming = true;
  }
})

btnTomarFoto.addEventListener("click", tomarFoto);

function tomarFoto () {
  const contexto = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height= height;
    contexto.drawImage(video, 0, 0, width, height);
    const fotoFinal = canvas.toDataURL("image/png");
    foto.setAttribute("src", fotoFinal);
    document.getElementById("foto").value = fotoFinal;
  }
  else {
    limpiarFoto();
  }
}

function limpiarFoto() {
  foto.src = "";
}