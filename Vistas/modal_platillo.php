<?php     
    $id_local = (isset($_POST['id_local'])) ? $_POST['id_local'] : '';
    $id_platillo = (isset($_POST['platillo_elegido'][0]['id_platillo'])) ? $_POST['platillo_elegido'][0]['id_platillo'] : '';
    $nombre_platillo = (isset($_POST['platillo_elegido'][0]['nombre_platillo'])) ? $_POST['platillo_elegido'][0]['nombre_platillo'] : '';
    $precio = (isset($_POST['platillo_elegido'][0]['precio'])) ? $_POST['platillo_elegido'][0]['precio'] : '';
    $tiempo_preparacion = (isset($_POST['platillo_elegido'][0]['tiempo_preparacion'])) ? $_POST['platillo_elegido'][0]['tiempo_preparacion'] : '';
    $cantidad = (isset($_POST['platillo_elegido'][0]['cantidad'])) ? $_POST['platillo_elegido'][0]['cantidad'] : '';
    $descripcion = (isset($_POST['platillo_elegido'][0]['descripcion'])) ? $_POST['platillo_elegido'][0]['descripcion'] : '';
    $ubicacion_imagen = (isset($_POST['platillo_elegido'][0]['ubicacion_imagen'])) ? $_POST['platillo_elegido'][0]['ubicacion_imagen'] : '';
?>

<script type="text/javascript" src="./Plugins/js/bootstrap-multiselect.js"></script>
<link rel="stylesheet" href="./Plugins/css/bootstrap-multiselect.css">    

<style>
    .bordeado{
        border-radius: 50rem!important;
        border-top: 1px solid #dee2e6!important;
        border-right: 2px solid #dee2e6!important;
        border-bottom: 3px solid #dee2e6!important;
        border-left: 4px solid #dee2e6!important;
        margin-left: 8px;
    }
</style>

