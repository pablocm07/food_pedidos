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
        $id_local = $_POST['id_local'];        
        $id_usuario = $_SESSION['usuario']['id_usuario'];

        $datos = [$id_local, $id_usuario];

        if ($datos = $querys->ejecutarProcedure('agregar_pedido', $datos)) {
            
            if (isset($datos[0]['id_pedido'])) { //                 
                $mensaje['id_pedido'] = $datos[0]['id_pedido'];
                $mensaje['nuevo_pedido'] = $datos[0]['nuevo_pedido'];
                $mensaje['precio_existente'] = $datos[0]['precio_existente'];
            }
        } else {
            $mensaje['respuesta'] = 0;
        }
        
    break;

    case 'get_detalle_platillo':
        // Parametros recibidosregistrar_detalle_pedido
        $id_platillo = $_POST['id_platillo'];

        // Pasar todos los parametros recibidos en un arreglo        
        $datos = [$id_platillo];

        $consulta = "SELECT dp.*, i.nombre FROM detalle_platillo dp
        INNER JOIN ingredientes i ON i.id_ingrediente = dp.id_ingrediente
        WHERE dp.id_platillo = ?";
        
        if ($datos = $querys->ejecutarConsulta($consulta,$datos) ) {
            if( isset($datos[0]) ){ // Ese usuario no esta registrado
                $mensaje["info"] = $datos;
            }
        }else{
            $mensaje["sin_registros"] = 'No hay ingredientes para este alimento';
        }
    break;        

    case 'registrar_detalle_pedido':
        // Parametros recibidos
        $id_platillo = $_POST['id_platillo'];        
        $id_pedido = $_POST['id_pedido'];        
        $precio_platillo = $_POST['precio_platillo'];        
        $comentario_platillo = $_POST['comentario_platillo'];          

        $datos = [$id_platillo, $id_pedido, $precio_platillo, $comentario_platillo, 10];

        if ($datos = $querys->ejecutarProcedure('registrar_detalle_pedido', $datos)) {
            
            if (isset($datos[0]['id_detalle_pedido'])) { //                 
                $mensaje['id_detalle_pedido'] = $datos[0]['id_detalle_pedido'];
            }
        } else {
            $mensaje['respuesta'] = 0;
        }

    break;

    case 'agregar_detalle_ingrediente':
        // Parametros recibidos
        $id_detalle_pedido = $_POST['id_detalle_pedido'];
        $id_ingrediente = $_POST['id_ingrediente'];

        $datos = [$id_detalle_pedido, $id_ingrediente];

        if ($datos = $querys->ejecutarProcedure('agregar_detalle_ingrediente', $datos)) {
            
            if (isset($datos[0]['id_detalle_ingrediente'])) { //                 
                $mensaje['id_detalle_ingrediente'] = $datos[0]['id_detalle_ingrediente'];
            }
        } else {
            $mensaje['respuesta'] = 0;
        }

    break;
        
    default:
        # code...
        break;
}    

print json_encode($mensaje, JSON_UNESCAPED_UNICODE);
?>