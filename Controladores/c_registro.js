(function(){

    // Declaracion de variables
    let posicion_ventana = 1;    

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

    /** () para registrar los datos de un nuevo usuario
     * 
     * >> datos: un arreglo con los datos que se van a insertar
     */
    function realizarRegistro(datos){            
        // Peticion por medio de POST
        $.post("./Modelos/m_registro.php", datos ,function(data, status){  
            data = JSON.parse(data);
            
            if(status == 'success'){ // Si la peticion es exitosa                                    
                if (data.respuesta == 1){ // Si se registro correctamente                   
                    
                    // Se cargan las barras de navegacion y contenido
                    $('#barras-navegacion').load('./Vistas/barras_navegacion.html');                    
                    $('#container').load('./Vistas/fondo.html');                     
                    $('#modal-form').modal('toggle');
                    $('.modal-backdrop').remove(); // Para remover el backdrope modal del body

                }else{                    
                    // ...
                }
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
        $('#nombre').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 50)) return false;
        });

        $('#apellido').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 50)) return false;
        });
    
        $('#numero-telefono').keypress(function(tecla) {        
            if(validarNum(this.value.length, tecla, 10)) return false;
        });
    
        $('#email').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 70)) return false;
        });

        $('#usuario-registro').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 20)) return false;
        });

        $('#contrasena-registro').keypress(function(tecla) {        
            if(validarChar(this.value.length, tecla, 20)) return false;
        });

        $('#confirmar-contrasena').keypress(function(tecla) {        
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
    
    $('#btn-siguiente').click(function () {    
        
        let nombre = $('#nombre').val(),
        apellido = $('#apellido').val(),
        email = $('#email').val(),
        numero_telefono = $('#numero-telefono').val(),
        tipo_usuario = $('#tipo-usuario').val(),
        contrasena = $('#contrasena-registro').val(),
        confirmar_contrasena = $('#confirmar-contrasena').val();
            
        if (posicion_ventana == 1){
            if ( validar(nombre) && validar(apellido) && validar(email) ){
                modificarClases(1);
                posicion_ventana = 2;                  
                $('#ventana-pos').text(posicion_ventana);                                
            }else{
                mostrarMsjError();
                return false;
            }
        }else if(posicion_ventana = 2){
            if ( validar(tipo_usuario) && validar(contrasena) && validar(confirmar_contrasena) ){
                if (contrasena == confirmar_contrasena){    
                    
                    // Cargar los datos que seran enviados
                    let datos = {
                        usuario: [
                            nombre,
                            apellido,
                            numero_telefono,
                            tipo_usuario,
                            email,
                            contrasena,
                        ],
                        funcion: "registrar_usuario"
                    };
                    
                    realizarRegistro(datos);

                    // console.log(nombre, apellido, email, numero_telefono, tipo_usuario, usuario, contrasena, confirmar_contrasena);                    
                    // console.log(datos);

                }else{                    
                    $('#confirmar-contrasena').val('');                    
                    $('#contrasena-registro').val('');
                    mostrarMsjError();
                    // return false;
                }
            }else{
                mostrarMsjError();
                // return false;
            }                        
        }
    });;
    
    $('#btn-anterior').click(function () {         
        if (posicion_ventana == 2){
            modificarClases(2);
            posicion_ventana = 1;
            $('#ventana-pos').text(posicion_ventana);  
        }
    });;

    let modificarClases = function (parametro) { 
        if (parametro == 1) {
            $('#div-btn-anterior').addClass('col-4 d-flex flex-row');
            $('#div-btn-cancelar').removeClass('col-4 d-flex flex-row');
            $('#btn-siguiente').removeClass('btn-outline-warning');
            $('#btn-siguiente').addClass('btn-outline-success');
            $('#btn-siguiente').text('Terminar');
            $('#subtitulo').text('Datos de sesión');
            $('#parte-1').addClass('d-none');
            $('#parte-2').removeClass('d-none');
        } else if (parametro == 2){
            $('#div-btn-cancelar').addClass('col-4 d-flex flex-row');
            $('#div-btn-anterior').removeClass('col-4 d-flex flex-row');
            $('#btn-siguiente').removeClass('btn-outline-success');
            $('#btn-siguiente').addClass('btn-outline-warning');
            $('#btn-siguiente').text('Siguiente');
            $('#subtitulo').text('Datos personales');
            $('#parte-2').addClass('d-none');
            $('#parte-1').removeClass('d-none');
        }
    }

    let mostrarMsjError = function () {
        $('#form-registro').addClass('was-validated');
        setTimeout(() => {
            $('#form-registro').removeClass('was-validated');
        }, 3000);
    }

}());