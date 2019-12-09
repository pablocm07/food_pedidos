<?php

    $id_platillo = (isset($_POST['id_platillo'])) ? $_POST['id_platillo'] : '';
    $nombre_platillo = (isset($_POST['nombre_platillo'])) ? $_POST['nombre_platillo'] : '';
    $precio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
    $precio_ing_extra = (isset($_POST['precio_ing_extra'])) ? $_POST['precio_ing_extra'] : '';
    $tiempo_preparacion = (isset($_POST['tiempo_preparacion'])) ? $_POST['tiempo_preparacion'] : '';
    $cantidad = (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
    $descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';    

?>
<!-- CONTENEDOR DE PLATILLO INDIVIDUAL -->
<div class="card">

    <!-- NOMBRE DEL PLATILLO Y SUS OPCIONES -->
    <div class="card-header" role="tab" id="platillo_1">

        <!-- DROPDOWN DE OPCIONES PARA EL PLATILLO -->
        <div class="dropdown float-left mt-1">
            
            <button class="btn btn-warning btn-sm m-0 mr-3 p-2 dropdown-toggle" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v-alt mr-1"></i> Opciones
            </button>

            <!-- OPCIONES PARA EL PLATILLO -->
            <div id='opciones_platillo' class="dropdown-menu dropdown-warning">
                <a id="nuevo_ingrediente" id_platillo="<?php echo($id_platillo); ?>" class="dropdown-item" href="#">
                    <i class="fal fa-plus-circle fa-fw" aria-hidden="true"></i>
                    Agregar un nuevo ingrediente
                </a>
                <a id="editar_platillo" class="dropdown-item" href="#">
                    <i class="fal fa-pencil-alt fa-fw" aria-hidden="true"></i>
                    Editar el Platillo
                </a>
                <a id="eliminar_platillo" class="dropdown-item" href="#">
                    <i class="fal fa-minus-circle fa-fw" aria-hidden="true"></i>
                    Eliminar este platillo
                </a>
            </div>
            <!-- OPCIONES PARA EL PLATILLO -->

        </div>
        <!-- DROPDOWN DE OPCIONES PARA EL PLATILLO -->

        <!-- TITULO DEL PLATILLO -->
        <a data-toggle="collapse" data-parent="#acordeon-platillos" href="#collapse_platillo_1" aria-expanded="true"
            aria-controls="collapse_platillo_1">
            <h5 class="mt-2 mb-0 text-warning">
                <i class="fad fa-utensils fa-w"></i>
                <span id="nombre_platillo" class="font-weight-bolder"><?php echo($nombre_platillo); ?></span>
                <i class="fas fa-angle-down rotate-icon fa-2x"></i>
            </h5>
        </a>

    </div>
    <!-- NOMBRE DEL PLATILLO Y SUS OPCIONES -->

    <!-- CONTENEDOR DE LOS INGREDIENTES PARA CADA PLATILLO -->
    <div id="collapse_platillo_1" class="collapse show" role="tabpanel" aria-labelledby="heading4"
        data-parent="#acordeon-platillos">

        <!-- CONTENEDOR DE LA DISPONIBILIDAD DEL PLATILLO -->
        <div class="contenedor-disponibilidad my-2 ">

            <a href="#">

                <small class="">
                    ¿Aún esta disponible este platillo?
                </small>

            </a>

            <!-- Material checked -->
            <div class="switch">
                <label>
                    NO
                    <input type="checkbox">
                    <span class="lever"></span>
                    SI
                </label>
            </div>

        </div>
        <!-- CONTENEDOR DE LA DISPONIBILIDAD DEL PLATILLO -->

        <!-- CONTENEDOR DEL CUERPO DEL  -->
        <div class="card-body p-0">

            <!-- CONTENEDOR RESPONSIVO DE LA TABLA -->
            <div class="table-responsive p-1">

                <!-- TABLA DE INGREDIENTES -->
                <table class="table table-hover mb-0">

                    <!-- TITULOS DE LA TABLA O CABECERAS -->
                    <thead class="font-weight-bolder text-center">

                        <tr class="text-center">

                            <th>Ingrediente</th>
                            <th>Disponibilidad</th>
                            <th>Editar</th>

                        </tr>

                    </thead>
                    <!-- TITULOS DE LA TABLA O CABECERAS -->

                    <!-- CUERPO DE LA TABLA CON LOS INGREDIENTES -->
                    <tbody class="text-center">

                        <tr>

                            <td>Milanesa</td>

                            <td class="text-center">
                                <div class="switch">
                                    <label>
                                        NO
                                        <input type="checkbox">
                                        <span class="lever"></span>
                                        SI
                                    </label>
                                </div>
                            </td>

                            <td>
                                <button class="btn btn-sm btn-rounded btn-blue-grey btn-block">Editar</button>
                            </td>

                        </tr>

                    </tbody>
                    <!-- CUERPO DE LA TABLA CON LOS INGREDIENTES -->

                </table>
                <!-- TABLA DE INGREDIENTES -->

            </div>
            <!-- CONTENEDOR RESPONSIVO DE LA TABLA -->

        </div>

    </div>
    <!-- CONTENEDOR DE LOS INGREDIENTES PARA CADA PLATILLO -->

</div>
<!-- CONTENEDOR DE PLATILLO INDIVIDUAL -->