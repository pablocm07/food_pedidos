(function() {

    function obtenerDatosPedidos() {
        let url = './Modelos/m_model_platillo.php';
        $.post(url, { funcion: 'get_datos_pedido' }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                return data.pedidos;
            }
        });
    }

    setTimeout(() => {
        $('#boton-agregar-platillo').click(function(e) {
            // Obtener el total de checkbox que estan seleccionados
            console.log($('ul li > a > label > input:checkbox:checked').length);
            // console.log('Ok');
        });
    }, 350);

    function agregarPedidoBarra(lista_mis_pedidos) {
        $('#contenedor-mis-pedidos').append(lista_mis_pedidos);
        $('#contenedor-ningun-pedido').hide();
        $('#contenedor-mis-pedidos').show();
        $('#boton-hacer-pedido').hide();
        $('#boton-cancelar-pedido').show();
        $('#boton-pagar-pedido').show();
    }

    function agregarDetalleBarra(lista_detalle_pedido) {
        $('#contenedor-detalle-pedido').append(lista_detalle_pedido);
        $('#lista-detalle-pedido').show();
        $('#sidebar').toggleClass('active');
        $('#ordenar_comida').modal('hide');
    }

    function crearComponentePedido(nombre_local, min, id_estado) {
        let lista_mis_pedidos = $("<li>");
        if (id_estado == 5) {
            bg_badge_estado = 'badge-danger';
        } else if (id_estado == 6) {
            bg_badge_estado = 'bg-food-orange';
        } else if (id_estado == 7) {
            bg_badge_estado = 'badge-success';
        }
        lista_mis_pedidos.addClass('item_pedido text-white list-group-item d-flex justify-content-between align-items-center');
        lista_mis_pedidos.html(nombre_local +
            '<span title="Tiempo estimado" class="ml-auto badge badge-primary badge-pill">' +
            '<i class="fas fa-clock"></i> ' + min + ' min.' +
            '</span>' +
            '<span title="Estado del pedido" class="ml-2 badge ' + bg_badge_estado + ' badge-pill">' +
            '<i class="fas fa-concierge-bell"></i>' +
            '</span>' +
            '<span title="Eliminar pedido" class="ml-2 badge badge-danger badge-pill">' +
            '<i class="fas fa-backspace"></i>' +
            '</span>'
        );
        return lista_mis_pedidos;
    }

    function crearComponenteDetalle() {
        let lista_detalle_pedido = $('<div>');
        lista_detalle_pedido.addClass('item-detalle-pedido');
        lista_detalle_pedido.html('<div class="p-2 img-detalle-pedido">' +
            '<img width="70px" height="70px" src="./Assets/img/comida_5.jpg" alt="">' +
            '</div>' +
            '<p class="producto-detalle-pedido m-0 p-2 text-center">' +
            '<span>Guajolote</span>' +
            '<br> c/n' +
            '<span>' +
            '</span>' +
            '</p>' +
            '<span class="font-weight-bold precio-detalle-pedido p-2 text-center">' +
            '$ 45.00' +
            '</span>');
    }


    $("#boton-add-platillo").click(function() {
        // let ids_locales = obtenerDatosPedidos();
        let id_local = $('#id-local').val();
        let nombre_local = $('#nombre-local').text();
        console.log(nombre_local);
        agregarPedidoBarra(crearComponentePedido('Cafeteria UTEC', 8, 7));
        agregarDetalleBarra(crearComponenteDetalle());

    });

    $('#select-multiple-ingredientes').multiselect();

}());