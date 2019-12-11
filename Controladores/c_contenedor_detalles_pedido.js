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

    $("#boton-cancelar-pedido").click(function() {
        let id_pedido = $('#id-pedido-pendiente').val();
        Swal.fire({
            title: 'Cancelar',
            text: "¿Quieres anular tu pedido?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let url = './Modelos/m_contenedor_detalles_pedido.php';
                datos = {
                    funcion: 'eliminar_pedido',
                    id_pedido: id_pedido
                };
                $.post(url, datos, function(data, status) {
                    data = JSON.parse(data);
                    
                    if (status){
                        console.log(data.respuesta);
                        if (data.respuesta == 1){
                            Swal.fire({
                                position: 'top-end',
                                type: 'success',
                                title: 'Pedido cancelado',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }else{
                            alert('Algo ha salido mal en la BD');
                        }
                    }
                });                
            }
        })        
        // $("#contenedor-todas-vistas").load('./Vistas/v_comidas.html');
        // $('#sidebar').toggleClass('active');
    });

    getDetallePedido();

}());