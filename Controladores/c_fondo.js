(function() {

    let flag = 1;

    function mostrarInformacion(usuario) {
        if (usuario.tipo_usuario == 2) { // SI EL USUARIO ES DE TIPO LOCATARIO
            $('#contenedor-todas-vistas').load('./Vistas/v_pedidos.php');
            $('#contenido-barra-navegacion').load('./Vistas/v_funciones_vendedor.html');
        } else if (usuario.tipo_usuario == 3) { // SI EL USUARIO ES DE TIPO CONSUMIDPOR
            $('#contenedor-todas-vistas').load('./Vistas/v_comidas.html');
            $('#contenido-barra-navegacion').load('./Vistas/contenedor_detalles_pedido.html');
        }
        $('#footer').load('./Vistas/pie_pagina.html'); // Cargar el pie de pagina
    }

    function obtenerDatosSesion() {
        let url = './Modelos/m_login.php';
        $.post(url, {
            funcion: 'datos_sesion'
        }, function(data, status) {
            data = JSON.parse(data);
            mostrarInformacion(data.usuario);
        });
    }

    $('#boton-toggle-menu').click(function(e) {
        e.preventDefault();
        // $("#imagen-logo ").toggle('hide');
        $(".imagen-logo, #sidebarCollapse, .fondo-boton-menu, .fondo-logo").animate({
            height: 'toggle'
        });
        $("#contenedor-todas-vistas ").toggleClass('ancho-inicio-slide');

        // $("#sidebarCollapse").animate({
        //     height: 'toggle'
        // });

        $(".encabezado-parte-superior ").slideToggle();

        if (flag == 1) {
            $("#fa-arrow-up").addClass('d-none');
            $("#fa-arrow-down").removeClass('d-none');
            $("#boton-toggle-menu").attr('title', 'Mostrar el menú');
            flag = 0;
        } else {
            $("#fa-arrow-up").removeClass('d-none');
            $("#fa-arrow-down").addClass('d-none');
            $("#boton-toggle-menu").attr('title', 'Ocultar el menú');
            flag = 1;
        }
    });

    let ancho = $(window).width();
    let alto = $(window).height();

    let tamaño_pantalla_text = $('<p>').text('W: ' + ancho + ', H:' + alto);
    // $('.fondo-pantalla-completa').append(tamaño_pantalla_text);

    obtenerDatosSesion();

}());