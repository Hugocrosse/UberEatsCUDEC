btnAgregarPlatillo = document.getElementById('btnAgregarPlatillo')

document.addEventListener('DOMContentLoaded', FUCTION() {

  const menus = document.querySelectorAll ('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  const forms = document.querySelectorAll ('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
});

btnAgregarPlatillo.addEventListener('click', function() {
  alert('Platillo Agregado');
});
