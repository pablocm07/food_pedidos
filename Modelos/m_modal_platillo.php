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
    case 'get_datos_pedido':
        // Parametros recibidos
        // $usuario = $_POST['usuario'];    

        $_SESSION['pedidos']['pedido']['id_local'] = 2;        
        $mensaje['pedidos'] = $_SESSION['pedidos'];

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