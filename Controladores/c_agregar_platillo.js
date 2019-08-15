(function () {

    // let nombre_ingrediente, precio_ingrediente; VARIABLES GLOBALES A ENVIAR PARA UN POSIBLE NUEVO INGREDIENTE

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
     * () EVENTO QUE SE ACTIVA CUANDO CAMBIA EL VALOR DEL INPUT
     * 
     * ESTE EVENTO SE ENCARGA DE SETEAR EL VALOR DE LA VARIABLE PRECIO
     */
    $("#precio_ingrediente_nuevo").on('change', function () {
        precio = $("#precio_ingrediente_nuevo").val();
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
    $("#insertar_nuevo_platillo").click(function (e) {
        e.preventDefault();
        // validarFormulario();
        mostrarError();
    });

    /**
     * () FUNCION QUE VALIDA LOS DATOS DEL FORMULARIO Y LLAMA 
     *  LA FUNCION QUE ENVIA LA PETICION AL SERVIDOR
     */
    let validarFormulario = function () {

        if (nombre_ingrediente === undefined || nombre_ingrediente === undefined || nombre_ingrediente === '' || precio_ingrediente === '') { //NO HAY DATOS QUE ENVIAR 
            mostrarError();
        } else { //SI EXISTEN DATOS A ENVIAR                  
            enviarPeticion(nombre_ingrediente, nombre_ingrediente);
        }
    }


    /** () FUNCION QUE REALIZARÁ EL REGISTRO DEL NUEVO INGREDIENTE
     * 
     * >> nombre: variable global 'nombre' que se van a insertar
     * >> precio: variable global 'precio' que se van a insertar     
     */
    function enviarPeticion(nombre_ingrediente, nombre_ingrediente) {
        Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_comidas.php",
            data: {
                nombre_ingrediente: nombre_ingrediente,
                precio_ingrediente: precio_ingrediente
            }
        }).done(function (respuesa_servidor) {
            console.log(respuesa_servidor);
            let respuesa_servidor = JSON.parse(respuesa_servidor);
            if (respuesa_servidor.respuesta == 'Registrado') {
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'Se agregó el ingrediente correctamente.',
                    confirmButtonClass: 'btn btn-lg btn-outline-success'
                });
            } else {
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
        $('#form-agregar-nuevo-platillo').addClass('was-validated');
        // setTimeout(() => {
        //     $('#form-agregar-nuevo-ingrediente').removeClass('was-validated');
        // }, 3000);
    }


}());