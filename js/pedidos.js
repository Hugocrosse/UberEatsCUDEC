document.addEventListener('DOMContentLoaded', function () {

  const menus = document.querySelectorAll('.side-menu');

  if (menus.length > 0) {
      M.Sidenav.init(menus, {
          edge: 'right'
      });
  }
  const elems = document.querySelectorAll('select');

  if (elems.length > 0) {
      M.FormSelect.init(elems);
  }

  const nombre = document.getElementById("nombre");
  const direccion = document.getElementById("direccion");
  const platillo = document.getElementById("Platillo");
  const guardar = document.getElementById("btnGuardar");
  const cancelar = document.getElementById("btnCancelar");

  if (guardar) {

      guardar.addEventListener("click", function () {

          if (!nombre || !direccion || !platillo) {
              console.error("No se encontraron los elementos del formulario.");
              return;
          }

          if (nombre.value.trim() === "") {
              M.toast({
                  html: "Ingrese el nombre"
              });
              return;
          }

          if (direccion.value.trim() === "") {
              M.toast({
                  html: "Ingrese la dirección"
              });
              return;
          }

          if (platillo.value === "") {
              M.toast({
                  html: "Seleccione un platillo"
              });
              return;
          }

          db.collection("Pedidos").add({
              nombre: nombre.value.trim(),
              direccion: direccion.value.trim(),
              platillo: platillo.value,
              fecha: new Date()
          })
          .then(function () {

              M.toast({
                  html: "Pedido guardado correctamente"
              });

              
              nombre.value = "";
              direccion.value = "";
              platillo.selectedIndex = 0;

              M.updateTextFields();

              const selects = document.querySelectorAll('select');

              if (selects.length > 0) {
                  M.FormSelect.init(selects);
              }

          })
          .catch(function (error) {

              console.error("Error al guardar:", error);

              M.toast({
                  html: "Error al guardar el pedido"
              });

          });

      });

  }

  if (cancelar) {

      cancelar.addEventListener("click", function () {

          if (nombre) nombre.value = "";
          if (direccion) direccion.value = "";

          if (platillo) {
              platillo.selectedIndex = 0;
          }

          M.updateTextFields();

          const selects = document.querySelectorAll('select');

          if (selects.length > 0) {
              M.FormSelect.init(selects);
          }

          M.toast({
              html: "Operación cancelada"
          });

      });

  }

  const btnUbicacion = document.getElementById("btnUbicacion");

  if (btnUbicacion) {

      btnUbicacion.addEventListener("click", function () {

          if (navigator.geolocation) {

              navigator.geolocation.getCurrentPosition(
                  exito,
                  error
              );

          } else {

              alert("La geolocalización no está disponible.");

          }

      });

  }

});

let contenidoLista = '';

db.collection("platillos").onSnapshot((datos) => {

  const listaPlatillos = document.getElementById("listaPlatillos");

  if (!listaPlatillos) {
      console.error(
          'No existe un elemento con id="listaPlatillos" en el HTML.'
      );
      return;
  }

  contenidoLista = '';

  datos.forEach((registro) => {

      agregarALista(
          registro.data(),
          registro.id
      );

  });


  const elems = document.querySelectorAll('select');

  if (elems.length > 0) {
      M.FormSelect.init(elems);
  }

});


function agregarALista(platillo, id) {

  const listaPlatillos =
      document.getElementById("listaPlatillos");

  if (!listaPlatillos) {
      console.error(
          'ERROR: No se encontró #listaPlatillos'
      );
      return;
  }

  contenidoLista += `
      <option value="${id}">
          ${platillo.nombre}
      </option>
  `;

  listaPlatillos.innerHTML = contenidoLista;
}


M.AutoInit();

function exito(posicion) {

  let latitud = posicion.coords.latitude;
  let longitud = posicion.coords.longitude;

  fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`,
      {
          headers: {
              'User-Agent': 'UberEatsCudecHugoSP'
          }
      }
  )

  .then(respuesta => respuesta.json())

  .then(data => {

      let ciudad =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "";

      let pais =
          data.address.country || "";

      const ubicacion =
          document.getElementById("ubicacion");

      if (ubicacion) {

          ubicacion.value =
              `${ciudad}, ${pais}`;

      }

      const mapa = document.getElementById("mapa");

      if (mapa) {

          let map = L.map('mapa')
              .setView(
                  [latitud, longitud],
                  13
              );

          L.tileLayer(
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
              {
                  maxZoom: 19,
                  attribution:
                      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }
          ).addTo(map);

          L.marker([
              latitud,
              longitud
          ])
          .addTo(map);

      }

  })

  .catch(function (error) {

      console.error(
          "Error obteniendo ubicación:",
          error
      );

  });

}


function error() {

  alert(
      "No se pudo obtener la ubicación exacta"
  );

}