let contenidoLista = '';
function agregarALista(platillo,id){
    contenidoLista = `<option value='${platillo.id}'>
     ${platillo.nombre}
     </option>`;
     document.getElementById('listaPlatillos').innerHTML = 
     contenidoLista;
}