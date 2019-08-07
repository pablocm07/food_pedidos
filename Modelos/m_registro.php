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
    case 'registrar_usuario':
        // Parametros recibidos
        $usuario = $_POST['usuario'];
        
        /** Pasar todos los parametros recibidos en un arreglo
         * ESTO -> $datos = array() , ES IGUAL A ESTO -> $datos = []   
         */
        $datos = [$usuario[0], $usuario[1], $usuario[2], $usuario[3], $usuario[4], $usuario[5]];
        
        // Si existen registros
        if ($datos = $querys->ejecutarProcedure('registrar_usuario',$datos) ) {
            // Valores obtenidos del procedimiento

            if( isset($datos[0]['id_usuario']) ){ // Se registro correctamente
                // $mensaje['respuesta'] = $datos[0]['respuesta'];
                $mensaje['respuesta'] = 1;   
                $datos_usuario = $datos[0];             
            }
        }else{
            $mensaje['respuesta'] = 0;
        }

        // Si los datos son correctos, se debe guardar la informacion del usuario en variables de $_SESSION[]                                
        // $_SESSION['id_usuario'] = $usuario[];
        $_SESSION['usuario'] = $datos_usuario;

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
        
    default:
        # code...
        break;
}    

print json_encode($mensaje, JSON_UNESCAPED_UNICODE);
?>