(function () {

    let datos = new Object();

    
    /**
     * 
     * 
     * 
     * 
     * 
     * () EVENTOS QUE SE ACTIVAN CUANDO CAMBIA EL VALOR DEL INPUT
     * 
     * ESTOS EVENTOS SE ENCARGAN DE SETEAR EL CONTENIDO DE LOS INPUT A LAS VARIABLES DEFINIDAS
     */
    $("#nombre_platillo_nuevo").on('change', function () {
        datos.nombre_platillo = capitalizeFirstLetter($("#nombre_platillo_nuevo").val());
    });
    
    $("#precio_platillo_nuevo").on('change', function () {
        datos.precio_platillo = $("#precio_platillo_nuevo").val();
    });
    
    $("#tiempo_platillo_nuevo").on('change', function () {
        datos.tiempo_preparacion = $("#tiempo_platillo_nuevo").val();        
    });
    
    $("#cantidad_platillo_nuevo").on('change', function () {
        datos.cantidad = $("#cantidad_platillo_nuevo").val();
    });
    
    $("#descripcion_platillo_nuevo").on('change', function () {
        datos.descripcion = $("#descripcion_platillo_nuevo").val();
    });
    /**
     * 
     * 
     * 
     * 
     * 
     */

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
        if (
            validar(datos.nombre_platillo) & validar(datos.precio_platillo) &            
            validar(datos.tiempo_preparacion) & validar(datos.cantidad)        
        ) {                 
            if (datos.descripcion == null || datos.descripcion === '' ) {
                datos.descripcion = 'No se agregó ninguna descripción';
            }
            enviarPeticion(datos);            
        } else {        
            mostrarError();
        }
    });




    /** () para validar que un campo no este vacio
     * 
     * >> elemento: recibe el valor de un elemento - [String]
     * @@ Boleano: Devuelve verdadero si no esta vacio - [Boolean]
     * 
    */     
    function validar(elemento) {
        if ( elemento === "" || elemento == null ) {                    
            return false;  // Esta vacio
        }else{            
            return true; // No esta vacio
        }
    }


    /** () FUNCION QUE REALIZARÁ EL REGISTRO DEL NUEVO INGREDIENTE
     * 
     * >> nombre: variable global 'nombre' que se van a insertar
     * >> precio: variable global 'precio' que se van a insertar     
     */
    function enviarPeticion(datos_a_enviar) {

        // Peticion por medio de POST
        $.ajax({
            method: 'post',
            url: "./Modelos/m_platillos.php",
            data: {
                funcion: 'insertar_nuevo_platillo',
                nombre_platillo: datos_a_enviar.nombre_platillo,
                precio_platillo: datos_a_enviar.precio_platillo,
                tiempo_preparacion: datos_a_enviar.tiempo_preparacion,
                cantidad: datos_a_enviar.cantidad,
                descripcion: datos_a_enviar.descripcion
            }
        }).done(function (respuesta_servidor) {
            console.log(respuesta_servidor);
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {
                $("#agregarNuevoPlatillo").modal('hide');
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: 'El platillo fue agregado correctamente.',
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
        })
    }

    /** ()FUNCION QUE MOSTRARÁ MENSAJE DE ERROR CUANDO EL FORMULARIO NO SE VALIDE CORRECTAMENTE
     * 
     */
    let mostrarError = function () {
        $('#form-agregar-nuevo-platillo').addClass('was-validated');    
    }


}());