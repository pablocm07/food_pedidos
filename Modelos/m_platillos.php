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

    $a = 0;


    // ejecutara el código segun el parametro que reciba
    switch ($funcion) {

        case 'insertar_nuevo_platillo':

            //SE OBTIENE EL LOCAL QUE ADMINISTRA EL USUARIO                        
            $id_local = $_SESSION['local']['id_local'];

            // Parametros recibidos         
            $nombre_platillo = $_POST['nombre_platillo'];
            $precio_platillo = $_POST['precio_platillo'];
            $precio_extra_platillo = $_POST['precio_extra_platillo'];            
            $tiempo_preparacion = $_POST['tiempo_preparacion'];
            $cantidad = $_POST['cantidad'];
            $descripcion = $_POST['descripcion'];
            
            $datos_a_insertar = [$id_local, $nombre_platillo, $precio_platillo, $precio_extra_platillo, $tiempo_preparacion, $cantidad,  $descripcion];            

            $consulta = 'INSERT INTO platillos (id_platillo, id_local, nombre_platillo, precio, precio_ing_extra, tiempo_preparacion, cantidad, descripcion, id_estado)
             VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, "3");';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_insertar) ) {            
                if( isset($respuesta_bd) ){ // Ese usuario no esta registrado            
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{
                $mensaje['estado'] = 'Lo sentimos, no se pudo agregar correctamente el platillo';
            }
            break;

        case 'consultar_platillos':

            $id_local[0] = $_SESSION['local']['id_local'];                     

            $consulta = "SELECT * FROM platillos WHERE id_local = ? AND id_estado = '3';";
            
            if ($datos = $querys->ejecutarConsulta($consulta,$id_local) ) {
                if( isset($datos[0]) ){ // Ese usuario no esta registrado            
                    $mensaje['platillos'] = $datos;                    
                    $mensaje['estado'] = 'Tiene platillos';
                }
            }else{
                $mensaje['estado'] = 'Sin platillos';
            }
            
            break;        

        case 'insertar_ingrediente_platillo':

            // Parametros recibidos            
            $id_platillo = $_POST['id_platillo'];         
            $id_ingrediente = $_POST['id_ingrediente'];
           
            $datos_a_insertar = [$id_platillo, $id_ingrediente];

            $consulta = 'INSERT INTO detalle_platillo (id_detalle_platillo, id_platillo, id_ingrediente, id_estado)
             VALUES (NULL, ?, ?, "3");';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_insertar) ) {            
                if( isset($respuesta_bd) ){ // Ese usuario no esta registrado            
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{
                $mensaje['estado'] = 'Lo sentimos, no se pudo agregar correctamente el platillo';
            }
            break;

        case 'consultar_ingredientes_platillo':
            
            // Parametros recibidos
            $id_platillo[0] = $_POST['id_platillo'];                   

            $consulta = "SELECT detalle_platillo.*, ingredientes.nombre FROM detalle_platillo
                            INNER JOIN ingredientes ON ingredientes.id_ingrediente  = detalle_platillo.id_ingrediente
                            WHERE detalle_platillo.id_platillo = ? AND detalle_platillo.id_estado = '3';;";                        

            if ($datos = $querys->ejecutarConsulta($consulta, $id_platillo) ) {
                if( isset($datos[0]) ){ // Ese usuario no esta registrado            
                    $mensaje['ingredientes'] = $datos;                    
                    $mensaje['estado'] = 'Tiene ingredientes';
                }
            }else{
                // $mensaje['estado'] = 'Sin ingredientes';
                $mensaje['estado'] = $id_platillo;
            }
            
            break;

        case 'eliminar_ingrediente':

            // Parametros recibidos                             
            $id_ingrediente[0] = $_POST['id_ingrediente'];                                              

            $consulta = 'UPDATE ingredientes SET id_estado = "4" WHERE id_ingrediente = ?;';            

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $id_ingrediente) ) {            
                if( isset($respuesta_bd) ){ // SE INSERTO CORRECTAMENTE
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{//NO SE PUDO INSERTAR CORRECTAMENTE
                $mensaje['estado'] = 'Lo sentimos, no se ha podido actualizar';
            }
            break;

        case 'eliminar_platillo':

            // Parametros recibidos                             
            $id_platillo = [ $_POST['id_platillo'] ];

            $consulta = 'UPDATE platillos SET id_estado = "4" WHERE id_platillo = ?;';            

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $id_platillo) ) {            
                if( isset($respuesta_bd) ){ // SE INSERTO CORRECTAMENTE
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{//NO SE PUDO INSERTAR CORRECTAMENTE
                $mensaje['estado'] = 'Lo sentimos, no se ha podido eliminar';                
            }
            break;

        default:
            # code...
            break;
    }

    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);

?>
