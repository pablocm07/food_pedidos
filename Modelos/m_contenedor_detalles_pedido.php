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

        case 'get_detalle_pedido':            
            
            $array = ['detalle_pedido' => (isset($_SESSION['pedidos'])) ? $_SESSION['pedidos'] : 0];

            $mensaje = $array;
            break;

        default:
            # code...
            break;
    }

    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);
    
?>