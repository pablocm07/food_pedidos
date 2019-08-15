<?php

session_start();

include('../BD/Querys.php');

// Obtener los valores por metodo POST
    if(isset($_POST['funcion']) ){
        $funcion = $_POST['funcion'];    
    }    

// Creacion de objetos para instanciar Clases
    $querys = new Querys;    

// ejecutara el código segun el parametro que reciba
switch ($funcion) {    
    case 'cambiar_datos_usuario':
        // Parametros recibidos
        $usuario = $_POST['usuario'];
        
        /** Pasar todos los parametros recibidos en un arreglo
         * ESTO -> $datos = array() , ES IGUAL A ESTO -> $datos = []   
         */
        $datos = [$usuario[0], $usuario[1], $usuario[2], $usuario[3], $usuario[4]];

        $mensaje['usuario'] = $datos;
        
        // Si existen registros
        if ($datos = $querys->ejecutarProcedure('modificar_usuario',$datos) ) {
            // Valores obtenidos del procedimiento

            if( isset($datos[0]['respuesta']) ){ // Se registro correctamente                
                $mensaje['respuesta'] = 1;
            }
        }else{
            $mensaje['respuesta'] = 0;
        }

        $_SESSION['usuario']['nombre'] = $usuario[1];
        $_SESSION['usuario']['apellido'] = $usuario[2];
        $_SESSION['usuario']['no_telefonico'] = $usuario[3];
        $_SESSION['usuario']['correo_electronico'] = $usuario[4];

    break;

    case 'verificar_email':
        // Parametros recibidos
        $correo = $_POST['correo'];

        // Pasar todos los parametros recibidos en un arreglo        
        $datos = [$correo];

        $consulta = "SELECT COUNT(*) AS usuario_registrado FROM usuarios WHERE correo_electronico = ?;";
        
        if ($datos = $querys->ejecutarConsulta($consulta,$datos) ) {
            if( isset($datos[0]['usuario_registrado']) ){ // Ese usuario no esta registrado
                $mensaje["usuario_registrado"] = $datos[0]['usuario_registrado'];
            }
        }else{
            $mensaje["usuario_registrado"] = 'No se pudo verificar';
        }
    break;    

    break;

    case 'cambiar_contraseña':
        // Parametros recibidos
        $id_usuario = $_POST['id_usuario'];
        $contrasena = $_POST['contrasena'];

        // Pasar todos los parametros recibidos en un arreglo        
        $datos = [$id_usuario];

        $consulta = "UPDATE usuarios SET contrasena = $contrasena WHERE id_usuario = ?;";
        
        if ($datos = $querys->ejecutarQuery($consulta,$datos) ) {
            $mensaje['respuesta'] = 1; // Se modificó correctamente
        }else{
            $mensaje["respuesta"] = 0; // No se pudo actualizar
        }
        
    default:
        # code...
        break;
}    

print json_encode($mensaje, JSON_UNESCAPED_UNICODE);
?>