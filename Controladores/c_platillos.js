(function () {

    let platillos_global, ingredientes_global;    

    const consultar_platillos = function () {        
        let url = './Modelos/m_platillos.php';
        $.post(url, { funcion: 'consultar_platillos' }, function (data, status) {
            
            let datos = JSON.parse(data);                        
            
            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION
                
                if (datos.estado == 'Tiene platillos') {

                    $('#contenedor-platillos').empty(); //VACIAMOS EL CONTENEDOR

                    let total_platillos = datos.platillos.length; // Total de registros
                    platillos_global = datos.platillos;                    

                    for (let index = 0; index < total_platillos; index++) { // Por cada registro se crea una tarjeta nueva para el accordeon

                        let platillo = datos.platillos[index]; // Informacion de cada registro
                        let datos_platillos = {
                            id_platillo: platillo.id_platillo,
                            nombre_platillo: platillo.nombre_platillo,
                            precio: platillo.precio,
                            precio_ing_extra: platillo.precio_ing_extra,
                            tiempo_preparacion: platillo.tiempo_preparacion,
                            cantidad: platillo.cantidad,
                            descripcion: platillo.descripcion,
                            ubicacion_imagen: platillo.ubicacion_imagen
                        }
                        let div = $("<div>");                        
                        div.load('./Vistas/locales_platillo.php', datos_platillos);
                        $('#contenedor-platillos').append(div);
                    }                    

                } else {

                    $('#acordeon-platillos').append(
                        '<div class="container text-center pb-3">'+

                            '<img src="./Assets/img/sin_resultados.png" class="imagen-s-resultados" alt="Sin platillos">' +
                        
                            '<p class="h5 color-food-fontOrange">' +
                                'Aún no tienes platillos agregados. ' +
                            '</p>' +

                        '</div>'
                    );                                    

                }
            }            
        }); 
    }    

    consultar_platillos();

    $('a#nuevo_platillo').click(function () {
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_agregar_platillo.html');        
        setTimeout(() => {
            $('#modal_agregar_platillo').modal('toggle');
        }, 700);
    });  

    $('#contenedor-platillos').on('click', 'a#nuevo_ingrediente', function (e) { 
        e.preventDefault();        
        let id_platillo = $(this).attr('id_platillo');    
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_agregar_ingrediente-platillo.php', {id_platillo: id_platillo});
        setTimeout(() => {
            $('#modal_agregar_ingrediente').modal('toggle');
        }, 700);
    });
    
    $('#contenedor-platillos').on('click', 'a#eliminar_platillo', function (e) { 
        e.preventDefault();        
        let id_platillo = $(this).attr('id_platillo');
        // console.log(id_platillo);
        Swal.fire({
            type: 'warning',
            title: '¿Estas seguro?',
            buttonsStyling: false,
            text: 'Se eliminará este platillo y ya no se mostrará a los clientes.',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar.',
            cancelButtonText: 'Cancelar.',
            confirmButtonClass: 'btn btn-md btn-primary',
            cancelButtonClass: 'btn btn-md btn-danger'
        }).then((result) => {
            if (result.value) {
                eliminarPlatillo(id_platillo);
                consultar_platillos();
            }
        });        
    });

    $('#contenedor-platillos').on('click', 'a#abrir_platillo', function (e) {
        let id_platillo = $(this).attr('id_platillo');
        consultarIngredientes(id_platillo);        
    });

    $("body").on('click', 'button.boton_eliminar_ingrediente', function () {
        let id_platillo = $(this).attr('id_platillo');
        let id_detalle_platillo = $(this).attr('id_detalle_platillo');
        // console.log(id_detalle_platillo);        
        Swal.fire({
            type: 'warning',
            title: '¿Estas seguro?',
            buttonsStyling: false,
            text: 'Se eliminará de la lista de ingredientes para este platillo.',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar.',
            cancelButtonText: 'Cancelar.',
            confirmButtonClass: 'btn btn-md btn-primary',
            cancelButtonClass: 'btn btn-md btn-danger'
        }).then((result) => {
            if (result.value) {
                eliminarIngrediente(id_detalle_platillo, id_platillo);
                consultarIngredientes(id_platillo);
            }
        });
    });


    /**
     * 
     * @param {*} id_platillo 
     */
    const consultarIngredientes = function (id_platillo) {        
        let url = './Modelos/m_platillos.php';
        
        $.post(url, { funcion: 'consultar_ingredientes_platillo', id_platillo: id_platillo }, function (data, status) {
            // console.log(data);
            let datos = JSON.parse(data);
            
            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION
                
                const tabla = $('#tabla_ingredientes_' + id_platillo);
                tabla.empty();                    

                if (datos.estado == 'Tiene ingredientes') {
                                        

                    let total_ingredientes = datos.ingredientes.length; // Total de registros
                    ingredientes_global = datos.ingredientes;

                    // console.log(datos.ingredientes);
                    for (let index = 0; index < total_ingredientes; index++) { // Por cada registro se crea una tarjeta nueva para el accordeon

                        let ingrediente = datos.ingredientes[index]; // Informacion de cada registro
                        let datos_ingrediente = {
                            id_platillo: ingrediente.id_platillo,
                            id_detalle_platillo: ingrediente.id_detalle_platillo,
                            id_ingrediente: ingrediente.id_ingrediente,
                            id_estado: ingrediente.id_estado,
                            nombre: ingrediente.nombre
                        }
                        let tr = $("<tr>");
                        tr.load('./Vistas/tabla_ingredientes_platillos.php', datos_ingrediente);
                        $(tabla).append(tr);
                                                
                    }

                } else {

                    $(tabla).append('<tr class="text-center"><td colspan="3">No tiene añadido ningún ingrediente a este platillo.<td></tr>');

                }
            }
        }); 
    }

    /** () FUNCION QUE REALIZARÁ LA ELIMINACIÓN DEL REGISTRO
     * 
     * >> nombre: variable global 'nombre' que se van a insertar  
     */
    function eliminarIngrediente(id_detalle_platillo, id_platillo) {
        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_ingredientes.php",
            data: {
                funcion: 'eliminar_ingrediente_platillo',
                id_detalle_platillo: id_detalle_platillo
            }
        }).done(function (respuesta_servidor) {
            // console.log(respuesta_servidor);
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se eliminó el ingrediente correctamente.',
                    confirmButtonClass: 'btn btn-md btn-success'
                });                
                consultarIngredientes(id_platillo);
            } else {
                Swal.fire({
                    type: 'error',
                    title: '¡Lo sentimos, algo ha salido mal!',
                    buttonsStyling: false,
                    confirmButtonText: 'Intentelo de nuevo más tarde.',
                    confirmButtonClass: 'btn btn-md btn-info'
                });
            }
        });

    }
    
    /** () FUNCION QUE REALIZARÁ LA ELIMINACIÓN DEL REGISTRO
     * 
     * >> nombre: variable global 'nombre' que se van a insertar  
     */
    function eliminarPlatillo(id_platillo) {
        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_platillos.php",
            data: {
                funcion: 'eliminar_platillo',
                id_platillo: id_platillo
            }
        }).done(function (respuesta_servidor) {
            // console.log(respuesta_servidor);
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se eliminó el platillo correctamente.',
                    confirmButtonClass: 'btn btn-md btn-success'
                });
            } else {
                Swal.fire({
                    type: 'error',
                    title: '¡Lo sentimos, algo ha salido mal!',
                    buttonsStyling: false,
                    confirmButtonText: 'Intentelo de nuevo más tarde.',
                    confirmButtonClass: 'btn btn-md btn-info'
                });
            }
        });

    }

}());
