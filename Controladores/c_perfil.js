(function(){  

    /** () para validar que un campo no este vacio
     * 
     * >> elemento: recibe el valor de un elemento - [String]
     * @@ Boleano: Devuelve verdadero si no esta vacio - [Boolean]
     * 
    */     
    function validar(elemento) {
        if ( elemento === "" ) {                    
            return false;  // Esta vacio
        }else{            
            return true; // No esta vacio
        }
    }

    /** () para permitir unicamente numeros y letras cuando escriben en un input
     * 
     * >> total: numero totsl de caracteres - 1 - [Int]
     * >> tecla: codigo ASCII de la tecla que fue presionada - [Int]
     * >> max: numero maximo permitido de caracteres
     * @@ Boleano: Retorna el valor Verdadero en caso de cumplir con las condiciones - [Boolean]
     * 
     * */    
    function validarChar(total, tecla, max){     
        if (total + 1 > max)   {            
            return true;
        }
        if(
            // Tipos de caracteres que se desean permitir. Solo comentar o descomentar la linea
            (tecla.charCode < 96 || tecla.charCode > 122) // Permitir a - z
            && (tecla.charCode < 65 || tecla.charCode > 90) // Permitir A - Z
            && (tecla.charCode < 48 || tecla.charCode > 57) // Permitir números 0 - 9      
            && (tecla.charCode != 241) // Permitir la ñ
            && (tecla.charCode != 64) // Permitir el @
            && (tecla.charCode != 46) // Permitir el .
            // && (tecla.charCode != 237 && tecla.charCode != 243 && tecla.charCode != 250 && tecla.charCode != 233 && tecla.charCode != 225) // Permitir acentos á - ú
            // && (tecla.charCode != 237 && tecla.charCode != 243 && tecla.charCode != 250 && tecla.charCode != 233 && tecla.charCode != 225) // permitir acentos Á - Ú
        ) {
            return true;
        }
    } 
    /** () similar a la anterior, pero unicamente para números */
    function validarNum(total, tecla, max){ 
        if (total + 1 > max)   {            
            return true;
        }
        if(tecla.charCode < 48 || tecla.charCode > 57){ // Permitir solo números 0 - 9) {
            return true;
        }
    } 

    function cargarDatosUsuario(){
        let url = './Modelos/m_login.php';        
        $.post(url, {funcion:'datos_sesion'}, function (data, status) {
            data = JSON.parse(data);
            // console.log(data.usuario.nombre);
            if (status){
                $('#id-usuario').val(data.usuario.id_usuario);
                $('#nombre-perfil').val(data.usuario.nombre);
                $('#apellido-perfil').val(data.usuario.apellido);
                $('#email-perfil').val(data.usuario.correo_electronico);
                $('#numero-telefono-perfil').val(data.usuario.no_telefonico);
                $('#contrasena-perfil').val(data.usuario.contrasena);                                  
            }
        });                             
    }      

    /** () para modificar los datos de un nuevo usuario
     * 
     * >> datos: un arreglo con los datos que se van a modificar
     */
    function guardarDatosUsuario(datos){            
        // Peticion por medio de POST
        $.post("./Modelos/m_perfil.php", datos ,function(data, status){  
            data = JSON.parse(data);
            let usuario_info = data.usuario;
            if(status == 'success'){ // Si la peticion es exitosa                                    
                if (data.respuesta == 1){ // Si se registro correctamente                   
                    
                    // Deshabilitar el boton de guardar
                    $('#guardar-datos-perfil').prop('disabled', true);
                    $('#perfil').text(usuario_info[1]+" "+usuario_info[2]); // Elemento de la vista barras de navegación
                    $('#correo_usuario').text(usuario_info[4]); // Elemento de la vista barras de navegación                    
                    
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha modificado corréctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else{
                    Swal.fire({
                        type: 'error',
                        title: '¡Lo sentimos, algo ha salido mal!',
                        buttonsStyling: false,
                        confirmButtonText: 'Intentalo de nuevo más tarde.',
                        confirmButtonClass: 'btn btn-lg btn-outline-info'
                    });
                }
            }
        });
    }

    function cambiarContraseñaUsuario(datos) {        
        // Peticion por medio de POST
        $.post("./Modelos/m_perfil.php", datos ,function(data, status){  
            data = JSON.parse(data);
            console.log(data);
            if(status == 'success'){ // Si la peticion es exitosa                                    
                if (data.respuesta == 1){ // Si se registro correctamente      
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Se ha modificado corréctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }); 
                }
                console.log(data);
            }else{
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

    /** () al presionar alguna tecla, solo permitir 
     * los caracteres que esten indicados en la funcion validarChar() 
     * 
     * >> tecla: Codigo ASCII de la tecla
     * @@ Boleano: Retorna Falso si no cumple las condiciones
     * 
     */             
        $('#nombre-perfil').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 50)) return false;
        });

        $('#apellido-perfil').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 50)) return false;
        });
    
        $('#numero-telefono-perfil').keypress(function(tecla) {        
            if(validarNum(this.value.length, tecla, 10)) return false;
        });
    
        $('#email-perfil').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 70)) return false;
        });

        $('#contrasena-perfil').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 20)) return false;
        });

        $("#email").blur(function(elemento){
            let correo = $('#email').val();            
            $.post('./Modelos/m_registro.php', {correo: correo, funcion: 'verificar_email'}, function (data, status) {
                data = JSON.parse(data);

                if (data.usuario_registrado == 1){
                    Swal.fire({
                        type: 'warning',
                        title: '¡Ese correo ya se encuentra registrado!',
                        showCloseButton: true,
                        buttonsStyling: false,
                        confirmButtonText: 'Elige otro',
                        confirmButtonClass: 'btn btn-lg btn-outline-info'
                    });
                    $('#email').val('');
                    $('#email').focus();
                }
            }); 
        });

    // Si se modifica algun campo del formulario
    $('input').change(function (e) {     
        // Se habilita el boton de guardar    
        $('#guardar-datos-perfil').prop('disabled', false);
    });

    $('#cambiar-contrasena').click(function () { 
        let id_usuario = $('#id-usuario').val();
        Swal.mixin({
            input: 'password',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Ingresa nueva contraseaña',
                text: 'Se recomienda usar numeros y letras (Mayúsculas y Minúsculas), para mayor seguridad'
            },
            'Confirmar contraseña',
        ]).then((result) => {
            if (result.value) {
                let contrasena = result.value[0],
                    contrasena2 = result.value[1];
                    // console.log(contrasena2);
                    // console.log(contrasena);
                if (contrasena == contrasena2){
                    let datos = {
                        id_usuario: id_usuario,
                        contrasena: contrasena,
                        funcion: 'cambiar_contraseña'
                    };
                    // console.log(datos);
                    cambiarContraseñaUsuario(datos);                
                }else{
                    Swal.fire({
                        type: 'error',
                        text: 'Las contraseñas no son iguales'
                    });
                }

            }
        });
    });
    
    $('#guardar-datos-perfil').click(function () {    
        
        let id_usuario = $('#id-usuario').val();
        nombre = $('#nombre-perfil').val(),
        apellido = $('#apellido-perfil').val(),
        numero_telefono = ($('#numero-telefono-perfil').val() != '' ? $('#numero-telefono-perfil').val() : ''),
        email = $('#email-perfil').val(),
        foto_perfil = $('#foto-usuario-perfil').attr('src');

        if (validar(nombre) && validar(apellido) && validar(email)){
            // Cargar los datos que seran enviados
            let datos = {
                usuario: [
                    id_usuario,
                    nombre,
                    apellido,
                    numero_telefono,
                    email,
                    foto_perfil
                ],
                funcion: "cambiar_datos_usuario"
            };

            // console.log(datos);
            
            guardarDatosUsuario(datos);
        }else{
            mostrarMsjError();
        }
        
                    
    });    

    let mostrarMsjError = function () {
        $('#form-perfil-usuario').addClass('was-validated');
        setTimeout(() => {
            $('#form-perfil-usuario').removeClass('was-validated');
        }, 3000);
    }

    setTimeout(() => {
        cargarDatosUsuario();
    }, 400);

}());