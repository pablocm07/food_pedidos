(function() {

    let contenedor = $('#container');
    let barras_navegacion = $('#barras-navegacion');
    let estado_sesion = $('#estado-sesion').val();
    let modal = $('#modal-registro');

    if (estado_sesion == 1) { // Existe una sesion abierta

        barras_navegacion.load('./Vistas/barras_navegacion.html');
        contenedor.load('./Vistas/fondo.html'); // Cargar contenido    
        // modal.load('./Vistas/vi_modal.html');                
    } else {
        contenedor.load('./Vistas/v_login.html');
        modal.load('./Vistas/modal_registro.html');
    }

}());