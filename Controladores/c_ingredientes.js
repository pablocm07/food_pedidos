(function () {

    let ingredientes_global = new Array();        

    const consultar_ingredientes = function () {        
        let url = './Modelos/m_ingredientes.php';
        $.post(url, { funcion: 'consultar_ingredientes' }, function (data, status) {
            
            let datos = JSON.parse(data);                 
            
            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION
                
                if (datos.estado == 'Tiene ingredientes') {

                    let total_ingredientes = datos.ingredientes.length; // Total de registros
                    ingredientes_global = datos.ingredientes;  
                    
                    const tabla_ingredientes = $("#tabla-ingredientes");
                    tabla_ingredientes.empty();

                    for (let index = 0; index < total_ingredientes; index++) { // Por cada registro se crea un nuevo componente de la tabla

                        let ingrediente = datos.ingredientes[index]; // Informacion de cada registro                                                            

                        tabla_ingredientes.append(
                            '<tr>' +

                                '<td>' + 
                                    '<i class="fad fa-steak" aria-hidden="true"></i>' +
                                    ingrediente.nombre +
                                '</td>' +

                                '<td>' +
                            '<button id="' + ingrediente.id_ingrediente + '" nombre="' + ingrediente.nombre + '" class="editar-ingrediente btn btn-sm btn-rounded btn-primary btn-block">Editar</button>' +
                                '</td>' +

                                '<td>' +
                                    '<button id="' + ingrediente.id_ingrediente + '"  class="eliminar-ingrediente btn btn-sm btn-rounded btn-danger btn-block">Eliminar</button>' +
                                '</td>' +

                            '</tr >'
                        );

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

    consultar_ingredientes();

    $('a#nuevo_ingrediente').click(function () {
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_agregar_ingrediente.html');        
        setTimeout(() => {
            $('#modal_agregar_ingrediente').modal('toggle');
        }, 700);
    });

    $('#tabla-ingredientes').on('click', 'button.eliminar-ingrediente', function (e) { 
        e.preventDefault();        
        let id_ingrediente = $(this).attr('id');                    
        Swal.fire({
            title: 'Eliminar Ingrediente',
            text: "¿Deseas eliminar este ingrediente? Ya no podrás consultarlo ni tener platillos con este ingrediente",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Estoy Seguro'
        }).then((result) => {
            if (result.value) {                            
                eliminarIngrediente(id_ingrediente);
            }
        })
    });
    
    $('#tabla-ingredientes').on('click', 'button.editar-ingrediente', function (e) { 
        e.preventDefault();        
        let id_ingrediente = $(this).attr('id'),
            nombre_ingrediente = $(this).attr('nombre');               
        $('#modal-global').empty();
        $('#modal-global').load('./Vistas/v_actualizar_ingrediente.php', {id_ingrediente : id_ingrediente, nombre_ingrediente: nombre_ingrediente});
        setTimeout(() => {
            $('#modal_actualizar_ingrediente').modal('toggle');
        }, 700);    
    });
    
    $('body').on('click', 'a#actualizar_ingrediente', function (e) {      
        $('#actualizar_ingrediente').prop('disabled', true);
        let nombre_ingrediente = $("#nombre_ingrediente_actualizar").val(),
            id_ingrediente = $("#nombre_ingrediente_actualizar").attr('id_ingrediente');
        validarNombre(nombre_ingrediente, id_ingrediente);
    });


    /**
     * () FUNCION QUE VALIDA EL NOMBRE DEL PLATILLO A ACTUALIZAR
     *  LA FUNCION ENVIA LA PETICION AL SERVIDOR
     */
    const validarNombre = function (nombre_ingrediente, id_ingrediente) {

        if (nombre_ingrediente === undefined || nombre_ingrediente === '' || nombre_ingrediente.length <= 4 ) { //NO HAY DATOS QUE ENVIAR 
            mostrarError();
        } else { //SI LOS DATOS A ENVIAR SON CORRECTOS                 
            enviarPeticion(nombre_ingrediente, id_ingrediente);
        }
    }

    /** ()FUNCION QUE MOSTRARÁ MENSAJE DE ERROR CUANDO EL FORMULARIO NO SE VALIDE CORRECTAMENTE
     * 
     */
    let mostrarError = function () {
        $('#form-actualizar-ingrediente').addClass('was-validated');        
    }

    /** () FUNCION QUE REALIZARÁ EL REGISTRO DEL NUEVO INGREDIENTE
     * 
     * >> nombre: variable global 'nombre' que se van a insertar  
     */
    function enviarPeticion(nombre_ingrediente, id_ingrediente) {
        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_ingredientes.php",
            data: {
                funcion: 'actualizar_ingrediente',
                nombre_ingrediente: nombre_ingrediente,
                id_ingrediente: id_ingrediente
            }
        }).done(function (respuesta_servidor) {                    
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {
                $("#modal_actualizar_ingrediente").modal('hide');
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se actualizó el ingrediente correctamente.',
                    confirmButtonClass: 'btn btn-md btn-success'
                });
                consultar_ingredientes();
            } else {
                $("#modal_actualizar_ingrediente").modal('hide');
                Swal.fire({
                    type: 'error',
                    title: '¡Lo sentimos, algo ha salido mal!',
                    buttonsStyling: false,
                    confirmButtonText: 'Intentelo de nuevo más tarde.',
                    confirmButtonClass: 'btn btn-md btn-danger'
                });
            }
        });

    }
    
    /** () FUNCION QUE REALIZARÁ LA ELIMINACIÓN DEL REGISTRO
     * 
     * >> nombre: variable global 'nombre' que se van a insertar  
     */
    function eliminarIngrediente(id_ingrediente) {
        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_ingredientes.php",
            data: {
                funcion: 'eliminar_ingrediente',                
                id_ingrediente: id_ingrediente
            }
        }).done(function (respuesta_servidor) {                    
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {                
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se eliminó el ingrediente correctamente.',
                    confirmButtonClass: 'btn btn-md btn-success'
                });
                consultar_ingredientes();
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
