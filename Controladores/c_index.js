(function() {

    let contenedor = $('#container');
    let barras_navegacion = $('#barras-navegacion');
    let estado_sesion = $('#estado-sesion').val();
    let modal = $('#modal-registro');
    
    if (estado_sesion == 1) { // Si es 1?, existe una sesion abierta
        contenedor.load('./Vistas/fondo.html'); // Cargar contenido    
        setTimeout(() => {            
            barras_navegacion.load('./Vistas/barras_navegacion.html');
        }, 1500);
    } else {
        contenedor.load('./Vistas/v_login.html');
        modal.load('./Vistas/modal_registro.html');
    }

}());