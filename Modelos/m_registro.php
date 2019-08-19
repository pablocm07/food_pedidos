<?php
    session_start();
    include('../BD/Querys.php');
    // Obtener los valores por metodo POST
    if (isset($_POST['funcion'])) {
        $funcion = $_POST['funcion'];
    }
    // Creacion de objetos para instanciar Clases
    $querys = new Querys;
    // ejecutara el código segun el parametro que reciba
    switch ($funcion) {
        case 'registrar_usuario':
            // Parametros recibidos
            $usuario = $_POST['usuario'];
            /** Pasar todos los parametros recibidos en un arreglo
             * ESTO -> $datos = array() , ES IGUAL A ESTO -> $datos = []   
             */
            $datos = [$usuario[0], $usuario[1], $usuario[2], $usuario[3], $usuario[4], $usuario[5]];
            // $_SESSION['usuario'] = [$usuario[0], $usuario[1], $usuario[2], $usuario[3], $usuario[4], $usuario[5]];
            // Si existen registros
            if ($datos = $querys->ejecutarProcedure('registrar_usuario', $datos)) {
                // Valores obtenidos del procedimiento
                // print_r($datos[0]['id_usuario']);
                if (isset($datos[0])) { // Se registro correctamente
                    // $mensaje['respuesta'] = $datos[0]['respuesta'];
                    $mensaje['respuesta'] = 1;
                    $datos_usuario = $datos[0];
                }
            } else {
                $mensaje['respuesta'] = 0;
            }
            // Si los datos son correctos, se debe guardar la informacion del usuario en variables de $_SESSION[]                                
            // $_SESSION['id_usuario'] = $usuario[];
            $_SESSION['usuario'] = $datos_usuario;
            // print_r($_SESSION['usuario']);
            // print_r($datos);
            break;
            // En este caso es para validar los datos del usuario para logearlo
        case 'logeo':
            // Parametros recibidos
            $correo = $_POST['correo'];
            $contrasena = $_POST['contrasena'];
            /** Pasar todos los parametros recibidos en un arreglo
             * ESTO -> $datos = array() , ES IGUAL A ESTO -> $datos = []   
             */
            $datos = [$correo, $contrasena];
            $r_correo = "";
            $r_contrasena = "";
            // Si existen registros
            if ($datos = $querys->ejecutarProcedure('consultar_usuario', $datos)) {
                // Valores obtenidos del procedimiento
                if (isset($datos[0]['respuesta'])) { // Ese usuario no esta registrado
                    $respuesta = $datos[0]['respuesta'];
                } else {                   

                    $r_id_usuario = (isset($datos[0]['id_usuario'])) ? $datos[0]['id_usuario'] : '';
                    $r_nombre = (isset($datos[0]['nombre'])) ? $datos[0]['nombre'] : '';
                    $r_apellido = (isset($datos[0]['apellido'])) ? $datos[0]['apellido'] : '';
                    $r_numero_telefonico = (isset($datos[0]['no_telefonico'])) ? $datos[0]['no_telefonico'] : '';
                    $r_tipo_usuario = (isset($datos[0]['tipo_usuario'])) ? $datos[0]['tipo_usuario'] : '';
                    $r_correo = (isset($datos[0]['correo_electronico'])) ? $datos[0]['correo_electronico'] : '';
                    $r_contrasena = (isset($datos[0]['contrasena'])) ? $datos[0]['contrasena'] : '';
                    $datos_usuario = $datos[0];

                    //SI EL TIPO DE USUARIO ES LOCATARIO                    
                    if ($r_tipo_usuario == "2") {
                        $querys = new Querys;
                        $consulta = 'SELECT * FROM locales WHERE id_usuario = ?';
                        $datos_local = $querys->ejecutarConsulta($consulta, $r_id_usuario);

                        //SETEAN LA VARIABLE DE SESION PARA EL LOCAL
                        $_SESSION['local'] = $datos_local[0];
                    }
                }
            }
            // Validar que los datos sean iguales, diferenciando entre Mayusculas y Minusculas
            if ((strcmp($r_correo, $correo) === 0)  && (strcmp($r_contrasena, $contrasena) === 0)) {
                // Si los datos son correctos, se debe guardar la informacion del usuario en variables de $_SESSION[]                                    
                $_SESSION['usuario'] = $datos_usuario;
                $mensaje["valido"] = 1;
                $mensaje["estado"] = "Los datos son correctos";
                $mensaje["usuario"] = $datos;
            } else {
                $mensaje["valido"] = 0;
                $mensaje["estado"] = "¡El correo o la contraseña son incorrectos!";
            }
            // Para saber cuantos registros esta regresando
            // $mensaje = count($datos);
            break;
        case 'verificar_email':
            // Parametros recibidos
            $correo = $_POST['correo'];
            // Pasar todos los parametros recibidos en un arreglo        
            $datos = [$correo];
            $consulta = "SELECT COUNT(*) AS usuario_registrado FROM usuarios WHERE correo_electronico = ?;";
            if ($datos = $querys->ejecutarConsulta($consulta, $datos)) {
                if (isset($datos[0]['usuario_registrado'])) { // Ese usuario no esta registrado
                    $mensaje["usuario_registrado"] = $datos[0]['usuario_registrado'];
                }
            } else {
                $mensaje["usuario_registrado"] = 'No se pudo verificar';
            }
            break;
        case 'cerrar_sesion':
            // Eliminar todas las variables de sesion
            session_unset();
            // Destruir la sesion
            session_destroy();
            $mensaje['Valido'] = 1;
            break;
        case 'datos_sesion':
            $array = ['usuario' => $_SESSION['usuario']];
            $mensaje = $array;
            break;
        default:
            # code...
            break;
    }
    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);

?>