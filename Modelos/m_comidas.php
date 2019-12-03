<?php

include('../BD/Querys.php');

// Obtener los valores por metodo POST
    if(isset($_POST['funcion']) ){
        $funcion = $_POST['funcion'];    
    }    

// Creacion de objetos para instanciar Clases
    $querys = new Querys;    

// ejecutara el código segun el parametro que reciba
switch ($funcion) {    
    case 'consultar_locales':

        $datos = [8];

        $consulta = "SELECT * FROM locales WHERE id_estado = ?;";
        
        if ($datos = $querys->ejecutarConsulta($consulta,$datos) ) {
            if( isset($datos[0]) ){ // Ese usuario no esta registrado            
                $mensaje['info'] = $datos;
                $mensaje['estado'] = 'Existen registros';
            }
        }else{
            $mensaje["estado"] = 'Lo sentimos, no se encuentra disponible ningun negocio de comida';
        }
    break;

    case 'consultar_platillos':
        // Parametros recibidos
        $id_local = $_POST['id_local'];

        $datos = [$id_local];

        $consulta = "SELECT * FROM platillos WHERE id_local = ?;";
        
        if ($datos = $querys->ejecutarConsulta($consulta,$datos) ) {
            if( isset($datos[0]) ){ // Ese usuario no esta registrado            
                $mensaje['info'] = $datos;
                $mensaje['estado'] = 'Existen registros';
            }
        }else{
            $mensaje['estado'] = 'Lo sentimos, este local aún no ha agregado ningún platillo a su menú';
        }
    break;
    
    case 'datos_sesion':
        $array = ['nombre' => $_SESSION['nombre']];

        $mensaje = $array;
    break;
        
    default:
        # code...
        break;
}    

print json_encode($mensaje, JSON_UNESCAPED_UNICODE);
?>