(function() {

    function agregarDetalleIngrediente(id_detalle_pedido, id_ingredientes) {
        let ids_ingredientes = id_ingredientes;
        let url = './Modelos/m_modal_platillo.php';
        for (let i = 0; i < ids_ingredientes.length; i++) {
            datos = {
                id_ingrediente: ids_ingredientes[i],
                id_detalle_pedido: id_detalle_pedido,
                funcion: 'agregar_detalle_ingrediente'
            }
            $.post(url, datos, function(data, status) {
                data = JSON.parse(data);

                if (status) {
                    if (data.respuesta == 0) {

                    } else {

                    }
                }
            });
        }
        Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Se ha agregado a tu pedido',
            showConfirmButton: false,
            timer: 1500
        });
    }

    function agregarDetallePedido(id_platillo, id_pedido, precio_platillo, comentario_platillo, id_ingredientes) {
        datos_platillo = {
            id_platillo: id_platillo,
            id_pedido: id_pedido,
            precio_platillo: precio_platillo,
            comentario_platillo: comentario_platillo,
            funcion: 'registrar_detalle_pedido'
        };
        // console.log(datos_platillo);
        let url = './Modelos/m_modal_platillo.php';
        $.post(url, datos_platillo, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                if (data.respuesta == 0) {

                } else {
                    let id_detalle_pedido = data.id_detalle_pedido;
                    agregarDetalleIngrediente(id_detalle_pedido, id_ingredientes);
                }
            }
        });
    }

    function obtenerDatosPedidos(id_platillo, precio_platillo, comentario_platillo, id_ingredientes) {
        let id_local = $('#id-local').text();
        let url = './Modelos/m_modal_platillo.php';
        $.post(url, { funcion: 'get_datos_pedido', id_local: id_local }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                if (data.respuesta == 0) {

                } else {
                    let id_pedido = data.id_pedido;
                    agregarDetallePedido(id_platillo, id_pedido, precio_platillo, comentario_platillo, id_ingredientes);
                }
            }
        });
        // return info[0];
    }
    // console.log(pedido);

    setTimeout(() => {
        $('#boton-agregar-platillo').click(function(e) {
            // Datos del platillo
            let id_platillo = $('#id-platillo').text();
            let precio_platillo = $('#precio-subtotal').text();
            let comentario_platillo = $('#comentario-platillo').val();
            // Obtener el TOTAL y su ID de checkbox de ingredientes que estan SELECCIONADOS
            let ingredientes = $('ul li > a > label > input:checkbox:checked');

            if (ingredientes.length == 0 || ingredientes.length > 3) {
                Swal.fire(
                    'Hey!',
                    'Debes elegir entre 1 y 3 ingredientes',
                    'warning'
                );
            } else {
                let id_ingredientes = [];
                for (let i = 0; i < ingredientes.length; i++) {
                    id_ingredientes.push(ingredientes[i].value);
                }
                // console.log(id_ingredientes);
                obtenerDatosPedidos(id_platillo, precio_platillo, comentario_platillo, id_ingredientes);
            }

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
        return lista_detalle_pedido;

    }

    setTimeout(() => {
        $("#boton-add-platillo").click(function() {
            // let ids_locales = obtenerDatosPedidos();
            let nuevo_pedido = 1;
            let id_platillo = $('#id-platillo').text();
            let precio_platillo = $('#precio-subtotal').text();
            let comentario_platillo = $('#comentario-platillo').val();
            // let nombre_local = $('#nombre-local-' + id_local).text();
            console.log(id_local);
            console.log(id_platillo);
            console.log(precio_platillo);
            console.log(comentario_platillo);
            if (nuevo_pedido == 1) {
                // agregarPedidoBarra(crearComponentePedido('Cafeteria UTEC', 8, 7));
            }
            // agregarDetalleBarra(crearComponenteDetalle());

        });
    }, 500);

    function llenarComboIngredientes() {
        let id_platillo = $('#id-platillo').text();
        let id_local = $('#id-local').text();
        let url = './Modelos/m_modal_platillo.php';
        $.post(url, { funcion: 'get_detalle_platillo', id_platillo: id_platillo, id_local: id_local }, function(data, status) {
            data = JSON.parse(data);
            // console.log(data);
            if (status) {
                let total_ingredientes = data.info.length;
                for (let i = 0; i < total_ingredientes; i++) {
                    $('#select-multiple-ingredientes').append('<option value="' + data.info[i].id_ingrediente + '">' + data.info[i].nombre + '</option>');
                }
            }            
        });
    }

    llenarComboIngredientes();
    setTimeout(() => {
        $('#select-multiple-ingredientes').multiselect();
    }, 500);



}());