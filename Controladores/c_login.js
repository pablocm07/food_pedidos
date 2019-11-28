(function() {

    /** Signos usados para identificar los conceptos utilizados en los comentarios
     * () Para describir a una funcion
     * {} Para describir un ciclo
     * >> Para describir parametros de una funcion
     * @@ Para describir un valor que devuelve una funcion
     * [TYPE] Para saber el tipo de variable que se esta usando en la funcion
     * 
     * // Para una simple descripción o alguna parte de codigo que este comentado
     */

    // Declaracion de variables
    let correo,
        contrasena,
        registro_en_proceso = false;

    /** () para validar que un campo no este vacio
     * 
     * >> elemento: recibe el valor de un elemento - [String]
     * @@ Boleano: Es verdadero si no esta vacio - [Boolean]
     * 
     */
    function validar(texto_tecleado) {
        if (texto_tecleado === "") {
            return false; // Esta vacio
        } else {
            return true; // No esta vacio
        }
    }

    /** () para permitir unicamente numeros y letras cuando escriben en un input
     * 
     * >> total_caracteres: numero total de caracteres - 1 - [Int]
     * >> tecla: codigo ASCII de la tecla que fue presionada - [Int]
     * >> caracteres_permitidos: numero maximo permitido de caracteres
     * @@ Boleano: Retorna el valor Verdadero en caso de cumplir con las condiciones - [Boolean]
     * 
     * */
    function validarChar(total_caracteres, tecla, caracteres_permitidos) {
        if (total_caracteres + 1 > caracteres_permitidos) {
            // console.log(total);
            return true;
        }
        if (
            // Tipos de caracteres que se desean permitir. Solo comentar o descomentar la linea
            (tecla.charCode < 96 || tecla.charCode > 122) // Permitir a - z
            &&
            (tecla.charCode < 65 || tecla.charCode > 90) // Permitir A - Z
            &&
            (tecla.charCode < 48 || tecla.charCode > 57) // Permitir números 0 - 9      
            &&
            (tecla.charCode != 241) // Permitir la ñ
            &&
            (tecla.charCode != 64) // Permitir el @
            &&
            (tecla.charCode != 46) // Permitir el @
            // && (tecla.charCode != 237 && tecla.charCode != 243 && tecla.charCode != 250 && tecla.charCode != 233 && tecla.charCode != 225) // Permitir acentos á - ú
            // && (tecla.charCode != 237 && tecla.charCode != 243 && tecla.charCode != 250 && tecla.charCode != 233 && tecla.charCode != 225) // permitir acentos Á - Ú
        ) {
            return true;
        }
    }

    /** () para verificar que el correo y la contraseña sean correctos y 
     *  enviar los datos
     * 
     * >> datos: un arreglo con todos los datos que seran enviados - [Array]
     * 
     */
    function enviarPeticion(datos) {
        // Peticion por medio de POST
        $.post("./Modelos/m_login.php", datos, function (data, status) {  
            // console.log(data);                      
            data = JSON.parse(data);
            let usuario = data.usuario;
            if (status == 'success') { // Si la peticion es exitosa  
                // console.log(data.correo[0].nombre);
                if (data.valido == 1) { // Si los datos son correctos                                         
                    // Se cargan las barras de navegacion y contenido
                    setTimeout(() => {                        
                        $('#container').load('./Vistas/fondo.html');
                        $('#barras-navegacion').load('./Vistas/barras_navegacion.html');
                    }, 1500);

                } else {

                    // $('#correo').val('');
                    $('#contrasena').val('');
                    $('#contrasena').focus();

                    Swal.fire({
                        type: 'error',
                        title: data.estado,
                        buttonsStyling: false,
                        confirmButtonText: 'Intentalo de nuevo.',
                        confirmButtonClass: 'btn btn-lg btn-outline-info',
                        footer: '<a href>¿No recuerdas tu contraseña?</a>'
                    });
                }
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
    $('#correo').keypress(function(tecla) {
        if (validarChar(this.value.length, tecla, 70)) return false;
    });

    $('#contrasena').keypress(function(tecla) {
        if (validarChar(this.value.length, tecla, 20)) return false;
    });

    // () para validar los datos e iniciar sesion
    $('#iniciar').click(function() {

        // Obtener los valores de cada elemento      
        correo = $('#correo').val();
        contrasena = $('#contrasena').val();

        if (validar(correo) && validar(contrasena)) { // Se valida que no esten vacios

            // Cargar los datos que seran enviados
            let datos = {
                correo: correo,
                contrasena: contrasena,
                funcion: "logeo"
            };

            enviarPeticion(datos);

        } else {
            /** se agrega una clase para mostrar en rojo los campos que deben estar llenos */
            $("#form-login").toggleClass('was-validated');
            setTimeout(() => {
                $("#form-login").removeClass('was-validated');
            }, 3000);
        }

    });

    $('#registrar').click(function() {
        if (registro_en_proceso == false) {
            $('#modal-titulo').empty();
            $('#modal-cuerpo').empty();
            $('#modal-titulo').prepend('Registrate');
            $('#modal-cuerpo').load('./Vistas/v_registro.html');
            // $('body').addClass('');
            registro_en_proceso = true;
        }
        $('#modal-form').modal('toggle');
    });

}());