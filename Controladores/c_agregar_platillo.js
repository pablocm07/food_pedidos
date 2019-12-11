(function () {    

    let datos = new Object();    

    
    /**
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
    
    $("#precio_extra_platillo_nuevo").on('change', function () {
        datos.precio_extra_platillo = $("#precio_extra_platillo_nuevo").val();        
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
            validar(datos.tiempo_preparacion) & validar(datos.cantidad) & validar(datos.descripcion)        
        ) {                 
            if (datos.precio_extra_platillo_nuevo == null || datos.precio_extra_platillo_nuevo === '' ) {
                datos.precio_extra_platillo_nuevo = '0';                        
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

    /** () FUNCION QUE REALIZARÁ LA CONSULTA DE LOS PLATILLOS DISPONIBLES DE CADA LOCAL E INSERTARA LOS DIVS EN EL ACCORDEON
     *      
     */
    const consultar_platillos = function () {        
        let url = './Modelos/m_platillos.php';
        $.post(url, { funcion: 'consultar_platillos' }, function (data, status) {
            
            let datos = JSON.parse(data);                        
            
            if (status == 'success') { // SI SE OBTUVO RESULTADO DE LA PETICION
                
                if (datos.estado == 'Tiene platillos') {

                    let total_platillos = datos.platillos.length; // Total de registros
                    let platillos = datos.platillos;                    

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
                precio_extra_platillo: datos_a_enviar.precio_extra_platillo_nuevo,
                tiempo_preparacion: datos_a_enviar.tiempo_preparacion,
                cantidad: datos_a_enviar.cantidad,
                descripcion: datos_a_enviar.descripcion
            }
        }).done(function (respuesta_servidor) {            
            let respuesta = JSON.parse(respuesta_servidor);
            if (respuesta.respuesta == '1') {
                $('#modal_agregar_platillo').modal('toggle');
                $('#contenedor-platillos').empty();
                consultar_platillos();
                Swal.fire({
                    type: 'success',
                    title: '¡Correcto!',
                    buttonsStyling: false,
                    confirmButtonText: '<i class="fad fa-utensils-alt"></i> El platillo fue agregado correctamente.',
                    confirmButtonClass: 'btn btn-md btn-outline-success'
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
        $('#form_agregar_nuevo_platillo').addClass('was-validated');    
    }


}());