<!-- MODAL QUE MUESTRA LA INFORMACIÓN DEL PRODUCTO A PEDIR -->
<div class="modal fade" id="ordenar_comida" tabindex="-1" role="dialog" aria-labelledby="ordenar_comida"
    aria-hidden="false" data-backdrop="true">    

    <div class="modal-dialog modal-lg" role="document">

        <!-- CONTENEDOR DEL MODAL -->
        <div class="modal-content">        

            <!-- CABECERA DEL MODAL -->
            <div class="modal-header border-0">
                <button type="button" class="close pr-2 pt-1 pb-1" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- CABECERA DEL MODAL -->

            <!-- CUERPO DEL MODAL -->
            <div class="modal-body pt-0 pb-0">
            <input id="id-local" hidden value="<?php echo $id_local; ?>">
            <input id="id-platillo" hidden value="<?php echo $id_platillo; ?>">
            <input id='nombre-platillo' hidden value="<?php echo $nombre_platillo; ?>">
            <input id="precio-subtotal" hidden value="<?php echo $precio; ?>">
            <input id="tiempo-preparacion" hidden value="<?php echo $tiempo_preparacion; ?>">        
            <input id="ubicacion-imagen" hidden value="<?php echo $ubicacion_imagen; ?>">        

                <div class="row">

                    <!-- CONTENEDOR DEL MINI CAROUSEL -->
                    <div class="col-lg-5">

                        <!-- CAROUSEL CON IMAGENES DE LA COMIDA -->
                        <div id="carousel-thumb" class="carousel slide carousel-fade carousel-thumbnails"
                            data-ride="carousel">

                            <!--Slides CON IMAGENES DEL PLATILLO -->
                            <div class="carousel-inner z-depth-2" role="listbox">

                                <div class="carousel-item active">
                                    <img height="195px" width="100%" class="d-block rounded" src="<?php echo $ubicacion_imagen;?>" alt="First slide">
                                </div>                                                                        

                                <div class="carousel-item">
                                    <img height="195px" width="100%" class="d-block rounded" src="./Assets/img/comida_2.jpg" alt="Second slide">
                                </div>

                                <div class="carousel-item">
                                    <img height="195px" width="100%" class="d-block rounded" src="./Assets/img/comida_3.jpg" alt="Third slide">
                                </div>

                            </div>
                            <!--Slides CON IMAGENES DEL PLATILLO -->

                            <!--Controls-->
                            <a class="carousel-control-prev" href="#carousel-thumb" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carousel-thumb" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                            <!--/.Controls-->

                            <ol class="carousel-indicators">
                                <li data-target="#carousel-thumb" data-slide-to="0" class="pt-2">
                                    <img class='img-thumbnail' src="<?php echo $ubicacion_imagen;?>">
                                </li>
                                <li data-target="#carousel-thumb" data-slide-to="1" class="pt-2">
                                    <img class='img-thumbnail' src="./Assets/img/comida_2.jpg">
                                </li>
                                <li data-target="#carousel-thumb" data-slide-to="2" class="pt-2">
                                    <img class='img-thumbnail' src="./Assets/img/comida_3.jpg">
                                </li>
                            </ol>

                        </div>
                        <!-- CAROUSEL CON IMAGENES DE LA COMIDA -->

                        <!-- COMENTARIO DEL PLATILLO -->
                        <div id="contenido-boton-agregar" class="text-center pt-5">

                            <div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
                                <button class="btn-floating btn-lg btn-amber material-tooltip-smaller" data-toggle="tooltip"
                                    id="boton-add-platillo" data-placement="left" title="Agregar al pedido">
                                    <i class="fas fa-concierge-bell" aria-hidden="true"></i>
                                </button>
                            </div>
                            
                            <!-- <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
                                Tooltip on left
                            </button> -->
                            <button id="boton-agregar-platillo" class="btn btn-outline-warning"> 
                                Agregar al pedido
                                <i class="fas fa-concierge-bell ml-2" aria-hidden="true"></i>
                            </button>
                            
                        </div>
                        <!-- FIN DE COMENTARIO DEL PLATILLO -->

                    </div>
                    <!-- CONTENEDOR DEL MINI CAROUSEL -->            

                    <!-- CONTENEDOR DE LA INFORMACION DEL PEDIDO -->
                    <div class="col-lg-7">

                        <!-- NOMBRE DEL PLATILLO -->
                        <div class="text-center m-2">
                            <h1 class="h1-responsive color-food-fontBrown product-name">
                                <strong><?php echo $nombre_platillo;?></strong><strong> x <?php echo $cantidad;?></strong>
                            </h1>
                        </div>                        
                        <hr>
                        <!-- NOMBRE DEL PLATILLO -->

                        <!-- CONTENEDOR DEL PRECIO Y TIEMPO DE PREPARACIÓN DEL PLATILLO -->                        
                        <h4 class="h4-responsive clearfix">                        
                                                
                            <span class="border-success green-text bordeado p-1 float-left">
                                <strong>$ <?php echo $precio;?></span></strong>
                            </span>

                            <!-- TIEMPO -->
                            <span class="border-primary grey-text bordeado p-1 float-right">
                                <small>
                                    <i class="far fa-clock pr-1"></i>
                                    <?php echo $tiempo_preparacion;?> min
                                </small>
                            </span>
                            <!-- FIN TIEMPO -->
                        </h4>                        
                        <hr>
                        <!-- CONTENEDOR DEL PRECIO Y TIEMPO DE PREPARACIÓN DEL PLATILLO -->

                        <!-- FORMULARIO PARA AGREGAR DETALLES DEL PEDIDO -->
                        <div class="card-body pb-0">

                            <!-- INPUT CON BOTONES PARA AGREGAR O ELIMINAR SELECTS PARA DETALLES DEL PEDIDDO -->
                            <div class="text-center">

                                <label>Descripción:</label>
                                <p class="h6-responsive"> <?php echo $descripcion; ?> </p>

                            </div>

                            <hr>
                            <!-- INPUT CON BOTONES PARA AGREGAR O ELIMINAR SELECTS PARA DETALLES DEL PEDIDDO -->
                            
                            
                            <!-- CONTENEDOR DEL BOTON PARA AGREGAR AL PEDIDO -->
                            <div class="text-center">                                

                                <label>Ingredientes:</label>
                                <select id="select-multiple-ingredientes" class="custom-select" multiple="multiple">                                    
                                    
                                </select> 

                            </div>
                            <!-- CONTENEDOR DEL BOTON PARA AGREGAR AL PEDIDO -->
                            
                            <div class="md-form">          
                                <!-- Aqui puedes describir como quieres tu platillo, con mas salsa, sin lechuga, con poca aceita, etc... -->
                                <textarea type="text" id="comentario-platillo" class="md-textarea form-control" rows="4" style="max-height: 100px; min-height: 80px; overflow:auto;"
                                ></textarea>
                                <label data-error="wrong" data-success="right" for="comentario-platillo">Comentarios</label>
                            </div>

                        </div>
                        <!-- FORMULARIO PARA AGREGAR DETALLES DEL PEDIDO -->

                    </div>
                    <!-- CONTENEDOR DE LA INFORMACION DEL PEDIDO -->

                </div>

            </div>
            <!-- CUERPO DEL MODAL -->

        </div>
        <!-- CONTENEDOR DEL MODAL -->

    </div>

</div>
<!-- MODAL QUE MUESTRA LA INFORMACIÓN DEL PRODUCTO A PEDIR -->

<script src="./Controladores/c_modal_platillo.js"></script>