(function() {

    let contenedor = $('#container');
    let barras_navegacion = $('#barras-navegacion');
    let estado_sesion = $('#estado-sesion').val();
    let modal = $('#modal-registro');    
    let myVar;

    function interval(){
        myVar = setInterval(efectoImagen, 550);
    }

    function efectoImagen() {
        if ($('#img-chef-loading').hasClass('grow-img')){
            $('#img-chef-loading').removeClass('grow-img');            
        }else{
            $('#img-chef-loading').addClass('grow-img');            
        }
    }

    /**
     * Función para mostrar el loading. Incluido en el index
     */
    function ejecutarLoading() {        
        $(".loadingpage").fadeIn(1);
        interval();
        setTimeout(function() {        
            $(".loadingpage").fadeOut("slow");
        },2500);
    }  

    ejecutarLoading();
    
    if (estado_sesion == 1) { // Si es 1?, existe una sesion abierta
        contenedor.load('./Vistas/fondo.html'); // Cargar contenido    
        setTimeout(() => {            
            barras_navegacion.load('./Vistas/barras_navegacion.html');
        }, 500);
    } else {
        contenedor.load('./Vistas/v_login.html');
        modal.load('./Vistas/modal_registro.html');
    }     

}());