<?php

$id_platillo = (isset($_POST['id_platillo'])) ? $_POST['id_platillo'] : '';
$nombre_platillo = (isset($_POST['nombre_platillo'])) ? $_POST['nombre_platillo'] : '';
$precio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
$tiempo_preparacion = (isset($_POST['tiempo_preparacion'])) ? $_POST['tiempo_preparacion'] : '';
$cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';
$ubicacion_imagen = (isset($_POST['ubicacion_imagen'])) ? $_POST['ubicacion_imagen'] : '';

?>

<!-- CONTENEDOR DE LA IMAGEN PARA EL PLATILLO NUMERO 1 -->
<div class="view view-cascade">
    <img id='imagen_platillo_1' class="card-img-top" src="<?php echo $ubicacion_imagen;?>" 
        alt="La imagen puede contener un platillo, una figura o un logotipo." style="height:180px;">
</div>
<!-- CONTENEDOR DE LA IMAGEN PARA EL PLATILLO NUMERO 1 -->

<!-- Card content -->
<div id="<?php echo $id_platillo;?>" class="card-body card-body-cascade clik-mostrar-platillo">

    <!-- Label -->
    <h5 class="blue-grey-text pb-2 pt-1"><i class="fas fa-utensils"></i> Comida rápida
    </h5>
    <!-- Title -->
    <h4 class="font-weight-bold card-title color-food-fontBrown"><?php echo $nombre_platillo."   ";?> x <?php echo $cantidad;?></h4>
    <!-- Text -->
    <p class="card-text heigh-30"><?php echo $descripcion;?>
    </p>
    <!-- Button -->

    <div class="container mt-3">

        <a class="m-auto btn-floating btn-action bg-food-brown p-0">
        <i class="fas fa-concierge-bell"></i></a>
        
        <h5 class="mt-3 text-center color-food-fontBrown">
            Pedir Ahora
        </h5>

    </div>
</div>

<!-- Card footer -->
<div class="card-footer text-muted text-center btn-brown">
    <ul class="list-unstyled font-small ">
        <li class="list-inline-item d-inline-block white-text">
            <i class="far fa-clock pr-1"></i>
            <span id='tiempo_espera'><?php echo $tiempo_preparacion;?></span> min.
        </li>
    </ul>
</div>