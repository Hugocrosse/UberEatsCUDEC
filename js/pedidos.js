document.addEventListener('DOMContentLoaded', function() {

  const menus = document.querySelectorAll ('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

});

let contenidoLista = '';

db.collection("platillos").onSnapshot((datos) => {
    datos.docChanges().forEach((registro) => {
        if (registro.type === "added") {
            agregarALista(registro.doc.data(), registro.doc.id);
        }
    });
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

function agregarALista(platillo, id) {
    contenidoLista += `<option value='${id}'>
    ${platillo.nombre}
    </option>`;
    document.getElementById("listaPlatillos").innerHTML = contenidoLista;
}

M.AutoInit();

document.getElementById("btnUbicacion").addEventListener("click", function() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exito, error);
    }
});

function exito(posicion){
    let latitud = posicion.coords.latitude;
}

function error() {
    alert("No se pude obtener la ubicacion exacta");
}
   
