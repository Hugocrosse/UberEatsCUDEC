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
    let longitud = posicion.coords.longitude;
    fetch(`http://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, {
        headers: { 
            'User-Agent': 'UberEatsCudecHugoSP (salazarperezh21@gmail.com)'
        }    
    })

    .then(respuesta => respuesta.json())
    .then(data => {
        let ciudad = data.address.city;
        let pais = data.address.country;
        document.getElementById("ubicacion").value = `${ciudad}, ${pais}`;
        var map = L.map('mapa').setView([latitud, longitud], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([51.5, -0.09]).addTo(map);
      })
}
function error() {
    alert("No se pude obtener la ubicacion exacta");
}
   

    document.addEventListener('DOMContentLoaded', function () {

      // Inicializar Materialize
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);

      // Controles
      const nombre = document.getElementById("nombre");
      const direccion = document.getElementById("direccion");
      const platillo = document.getElementById("Platillo");
      const guardar = document.getElementById("btnGuardar");
      const cancelar = document.getElementById("btnCancelar");

      // Guardar en Firestore
      guardar.addEventListener("click", function () {

        if (nombre.value.trim() == "") {
          M.toast({html: "Ingrese el nombre"});
          return;
        }

        if (direccion.value.trim() == "") {
          M.toast({html: "Ingrese la dirección"});
          return;
        }

        if (platillo.value == "") {
          M.toast({html: "Seleccione un platillo"});
          return;
        }

        db.collection("Pedidos").add({
          nombre: nombre.value.trim(),
          direccion: direccion.value.trim(),
          platillo: platillo.value,
          fecha: new Date()
        })
        .then(function () {

          M.toast({html: "Pedido guardado correctamente"});

          // Limpiar campos
          nombre.value = "";
          direccion.value = "";
          platillo.selectedIndex = 0;

          M.updateTextFields();
          M.FormSelect.init(document.querySelectorAll('select'));

        })
        .catch(function (error) {

          console.log(error);
          M.toast({html: "Error al guardar"});

        });

      });

      // Cancelar
      cancelar.addEventListener("click", function () {

        nombre.value = "";
        direccion.value = "";
        platillo.selectedIndex = 0;

        M.updateTextFields();
        M.FormSelect.init(document.querySelectorAll('select'));

        M.toast({html: "Operación cancelada"});

      });

    });
  