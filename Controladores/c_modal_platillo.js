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


    $("#boton-add-platillo").click(function() {
        // let ids_locales = obtenerDatosPedidos();
        let id_local = $('#id-local').val();
        let nombre_local = $('#nombre-local').text();
        console.log(nombre_local);
        // if (!ids_locales.includes(id_local)) {
        //     // ids_locales.push(id_local); // Nuevo pedido - diferente local
        //     console.log('Ok');
        // } else { // else se vincula con el idque ya existe
        //     console.log('No');
        // }
        agregarPedidoBarra(crearComponentePedido('Cafeteria UTEC', 8, 7));

    });

    $('#select-multiple-ingredientes').multiselect();

}());