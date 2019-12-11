<?php     
    $id_ingrediente = ( isset( $_POST['id_ingrediente'] ) ) ? $_POST['id_ingrediente'] : '' ;    
    $nombre_ingrediente = ( isset( $_POST['nombre_ingrediente'] ) ) ? $_POST['nombre_ingrediente'] : '';    
?>

<!-- MODAL PARA AGREGAR UN NUEVO PLATILLO -->
<div id="modal_actualizar_ingrediente" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal_actualizar_ingrediente"
    aria-hidden="false" data-backdrop="true">

    <div class="modal-dialog" role="document">
        
        <div class="modal-content">

            <div class="modal-header bg-primary text-white text-center">

                <h5 class="modal-title m-auto">
                    Actualizar el ingrediente 
                    <span class="font-weight-bolder">
                        <?php echo($nombre_ingrediente); ?>
                    </span> 
                </h5>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

            </div>

            <!-- CONTENIDO DEL MODAL -->
            <div class="modal-body">            

                <!-- FORMULARIO DE REGISTRO -->
                <form id="form-actualizar-ingrediente">

                    <!-- INPUT DEL NOMBRE DEL INGREDIENTE -->
                    <div class="form-group mb-3">
                        <label for="nombre_ingrediente_actualizar">Nombre del ingrediente</label>
                        <input type="text" class="form-control" id="nombre_ingrediente_actualizar" id_ingrediente="<?php echo($id_ingrediente); ?>"  placeholder="Ej. Queso" value="<?php echo($nombre_ingrediente); ?>" required>

                        <div class="invalid-feedback">
                            <i class="fal fa-times-circle"></i>
                             Nombre no válido para el ingrediente
                        </div>

                    </div>                    

                </form>
                <!-- FORMULARIO DE REGISTRO -->

            </div>
            <!-- CONTENIDO DEL MODAL -->

            <!-- FOOTER DEL CONTENIDO DEL MODAL -->
            <div id="contenido-footer-ingrediente" class="modal-footer justify-content-center">
                <a id="actualizar_ingrediente" type="button" class="btn btn-md btn-success">
                    Actualizar 
                    <i class="far fa-drumstick ml-1"></i></a>
            </div>
            <!-- FOOTER DEL CONTENIDO DEL MODAL -->
        </div>

    </div>

</div>


<!-- SCRIPT DE LAS FUNCIONALIDADES DEL FORMULARIO PARA AGREGAR UN NUEVO INGREDIENTE -->
<script rel="script" src="./Controladores/c_actualizar_ingrediente.js"></script>