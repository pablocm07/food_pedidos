<?php

    session_start();

    // Si existe una sesion abierta asigna a la variable el numero 1        
    $estado_sesion = ( isset( $_SESSION['usuario'] ) ) ? 1 : 0;
    
?>

<!DOCTYPE html>

<html lang="es">

    <head>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="Assets/img/logos/Logo_chef.png" type="image/x-icon" />
        <title>Food Pedidos</title>

        <!-- LINK PARA JQUERY -->
        <script src="Plugins/js/jquery-3.4.1.min.js"></script>

        <!-- Link hacia estilos css (BOOTSTRAP) Y (FA) -->
        <link rel="stylesheet" href="./Plugins/css/Bootstrap/bootstrap.min.css">
        <link rel="stylesheet" href="./Plugins/css/FontAwesome/all.min.css">

        <!-- ESTILOS PARA LA PANTALLA PRINCIPAL -->
        <link rel="stylesheet" href="./Assets/css/principal.css">

    </head>

    <body>

        <!-- <div class="loadingpage m-auto">
            <div class="contenido-loading text-center">
                <img id="img-chef-loading" src="./Assets/img/logos/Logo_chef.png" alt="Logo chef" style="width: 200px;" class="">
                <p><b>C A R G A N D O. . .</b></p>
                <img src="./Assets/img/logos/30.gif" alt="Loading" style="width: 200px;">
            </div>
        </div> -->

        <!-- Para saber el estado de la sesion -->
        <input type="hidden" id="estado-sesion" value="<?php echo $estado_sesion ?>">

        <!-- Aqui inicia las barras de navegacion -->
        <div id="barras-navegacion">
            <!-- ... -->
        </div>
        <!-- Aqui termina las barras de navegacion -->

        <!-- Aqui inicia el contenido de la página -->
        <div id="container">
            <!-- ... -->
        </div>
        <!-- Aqui termina el contenido de la página -->

        <div id="modal-registro">
            <!-- ... -->
        </div>


        <!-- Funciones JS  -->
        <script rel="script" type="text/javascript" src="./Controladores/c_index.js"></script>

        <!-- SCRIPTS DE FUNCIONALIDADES (BOOTSTRAP 4) -->
        <script src="Plugins/js/Bootstrap/popper.min.js"></script>
        <script src="Plugins/js/Bootstrap/bootstrap.min.js"></script>


        <!-- SCRIPT DE SWALERT 2 -->
        <script src="Plugins/js/SweetAlert2/sweetalert2.all.min.js"></script>
        
    </body>    

</html>