<?php

    include('../BD/Querys.php');

    session_start();

    // Obtener los valores por metodo POST    
    if (isset($_POST['funcion'])) {
        $funcion = $_POST['funcion'];
    }

    // $funcion = 'actualizar_ingrediente';


    // Creacion de objetos para instanciar Clases
    $querys = new Querys;
    $mensaje;


    // ejecutara el código segun el parametro que reciba
    switch ($funcion) {

        case 'insertar_nuevo_ingrediente':

            //SE OBTIENE EL LOCAL QUE ADMINISTRA EL USUARIO            
            $id_local = $_SESSION['local']['id_local'];

            // Parametros recibidos            
            $nombre_ingrediente = $_POST['nombre_ingrediente'];            

            $datos_a_insertar = [$nombre_ingrediente, $id_local];            

            $consulta = 'INSERT INTO ingredientes (id_ingrediente, nombre, id_local, id_estado) 
            VALUES (NULL, ?, ?, "3");';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_insertar) ) {            
                if( isset($respuesta_bd) ){ // SE INSERTO CORRECTAMENTE
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{//NO SE PUDO INSERTAR CORRECTAMENTE
                $mensaje['estado'] = 'Lo sentimos, este local aun no ha agregado ningun platillo a su menú';
            }
            break;

        case 'consultar_ingredientes':

            $id_local[0] = $_SESSION['local']['id_local'];                     

            $consulta = "SELECT * FROM ingredientes WHERE id_local = ? AND id_estado = '3';";
            
            if ($datos = $querys->ejecutarConsulta($consulta,$id_local) ) {
                if( isset($datos[0]) ){ // Ese usuario no esta registrado            
                    $mensaje['ingredientes'] = $datos;                    
                    $mensaje['estado'] = 'Tiene ingredientes';
                }
            }else{
                $mensaje['estado'] = 'Sin ingredientes';
            }
            
            break;

        case 'actualizar_ingrediente':

            // Parametros recibidos            
            $nombre_ingrediente = $_POST['nombre_ingrediente'];            
            $id_ingrediente = $_POST['id_ingrediente'];            
            // $nombre_ingrediente = 'Salchicha';            
            // $id_ingrediente = '18';            

            $datos_a_actualizar = [$nombre_ingrediente, $id_ingrediente];            

            $consulta = 'UPDATE ingredientes SET nombre = ? WHERE id_ingrediente = ?;';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_actualizar) ) {            
                if( isset($respuesta_bd) ){ // SE INSERTO CORRECTAMENTE
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{//NO SE PUDO INSERTAR CORRECTAMENTE
                $mensaje['estado'] = 'Lo sentimos, no se ha podido actualizar';
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

        case 'eliminar_ingrediente_platillo':

            // Parametros recibidos                             
            $id_detalle_platillo = [ $_POST['id_detalle_platillo'] ];

            $consulta = 'UPDATE detalle_platillo SET id_estado = "4" WHERE id_detalle_platillo = ?;';            

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $id_detalle_platillo) ) {            
                if( isset($respuesta_bd) ){ // SE INSERTO CORRECTAMENTE
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{//NO SE PUDO INSERTAR CORRECTAMENTE
                $mensaje['estado'] = 'Lo sentimos, no se ha podido actualizar';                
            }
            break;

        default:
            # code...
            break;
    }

    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);

?>