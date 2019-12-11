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
        let id_local = $('#id-local').val();
        let url = './Modelos/m_modal_platillo.php';
        $.post(url, { funcion: 'get_datos_pedido', id_local: id_local }, function(data, status) {
            data = JSON.parse(data);
            if (status) {
                if (data.respuesta == 0) {
                    alert("Lo sentimos, algo ha salido mal");
                } else {
                    let id_pedido = data.id_pedido;
                    let precio_existente = data.precio_existente;
                    console.log(precio_existente);
                    agregarDetallePedido(id_platillo, id_pedido, precio_platillo, comentario_platillo, id_ingredientes);
                }
            }
        });
    }

    setTimeout(() => {
        $('#boton-agregar-platillo').click(function(e) {
            // Datos del platillo
            let id_platillo = $('#id-platillo').val();
            let precio_platillo = $('#precio-subtotal').val();
            let comentario_platillo = $('#comentario-platillo').val();
            // Obtener el TOTAL y su ID de checkbox de ingredientes que estan SELECCIONADOS            
            let ingredientes = $('#select-multiple-ingredientes').val();

            if (ingredientes.length == 0 || ingredientes.length > 3) {
                Swal.fire(
                    'Hey!',
                    'Debes elegir entre 1 y 3 ingredientes',
                    'warning'
                );
            } else {
                console.log(ingredientes);
                // obtenerDatosPedidos(id_platillo, precio_platillo, comentario_platillo, id_ingredientes);
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
        let lista_mis_pedidos = $("<li>"), bg_badge_estado, estado_del_pedido;
        if (id_estado == 5) {
            bg_badge_estado = 'badge-danger';
            estado_del_pedido = 'En espera';
        } else if (id_estado == 6) {
            bg_badge_estado = 'bg-food-orange';
            estado_del_pedido = 'En proceso';
        } else if (id_estado == 7) {
            bg_badge_estado = 'badge-success';
            estado_del_pedido = 'Terminado';
        } else if (id_estado == 10) {
            bg_badge_estado = 'badge-default';
            estado_del_pedido = 'Sin pagar';
        }
        lista_mis_pedidos.addClass('item_pedido text-white list-group-item d-flex justify-content-between align-items-center');
        lista_mis_pedidos.html(nombre_local +
            '<span title="Tiempo estimado" class="ml-auto badge badge-primary badge-pill">' +
            '<i class="fas fa-clock"></i> ' + min + ' min.' +
            '</span>' +
            '<span title="' + estado_del_pedido + '" class="ml-2 badge ' + bg_badge_estado + ' badge-pill">' +
            '<i class="fas fa-concierge-bell"></i>' +
            '</span>' +
            '<span title="Eliminar pedido" class="ml-2 badge badge-danger badge-pill">' +
            '<i class="fas fa-backspace"></i>' +
            '</span>'
        );
        return lista_mis_pedidos;
    }

    function crearComponenteDetalle(ubicacion_imagen, nombre_platillo, ingredientes, precio_platillo) {
        let lista_detalle_pedido = $('<div>');
        lista_detalle_pedido.addClass('item-detalle-pedido');
        lista_detalle_pedido.html('<div class="p-2 img-detalle-pedido">' +
            '<img width="70px" height="70px" src=" ' + ubicacion_imagen + ' " alt="">' +
            '</div>' +
            '<p class="producto-detalle-pedido m-0 p-2 text-center">' +
            '<span> ' + nombre_platillo + ' </span>' +
            '<br>'+ ingredientes +
            '<span>' +
            '</span>' +
            '</p>' +
            '<span class="font-weight-bold precio-detalle-pedido p-2 text-center">' +
            '$'+ precio_platillo +
            '</span>');
        return lista_detalle_pedido;

    }

    setTimeout(() => {
        $("#boton-add-platillo").click(function() {                        
            let id_platillo = $('#id-platillo').val();
            let precio_platillo = $('#precio-subtotal').val();            
            let comentario_platillo = $('#comentario-platillo').val();
            let id_ingredientes = $('#select-multiple-ingredientes').val();
            
            let id_local = $('#id-local').val();
            let nombre_local = $('#nombre-local-' + id_local).text();    
            let tiempo_preparacion = $('#tiempo-preparacion').val();

            let ubicacion_imagen = $('#ubicacion-imagen').val();
            let nombre_platillo = $('#nombre-platillo').val();
            let ingredientes = $('.multiselect-selected-text').text();            

            if (id_ingredientes.length == 0 || id_ingredientes.length > 3) {
                Swal.fire(
                    'Hey!',
                    'Debes elegir entre 1 y 3 ingredientes',
                    'warning'
                );
            } else {                
                // obtenerDatosPedidos(id_platillo, precio_platillo, comentario_platillo, id_ingredientes);
                agregarPedidoBarra(crearComponentePedido(nombre_local, tiempo_preparacion, 10));            
                agregarDetalleBarra(crearComponenteDetalle(ubicacion_imagen, nombre_platillo, ingredientes, precio_platillo));                
            }
                

        });
    }, 500);

    function llenarComboIngredientes() {
        let id_platillo = $('#id-platillo').val();
        let url = './Modelos/m_modal_platillo.php';
        $.post(url, { funcion: 'get_detalle_platillo', id_platillo: id_platillo}, function(data, status) {
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