(function() {

    function getDetallePedido() {
        let url = './Modelos/m_contenedor_detalles_pedido.php';
        $.post(url, { funcion: 'get_detalle_pedido' }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                if (data.detalle_pedido == 1) {
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
        $("#contenedor-todas-vistas").load('./Vistas/v_comidas.html');
        $('#sidebar').toggleClass('active');
    });

    getDetallePedido();

}());