    <?php
$nombre_local = ( isset($_POST['nombre_local']) ) ? $_POST['nombre_local'] : '';
$tipo_local = ( isset($_POST['tipo_local']) ) ? $_POST['tipo_local'] : '';
$foto_logo = ( isset($_POST['foto_logo']) ) ? $_POST['foto_logo'] : '';
$descripcion = ( isset($_POST['descripcion']) ) ? $_POST['descripcion'] : '';
$horario_abrir = ( isset($_POST['horario_abrir']) ) ? $_POST['horario_abrir'] : '';
$horario_cerrar = ( isset($_POST['horario_cerrar']) ) ? $_POST['horario_cerrar'] : '';
$id_estado = ( isset($_POST['id_estado']) ) ? $_POST['id_estado'] : '';
?>

<!-- CONTENEDOR DE LA TARJETA -->
<!-- <div class="card booking-card"> -->
<div class="card card-cascade wider">

    <!-- IMAGEN DEL LOCAL -->
    <div class="view view-cascade">
        <img class="card-img-top" style="height:148px; max-height: 148px; " src="<?php echo$foto_logo; ?>"
            alt="La imagen puede contener una persona, objeto o logotipo">
    </div>
    <!-- FIN DEL IMAGEN DEL LOCAL -->



    <!-- CONTENIDO DE LA TARJETA -->
    <div class="card-body card-body-cascade">

        <!-- NOMBRE DEL LOCAL -->
        <h4 id="nombre-local_1" class="card-title font-weight-bold"><?php echo $nombre_local; ?></h4>

        <!-- CONTENEDOR DE RATING CON EL QUE CUENTA EL LOCAL -->
        <ul class="list-unstyled list-inline rating mb-0">

            <!-- ESTRELLAS DE RATING -->
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i>
            </li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i>
            </li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i>
            </li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i>
            </li>
            <li class="list-inline-item"><i class="far fa-star amber-text"></i></li>
            <!-- ESTRELLAS DE RATING -->

            <!-- VOTACIONES CON NUMERO -->
            <li class="list-inline-item">
                <p id="promedio_rating_1" class="text-muted">4.0 <span
                        id='numero_votaciones_1'>(413)</span></p>
            </li>
            <!-- VOTACIONES CON NUMERO -->

        </ul>
        <!-- FIN DEL CONTENEDOR DE RATING CON EL QUE CUENTA EL LOCAL -->

        <!-- RANGO DE PRECIOS Y TIPO DE LOCAL -->
        <p id='rango_precios_1' class="mb-2">$$ • 
            <span id='tipo_local_1'><?php echo $tipo_local; ?></span>
        </p>
        <!-- RANGO DE PRECIOS Y TIPO DE LOCAL -->

        <!-- DESCRIPCION DEL LOCAL -->
        <p id='descripcion_local_1' class="card-text">
            <?php echo $descripcion; ?>
        </p>
        <!-- DESCRIPCION DEL LOCAL -->

        <!-- SEPARADOR -->
        <hr class="my-4">
        <!-- SEPARADOR -->

        <!-- DESCRIPCION DE APERTURA DEL LOCAL -->
        <p class="lead"><strong>Abre desde:</strong></p>
        <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">

            <li class="list-inline-item mr-auto">
                <div id='hora_abierto' class="green lighten-1 text-white chip mr-0">
                    <?php echo $horario_abrir; ?> AM</div>
            </li>

        </ul>
        <!-- DESCRIPCION DE APERTURA DEL LOCAL -->

        <!-- DESCRIPCION DE CIERRE DEL LOCAL -->
        <p class="lead"><strong>Cerrado desde:</strong></p>
        <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">

            <li class="list-inline-item mr-0">
                <div id="hora_cerrado" class="orange lighten-1 text-white chip mr-0">
                    <?php echo $horario_cerrar; ?> PM</div>
            </li>

        </ul>
        <!-- DESCRIPCION DE CIERRE DEL LOCAL -->

    </div>
    <!-- FIN DEL CONTENIDO DE LA TARJETA -->

</div>
<!-- CONTENEDOR DE LA TARJETA -->
