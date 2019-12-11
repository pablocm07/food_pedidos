
(function () {

    let nombre_ingrediente; //VARIABLE GLOBAL A ENVIAR PARA UN POSIBLE NUEVO INGREDIENTE

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
                        '<div class="container text-center pb-3">' +

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
    
    /**
     * () EVENTO QUE SE ACTIVA CUANDO CAMBIA EL VALOR DEL INPUT
     * 
     * ESTE EVENTO SE ENCARGA DE PONER PRIMERA LETRA EN MAYUSCULA Y SETEAR EL VALOR DE LA VARIABLE
     * NOMBRE
     */
    $("#nombre_ingrediente_nuevo").on('change', function () {
        nombre_ingrediente = capitalizeFirstLetter($("#nombre_ingrediente_nuevo").val());          
    });   
    
    /**
     * () FUNCION CON CONVIERTE LA PRIMERA LETRA A MAYUSCULA DE CUALQUIER STRING
     *  >> string: SE PASA UN STRING A CONVERTIR
     *  
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    /**
     * () EVENTO QUE SE ENCARGA DE LLAMAR LA FUNCION QUE VALIDA EL FORMULARIO   
     */
    $("#insertar_nuevo_ingrediente").click(function (e) { 
        e.preventDefault();        
        validarFormulario();
    });

    /**
     * () FUNCION QUE VALIDA LOS DATOS DEL FORMULARIO Y LLAMA 
     *  LA FUNCION QUE ENVIA LA PETICION AL SERVIDOR
     */
    let validarFormulario = function () {
        
        if ( nombre_ingrediente === undefined || nombre_ingrediente === '' ) { //NO HAY DATOS QUE ENVIAR 
            mostrarError();
        } else { //SI EXISTEN DATOS A ENVIAR                  
            enviarPeticion(nombre_ingrediente);            
        }
    }


    /** () FUNCION QUE REALIZARÁ EL REGISTRO DEL NUEVO INGREDIENTE
     * 
     * >> nombre: variable global 'nombre' que se van a insertar
     * >> precio: variable global 'precio' que se van a insertar     
     */
    function enviarPeticion(nombre_ingrediente) {
        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_ingredientes.php",
            data: {
                funcion: 'insertar_nuevo_ingrediente',
                nombre_ingrediente: nombre_ingrediente                
            }
        }).done(function (respuesta_servidor) {
            console.log(respuesta_servidor);
            let respuesta = JSON.parse(respuesta_servidor);            
            if (respuesta.respuesta == '1') {
                $("#modal_agregar_ingrediente").modal('hide');
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se agregó el ingrediente correctamente.',
                    confirmButtonClass: 'btn btn-lg btn-outline-success'
                });
                consultar_ingredientes();
            } else {
                $("#modal_agregar_ingrediente").modal('hide');
                Swal.fire({
                    type: 'error',
                    title: '¡Lo sentimos, algo ha salido mal!',
                    buttonsStyling: false,
                    confirmButtonText: 'Intentalo de nuevo más tarde.',
                    confirmButtonClass: 'btn btn-lg btn-outline-info'
                });
            }
        });

    }

    /** ()FUNCION QUE MOSTRARÁ MENSAJE DE ERROR CUANDO EL FORMULARIO NO SE VALIDE CORRECTAMENTE
     * 
     */
    let mostrarError = function () {
        $('#form-agregar-nuevo-ingrediente').addClass('was-validated');        
    }


}());