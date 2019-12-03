(function() {

    /**
     * Función para mostrar el loading. Incluido en el index
     */
    function ejecutarLoading() {        
        $(".loadingpage").fadeIn("fast");
    
        setTimeout(function() {        
            $(".loadingpage").fadeOut("slow");
        },2500);
    }

    function getDetallePedido() {
        let url = './Modelos/m_contenedor_detalles_pedido.php';
        $.post(url, { funcion: 'get_detalle_pedido' }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                if (data.detalle_pedido == 0) {
                    $('#contenedor-mis-pedidos').hide();

                    $('#contenedor-total-pedido').hide();
                    $('#lista-detalle-pedido').hide();
                    $('#boton-pagar-pedido').hide();
                    $('#boton-cancelar-pedido').hide();
                } else {
                    $('#contenedor-ningun-pedido').hide();
                    $('#boton-hacer-pedido').hide();
                }
            }
        });
    }

    $("#boton-hacer-pedido").click(function() {
        ejecutarLoading();
        $("#contenedor-todas-vistas").load('./Vistas/v_comidas.html');
        $('#sidebar').toggleClass('active');
    });

    getDetallePedido();

}());