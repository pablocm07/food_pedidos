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

    // FUNCION QUE SETEA DE MANERA GLOBAL LOS DATOS DEL LOCAL DEL USUARIO
    function datosLocal($id_usuario)
    {
        $querys = new Querys;
        $consulta = 'SELECT * FROM locales WHERE id_usuario = ?';
        $datos_local = $querys->ejecutarConsulta($consulta, $id_usuario);

        //SETEAN LA VARIABLE DE SESION PARA EL LOCAL
        $_SESSION['local'] = $datos_local[0];
    }


    // ejecutara el código segun el parametro que reciba
    switch ($funcion) {

        case 'insertar_nuevo_ingrediente':

            //SE OBTIENE EL LOCAL QUE ADMINISTRA EL USUARIO
            $id_usuario = [$_SESSION['usuario']['id_usuario']];
            $consulta_local = datosLocal($id_usuario);
            $id_local = $_SESSION['local']['id_local'];

            // Parametros recibidos            
            $nombre_ingrediente = $_POST['nombre_ingrediente'];
            $precio_ingrediente = $_POST['precio_ingrediente'];

            $datos_a_insertar = [$nombre_ingrediente, $precio_ingrediente, $id_local];            

            $consulta = 'INSERT INTO ingredientes (id_ingrediente, nombre, precio, id_local, id_estado) 
            VALUES (NULL, ?, ?, ?, "1");';

            if ($respuesta_bd = $querys->ejecutarQuery($consulta, $datos_a_insertar) ) {            
                if( isset($respuesta_bd) ){ // Ese usuario no esta registrado            
                    $mensaje['respuesta'] = $respuesta_bd;                                     
                }

            }else{
                $mensaje['estado'] = 'Lo sentimos, este local aun no ha agregado ningun platillo a su menú';
            }
            break;

        default:
            # code...
            break;
    }

    print json_encode($mensaje, JSON_UNESCAPED_UNICODE);

?>