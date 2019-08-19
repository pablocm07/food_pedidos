<?php

    include('../BD/Querys.php');

    session_start();

    // Obtener los valores por metodo POST    
    if (isset($_POST['funcion'])) {
        $funcion = $_POST['funcion'];
    }


    // Creacion de objetos para instanciar Clases
    $querys = new Querys;
    $mensaje;


    // ejecutara el código segun el parametro que reciba
    switch ($funcion) {

        case 'insertar_nuevo_platillo':

            //SE OBTIENE EL LOCAL QUE ADMINISTRA EL USUARIO                        
            $id_local = $_SESSION['local']['id_local'];

            // Parametros recibidos            
            $nombre_platillo = $_POST['nombre_platillo'];
            $precio_platillo = $_POST['precio_platillo'];
            $tiempo_preparacion = $_POST['tiempo_preparacion'];
            $cantidad = $_POST['cantidad'];
            $descripcion = $_POST['descripcion'];
            
            $datos_a_insertar = [$id_local, $nombre_platillo, $precio_platillo, $tiempo_preparacion, $cantidad,  $descripcion];            

            $consulta = 'INSERT INTO platillos (id_platillo, id_local, nombre_platillo, precio, tiempo_preparacion, cantidad, descripcion, id_estado)
             VALUES (NULL, ?, ?, ?, ?, ?, ?, "3");';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_insertar) ) {            
                if( isset($respuesta_bd) ){ // Ese usuario no esta registrado            
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{
                $mensaje['estado'] = 'Lo sentimos, no se pudo agregar correctamente el platillo';
            }
            break;

        default:
            # code...
            break;
    }

    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);

?>
